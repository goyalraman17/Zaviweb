import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminAuth } from '@/lib/firebase-admin';
import { getPlanConfig, getRazorpayClient } from '@/lib/razorpay';

const F6S_OFFER_AMOUNT = 1199;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { plan, billingCycle, email, source, firebase_id_token } = req.body;

    const razorpay = getRazorpayClient();
    const normalizedEmail = email?.toLowerCase?.().trim?.() || '';
    let uid = '';

    if (firebase_id_token) {
      let decodedToken;
      try {
        decodedToken = await getAdminAuth().verifyIdToken(firebase_id_token);
      } catch {
        return res
          .status(401)
          .json({ error: 'Your sign-in session expired. Please sign in again and retry checkout.' });
      }

      uid = decodedToken.uid;

      if (normalizedEmail && decodedToken.email?.toLowerCase?.() !== normalizedEmail) {
        return res
          .status(400)
          .json({ error: 'Signed-in account email does not match the checkout email.' });
      }
    }

    if (source === 'f6s') {
      const order = await razorpay.orders.create({
        amount: F6S_OFFER_AMOUNT,
        currency: 'USD',
        receipt: `f6s_${Date.now()}`,
        notes: {
          email: normalizedEmail,
          uid,
          plan: 'pro',
          billingCycle: 'quarterly',
          source: 'f6s',
        },
      });

      return res.status(200).json({
        orderId: order.id,
        amount: F6S_OFFER_AMOUNT,
        currency: 'USD',
        source: 'f6s',
      });
    }

    const planConfig = getPlanConfig(plan, billingCycle);

    const subscription = await razorpay.subscriptions.create({
      plan_id: planConfig.planId,
      total_count: planConfig.totalCount,
      quantity: 1,
      customer_notify: 1,
      notes: {
        email: normalizedEmail,
        uid,
        plan,
        billingCycle,
      },
    });

    return res.status(200).json({
      subscriptionId: subscription.id,
      amount: planConfig.amount,
      billingCycle: planConfig.billingCycle,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res
      .status(500)
      .json({ error: error instanceof Error ? error.message : 'Error creating subscription' });
  }
}
