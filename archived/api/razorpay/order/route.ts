import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase-admin';
import { getPlanConfig, getRazorpayClient } from '@/lib/razorpay';

const F6S_OFFER_AMOUNT = 1199;

export async function POST(request: NextRequest) {
    try {
        const { plan, billingCycle, email, source, firebase_id_token } = await request.json();

        const razorpay = getRazorpayClient();
        const normalizedEmail = email?.toLowerCase?.().trim?.() || '';
        let uid = '';

        if (firebase_id_token) {
            let decodedToken;
            try {
                decodedToken = await getAdminAuth().verifyIdToken(firebase_id_token);
            } catch {
                return NextResponse.json(
                    { error: 'Your sign-in session expired. Please sign in again and retry checkout.' },
                    { status: 401 }
                );
            }

            uid = decodedToken.uid;

            if (normalizedEmail && decodedToken.email?.toLowerCase?.() !== normalizedEmail) {
                return NextResponse.json(
                    { error: 'Signed-in account email does not match the checkout email.' },
                    { status: 400 }
                );
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

            return NextResponse.json(
                {
                    orderId: order.id,
                    amount: F6S_OFFER_AMOUNT,
                    currency: 'USD',
                    source: 'f6s',
                },
                { status: 200 }
            );
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

        return NextResponse.json(
            {
                subscriptionId: subscription.id,
                amount: planConfig.amount,
                billingCycle: planConfig.billingCycle,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating subscription:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Error creating subscription' },
            { status: 500 }
        );
    }
}
