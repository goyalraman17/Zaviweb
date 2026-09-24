import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminDb } from '@/lib/firebase-admin';
import { activeSubscription, parseWebhook, verifyWebhookSignature } from '@/lib/appsumo';

export const config = { api: { bodyParser: false } };

async function readBody(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += part.length;
    if (size > 64 * 1024) throw new Error('Webhook body too large');
    chunks.push(part);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const raw = await readBody(req);
    const contentType = req.headers['content-type'] || '';
    const body = contentType.includes('application/x-www-form-urlencoded')
      ? Object.fromEntries(new URLSearchParams(raw.toString('utf8')))
      : JSON.parse(raw.toString('utf8'));
    if (contentType.includes('application/x-www-form-urlencoded') && /^\d+$/.test(body.tier)) {
      body.tier = Number(body.tier);
    }
    const event = parseWebhook(body);
    if (!event) return res.status(400).json({ error: 'Invalid AppSumo event' });

    // Portal validation has no product effect and can run before credentials are issued.
    if (event.test === true || event.test === 'true') {
      return res.status(200).json({ event: event.event, success: true });
    }

    const signature = req.headers['x-appsumo-signature'];
    const timestamp = req.headers['x-appsumo-timestamp'];
    if (!verifyWebhookSignature(raw, typeof timestamp === 'string' ? timestamp : undefined, typeof signature === 'string' ? signature : undefined)) {
      return res.status(401).json({ error: 'Invalid AppSumo signature' });
    }

    const db = getAdminDb();
    const licenseRef = db.collection('appsumo_licenses').doc(event.license_key);
    const previousRef = event.prev_license_key
      ? db.collection('appsumo_licenses').doc(event.prev_license_key) : null;

    await db.runTransaction(async (tx) => {
      const current = await tx.get(licenseRef);
      const previous = previousRef ? await tx.get(previousRef) : null;
      const currentData = current.data();
      const previousData = previous?.data();
      const uid = currentData?.uid || previousData?.uid;
      if (currentData?.uid && previousData?.uid && currentData.uid !== previousData.uid) {
        throw new Error('Conflicting AppSumo license owners');
      }
      const userRef = uid ? db.collection('users').doc(uid) : null;
      const user = userRef ? await tx.get(userRef) : null;
      const isAddOn = !!event.parent_license_key;
      const tier = event.tier || currentData?.tier || previousData?.tier || 1;
      const isPlanChange = event.event === 'upgrade' || event.event === 'downgrade';
      const isDeactivation = event.event === 'deactivate';
      const isActivation = event.event === 'activate' || isPlanChange;
      // A delayed purchase or old-key deactivation must never undo an activation or plan change.
      const status = isDeactivation ? 'deactivated' : isActivation && currentData?.status !== 'deactivated'
        ? 'active' : currentData?.status || 'inactive';

      tx.set(licenseRef, {
        license_key: event.license_key,
        status,
        tier,
        uid: uid || null,
        parent_license_key: event.parent_license_key || currentData?.parent_license_key || null,
        partner_plan_name: event.partner_plan_name || currentData?.partner_plan_name || null,
        unit_quantity: event.unit_quantity || currentData?.unit_quantity || null,
        prev_license_key: event.prev_license_key || currentData?.prev_license_key || null,
        last_event: event.event,
        updated_at: new Date(),
      }, { merge: true });

      if (previousRef && previousData) {
        tx.set(previousRef, { status: 'superseded', superseded_by: event.license_key, updated_at: new Date() }, { merge: true });
      }

      if (!isAddOn && userRef && user) {
        const userData = user.data();
        const linkedKey = userData?.appsumo_license_key;
        if (isPlanChange && status === 'active' && linkedKey === event.prev_license_key) {
          tx.set(userRef, activeSubscription(event.license_key, tier), { merge: true });
        } else if (event.event === 'activate' && linkedKey === event.license_key && status === 'active') {
          tx.set(userRef, activeSubscription(event.license_key, tier), { merge: true });
        } else if (isDeactivation && linkedKey === event.license_key && userData?.subscription_source === 'appsumo' && !currentData?.superseded_by) {
          const previous = userData?.appsumo_previous_subscription;
          const previousExpiry = previous?.subscription_expires_at?.toDate?.() || previous?.subscription_expires_at;
          const previousActive = previous?.subscription_status === 'active' && previousExpiry instanceof Date && previousExpiry > new Date();
          tx.set(userRef, {
            ...(previousActive ? previous : {
              subscription_tier: 'free',
              subscription_billing_cycle: null,
              subscription_expires_at: null,
              subscription_status: 'inactive',
              payment_platform: null,
            }),
            appsumo_license_status: 'deactivated',
            updated_at: new Date(),
          }, { merge: true });
        }
      }
    });

    return res.status(200).json({ event: event.event, success: true });
  } catch (error) {
    console.error('AppSumo webhook failed:', error);
    return res.status(500).json({ error: 'Could not process AppSumo event' });
  }
}
