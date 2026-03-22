'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const REASONS = [
  {
    title: 'Handles unfinished thoughts',
    description: 'You don\'t need perfect sentences. Zavi connects the dots.',
  },
  {
    title: 'Learns your writing voice',
    description: 'Adapts to your tone, style, and professional context over time.',
  },
  {
    title: 'Switching away feels like quality loss',
    description: 'Going back to typing feels slow. Raw transcripts feel broken.',
  },
];

export default function WhyItSticks() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-zavi-paper/30 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeUpLarge}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-6 leading-tight">
              After Zavi,
              <br />
              <span className="text-zavi-blue">Typing Feels Broken.</span>
            </h2>
          </motion.div>

          <motion.div className="space-y-6" variants={staggerContainer}>
            {REASONS.map((reason, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-zavi-border/50 p-6 hover:shadow-lg transition-all duration-300"
                variants={fadeUp}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zavi-blue/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-zavi-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zavi-charcoal mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-base text-zavi-gray-text">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 p-8 bg-zavi-blue/5 rounded-2xl border border-zavi-blue/20 text-center"
            variants={fadeUp}
          >
            <p className="text-xl md:text-2xl text-zavi-charcoal font-semibold">
              It becomes the default way you write.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
