import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            email,
            plan,
        } = await request.json();

        // Validate required fields
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
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

        // Step 1: Verify Razorpay signature
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) {
            console.error('RAZORPAY_KEY_SECRET is not set');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
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

        // Step 3: Update the user's Firestore doc at users/{uid}
        const now = new Date();
        const expiresAt = new Date(now);
        if (plan === 'monthly') {
            expiresAt.setDate(expiresAt.getDate() + 30);
        } else {
            expiresAt.setDate(expiresAt.getDate() + 365);
        }

        const userDocRef = adminDb.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
            // Update existing user doc
            await userDocRef.update({
                subscription_tier: plan,
                subscription_expires_at: expiresAt,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
                updated_at: now,
            });
        } else {
            // Create new user doc (edge case: Auth user exists but no Firestore doc yet)
            await userDocRef.set({
                subscription_tier: plan,
                subscription_expires_at: expiresAt,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
                created_at: now,
                updated_at: now,
            });
        }

        console.log(
            `Updated user ${uid} to ${plan} plan, expires ${expiresAt.toISOString()}`
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Payment verified and subscription activated',
                plan,
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
