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
    <section ref={ref} className="py-32 md:py-48 bg-gradient-to-b from-zavi-blue/5 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-zavi-charcoal mb-12 leading-[1.1]"
            variants={fadeUpLarge}
          >
            Zavi Removes the
            <br />
            Rewrite Step.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-blue to-purple-600">
              Completely.
            </span>
          </motion.h2>

          <motion.div
            className="space-y-10 text-xl md:text-2xl text-zavi-gray-text"
            variants={fadeUp}
          >
            <p className="text-2xl md:text-3xl font-semibold text-zavi-charcoal max-w-3xl mx-auto leading-relaxed">
              Zavi turns spoken intent directly into finished writing.
            </p>

            <div className="grid md:grid-cols-3 gap-12 mt-20">
              <motion.div variants={fadeUp} className="text-center group">
                <div className="w-20 h-20 bg-zavi-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl font-bold text-zavi-blue">1</span>
                </div>
                <p className="text-xl font-semibold text-zavi-charcoal">You speak.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="text-center group">
                <div className="w-20 h-20 bg-zavi-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl font-bold text-zavi-blue">2</span>
                </div>
                <p className="text-xl font-semibold text-zavi-charcoal">
                  Zavi understands.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="text-center group">
                <div className="w-20 h-20 bg-zavi-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-zavi-blue/30">
                  <span className="text-4xl font-bold text-white">3</span>
                </div>
                <p className="text-xl font-semibold text-zavi-charcoal">
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
