'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const PAIN_POINTS = [
  {
    title: 'Rambling transcripts',
    description: 'Filled with "um", "like", and incomplete thoughts',
  },
  {
    title: 'Awkward tone',
    description: 'Sounds like speech, not professional writing',
  },
  {
    title: 'Unclear structure',
    description: 'No paragraphs, no flow, no hierarchy',
  },
  {
    title: 'You rewrite everything anyway',
    description: 'Which defeats the entire purpose of using voice',
  },
];

export default function PainAmplification() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-zavi-paper/50">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-4 text-center leading-tight"
            variants={fadeUpLarge}
          >
            If You Have to Edit,
            <br />
            Voice Has Already Failed.
          </motion.h2>

          <motion.p
            className="text-xl text-zavi-gray-text text-center mb-16"
            variants={fadeUp}
          >
            Raw voice transcripts create more work than they save:
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {PAIN_POINTS.map((point, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-red-200 p-6 hover:shadow-lg transition-all duration-300"
                variants={fadeUp}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zavi-charcoal mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-zavi-gray-text">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
