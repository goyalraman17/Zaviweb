'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

export default function ZaviSolution() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-zavi-blue/5 to-white">
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
            Zavi Removes the Rewrite Step.
            <br />
            <span className="text-zavi-blue">Completely.</span>
          </motion.h2>

          <motion.div
            className="space-y-8 text-lg md:text-xl text-zavi-gray-text"
            variants={fadeUp}
          >
            <p className="text-2xl md:text-3xl font-semibold text-zavi-charcoal">
              Zavi turns spoken intent directly into finished writing.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div variants={fadeUp} className="text-center">
                <div className="w-16 h-16 bg-zavi-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-zavi-blue">1</span>
                </div>
                <p className="text-lg font-semibold text-zavi-charcoal">You speak.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="text-center">
                <div className="w-16 h-16 bg-zavi-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-zavi-blue">2</span>
                </div>
                <p className="text-lg font-semibold text-zavi-charcoal">
                  Zavi understands.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="text-center">
                <div className="w-16 h-16 bg-zavi-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <p className="text-lg font-semibold text-zavi-charcoal">
                  The writing is already done.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
