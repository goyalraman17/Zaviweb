import crypto from 'crypto';

export type AppSumoTierConfig = {
  tier: number;
  subscriptionTier: string;
  monthlyWordLimit: number;
  deviceLimit: number;
  teamSeatLimit: number;
};

const DEFAULT_TIERS: Record<
  number,
  Omit<AppSumoTierConfig, 'tier' | 'subscriptionTier'>
> = {
  1: { monthlyWordLimit: 200_000, deviceLimit: 2, teamSeatLimit: 0 },
  2: { monthlyWordLimit: 600_000, deviceLimit: 6, teamSeatLimit: 0 },
  3: { monthlyWordLimit: 1_400_000, deviceLimit: 16, teamSeatLimit: 8 },
  4: { monthlyWordLimit: 3_200_000, deviceLimit: 0, teamSeatLimit: 16 },
};

function positiveInteger(name: string, fallback: number, allowZero = false) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  if (!Number.isSafeInteger(value) || value < (allowZero ? 0 : 1)) {
    throw new Error(
      `${name} must be ${allowZero ? 'zero or a positive' : 'a positive'} integer.`
    );
  }
  return value;
}

export function getAppSumoTierConfig(tier: number): AppSumoTierConfig {
  const defaults = DEFAULT_TIERS[tier];
  if (!defaults) throw new Error(`Unsupported AppSumo tier: ${tier}`);

  return {
    tier,
    subscriptionTier: `appsumo_tier_${tier}`,
    monthlyWordLimit: positiveInteger(
      `APPSUMO_TIER_${tier}_MONTHLY_WORD_LIMIT`,
      defaults.monthlyWordLimit
    ),
    deviceLimit: positiveInteger(
      `APPSUMO_TIER_${tier}_DEVICE_LIMIT`,
      defaults.deviceLimit,
      true
    ),
    teamSeatLimit: positiveInteger(
      `APPSUMO_TIER_${tier}_TEAM_SEAT_LIMIT`,
      defaults.teamSeatLimit,
      true
    ),
  };
}

export function verifyAppSumoWebhookSignature(input: {
  rawBody: Buffer;
  timestamp: string;
  signature: string;
  apiKey: string;
  nowMs?: number;
}) {
  const timestampMs = Number(input.timestamp);
  if (!Number.isFinite(timestampMs)) return false;

  const normalizedMs =
    timestampMs < 10_000_000_000 ? timestampMs * 1000 : timestampMs;
  const nowMs = input.nowMs ?? Date.now();
  if (Math.abs(nowMs - normalizedMs) > 5 * 60 * 1000) return false;

  const expected = crypto
    .createHmac('sha256', input.apiKey)
    .update(input.timestamp)
    .update(input.rawBody)
    .digest('hex');
  const provided = input.signature.trim().toLowerCase();
  if (provided.length !== expected.length) return false;

  return crypto.timingSafeEqual(
    Buffer.from(provided, 'utf8'),
    Buffer.from(expected, 'utf8')
  );
}

export function appSumoStatusForEvent(event: string, receivedStatus?: string) {
  switch (event) {
    case 'activate':
    case 'upgrade':
    case 'downgrade':
    case 'migrate':
      return 'active';
    case 'deactivate':
      return 'deactivated';
    case 'purchase':
      return receivedStatus || 'inactive';
    default:
      throw new Error(`Unsupported AppSumo event: ${event}`);
  }
}
