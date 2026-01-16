'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

export default function ProblemStatement() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-white to-zavi-paper/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-8 leading-tight"
            variants={fadeUpLarge}
          >
            Typing Is the Bottleneck.
          </motion.h2>

          <motion.div
            className="space-y-6 text-lg md:text-xl text-zavi-gray-text leading-relaxed"
            variants={fadeUp}
          >
            <p>
              You already know what you want to say.
              <br />
              <span className="text-zavi-charcoal font-semibold">Typing slows you down.</span>
              {' '}Voice should fix this.
            </p>

            <p className="text-2xl md:text-3xl font-semibold text-zavi-charcoal">
              It does not.
            </p>

            <p>
              Because raw transcripts are messy.
              <br />
              And rewriting kills the benefit.
            </p>

            <p className="text-xl md:text-2xl font-semibold text-zavi-charcoal pt-4">
              This is why voice never replaced the keyboard.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
