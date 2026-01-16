'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const COMPARISONS = [
  {
    label: 'Transcription tools',
    description: 'Give you text to fix',
    icon: '📝',
  },
  {
    label: 'Writing tools',
    description: 'Improve typed text',
    icon: '✏️',
  },
  {
    label: 'Zavi',
    description: 'Creates writing before text exists',
    icon: '✨',
    highlight: true,
  },
];

export default function CategoryCreation() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-8 text-center leading-tight"
            variants={fadeUpLarge}
          >
            This Is Not Voice Typing.
          </motion.h2>

          <motion.p
            className="text-xl text-zavi-gray-text text-center mb-16"
            variants={fadeUp}
          >
            Zavi is a new input layer for professional writing.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {COMPARISONS.map((item, index) => (
              <motion.div
                key={index}
                className={`relative rounded-2xl p-8 text-center transition-all duration-300 ${
                  item.highlight
                    ? 'bg-gradient-to-br from-zavi-blue to-blue-600 text-white shadow-xl border-2 border-zavi-blue'
                    : 'bg-zavi-paper border border-zavi-border hover:shadow-lg'
                }`}
                variants={fadeUp}
              >
                {item.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-zavi-gold text-xs font-bold text-zavi-charcoal rounded-full">
                    NEW CATEGORY
                  </div>
                )}

                <div className="text-5xl mb-4">{item.icon}</div>

                <h3
                  className={`text-xl font-bold mb-3 ${
                    item.highlight ? 'text-white' : 'text-zavi-charcoal'
                  }`}
                >
                  {item.label}
                </h3>

                <p
                  className={`text-sm ${
                    item.highlight ? 'text-white/90' : 'text-zavi-gray-text'
                  }`}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-lg text-zavi-gray-text mt-16"
            variants={fadeUp}
          >
            Position: <span className="font-semibold text-zavi-charcoal">A new way to create text</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
