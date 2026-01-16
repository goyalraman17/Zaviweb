'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const TRUST_POINTS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Live today',
    description: 'Not a beta. Not a waitlist. Download and use now.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Used daily by professionals',
    description: '50,000+ users across law, tech, sales, and consulting.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: 'System level keyboard',
    description: 'Integrated at the OS level. Works everywhere without copy-paste.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Sub-200ms latency',
    description: 'Feels instant. No waiting, no loading spinners.',
  },
];

export default function TrustSignals() {
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
          <motion.div className="text-center mb-16" variants={fadeUpLarge}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-4">
              Built for Daily Use.
              <br />
              <span className="text-zavi-blue">Not Demos.</span>
            </h2>
            <p className="text-xl text-zavi-gray-text">
              Production-grade. Enterprise-ready. Available now.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {TRUST_POINTS.map((point, index) => (
              <motion.div
                key={index}
                className="bg-zavi-paper rounded-2xl border border-zavi-border/50 p-6 hover:shadow-lg transition-all duration-300"
                variants={fadeUp}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-zavi-blue">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zavi-charcoal mb-2">
                      {point.title}
                    </h3>
                    <p className="text-base text-zavi-gray-text">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 text-center p-8 bg-gradient-to-br from-zavi-blue/5 to-purple-50/30 rounded-2xl"
            variants={fadeUp}
          >
            <p className="text-lg text-zavi-charcoal font-semibold">
              Quiet confidence. No testimonial walls. Just results.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
