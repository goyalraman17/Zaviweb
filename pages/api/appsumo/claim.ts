import type { NextApiRequest, NextApiResponse } from 'next';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { getAppSumoTierConfig } from '@/lib/appsumo';

type TokenResponse = { access_token?: string; error?: string };
type LicenseResponse = { license_key?: string; status?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = process.env.APPSUMO_CLIENT_ID;
  const clientSecret = process.env.APPSUMO_CLIENT_SECRET;
  const redirectUri =
    process.env.APPSUMO_REDIRECT_URI ||
    'https://zavivoice.com/appsumo/activate';
  if (!clientId || !clientSecret) {
    return res
      .status(503)
      .json({ error: 'AppSumo activation is not configured' });
  }

  try {
    const code = String(req.body?.code || '');
    const idToken = String(req.body?.firebase_id_token || '');
    if (!code || !idToken)
      return res.status(400).json({ error: 'Missing activation details' });

    const user = await getAdminAuth().verifyIdToken(idToken);
    const tokenResponse = await fetch('https://appsumo.com/openid/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
        grant_type: 'authorization_code',
      }),
    });
    const token = (await tokenResponse.json()) as TokenResponse;
    if (!tokenResponse.ok || !token.access_token) {
      console.error(
        'AppSumo token exchange failed',
        tokenResponse.status,
        token.error || 'unknown'
      );
      return res
        .status(400)
        .json({ error: 'This activation link is invalid or has expired' });
    }

    const licenseResponse = await fetch(
      `https://appsumo.com/openid/license_key/?access_token=${encodeURIComponent(token.access_token)}`,
      { headers: { Accept: 'application/json' } }
    );
    const license = (await licenseResponse.json()) as LicenseResponse;
    if (!licenseResponse.ok || !license.license_key) {
      return res
        .status(400)
        .json({ error: 'Unable to retrieve the AppSumo license' });
    }

    const db = getAdminDb();
    const licenseRef = db
      .collection('appsumo_licenses')
      .doc(license.license_key);
    let resultTier = 0;
    await db.runTransaction(async (transaction) => {
      const licenseDoc = await transaction.get(licenseRef);
      if (!licenseDoc.exists) throw new Error('LICENSE_NOT_READY');
      const data = licenseDoc.data() || {};
      if (data.status !== 'active' || license.status === 'deactivated') {
        throw new Error('LICENSE_INACTIVE');
      }
      const linkedUid = String(data.uid || '');
      if (linkedUid && linkedUid !== user.uid)
        throw new Error('LICENSE_ALREADY_CLAIMED');

      resultTier = Number(data.tier || 0);
      const tierConfig = getAppSumoTierConfig(resultTier);
      transaction.set(
        licenseRef,
        {
          uid: user.uid,
          claimed_at: FieldValue.serverTimestamp(),
          updated_at: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      transaction.set(
        db.collection('users').doc(user.uid),
        {
          email: user.email || null,
          subscription_tier: tierConfig.subscriptionTier,
          subscription_status: 'active',
          subscription_source: 'appsumo',
          payment_platform: 'appsumo',
          appsumo_tier: resultTier,
          appsumo_license_key: license.license_key,
          monthly_word_limit: tierConfig.monthlyWordLimit,
          device_limit: tierConfig.deviceLimit,
          team_seat_limit: tierConfig.teamSeatLimit,
          subscription_expires_at: null,
          updated_at: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    });

    const tierConfig = getAppSumoTierConfig(resultTier);
    return res.status(200).json({
      success: true,
      tier: resultTier,
      monthlyWordLimit: tierConfig.monthlyWordLimit,
      deviceLimit: tierConfig.deviceLimit,
      teamSeatLimit: tierConfig.teamSeatLimit,
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    const messages: Record<string, string> = {
      LICENSE_NOT_READY:
        'Your AppSumo purchase is still being prepared. Please retry in a moment.',
      LICENSE_INACTIVE:
        'This AppSumo license is inactive or has been refunded.',
      LICENSE_ALREADY_CLAIMED:
        'This AppSumo license is already linked to another Zavi account.',
    };
    if (messages[code]) return res.status(409).json({ error: messages[code] });
    console.error('AppSumo activation failed', error);
    return res
      .status(401)
      .json({ error: 'Please sign in again and retry activation' });
  }
}
