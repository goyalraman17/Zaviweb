'use client';

import Script from 'next/script';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { analytics } from '@/lib/analytics';
import { getOptionalPaymentSession } from '@/lib/firebase-client-auth';

const OFFER_PRICE = 11.99;
const FULL_PRICE = 23.97;

export default function F6SOffer() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutScriptReady, setCheckoutScriptReady] = useState(false);
  const [resultType, setResultType] = useState<'success' | 'error'>('success');
  const [resultMessage, setResultMessage] = useState('');
  const [resultPaymentId, setResultPaymentId] = useState('');
  const [showResultModal, setShowResultModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  const startCheckout = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setEmailError('Enter the same email you use for your Zavi account.');
      emailInputRef.current?.focus();
      return;
    }

    if (!checkoutScriptReady || !(window as any).Razorpay) {
      setResultType('error');
      setResultMessage('Checkout is still loading. Please try again in a moment.');
      setResultPaymentId('');
      setShowResultModal(true);
      return;
    }

    if (isProcessing) return;

    setEmailError('');
    setIsProcessing(true);
    setPaymentStep('Preparing your F6S offer...');
    try {
      const paymentSession = await getOptionalPaymentSession(trimmed);

      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'pro',
          billingCycle: 'quarterly',
          email: trimmed,
          source: 'f6s',
          firebase_id_token: paymentSession?.idToken || null,
        }),
      });

      const data = await response.json();
      if (!data.orderId) {
        throw new Error(data.error || 'Unable to create the F6S payment right now.');
      }

      setPaymentStep('Opening secure checkout...');

      const paymentObject = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.orderId,
        amount: data.amount?.toString?.() || '1199',
        currency: 'USD',
        name: 'Zavi AI',
        description: 'F6S Member Offer - 3 Months of Pro at 50% Off',
        prefill: { email: trimmed },
        theme: { color: '#2563EB' },
        notes: {
          email: trimmed,
          plan: 'pro',
          billingCycle: 'quarterly',
          source: 'f6s',
        },
        handler: async function (checkoutResponse: any) {
          try {
            setPaymentStep('Activating your 3-month Pro pass...');
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: checkoutResponse.razorpay_payment_id,
                razorpay_order_id: checkoutResponse.razorpay_order_id,
                razorpay_signature: checkoutResponse.razorpay_signature,
                email: trimmed,
                tier: 'f6s',
                billingCycle: 'quarterly',
                source: 'f6s',
                firebase_id_token: paymentSession?.idToken || null,
              }),
            });

            const result = await verifyRes.json();
            if (verifyRes.ok && result.success) {
              setResultType('success');
              setResultMessage(
                'Your F6S 3-month Pro pass is now active. Open Zavi and start writing faster.'
              );
              setResultPaymentId(
                checkoutResponse.razorpay_order_id || checkoutResponse.razorpay_payment_id
              );
              setShowResultModal(true);
              analytics.track('payment_success', {
                email: trimmed,
                payment_id: checkoutResponse.razorpay_payment_id,
                order_id: checkoutResponse.razorpay_order_id,
              });
              return;
            }

            throw new Error(result.error || 'Payment went through but activation failed.');
          } catch (error) {
            setResultType('error');
            setResultMessage(
              error instanceof Error
                ? error.message
                : 'Payment went through, but we could not activate the offer.'
            );
            setResultPaymentId(
              checkoutResponse.razorpay_order_id || checkoutResponse.razorpay_payment_id
            );
            setShowResultModal(true);
          } finally {
            setPaymentStep('');
          }
        },
      });

      paymentObject.open();
    } catch (error) {
      setResultType('error');
      setResultMessage(
        error instanceof Error ? error.message : 'Unable to start checkout right now.'
      );
      setResultPaymentId('');
      setShowResultModal(true);
      setPaymentStep('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script
        id="firebase-app-compat-f6s"
        src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"
      />
      <Script
        id="firebase-auth-compat-f6s"
        src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"
      />
      <Script
        id="razorpay-checkout-js-f6s"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setCheckoutScriptReady(true)}
        onError={() => setCheckoutScriptReady(false)}
      />

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_42%,#ffffff_75%)] pt-28 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.08),transparent_45%,rgba(245,158,11,0.08))]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                <span>Exclusive F6S Member Offer</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>Limited campaign access</span>
              </div>

              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                Get 3 months of Zavi Pro at 50% off.
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-700">
                Built for founders, operators, and investors who need to write faster across
                email, messages, docs, and outreach. This F6S offer gives you full Pro access
                for three months at half the usual price, with no automatic renewal afterward.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  Unlimited voice typing
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  AI cleanup and rewrite
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  Works across every app
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  Secure Razorpay checkout
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ['3 months', 'full Pro access'],
                  ['50% off', 'exclusive F6S rate'],
                  ['$11.99', 'one-time payment today'],
                ].map(([value, label]) => (
                  <div key={value} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                    <div className="text-3xl font-black text-slate-950">{value}</div>
                    <div className="mt-1 text-sm text-slate-600">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-blue-100/60">
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Partner promo</span>
                  <span>Regular price: ${FULL_PRICE.toFixed(2)}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-end gap-4">
                  <div className="text-6xl font-black text-slate-950">${OFFER_PRICE.toFixed(2)}</div>
                  <div className="pb-2 text-lg text-slate-600">for 3 months of Pro</div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                  This is a one-time F6S payment for 3 months of Pro access. It does not
                  auto-renew. When your access ends, you can come back and buy again from the website.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-1 shadow-2xl shadow-blue-200/60"
            >
              <div className="rounded-[1.85rem] bg-white p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                      F6S special pricing
                    </div>
                    <h2 className="mt-2 text-3xl font-black text-slate-950">
                      Claim your 3-month Pro offer
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-amber-100 px-4 py-3 text-right">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                      Save today
                    </div>
                    <div className="text-2xl font-black text-amber-950">$11.99</div>
                  </div>
                </div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Your Zavi account email
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="you@startup.com"
                  className={`w-full rounded-2xl border-2 px-4 py-4 text-lg text-slate-950 outline-none transition ${
                    emailError
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {emailError && <p className="mt-2 text-sm font-medium text-red-500">{emailError}</p>}

                <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Included in Pro
                      </div>
                      <ul className="mt-3 space-y-3 text-sm text-slate-700">
                        <li>Unlimited voice typing across apps</li>
                        <li>Magic Wand editing and rewriting</li>
                        <li>Translation, commands, and premium AI speed</li>
                        <li>Priority support and all current Pro features</li>
                      </ul>
                    </div>
                    <div className="min-w-[120px] rounded-2xl bg-white p-4 text-right shadow-sm">
                      <div className="text-sm text-slate-500 line-through">${FULL_PRICE.toFixed(2)}</div>
                      <div className="text-3xl font-black text-slate-950">${OFFER_PRICE.toFixed(2)}</div>
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                        3 months
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startCheckout}
                  disabled={isProcessing}
                  className="mt-6 w-full rounded-2xl bg-[linear-gradient(135deg,#2563eb,#1d4ed8_45%,#0f172a)] px-6 py-4 text-lg font-bold text-white shadow-lg shadow-blue-300 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isProcessing ? 'Starting secure checkout...' : 'Claim 50% Off for 3 Months'}
                </button>

                <div className="mt-4 text-center text-sm text-slate-600">
                  {paymentStep || 'Secure one-time checkout powered by Razorpay. No automatic renewal.'}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm font-semibold text-slate-950">How billing works</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      You&apos;ll be charged ${OFFER_PRICE.toFixed(2)} once today for 3 months of Pro
                      access. After that period ends, you can come back to the website and buy
                      again if you want to continue.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm font-semibold text-slate-950">Who this is for</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Startup founders, operators, and investors who want cleaner, faster writing
                      without bouncing between apps.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowResultModal(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className={`h-2 ${resultType === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <div className="p-8">
              <h3 className="text-2xl font-black text-slate-950">
                {resultType === 'success' ? 'Offer activated' : 'We hit a snag'}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{resultMessage}</p>
              {resultPaymentId && (
                <p className="mt-3 text-sm text-slate-500">Reference: {resultPaymentId}</p>
              )}
              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3.5 font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
