import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import {
  getRazorpayClient,
  mapSubscriptionStatus,
  toDateFromUnixTimestamp,
  type RazorpaySubscriptionEntity,
} from '@/lib/razorpay';

function verifyWebhookSignature(body: string, signature: string | null) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) {
    return false;
  }

  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return expected === signature;
}

function getSubscriptionId(payload: any) {
  return (
    payload?.payload?.subscription?.entity?.id ||
    payload?.payload?.payment?.entity?.notes?.subscription_id ||
    payload?.payload?.payment?.entity?.subscription_id ||
    null
  );
}

function getPaymentId(payload: any) {
  return payload?.payload?.payment?.entity?.id || null;
}

function getEmail(payload: any, subscription: RazorpaySubscriptionEntity) {
  return (
    payload?.payload?.subscription?.entity?.notes?.email ||
    payload?.payload?.payment?.entity?.email ||
    payload?.payload?.payment?.entity?.notes?.email ||
    subscription.notes?.email ||
    null
  );
}

function getPlan(payload: any, subscription: RazorpaySubscriptionEntity) {
  return (
    payload?.payload?.subscription?.entity?.notes?.plan ||
    payload?.payload?.payment?.entity?.notes?.plan ||
    subscription.notes?.plan ||
    null
  );
}

function getBillingCycle(payload: any, subscription: RazorpaySubscriptionEntity) {
  return (
    payload?.payload?.subscription?.entity?.notes?.billingCycle ||
    payload?.payload?.payment?.entity?.notes?.billingCycle ||
    subscription.notes?.billingCycle ||
    null
  );
}

export async function POST(request: NextRequest) {
  try {
    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const subscriptionId = getSubscriptionId(payload);

    if (!subscriptionId) {
      return NextResponse.json({ ok: true, skipped: 'No subscription ID in payload' });
    }

    const razorpay = getRazorpayClient();
    const subscription = await razorpay.subscriptions.fetch(
      subscriptionId
    ) as RazorpaySubscriptionEntity;

    const email = getEmail(payload, subscription);
    if (!email) {
      return NextResponse.json({ ok: true, skipped: 'No email for subscription sync' });
    }

    const userRecord = await adminAuth.getUserByEmail(email.toLowerCase().trim());
    const userDocRef = adminDb.collection('users').doc(userRecord.uid);
    const now = new Date();
    const expiresAt =
      toDateFromUnixTimestamp(subscription.current_end) ||
      toDateFromUnixTimestamp(subscription.ended_at) ||
      now;
    const paymentId = getPaymentId(payload);
    const plan = getPlan(payload, subscription);
    const billingCycle = getBillingCycle(payload, subscription);

    await userDocRef.set(
      {
        subscription_tier: plan === 'f6s' ? 'pro' : plan,
        subscription_billing_cycle: billingCycle,
        subscription_source: plan,
        subscription_status: mapSubscriptionStatus(subscription.status),
        subscription_expires_at: expiresAt,
        razorpay_payment_id: paymentId,
        razorpay_subscription_id: subscription.id,
        razorpay_subscription_status: subscription.status || 'unknown',
        razorpay_subscription_plan_id: subscription.plan_id || null,
        razorpay_subscription_current_end: toDateFromUnixTimestamp(subscription.current_end),
        razorpay_subscription_current_start: toDateFromUnixTimestamp(subscription.current_start),
        updated_at: now,
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error?.code === 'auth/user-not-found') {
      return NextResponse.json({ ok: true, skipped: 'No matching Firebase user' });
    }

    console.error('Razorpay webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
