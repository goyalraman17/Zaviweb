'use client';

import Script from 'next/script';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';
import { analytics } from '@/lib/analytics';
import GlowCard from './animated/GlowCard';

export default function PricingNew() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isAndroid, setIsAndroid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Track pricing page view and detect OS
  useEffect(() => {
    analytics.track('pricing_view');
    if (typeof window !== 'undefined') {
      setIsAndroid(window.navigator.userAgent.toLowerCase().includes('android'));
    }
  }, []);

  const handlePayment = async (plan: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      let amount = 0;
      if (plan === 'pro') {
        amount = billingCycle === 'monthly' ? 799 : 4999; // $7.99 or $49.99
      } else if (plan === 'teams') {
        amount = billingCycle === 'monthly' ? 999 : 7999; // $9.99 or $79.99
      } else if (plan === 'enterprise') {
        // Enterprise usually contacts sales
        window.location.href = 'mailto:sales@zavivoice.com';
        return;
      }

      if (amount === 0) return;

      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'USD',
        }),
      });

      const data = await response.json();

      if (!data.orderId) {
        throw new Error('Order creation failed');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: 'USD',
        name: 'Zavi AI',
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan - ${billingCycle}`,
        order_id: data.orderId,
        handler: function (response: any) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
          // TODO: Verify signature and update user subscription
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#2563EB'
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlanAction = (plan: string) => {
    analytics.track('pricing_plan_click', {
      plan,
      billing_cycle: billingCycle,
      is_android: isAndroid
    });

    if (isAndroid) {
      window.open('https://play.google.com/store/apps/details?id=com.pingpros.keyboard', '_blank');
    } else {
      handlePayment(plan);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <section
        id="pricing"
        className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-zavi-blue-50/50 via-white to-white"
        data-section="pricing"
      >
        <div className="container-large relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerSlow}
          >
            {/* Header */}
            <motion.div className="text-center mb-12" variants={fadeUpLarge}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4">
                Choose Your Plan. Start Writing Faster Today.
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Experience the 5-star voice keyboard that's replacing the traditional typing experience.
              </p>

              {/* Trust Pill Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-zavi-blue-50 border border-zavi-blue-200 rounded-full text-sm font-semibold text-zavi-blue-700 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Trusted Worldwide
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-semibold text-green-700 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cancel Anytime
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-zavi-blue-50 border border-zavi-blue-200 rounded-full text-sm font-semibold text-zavi-blue-700 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  No Card Required
                </span>
              </div>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-1 p-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-md">
                <button
                  onClick={() => {
                    setBillingCycle('monthly');
                    analytics.track('pricing_toggle_billing', { cycle: 'monthly' });
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-zavi-blue-500 to-zavi-blue-400 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => {
                    setBillingCycle('annual');
                    analytics.track('pricing_toggle_billing', { cycle: 'annual' });
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-zavi-blue-500 to-zavi-blue-400 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Annual (2 months free)
                </button>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12"
              variants={staggerContainerSlow}
            >

              {/* Free Plan */}
              <motion.div variants={fadeUp}>
                <GlowCard glowColor="rgba(200, 200, 200, 0.4)" className="relative rounded-3xl p-8 bg-white border border-gray-200 shadow-lg h-full flex flex-col">
                  <h3 className="text-3xl font-bold text-[#1a1a1a] mb-1">Free</h3>
                  <p className="text-sm font-semibold text-gray-500 mb-2">Forever free</p>

                  <div className="mb-6">
                    <div className="text-4xl font-bold text-[#1a1a1a]">$0</div>
                    <div className="text-gray-600 text-sm">/ month</div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">1,000 Words Per Day</span>
                        <span className="block text-sm text-gray-600">Daily word limit, type anywhere by voice</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Magic Wand</span>
                        <span className="block text-sm text-gray-600">Edit, rewrite, or transform any text by voice</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Voice Commands</span>
                        <span className="block text-sm text-gray-600">Send emails, messages, and more — hands free</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">All Superpowers</span>
                        <span className="block text-sm text-gray-600">Gmail, Slack, Notion, GitHub, and more connectors</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Translate</span>
                        <span className="block text-sm text-gray-600">Speak in one language, type in another</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Priority Processing</span>
                        <span className="block text-sm text-gray-600">Fastest transcription with AI enhancement</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Tone & Emoji</span>
                        <span className="block text-sm text-gray-600">Casual, formal, or fun — your voice, your style</span>
                      </div>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                      if (typeof analytics !== 'undefined') {
                        analytics.track('pricing_plan_click', { plan: 'free', billing_cycle: billingCycle, is_android: isAndroid });
                      }
                    }}
                    className="w-full px-6 py-4 rounded-full font-semibold text-center bg-gray-100 text-zavi-blue-700 hover:bg-gray-200 transition-all mt-auto"
                  >
                    Get Started Free
                  </button>
                </GlowCard>
              </motion.div>

              {/* Pro Plan - Most Popular */}
              <motion.div variants={fadeUp}>
                <GlowCard glowColor="rgba(37, 99, 235, 0.6)" className="h-full">
                  <div className="relative rounded-3xl p-8 shadow-2xl transform md:scale-105 h-full" style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                  }}>
                    {/* Most Popular Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white text-zavi-blue-700 text-sm font-bold rounded-full shadow-lg">
                      Most Popular
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-1">Pro</h3>
                    <p className="text-sm font-semibold text-white/90 mb-2">Recommended for: Daily communicators</p>
                    <p className="text-white/80 mb-4">Write at the speed of thought</p>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-white">
                        ${billingCycle === 'monthly' ? '7.99' : '49.99'}
                      </div>
                      <div className="text-white/80 text-sm">
                        {billingCycle === 'monthly' ? 'per month' : 'per year'}
                      </div>
                      {billingCycle === 'annual' && (
                        <div className="text-white/70 text-xs mt-1">
                          Save $46 compared to monthly
                        </div>
                      )}
                    </div>

                    {/* Save Time Badge */}
                    <div className="bg-[#E6C15A] text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg mb-6">
                      Save 30+ minutes per day
                    </div>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <span className="block font-semibold text-white">Unlimited Voice Typing</span>
                          <span className="block text-sm text-white/80">No daily word limits, type anywhere by voice</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <span className="block font-semibold text-white">Magic Wand</span>
                          <span className="block text-sm text-white/80">Edit, rewrite, or transform any text by voice</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <span className="block font-semibold text-white">Voice Commands</span>
                          <span className="block text-sm text-white/80">Send emails, messages, and more — hands free</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <span className="block font-semibold text-white">All Superpowers</span>
                          <span className="block text-sm text-white/80">Gmail, Slack, Notion, GitHub, and more connectors</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <span className="block font-semibold text-white">Translate</span>
                          <span className="block text-sm text-white/80">Speak in one language, type in another</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <span className="block font-semibold text-white">Priority Processing</span>
                          <span className="block text-sm text-white/80">Fastest transcription with AI enhancement</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                          <span className="block font-semibold text-white">Tone & Emoji</span>
                          <span className="block text-sm text-white/80">Casual, formal, or fun — your voice, your style</span>
                        </div>
                      </li>
                    </ul>

                    <motion.button
                      onClick={() => handlePlanAction('pro')}
                      className="w-full px-6 py-4 rounded-full font-semibold text-center bg-white text-zavi-blue-700 shadow-lg hover:bg-gray-50 transition-all mb-3"
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      variants={ctaPrimary}
                    >
                      {isAndroid ? 'Start Pro Subscription' : 'Get Pro Access'}
                    </motion.button>


                  </div>
                </GlowCard>
              </motion.div>

              {/* Teams Plan */}
              <motion.div variants={fadeUp}>
                <GlowCard glowColor="rgba(37, 99, 235, 0.4)" className="relative rounded-3xl p-8 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg h-full">
                  <h3 className="text-3xl font-bold text-[#1a1a1a] mb-1">Teams</h3>
                  <p className="text-sm font-semibold text-zavi-blue mb-2">Recommended for: Growing companies</p>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-[#1a1a1a]">
                      ${billingCycle === 'monthly' ? '9.99' : '79.99'}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {billingCycle === 'monthly' ? 'per seat / month' : 'per seat / year'}
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="text-gray-600 text-xs mt-1">
                        Save $40 per seat compared to monthly
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">Communicate faster as a team</p>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Unlimited Voice Typing</span>
                        <span className="block text-sm text-gray-600">No daily word limits for any team member</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Everything in Pro</span>
                        <span className="block text-sm text-gray-600">All Superpowers, Magic Wand, & Commands</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Brand Voice</span>
                        <span className="block text-sm text-gray-600">Stay consistent across all team messages</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Productivity Analytics</span>
                        <span className="block text-sm text-gray-600">Track and measure team time savings</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Centralized Admin</span>
                        <span className="block text-sm text-gray-600">Simple user management and unified billing</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <span className="block font-semibold text-gray-900">Priority Support</span>
                        <span className="block text-sm text-gray-600">Get dedicated help when your team needs it</span>
                      </div>
                    </li>
                  </ul>

                  <motion.button
                    onClick={() => handlePlanAction('teams')}
                    className="block w-full px-6 py-4 rounded-full font-semibold text-center text-gray-900 bg-white border-2 border-gray-300 shadow-md hover:border-zavi-blue-500 hover:bg-gray-50 transition-all mb-3"
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    variants={ctaPrimary}
                  >
                    {isAndroid ? 'Start with 3 Users' : 'Get Team Access'}
                  </motion.button>

                  <p className="text-center text-gray-600 text-sm">Billed annually · Volume discounts available</p>
                </GlowCard>
              </motion.div>
            </motion.div>

            {/* Footnote */}
            <div className="text-center mb-16">
              <p className="text-gray-500 text-sm">* Subject to fair usage policy. See <a href="/terms" className="underline hover:text-gray-700">Terms and Conditions</a>.</p>
            </div>

            {/* Enterprise Section */}
            <motion.div
              className="max-w-5xl mx-auto rounded-3xl p-12 text-center shadow-xl mb-16"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              }}
              variants={fadeUp}
            >
              <h3 className="text-3xl font-bold text-white mb-4">Enterprise-grade voice writing</h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Custom integrations, security reviews, dedicated support, and organization-wide rollout.
              </p>
              <motion.button
                onClick={() => handlePlanAction('enterprise')}
                className="inline-flex px-10 py-4 rounded-full font-semibold bg-white text-zavi-blue-700 shadow-lg hover:bg-gray-50 transition-all border-none outline-none"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Talk to Sales
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-16">
          <p className="text-2xl md:text-3xl text-[#1a1a1a] font-medium">
            Stop typing. <span className="font-bold">Start speaking.</span> Writing faster is one click away.
          </p>
        </div>
      </section >
    </>
  );
}
