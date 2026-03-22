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
    <section ref={ref} className="py-32 md:py-48 bg-gradient-to-b from-white to-zavi-paper/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-zavi-charcoal mb-12 leading-[1.1]"
            variants={fadeUpLarge}
          >
            Typing Is the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-charcoal to-zavi-gray-text">
              Bottleneck.
            </span>
          </motion.h2>

          <motion.div
            className="space-y-8 text-xl md:text-2xl text-zavi-gray-text leading-relaxed"
            variants={fadeUp}
          >
            <p>
              You already know what you want to say.
              <br />
              <span className="text-zavi-charcoal font-semibold">Typing slows you down.</span>
              {' '}Voice should fix this.
            </p>

            <p className="text-3xl md:text-4xl font-bold text-zavi-charcoal">
              It does not.
            </p>

            <p>
              Because raw transcripts are messy.
              <br />
              And rewriting kills the benefit.
            </p>

            <p className="text-2xl md:text-3xl font-semibold text-zavi-charcoal pt-6">
              This is why voice never replaced the keyboard.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
