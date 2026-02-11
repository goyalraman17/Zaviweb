import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
    try {
        const { amount, currency } = await request.json();

        const options = {
            amount: amount.toString(),
            currency: currency,
            receipt: 'rcpt_' + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Error creating order' },
            { status: 500 }
        );
    }
}
