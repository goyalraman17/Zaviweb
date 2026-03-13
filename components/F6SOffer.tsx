'use client';

import Script from 'next/script';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { analytics } from '@/lib/analytics';
import { getOptionalPaymentSession } from '@/lib/firebase-client-auth';

const OFFER_PRICE = 11.99;
const FULL_PRICE = 23.97;
const OFFER_DEADLINE = 'Limited partner offer for the current F6S campaign';

const audienceCards = [
  {
    title: 'Founders',
    body: 'Send faster investor updates, hiring messages, and founder outreach without getting stuck in draft mode.',
  },
  {
    title: 'Operators',
    body: 'Move through docs, Slack, Notion, CRM notes, and internal comms with less typing and less context switching.',
  },
  {
    title: 'Investors',
    body: 'Write cleaner outreach, memos, and founder follow-ups while staying fast across every app you already use.',
  },
];

const proofPoints = [
  'Type into email, docs, forms, chat, and every major desktop or mobile app',
  'Rewrite rough dictation into polished business writing instantly',
  'Use voice commands, cleanup, and translation without app switching',
  'Keep full Pro access for 3 months with one payment and no auto-renewal',
];

const faqItems = [
  {
    question: 'What exactly do I get with this F6S offer?',
    answer:
      'You get full Zavi Pro access for 3 months at a one-time discounted price of $11.99. This includes unlimited voice typing, AI cleanup, rewrite tools, translation, commands, and all current Pro features.',
  },
  {
    question: 'Will this renew automatically?',
    answer:
      'No. This F6S offer is a one-time payment. When the 3 months end, your Pro access ends and you can choose whether to buy again from the website.',
  },
  {
    question: 'Do I need to use my Zavi account email?',
    answer:
      'Yes. Use the same email you use in Zavi so we can activate Pro on the correct account as soon as payment is verified.',
  },
  {
    question: 'Why is this page different from the main pricing page?',
    answer:
      'This is a dedicated partner offer for the F6S audience. It is intentionally built to be simple: one offer, one checkout, one clear outcome.',
  },
];

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

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_42%,#ffffff_75%)] pt-20 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.08),transparent_45%,rgba(245,158,11,0.08))]" />
        <div className="absolute left-[-12%] top-20 h-64 w-64 rounded-full bg-amber-200/25 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute right-[-10%] top-12 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl sm:h-96 sm:w-96" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
            <div>
              <div className="mb-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm sm:mb-5 sm:px-4 sm:text-sm">
                <span>Exclusive F6S Member Offer</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>{OFFER_DEADLINE}</span>
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Turn more thoughts into finished work.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:mt-5 sm:text-lg sm:leading-8 xl:text-xl">
                Zavi helps you speak naturally and get polished writing across email, docs, chat, forms, and daily workflows.
                This F6S partner offer gives you 3 months of full Pro access at 50% off, with one payment, no auto-renewal, and no extra decisions to make later.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700 sm:mt-8 sm:gap-3 sm:text-sm">
                <div className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4">
                  Unlimited voice typing
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4">
                  AI cleanup and rewrite
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4">
                  Works across every app
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4">
                  Secure Razorpay checkout
                </div>
              </div>

              <div className="mt-8 grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white/85 p-4 shadow-sm sm:grid-cols-3 sm:p-5">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">For speed</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">Get to a sendable first draft faster instead of losing momentum to typing and cleanup.</p>
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">For quality</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">Improve clarity, tone, and structure instantly while still sounding like you.</p>
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">For momentum</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">Stay inside the tools you already use instead of slowing down to manually type every message.</p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-3">
                {[
                  ['3 months', 'full Pro access'],
                  ['50% off', 'exclusive F6S rate'],
                  ['$11.99', 'one-time payment today'],
                ].map(([value, label]) => (
                  <div key={value} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm sm:rounded-3xl sm:p-5">
                    <div className="text-2xl font-black text-slate-950 sm:text-3xl">{value}</div>
                    <div className="mt-1 text-sm text-slate-600">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-blue-100/60 sm:mt-10 sm:rounded-[2rem] sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 sm:gap-3 sm:text-sm">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Partner promo</span>
                  <span>Regular price: ${FULL_PRICE.toFixed(2)}</span>
                </div>
                <div className="mt-4 flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4">
                  <div className="text-5xl font-black text-slate-950 sm:text-6xl">${OFFER_PRICE.toFixed(2)}</div>
                  <div className="text-base text-slate-600 sm:pb-2 sm:text-lg">for 3 months of Pro</div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                  This is a one-time F6S payment for 3 months of Pro access. It does not
                  auto-renew. You get the discount now, full access immediately after activation, and the freedom to decide later whether you want more.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {audienceCards.map((card) => (
                  <div key={card.title} className="rounded-[1.6rem] border border-slate-200 bg-slate-950 px-5 py-5 text-white shadow-lg shadow-slate-300/20">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">{card.title}</div>
                    <p className="mt-3 text-sm leading-6 text-slate-200">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 p-1 shadow-2xl shadow-blue-200/60 sm:rounded-[2rem]"
            >
              <div className="rounded-[1.55rem] bg-white p-5 sm:rounded-[1.85rem] sm:p-8">
                <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 sm:text-sm sm:tracking-[0.22em]">
                      F6S special pricing
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                      Claim your F6S Pro offer
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                      Best for people who write constantly and want less friction across the whole workday.
                    </p>
                  </div>
                  <div className="w-full rounded-2xl bg-amber-100 px-4 py-3 text-left sm:w-auto sm:text-right">
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
                  className={`w-full rounded-2xl border-2 px-4 py-3.5 text-base text-slate-950 outline-none transition sm:py-4 sm:text-lg ${
                    emailError
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {emailError && <p className="mt-2 text-sm font-medium text-red-500">{emailError}</p>}

                <div className="mt-6 rounded-3xl bg-slate-50 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        What you unlock
                      </div>
                      <ul className="mt-3 space-y-3 text-sm text-slate-700">
                        {proofPoints.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-white p-4 text-left shadow-sm sm:min-w-[120px] sm:text-right">
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
                  className="mt-6 w-full rounded-2xl bg-[linear-gradient(135deg,#2563eb,#1d4ed8_45%,#0f172a)] px-5 py-4 text-base font-bold text-white shadow-lg shadow-blue-300 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70 sm:px-6 sm:text-lg"
                >
                  {isProcessing ? 'Starting secure checkout...' : 'Start My 3-Month Pro Offer'}
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
                      again if you want to continue. Nothing renews automatically.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm font-semibold text-slate-950">Why people buy</div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      They want less typing, faster turnaround, and cleaner writing across the tools where work already happens.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-4 text-sm leading-6 text-slate-700">
                  <span className="font-semibold text-slate-950">Simple promise:</span> one payment, 3 months of Pro,
                  no surprise renewal, and activation tied to your Zavi account email.
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Why teams adopt Zavi</div>
              <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                It removes the slowest part of everyday communication.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Most people already know what they want to say. The bottleneck is typing, editing,
                and rewriting it everywhere. Zavi closes that gap by letting you speak naturally and
                turn that into polished output inside the apps where work already happens.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-700">
                For an F6S audience, that usually means faster founder updates, stronger outreach,
                cleaner operating notes, faster follow-ups, and more output without adding more tools.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/25">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Frequently asked</div>
              <div className="mt-5 space-y-4">
                {faqItems.map((item) => (
                  <div key={item.question} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                    <div className="text-base font-semibold text-white">{item.question}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowResultModal(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] bg-white shadow-2xl sm:rounded-[2rem]">
            <div className={`h-2 ${resultType === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-black text-slate-950 sm:text-2xl">
                {resultType === 'success' ? 'Offer activated' : 'We hit a snag'}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{resultMessage}</p>
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
