'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

const AUDIENCES = [
  {
    title: 'Founders and operators',
    pain: 'Communicate faster without rewriting.',
    useCase: 'Updates, investor notes, team messages',
  },
  {
    title: 'Lawyers and consultants',
    pain: 'Capture precise thoughts without slowing down.',
    useCase: 'Client emails, notes, summaries',
  },
  {
    title: 'Sales and support teams',
    pain: 'Respond clearly and consistently, every time.',
    useCase: 'Replies, follow ups, internal updates',
  },
  {
    title: 'Creators and students',
    pain: 'Get ideas out before they disappear.',
    useCase: 'Drafts, outlines, research notes',
  },
];

export default function Audiences() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Quiet Pre-Label for Social Proof */}
          <motion.div className="text-center mb-12" variants={fadeUp}>
            <p className="text-sm font-medium text-zavi-gray-text/70 uppercase tracking-wide mb-8">
              Used daily by
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={staggerContainer}
          >
            {AUDIENCES.map((audience, index) => (
              <motion.div
                key={index}
                className="bg-zavi-paper rounded-2xl border border-zavi-border/50 p-8 hover:shadow-lg hover:border-zavi-blue/30 transition-all duration-300"
                variants={fadeUp}
              >
                <h3 className="text-xl font-bold text-zavi-charcoal mb-3">
                  {audience.title}
                </h3>
                <p className="text-base text-zavi-gray-text mb-4 leading-relaxed">
                  {audience.pain}
                </p>
                <p className="text-sm text-zavi-gray-text/70">
                  <span className="font-semibold text-zavi-charcoal">Use cases:</span>{' '}
                  {audience.useCase}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Clear Conversion Path */}
          <motion.div className="text-center mb-8" variants={fadeUp}>
            <motion.button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 text-base font-semibold text-white bg-zavi-blue rounded-xl hover:bg-zavi-blue-500 transition-all shadow-lg hover:shadow-xl shadow-zavi-blue/30 hover:shadow-zavi-blue/40 inline-flex items-center gap-2"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaPrimary}
            >
              Start Writing With Your Voice
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>

            <p className="text-sm text-zavi-gray-text mt-4">
              Free to start. Takes under 30 seconds.
            </p>

            <p className="text-xs text-zavi-gray-text/60 mt-3">
              Works across Mac, Windows, Linux, iOS, Android
            </p>
          </motion.div>

          {/* Trust Reinforcement */}
          <motion.p
            className="text-center text-base text-zavi-gray-text"
            variants={fadeUp}
          >
            Used every day, not just tried once.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
