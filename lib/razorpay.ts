import crypto from 'crypto';
import Razorpay from 'razorpay';

type BillingCycle = 'monthly' | 'annual';
type PlanName = 'pro' | 'teams';

export type PlanConfig = {
  planId: string;
  billingCycle: BillingCycle;
  amount: number;
  totalCount: number;
};

export type RazorpaySubscriptionEntity = {
  id: string;
  plan_id?: string;
  status?: string;
  current_start?: number | null;
  current_end?: number | null;
  charge_at?: number | null;
  start_at?: number | null;
  ended_at?: number | null;
  total_count?: number | string | null;
  paid_count?: number | string | null;
  remaining_count?: number | string | null;
  notes?: Record<string, string> | null;
  customer_notify?: boolean;
};

const PLAN_CONFIGS: Record<PlanName, Record<BillingCycle, Omit<PlanConfig, 'billingCycle'>>> = {
  pro: {
    monthly: {
      planId: process.env.RAZORPAY_PRO_MONTHLY_PLAN_ID || '',
      amount: 799,
      totalCount: 60,
    },
    annual: {
      planId: process.env.RAZORPAY_PRO_ANNUAL_PLAN_ID || '',
      amount: 4999,
      totalCount: 10,
    },
  },
  teams: {
    monthly: {
      planId: process.env.RAZORPAY_TEAMS_MONTHLY_PLAN_ID || '',
      amount: 999,
      totalCount: 60,
    },
    annual: {
      planId: process.env.RAZORPAY_TEAMS_ANNUAL_PLAN_ID || '',
      amount: 7999,
      totalCount: 10,
    },
  },
};

export function getRazorpayClient() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay keys are missing');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export function getPlanConfig(plan: string, billingCycle: string): PlanConfig {
  if (!['pro', 'teams'].includes(plan)) {
    throw new Error('Unsupported plan');
  }

  if (!['monthly', 'annual'].includes(billingCycle)) {
    throw new Error('Unsupported billing cycle');
  }

  const config = PLAN_CONFIGS[plan as PlanName][billingCycle as BillingCycle];

  if (!config.planId) {
    throw new Error(`Missing Razorpay plan ID for ${plan} ${billingCycle}`);
  }

  return {
    ...config,
    billingCycle: billingCycle as BillingCycle,
  };
}

export function verifySubscriptionSignature({
  paymentId,
  subscriptionId,
  signature,
}: {
  paymentId: string;
  subscriptionId: string;
  signature: string;
}) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error('RAZORPAY_KEY_SECRET is not set');
  }

  const payload = `${paymentId}|${subscriptionId}`;
  return crypto.createHmac('sha256', keySecret).update(payload).digest('hex') === signature;
}

export function toDateFromUnixTimestamp(timestamp?: number | null) {
  if (!timestamp) {
    return null;
  }

  return new Date(timestamp * 1000);
}

export function mapSubscriptionStatus(status?: string) {
  switch (status) {
    case 'active':
    case 'authenticated':
    case 'pending':
      return 'active';
    case 'halted':
    case 'cancelled':
    case 'completed':
    case 'expired':
      return 'inactive';
    default:
      return status || 'unknown';
  }
}
