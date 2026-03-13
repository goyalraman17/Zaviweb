import { NextRequest, NextResponse } from 'next/server';
import { getPlanConfig, getRazorpayClient } from '@/lib/razorpay';

const F6S_OFFER_AMOUNT = 1199;

export async function POST(request: NextRequest) {
    try {
        const { plan, billingCycle, email, source } = await request.json();

        const razorpay = getRazorpayClient();

        if (source === 'f6s') {
            const order = await razorpay.orders.create({
                amount: F6S_OFFER_AMOUNT,
                currency: 'USD',
                receipt: `f6s_${Date.now()}`,
                notes: {
                    email: email?.toLowerCase?.().trim?.() || '',
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
                email: email?.toLowerCase?.().trim?.() || '',
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
