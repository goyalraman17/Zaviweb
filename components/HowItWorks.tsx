'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: "01",
    title: "Speak naturally",
    description: "Press the button and talk like you would to a colleague.",
  },
  {
    number: "02",
    title: "AI cleans and structures",
    description: "Your intent is understood and refined in real time.",
  },
  {
    number: "03",
    title: "Professional writing appears",
    description: "Clean, structured text ready to send. No editing needed.",
  }
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-zavi-paper/30">
      <div className="container mx-auto px-6">
        {/* Clean headline */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-charcoal mb-4">
            How it works
          </h2>
        </motion.div>

        {/* 3-step flow - minimal, clean */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative"
              >
                {/* Step number - large, minimal */}
                <div className="text-7xl font-bold text-zavi-blue/10 mb-6">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-zavi-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-zavi-gray-text leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-16 h-0.5 bg-zavi-border/50" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA - soft */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.button
            onClick={() => {
              const demoSection = document.querySelector('[data-section="demo"]');
              if (demoSection) {
                demoSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-zavi-blue font-semibold hover:text-zavi-blue-500 transition-colors inline-flex items-center gap-2"
            whileHover={{ x: 4 }}
          >
            Watch it in action
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3L11 8L6 13"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
