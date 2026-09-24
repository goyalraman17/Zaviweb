import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { activeSubscription, isLicenseKey } from '@/lib/appsumo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, firebase_id_token } = req.body || {};
  if (typeof code !== 'string' || code.length < 8 || code.length > 512 || typeof firebase_id_token !== 'string') {
    return res.status(400).json({ error: 'Missing authorization code or sign-in session' });
  }

  let user;
  try {
    user = await getAdminAuth().verifyIdToken(firebase_id_token);
  } catch {
    return res.status(401).json({ error: 'Please sign in again and retry activation.' });
  }

  const { APPSUMO_CLIENT_ID, APPSUMO_CLIENT_SECRET, APPSUMO_REDIRECT_URI, APPSUMO_API_KEY } = process.env;
  if (!APPSUMO_CLIENT_ID || !APPSUMO_CLIENT_SECRET || !APPSUMO_REDIRECT_URI || !APPSUMO_API_KEY) {
    console.error('AppSumo OAuth credentials are missing');
    return res.status(503).json({ error: 'AppSumo activation is not configured yet.' });
  }

  try {
    const tokenResponse = await fetch('https://appsumo.com/openid/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: APPSUMO_CLIENT_ID,
        client_secret: APPSUMO_CLIENT_SECRET,
        redirect_uri: APPSUMO_REDIRECT_URI,
        code,
        grant_type: 'authorization_code',
      }),
    });
    if (!tokenResponse.ok) return res.status(400).json({ error: 'AppSumo authorization expired. Please restart activation from AppSumo.' });
    const token = await tokenResponse.json();
    if (typeof token.access_token !== 'string') throw new Error('AppSumo token missing');

    const licenseResponse = await fetch(`https://appsumo.com/openid/license_key/?access_token=${encodeURIComponent(token.access_token)}`);
    if (!licenseResponse.ok) throw new Error('Could not retrieve AppSumo license');
    const license = await licenseResponse.json();
    if (!isLicenseKey(license.license_key) || !['active', 'inactive', 'deactivated'].includes(license.status)) {
      throw new Error('Invalid AppSumo license response');
    }
    if (license.status === 'deactivated') {
      return res.status(403).json({ error: 'This AppSumo license has been deactivated.' });
    }

    // OAuth only returns the key and status. Read the license before granting a
    // tier, since its purchase webhook may arrive after the buyer redeems it.
    const licenseDetailsResponse = await fetch(
      `https://api.licensing.appsumo.com/v2/licenses/${license.license_key}`,
      { headers: { 'X-AppSumo-Licensing-Key': APPSUMO_API_KEY }, signal: AbortSignal.timeout(8000) },
    );
    if (!licenseDetailsResponse.ok) throw new Error('Could not verify AppSumo license tier');
    const licenseDetails = await licenseDetailsResponse.json();
    if (licenseDetails.license_key !== license.license_key || !Number.isInteger(licenseDetails.tier) || licenseDetails.tier < 1 || licenseDetails.tier > 4) {
      throw new Error('Invalid AppSumo license tier');
    }
    if (licenseDetails.status === 'deactivated') {
      return res.status(403).json({ error: 'This AppSumo license has been deactivated.' });
    }

    const db = getAdminDb();
    const licenseRef = db.collection('appsumo_licenses').doc(license.license_key);
    const userRef = db.collection('users').doc(user.uid);
    await db.runTransaction(async (tx) => {
      const licenseDoc = await tx.get(licenseRef);
      const userDoc = await tx.get(userRef);
      const data = licenseDoc.data();
      if (data?.parent_license_key) throw new Error('An add-on license cannot activate a Zavi plan');
      if (data?.uid && data.uid !== user.uid) throw new Error('License is already linked to another Zavi account');
      if (data?.status === 'deactivated' || data?.superseded_by) throw new Error('This AppSumo license is no longer valid');
      if (userDoc.data()?.appsumo_license_key && userDoc.data()?.appsumo_license_key !== license.license_key && userDoc.data()?.subscription_source === 'appsumo') {
        throw new Error('This Zavi account already has a different AppSumo license');
      }
      const tier = licenseDetails.tier;
      tx.set(licenseRef, {
        license_key: license.license_key,
        uid: user.uid,
        email: user.email || null,
        tier,
        status: 'active',
        updated_at: new Date(),
      }, { merge: true });
      const existing = userDoc.data();
      const previousSubscription = existing?.subscription_source !== 'appsumo' && existing?.subscription_status === 'active'
        ? {
            subscription_tier: existing.subscription_tier || 'pro',
            subscription_billing_cycle: existing.subscription_billing_cycle || null,
            subscription_source: existing.subscription_source || null,
            subscription_status: existing.subscription_status,
            subscription_expires_at: existing.subscription_expires_at || null,
            payment_platform: existing.payment_platform || null,
          }
        : existing?.appsumo_previous_subscription || null;
      tx.set(userRef, {
        ...activeSubscription(license.license_key, tier),
        appsumo_license_status: 'active',
        appsumo_previous_subscription: previousSubscription,
        ...(userDoc.exists ? {} : { created_at: new Date() }),
      }, { merge: true });
    });
    return res.status(200).json({ success: true, tier: licenseDetails.tier });
  } catch (error) {
    console.error('AppSumo redemption failed:', error);
    const message = error instanceof Error ? error.message : 'AppSumo activation failed';
    const conflict = message.includes('already linked') || message.includes('already has') || message.includes('no longer valid') || message.includes('add-on license');
    return res.status(conflict ? 409 : 502).json({ error: conflict ? message : 'Could not activate the AppSumo license. Please restart from AppSumo.' });
  }
}
