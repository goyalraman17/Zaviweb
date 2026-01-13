'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProTier() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-gray-900 mb-6">
            Start free. Upgrade when ready.
          </h2>
          <p className="text-xl md:text-2xl text-zavi-gray-600 font-light max-w-3xl mx-auto">
            Zavi is free to use with daily limits. Upgrade to Pro for unlimited voice typing and faster processing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zavi-gray-50 rounded-3xl p-8 md:p-10"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-zavi-gray-900 mb-3">
                Free
              </h3>
              <p className="text-lg text-zavi-gray-600">
                Perfect for trying Zavi and everyday use
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "AI-powered speech cleanup",
                "Works in every Android app",
                "Grammar and structure fixes",
                "100+ languages supported",
                "Daily usage limits",
                "Standard processing speed"
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 text-zavi-gray-700"
                >
                  <svg className="flex-shrink-0 w-6 h-6 text-zavi-gray-400 mt-0.5" viewBox="0 0 24 24" fill="none">
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
            className="bg-gradient-to-br from-zavi-navy-900 to-zavi-blue-900 rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-zavi-blue-500/20 rounded-full blur-3xl" />

            <div className="relative mb-8">
              <div className="inline-block px-4 py-1.5 bg-zavi-blue-500/20 rounded-full mb-4">
                <span className="text-sm font-semibold text-zavi-blue-300">MOST POPULAR</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Pro
              </h3>
              <p className="text-lg text-zavi-navy-200">
                For professionals and power users
              </p>
            </div>

            <ul className="space-y-4 relative">
              {[
                "Everything in Free, plus:",
                "Unlimited voice typing",
                "Faster processing speed",
                "Professional-grade editing",
                "Priority support",
                "Advanced AI features"
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3 text-white"
                >
                  <svg className="flex-shrink-0 w-6 h-6 text-zavi-blue-400 mt-0.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
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
          <p className="text-base text-zavi-gray-600">
            Install Zavi free and explore Pro features with a trial. Upgrade anytime from within the app.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
