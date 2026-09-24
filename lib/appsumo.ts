import { createHmac, timingSafeEqual } from 'crypto';

export type AppSumoEvent = 'purchase' | 'activate' | 'upgrade' | 'downgrade' | 'deactivate' | 'migrate';

export type AppSumoWebhook = {
  license_key: string;
  event: AppSumoEvent;
  tier?: number;
  prev_license_key?: string;
  parent_license_key?: string;
  partner_plan_name?: string;
  unit_quantity?: number;
  event_timestamp?: number;
  test?: boolean | string;
};

const EVENTS = new Set<AppSumoEvent>([
  'purchase', 'activate', 'upgrade', 'downgrade', 'deactivate', 'migrate',
]);
const LICENSE_KEY = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isLicenseKey(value: unknown): value is string {
  return typeof value === 'string' && LICENSE_KEY.test(value);
}

export function parseWebhook(value: unknown): AppSumoWebhook | null {
  if (!value || typeof value !== 'object') return null;
  const body = value as Record<string, unknown>;
  if (!isLicenseKey(body.license_key) || !EVENTS.has(body.event as AppSumoEvent)) return null;
  if (body.prev_license_key !== undefined && !isLicenseKey(body.prev_license_key)) return null;
  if (body.parent_license_key !== undefined && !isLicenseKey(body.parent_license_key)) return null;
  if (body.tier !== undefined && (!Number.isInteger(body.tier) || Number(body.tier) < 1)) return null;
  return body as AppSumoWebhook;
}

export function verifyWebhookSignature(rawBody: Buffer, timestamp: string | undefined, signature: string | undefined): boolean {
  const key = process.env.APPSUMO_API_KEY;
  if (!key || !timestamp || !signature || !/^\d+$/.test(timestamp) || !/^[0-9a-f]{64}$/i.test(signature)) return false;
  const expected = createHmac('sha256', key).update(timestamp).update(rawBody).digest();
  return timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}

export function activeSubscription(licenseKey: string, tier: number) {
  const plans: Record<number, { name: 'pro' | 'teams'; words: number; seats: number; byok: boolean }> = {
    1: { name: 'pro', words: 200_000, seats: 1, byok: false },
    2: { name: 'pro', words: 600_000, seats: 3, byok: false },
    3: { name: 'teams', words: 1_400_000, seats: 7, byok: true },
    4: { name: 'teams', words: 3_000_000, seats: 15, byok: true },
  };
  const plan = plans[tier];
  if (!plan) throw new Error(`Unsupported AppSumo tier: ${tier}`);
  return {
    subscription_tier: plan.name,
    subscription_billing_cycle: 'lifetime',
    subscription_source: 'appsumo',
    payment_platform: 'appsumo',
    subscription_status: 'active',
    // Existing Zavi clients check this field even for lifetime plans.
    subscription_expires_at: new Date('2100-01-01T00:00:00.000Z'),
    appsumo_license_key: licenseKey,
    appsumo_license_status: 'active',
    appsumo_tier: tier,
    appsumo_cloud_words_per_month: plan.words,
    appsumo_team_seats: plan.seats,
    appsumo_byok_enabled: plan.byok,
    updated_at: new Date(),
  };
}
