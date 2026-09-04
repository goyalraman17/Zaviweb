import type { NextApiRequest, NextApiResponse } from 'next';
import { FieldValue, type DocumentReference } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import {
  appSumoStatusForEvent,
  getAppSumoTierConfig,
  verifyAppSumoWebhookSignature,
} from '@/lib/appsumo';

export const config = { api: { bodyParser: false } };

type AppSumoWebhook = {
  license_key: string;
  prev_license_key?: string;
  parent_license_key?: string;
  event: string;
  event_timestamp: number;
  created_at: number;
  license_status?: string;
  tier?: number;
  test?: boolean;
  partner_plan_name?: string;
  unit_quantity?: number;
  extra?: { reason?: string };
};

async function readRawBody(req: NextApiRequest) {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > 64 * 1024) throw new Error('Webhook body too large');
    chunks.push(buffer);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.APPSUMO_API_KEY;
  if (!apiKey)
    return res
      .status(503)
      .json({ error: 'AppSumo licensing is not configured' });

  try {
    const rawBody = await readRawBody(req);
    const timestamp = String(req.headers['x-appsumo-timestamp'] || '');
    const signature = String(req.headers['x-appsumo-signature'] || '');
    if (
      !verifyAppSumoWebhookSignature({ rawBody, timestamp, signature, apiKey })
    ) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const payload = JSON.parse(rawBody.toString('utf8')) as AppSumoWebhook;
    if (!payload.license_key || !payload.event) {
      return res.status(400).json({ error: 'Missing license_key or event' });
    }
    if (payload.test)
      return res.status(200).json({ event: payload.event, success: true });
    if (payload.parent_license_key) {
      return res.status(200).json({ event: payload.event, success: true });
    }

    const status = appSumoStatusForEvent(payload.event, payload.license_status);
    const db = getAdminDb();
    const licenseRef = db
      .collection('appsumo_licenses')
      .doc(payload.license_key);

    await db.runTransaction(async (transaction) => {
      let linkedUid = '';
      let previousRef: DocumentReference | null = null;
      let storedTier = 0;
      if (payload.prev_license_key) {
        previousRef = db
          .collection('appsumo_licenses')
          .doc(payload.prev_license_key);
        const previous = await transaction.get(previousRef);
        linkedUid = String(previous.data()?.uid || '');
        storedTier = Number(previous.data()?.tier || 0);
      } else {
        const current = await transaction.get(licenseRef);
        linkedUid = String(current.data()?.uid || '');
        storedTier = Number(current.data()?.tier || 0);
      }

      // Deactivation payloads may omit tier. Preserve the authoritative tier
      // already stored for the license instead of silently treating it as 1.
      const tier = Number(payload.tier || storedTier);
      const tierConfig = getAppSumoTierConfig(tier);

      const userRef = linkedUid ? db.collection('users').doc(linkedUid) : null;
      const user = userRef ? await transaction.get(userRef) : null;
      const currentKey = String(user?.data()?.appsumo_license_key || '');

      if (previousRef) {
        transaction.set(
          previousRef,
          {
            status: 'deactivated',
            replaced_by: payload.license_key,
            updated_at: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }

      transaction.set(
        licenseRef,
        {
          license_key: payload.license_key,
          prev_license_key: payload.prev_license_key || null,
          status,
          tier,
          uid: linkedUid || null,
          event: payload.event,
          event_timestamp: payload.event_timestamp,
          created_at_appsumo: payload.created_at,
          partner_plan_name: payload.partner_plan_name || null,
          reason: payload.extra?.reason || null,
          monthly_word_limit: tierConfig.monthlyWordLimit,
          device_limit: tierConfig.deviceLimit,
          team_seat_limit: tierConfig.teamSeatLimit,
          updated_at: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      if (!userRef) return;
      const shouldUpdate =
        payload.event !== 'deactivate' ||
        !currentKey ||
        currentKey === payload.license_key;
      if (!shouldUpdate) return;

      transaction.set(
        userRef,
        {
          subscription_tier: tierConfig.subscriptionTier,
          subscription_status: status,
          subscription_source: 'appsumo',
          payment_platform: 'appsumo',
          appsumo_tier: tier,
          appsumo_license_key: payload.license_key,
          monthly_word_limit: tierConfig.monthlyWordLimit,
          device_limit: tierConfig.deviceLimit,
          team_seat_limit: tierConfig.teamSeatLimit,
          subscription_expires_at: null,
          updated_at: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    });

    return res.status(200).json({ event: payload.event, success: true });
  } catch (error) {
    console.error('AppSumo webhook failed', error);
    return res.status(400).json({ error: 'Webhook processing failed' });
  }
}
