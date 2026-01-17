'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
  ctaSecondary,
} from '@/lib/animations';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    description: 'Try Zavi risk-free',
    features: [
      '100 conversions/month',
      'All languages supported',
      'System keyboard access',
      'All platforms',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '$9.99',
    period: '/month',
    description: 'For consistent daily writers',
    features: [
      '1,000 conversions/month',
      'Priority processing',
      'Voice tone learning',
      'Email support',
    ],
    cta: 'Start Starter',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For professionals who live in writing',
    features: [
      'Unlimited conversions',
      'Custom voice profiles',
      'Advanced context awareness',
      'Priority support',
      'Team features coming soon',
    ],
    cta: 'Start Pro',
    highlighted: true,
    helperText: 'Best for individuals and small teams',
  },
];

export default function PricingNew() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-zavi-paper/30 to-white" data-section="pricing">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeUpLarge}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-4">
              Priced for Daily Writing.
            </h2>
            <p className="text-xl text-zavi-gray-text mb-8">
              Built for habit, not experiments.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 bg-zavi-paper rounded-full border border-zavi-border">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-zavi-blue text-white shadow-md'
                    : 'text-zavi-gray-text hover:text-zavi-charcoal'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-zavi-blue text-white shadow-md'
                    : 'text-zavi-gray-text hover:text-zavi-charcoal'
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-zavi-gold text-zavi-charcoal px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
          >
            {PLANS.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-zavi-blue to-blue-600 text-white shadow-2xl border-2 border-zavi-blue scale-105'
                    : 'bg-white border border-zavi-border/50 hover:shadow-xl hover:border-zavi-blue/30'
                }`}
                variants={fadeUp}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-zavi-gold text-zavi-charcoal text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      plan.highlighted ? 'text-white' : 'text-zavi-charcoal'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className={`text-4xl font-bold ${
                        plan.highlighted ? 'text-white' : 'text-zavi-charcoal'
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-sm ${
                          plan.highlighted ? 'text-white/70' : 'text-zavi-gray-text'
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      plan.highlighted ? 'text-white/80' : 'text-zavi-gray-text'
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.highlighted ? 'text-white' : 'text-green-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={`text-sm ${
                          plan.highlighted ? 'text-white' : 'text-zavi-charcoal'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <motion.button
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-white text-zavi-blue hover:bg-zavi-paper shadow-lg'
                        : 'bg-zavi-blue text-white hover:bg-zavi-blue-500 shadow-md'
                    }`}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    variants={plan.highlighted ? ctaPrimary : ctaSecondary}
                  >
                    {plan.cta}
                  </motion.button>

                  {plan.helperText && (
                    <p className="text-center text-xs text-white/70 mt-3">
                      {plan.helperText}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enterprise Callout - Separate, Quiet */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            variants={fadeUp}
          >
            <div className="bg-zavi-paper/50 border border-zavi-border/30 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-zavi-charcoal mb-2">
                Enterprise
              </h3>
              <p className="text-sm text-zavi-gray-text mb-6">
                For larger teams with custom needs and advanced security
              </p>
              <motion.button
                className="px-8 py-3 bg-white border border-zavi-border rounded-xl text-zavi-charcoal font-semibold hover:border-zavi-blue/50 hover:bg-zavi-blue/5 transition-all"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaSecondary}
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>

          <motion.p
            className="text-center text-sm text-zavi-gray-text"
            variants={fadeUp}
          >
            Cancel anytime. No credit card required to start.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
