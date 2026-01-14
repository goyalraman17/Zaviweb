'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProTier() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="py-32 md:py-40 bg-zavi-paper">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-charcoal mb-6">
            Try free, upgrade anytime
          </h2>
          <p className="text-xl md:text-2xl text-zavi-gray-text font-light max-w-3xl mx-auto">
            Start with generous free limits. Upgrade to Pro for unlimited access and priority processing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 border-2 border-zavi-border"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-zavi-charcoal mb-3">
                Free
              </h3>
              <p className="text-lg text-zavi-gray-text">
                Perfect for daily use
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "50 messages per day",
                "AI cleanup & grammar fixes",
                "Works everywhere on Android",
                "100+ languages",
                "No credit card needed"
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 text-zavi-charcoal"
                >
                  <svg className="flex-shrink-0 w-6 h-6 text-zavi-icon-inactive mt-0.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-base leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-zavi-blue-50 to-white rounded-3xl p-8 md:p-10 relative overflow-hidden border-2 border-zavi-blue shadow-lg"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-zavi-blue/10 rounded-full blur-3xl" />

            <div className="relative mb-8">
              <div className="inline-block px-4 py-1.5 bg-zavi-blue/10 rounded-full mb-4">
                <span className="text-sm font-semibold text-zavi-blue">MOST POPULAR</span>
              </div>
              <h3 className="text-3xl font-bold text-zavi-charcoal mb-3">
                Pro
              </h3>
              <p className="text-lg text-zavi-gray-text">
                For power users
              </p>
            </div>

            <ul className="space-y-4 relative">
              {[
                "Everything in Free, plus:",
                "Unlimited daily messages",
                "2x faster processing",
                "Advanced AI editing",
                "Priority support",
                "Early access to features"
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3 text-zavi-charcoal"
                >
                  <svg className="flex-shrink-0 w-6 h-6 text-zavi-blue mt-0.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`text-base leading-relaxed ${index === 0 ? 'font-semibold' : ''}`}>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="text-base text-zavi-gray-text">
            Download free, no credit card needed. Try Pro features risk-free with a 7-day trial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
