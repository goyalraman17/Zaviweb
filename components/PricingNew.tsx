'use client';

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

  // Track pricing page view
  useEffect(() => {
    analytics.track('pricing_view');
  }, []);

  return (
    <section
      id="pricing"
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50"
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
              Join thousands of professionals who've ditched their keyboard for Zavi.
            </p>

            {/* Trust Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-50 border border-sky-200 rounded-full text-sm font-semibold text-sky-700 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                50K+ Users
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-semibold text-green-700 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancel Anytime
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-semibold text-blue-700 shadow-sm">
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
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-md'
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
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-md'
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
              <GlowCard glowColor="rgba(37, 99, 235, 0.4)" className="relative rounded-3xl p-8 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg h-full">
              <h3 className="text-3xl font-bold text-[#1a1a1a] mb-2">Free</h3>
              <p className="text-sm font-semibold text-zavi-blue mb-2">Recommended for: Curious explorers</p>
              <div className="mb-4">
                <div className="text-4xl font-bold text-[#1a1a1a]">$0</div>
                <div className="text-gray-600 text-sm">Free forever</div>
              </div>
              <p className="text-gray-600 mb-6">Try voice-first writing risk-free</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Speak 1,500 words per week</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Sound professional without editing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Write anywhere you type</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Speak in any language</span>
                </li>
              </ul>

              <motion.button
                onClick={() => {
                  analytics.track('pricing_plan_click', {
                    plan: 'free',
                    billing_cycle: billingCycle,
                  });
                }}
                className="w-full px-6 py-4 rounded-full font-semibold text-white shadow-lg transition-all"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                }}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Start Free Forever
              </motion.button>
              </GlowCard>
            </motion.div>

            {/* Pro Plan - Most Popular */}
            <motion.div variants={fadeUp}>
              <GlowCard glowColor="rgba(37, 99, 235, 0.6)" className="h-full">
                <div className="relative rounded-3xl p-8 shadow-2xl transform scale-105 h-full" style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                }}>
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white text-blue-700 text-sm font-bold rounded-full shadow-lg">
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
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Never type again</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Sound polished in every message</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Eliminate fillers and awkward phrasing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Perfect grammar without thinking</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Match your tone to any audience</span>
                </li>
              </ul>

              <motion.button
                onClick={() => {
                  analytics.track('pricing_plan_click', {
                    plan: 'pro',
                    billing_cycle: billingCycle,
                  });
                }}
                className="w-full px-6 py-4 rounded-full font-semibold bg-white text-blue-700 shadow-lg hover:bg-gray-50 transition-all mb-3"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Start 7-Day Free Trial
              </motion.button>

              <p className="text-center text-white/80 text-sm">7-day money-back guarantee</p>
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
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Everything in Pro for everyone</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Stay on-brand across all messages</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Track team productivity gains</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Simple admin and billing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Get help when you need it</span>
                </li>
              </ul>

              <motion.button
                className="w-full px-6 py-4 rounded-full font-semibold text-gray-900 bg-white border-2 border-gray-300 shadow-md hover:border-blue-500 hover:bg-gray-50 transition-all mb-3"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Start with 3 Users
              </motion.button>

              <p className="text-center text-gray-600 text-sm">Billed annually · Volume discounts available</p>
              </GlowCard>
            </motion.div>
          </motion.div>

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
              className="px-10 py-4 rounded-full font-semibold bg-white text-blue-700 shadow-lg hover:bg-gray-50 transition-all"
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
    </section>
  );
}
