'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const STEPS = [
  {
    number: '01',
    title: 'Speak naturally',
    description: 'Talk as you would to a colleague. No scripts, no structure.',
    features: ['Any language', 'Any accent', 'Unfinished thoughts OK'],
  },
  {
    number: '02',
    title: 'Zavi understands intent, tone, and context',
    description: 'AI analyzes what you mean, not just what you said.',
    features: ['Intent recognition', 'Tone matching', 'Context awareness'],
  },
  {
    number: '03',
    title: 'Professional writing appears instantly',
    description: 'Polished, structured, ready to send.',
    features: ['<1s response time', 'Zero editing', 'Works in any app'],
  },
];

const SUPPORT_POINTS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: 'Zero editing required',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: 'Works in any app',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: 'Multilingual input to professional English output',
  },
];

export default function HowZaviWorks() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-white to-zavi-paper/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-4">
              How Zavi Saves You Time
              <br />
              Every Single Time
            </h2>
          </motion.div>

          <motion.div className="space-y-12 mb-16" variants={staggerContainer}>
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-zavi-border/50 p-8 hover:shadow-lg transition-all duration-300"
                variants={fadeUp}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-zavi-blue/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-zavi-blue">{step.number}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-zavi-charcoal mb-3">
                      {step.title}
                    </h3>
                    <p className="text-lg text-zavi-gray-text mb-4">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-zavi-blue/5 text-sm text-zavi-blue font-medium rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-6 bg-zavi-blue/5 rounded-2xl p-8"
            variants={fadeUp}
          >
            {SUPPORT_POINTS.map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  {point.icon}
                </div>
                <p className="text-sm font-medium text-zavi-charcoal">{point.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
