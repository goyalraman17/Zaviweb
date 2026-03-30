import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import {
  getRazorpayClient,
  mapSubscriptionStatus,
  toDateFromUnixTimestamp,
  verifyOrderSignature,
  verifySubscriptionSignature,
  type RazorpaySubscriptionEntity,
} from '@/lib/razorpay';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_order_id,
      razorpay_signature,
      email,
      plan,
      billingCycle,
      tier,
      source,
      firebase_id_token,
    } = req.body;

    if (!razorpay_payment_id || !razorpay_signature || !email || !(billingCycle || plan)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const selectedBillingCycle = billingCycle || plan;
    const selectedTier = tier || (['pro', 'teams', 'f6s'].includes(plan) ? plan : 'pro');
    const selectedSource = source || (selectedTier === 'f6s' ? 'f6s' : null);

    if (!['monthly', 'annual', 'quarterly'].includes(selectedBillingCycle)) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    if (selectedSource === 'f6s') {
      if (!razorpay_order_id) {
        return res.status(400).json({ error: 'Missing order ID' });
      }

      if (
        !verifyOrderSignature({
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        })
      ) {
        console.error('Razorpay order signature verification failed');
        return res.status(400).json({ error: 'Payment verification failed' });
      }
    } else {
      if (!razorpay_subscription_id) {
        return res.status(400).json({ error: 'Missing subscription ID' });
      }

      if (
        !verifySubscriptionSignature({
          paymentId: razorpay_payment_id,
          subscriptionId: razorpay_subscription_id,
          signature: razorpay_signature,
        })
      ) {
        console.error('Razorpay signature verification failed');
        return res.status(400).json({ error: 'Payment verification failed' });
      }
    }

    const normalizedEmail = email.toLowerCase().trim();
    let uid = '';

    if (firebase_id_token) {
      let decodedToken;
      try {
        decodedToken = await getAdminAuth().verifyIdToken(firebase_id_token);
      } catch {
        return res.status(401).json({
          error: 'Your sign-in session expired. Please sign in again and retry activation.',
        });
      }

      uid = decodedToken.uid;

      if (decodedToken.email?.toLowerCase?.() !== normalizedEmail) {
        return res
          .status(400)
          .json({ error: 'Signed-in account email does not match the checkout email.' });
      }

      console.log(`Using Firebase ID token uid ${uid} for email: ${normalizedEmail}`);
    } else {
      try {
        const userRecord = await getAdminAuth().getUserByEmail(normalizedEmail);
        uid = userRecord.uid;
        console.log(`Found Firebase Auth user: ${uid} for email: ${normalizedEmail}`);
      } catch (authError: any) {
        if (authError.code === 'auth/user-not-found') {
          console.error(`No Firebase Auth user found for email: ${normalizedEmail}`);
          return res.status(404).json({
            error:
              'No account found with this email. Please use the email you signed up with in the Zavi app.',
          });
        }
        throw authError;
      }
    }

    const adminDb = getAdminDb();
    const now = new Date();
    let subscription: RazorpaySubscriptionEntity | null = null;
    let expiresAt = now;

    if (selectedSource === 'f6s') {
      expiresAt = new Date(now);
      expiresAt.setDate(expiresAt.getDate() + 90);
    } else {
      const razorpay = getRazorpayClient();
      subscription = (await razorpay.subscriptions.fetch(
        razorpay_subscription_id
      )) as RazorpaySubscriptionEntity;

      expiresAt =
        toDateFromUnixTimestamp(subscription.current_end) ||
        toDateFromUnixTimestamp(subscription.charge_at) ||
        toDateFromUnixTimestamp(subscription.start_at) ||
        now;
    }

    const userDocRef = adminDb.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    const subscriptionData = {
      subscription_tier: selectedTier === 'f6s' ? 'pro' : selectedTier,
      subscription_billing_cycle: selectedBillingCycle,
      subscription_source: selectedSource,
      subscription_status:
        selectedSource === 'f6s' ? 'active' : mapSubscriptionStatus(subscription?.status),
      subscription_expires_at: expiresAt,
      razorpay_payment_id,
      razorpay_order_id: razorpay_order_id || null,
      razorpay_subscription_id: razorpay_subscription_id || null,
      razorpay_subscription_status:
        selectedSource === 'f6s' ? 'one_time_pass' : subscription?.status || 'unknown',
      razorpay_subscription_plan_id: subscription?.plan_id || null,
      razorpay_subscription_current_end: toDateFromUnixTimestamp(subscription?.current_end),
      razorpay_subscription_current_start: toDateFromUnixTimestamp(subscription?.current_start),
      updated_at: now,
    };

    if (userDoc.exists) {
      await userDocRef.update(subscriptionData);
    } else {
      await userDocRef.set({
        ...subscriptionData,
        created_at: now,
      });
    }

    console.log(
      `Updated user ${uid} to ${selectedTier} (${selectedSource || 'standard'}) expires ${expiresAt.toISOString()}`
    );

    return res.status(200).json({
      success: true,
      message:
        selectedSource === 'f6s'
          ? 'Payment verified and 3-month pass activated'
          : 'Payment verified and subscription activated',
      plan: selectedTier,
      billingCycle: selectedBillingCycle,
      source: selectedSource,
      subscriptionId: razorpay_subscription_id || null,
      subscriptionStatus:
        selectedSource === 'f6s' ? 'active' : subscription?.status || 'unknown',
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ error: 'Payment verification failed' });
  }
}
