'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const useCases = [
  {
    persona: "Founders",
    scenario: "Dictate investor updates while reviewing metrics.",
    benefit: "Write faster than you can think. Focus stays on strategy, not syntax.",
  },
  {
    persona: "Operators",
    scenario: "Send structured Slack messages between meetings.",
    benefit: "Clear communication without context switching.",
  },
  {
    persona: "Knowledge workers",
    scenario: "Draft emails and documents during commutes.",
    benefit: "Turn dead time into productive writing sessions.",
  },
  {
    persona: "Creators",
    scenario: "Capture ideas the moment inspiration hits.",
    benefit: "From voice note to structured content in seconds.",
  },
];

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-zavi-paper/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-charcoal mb-6">
            Built for professionals
          </h2>
          <p className="text-xl text-zavi-gray-text max-w-2xl mx-auto">
            Used by people who write for a living.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-white rounded-xl p-8 border border-zavi-border"
            >
              <h3 className="text-2xl font-bold text-zavi-charcoal mb-4">
                {useCase.persona}
              </h3>
              <p className="text-base text-zavi-gray-text mb-4 leading-relaxed">
                {useCase.scenario}
              </p>
              <p className="text-base text-zavi-charcoal font-medium">
                {useCase.benefit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
