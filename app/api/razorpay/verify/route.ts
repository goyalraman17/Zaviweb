import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import {
    getRazorpayClient,
    mapSubscriptionStatus,
    toDateFromUnixTimestamp,
    verifySubscriptionSignature,
    type RazorpaySubscriptionEntity,
} from '@/lib/razorpay';

export async function POST(request: NextRequest) {
    try {
        const adminAuth = getAdminAuth();
        const adminDb = getAdminDb();
        const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
            email,
            plan,
        } = await request.json();

        // Validate required fields
        if (
            !razorpay_payment_id ||
            !razorpay_subscription_id ||
            !razorpay_signature ||
            !email ||
            !plan
        ) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!['monthly', 'annual'].includes(plan)) {
            return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
        }

        if (!verifySubscriptionSignature({
            paymentId: razorpay_payment_id,
            subscriptionId: razorpay_subscription_id,
            signature: razorpay_signature,
        })) {
            console.error('Razorpay signature verification failed');
            return NextResponse.json(
                { error: 'Payment verification failed' },
                { status: 400 }
            );
        }

        // Step 2: Look up Firebase Auth user by email to get their UID
        const normalizedEmail = email.toLowerCase().trim();
        let uid: string;

        try {
            const userRecord = await adminAuth.getUserByEmail(normalizedEmail);
            uid = userRecord.uid;
            console.log(`Found Firebase Auth user: ${uid} for email: ${normalizedEmail}`);
        } catch (authError: any) {
            if (authError.code === 'auth/user-not-found') {
                console.error(`No Firebase Auth user found for email: ${normalizedEmail}`);
                return NextResponse.json(
                    { error: 'No account found with this email. Please use the email you signed up with in the Zavi app.' },
                    { status: 404 }
                );
            }
            throw authError;
        }

        const razorpay = getRazorpayClient();
        const subscription = await razorpay.subscriptions.fetch(
            razorpay_subscription_id
        ) as RazorpaySubscriptionEntity;

        const now = new Date();
        const expiresAt =
            toDateFromUnixTimestamp(subscription.current_end) ||
            toDateFromUnixTimestamp(subscription.charge_at) ||
            toDateFromUnixTimestamp(subscription.start_at) ||
            now;

        const userDocRef = adminDb.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        const subscriptionData = {
            subscription_tier: plan,
            subscription_status: mapSubscriptionStatus(subscription.status),
            subscription_expires_at: expiresAt,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_subscription_id: razorpay_subscription_id,
            razorpay_subscription_status: subscription.status || 'unknown',
            razorpay_subscription_plan_id: subscription.plan_id || null,
            razorpay_subscription_current_end: toDateFromUnixTimestamp(subscription.current_end),
            razorpay_subscription_current_start: toDateFromUnixTimestamp(subscription.current_start),
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
            `Updated user ${uid} to ${plan} subscription ${razorpay_subscription_id}, expires ${expiresAt.toISOString()}`
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Payment verified and subscription activated',
                plan,
                subscriptionId: razorpay_subscription_id,
                subscriptionStatus: subscription.status || 'unknown',
                expiresAt: expiresAt.toISOString(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
