'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

export default function PricingNew() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section
      id="pricing"
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E8E5F5 0%, #F5E8F0 50%, #E5F0F5 100%)',
      }}
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
              Write 4x Faster Anywhere Using Your Voice
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Turn natural speech into clean, professional text across every app you use.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Trusted by professionals, founders, and teams</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Cancel anytime. No credit card for free plan</span>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-md">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>Annual (2 months free)</span>
                <div className="w-10 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative">
                  <div className={`absolute top-0.5 ${billingCycle === 'annual' ? 'right-0.5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all`}></div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12"
            variants={staggerContainerSlow}
          >
            {/* Free Plan */}
            <motion.div
              className="relative rounded-3xl p-8 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg"
              variants={fadeUp}
            >
              <h3 className="text-3xl font-bold text-[#1a1a1a] mb-2">Free</h3>
              <p className="text-gray-600 mb-6">For trying voice-first writing</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Write up to 1,500 words per week</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Speak naturally. Zavi cleans grammar and punctuation automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Works across your apps</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Supports mixed languages</span>
                </li>
              </ul>

              <motion.button
                className="w-full px-6 py-4 rounded-full font-semibold text-white shadow-lg transition-all"
                style={{
                  background: 'linear-gradient(135deg, #7B68EE 0%, #9370DB 100%)',
                }}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Try Free. No Credit Card
              </motion.button>
            </motion.div>

            {/* Pro Plan - Most Popular */}
            <motion.div
              className="relative rounded-3xl p-8 shadow-2xl transform scale-105"
              style={{
                background: 'linear-gradient(135deg, #7B68EE 0%, #9370DB 100%)',
              }}
              variants={fadeUp}
            >
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white text-purple-700 text-sm font-bold rounded-full shadow-lg">
                Most Popular
              </div>

              <h3 className="text-3xl font-bold text-white mb-1">Pro</h3>
              <p className="text-white/90 mb-4">(Most Popular for Daily Writing)</p>

              {/* Save Time Badge */}
              <div className="bg-[#E6C15A] text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg mb-6">
                Save 30+ minutes per day on typing
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Unlimited voice writing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Works everywhere you type</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Removes filler words automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Fixes grammar and structure instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white">Advanced rewrites for clarity and tone</span>
                </li>
              </ul>

              <motion.button
                className="w-full px-6 py-4 rounded-full font-semibold bg-white text-purple-700 shadow-lg hover:bg-gray-50 transition-all mb-3"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Upgrade to Pro
              </motion.button>

              <p className="text-center text-white/80 text-sm">7-day money-back guarantee</p>
            </motion.div>

            {/* Teams Plan */}
            <motion.div
              className="relative rounded-3xl p-8 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg"
              variants={fadeUp}
            >
              <h3 className="text-3xl font-bold text-[#1a1a1a] mb-1">Teams</h3>
              <p className="text-gray-600 mb-2">(For Fast-Growing Companies)</p>
              <p className="text-gray-700 mb-6">For teams that communicate at scale</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Shared terminology and brand voice</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Usage analytics across team</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Admin controls and centralized billing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>

              <motion.button
                className="w-full px-6 py-4 rounded-full font-semibold text-gray-900 bg-white border-2 border-gray-300 shadow-md hover:border-purple-500 hover:bg-gray-50 transition-all mb-3"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Start with 3 Users
              </motion.button>

              <p className="text-center text-gray-600 text-sm">Billed annually · Volume discounts available</p>
            </motion.div>
          </motion.div>

          {/* Enterprise Section */}
          <motion.div
            className="max-w-5xl mx-auto rounded-3xl p-12 text-center shadow-xl mb-16"
            style={{
              background: 'linear-gradient(135deg, #9370DB 0%, #7B68EE 100%)',
            }}
            variants={fadeUp}
          >
            <h3 className="text-3xl font-bold text-white mb-4">Enterprise-grade voice writing</h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Custom integrations, security reviews, dedicated support, and organization-wide rollout.
            </p>
            <motion.button
              className="px-10 py-4 rounded-full font-semibold bg-white text-purple-700 shadow-lg hover:bg-gray-50 transition-all"
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
