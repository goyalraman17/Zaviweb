'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const AUDIENCES = [
  {
    title: 'Founders and operators',
    description: 'Ship updates 3x faster. Stop rewriting emails.',
    icon: '🚀',
    useCase: 'Daily standups, investor updates, team communications',
  },
  {
    title: 'Lawyers and consultants',
    description: 'Bill for thinking, not typing. Capture thoughts instantly.',
    icon: '⚖️',
    useCase: 'Client emails, case notes, research summaries',
  },
  {
    title: 'Sales and support teams',
    description: 'Respond faster. Sound professional every time.',
    icon: '💬',
    useCase: 'Customer replies, follow-ups, internal updates',
  },
  {
    title: 'Creators and students',
    description: 'Focus on ideas, not formatting. Write more, stress less.',
    icon: '✍️',
    useCase: 'Scripts, outlines, essays, research notes',
  },
];

export default function Audiences() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeUpLarge}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-4">
              If You Write Every Day,
              <br />
              <span className="text-zavi-blue">Zavi Pays for Itself.</span>
            </h2>
            <p className="text-xl text-zavi-gray-text">
              Built for people who create value through writing.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {AUDIENCES.map((audience, index) => (
              <motion.div
                key={index}
                className="bg-zavi-paper rounded-2xl border border-zavi-border/50 p-8 hover:shadow-lg hover:border-zavi-blue/30 transition-all duration-300"
                variants={fadeUp}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-4xl">
                    {audience.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-zavi-charcoal mb-2">
                      {audience.title}
                    </h3>
                    <p className="text-base text-zavi-gray-text mb-3 font-medium">
                      {audience.description}
                    </p>
                    <p className="text-sm text-zavi-gray-text/70">
                      <span className="font-semibold text-zavi-charcoal">Use cases:</span>{' '}
                      {audience.useCase}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-lg text-zavi-gray-text mt-12"
            variants={fadeUp}
          >
            Practical. Realistic. Built for daily use.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
