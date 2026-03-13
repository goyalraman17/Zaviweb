import { NextRequest, NextResponse } from 'next/server';
import { getPlanConfig, getRazorpayClient } from '@/lib/razorpay';


export async function POST(request: NextRequest) {
    try {
        const { plan, billingCycle, email } = await request.json();

        const razorpay = getRazorpayClient();
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
