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
    <section ref={ref} className="py-32 md:py-40 bg-gradient-to-b from-white to-zavi-paper/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-zavi-charcoal mb-8 text-center leading-[1.1]"
            variants={fadeUpLarge}
          >
            This Is Not
            <br />
            Voice Typing.
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-zavi-gray-text text-center mb-20 max-w-3xl mx-auto"
            variants={fadeUp}
          >
            Zavi is a new input layer for professional writing.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {COMPARISONS.map((item, index) => (
              <motion.div
                key={index}
                className={`group relative rounded-2xl p-10 text-center transition-all duration-500 ${
                  item.highlight
                    ? 'bg-gradient-to-br from-zavi-blue to-blue-600 text-white shadow-2xl border-2 border-zavi-blue scale-[1.02]'
                    : 'bg-zavi-paper border border-zavi-border/50 hover:shadow-xl hover:border-zavi-blue/30'
                }`}
                variants={fadeUp}
                whileHover={!item.highlight ? { y: -4 } : {}}
              >
                {item.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-zavi-gold text-xs font-bold text-zavi-charcoal rounded-full tracking-wide">
                    NEW CATEGORY
                  </div>
                )}

                <div className="text-5xl mb-6">{item.icon}</div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    item.highlight ? 'text-white' : 'text-zavi-charcoal'
                  }`}
                >
                  {item.label}
                </h3>

                <p
                  className={`text-base leading-relaxed ${
                    item.highlight ? 'text-white/90' : 'text-zavi-gray-text'
                  }`}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-lg md:text-xl text-zavi-gray-text mt-20"
            variants={fadeUp}
          >
            Position: <span className="font-semibold text-zavi-charcoal">A new way to create text</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
