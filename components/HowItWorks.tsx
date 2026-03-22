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
    <section ref={ref} className="py-32 md:py-40 bg-gradient-to-b from-zavi-paper/30 via-white to-zavi-paper/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold text-zavi-blue tracking-wider uppercase">Process</span>
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-charcoal mt-3 mb-4">
            How it works
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-zavi-blue/20 to-sky-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-8xl font-bold bg-gradient-to-br from-zavi-blue/15 to-blue-600/15 bg-clip-text text-transparent mb-6">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-semibold text-zavi-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-zavi-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-zavi-border to-transparent -translate-x-1/2" style={{ width: 'calc(100% + 2rem)' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

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
            className="group inline-flex items-center gap-2 px-6 py-3 text-zavi-blue font-semibold hover:text-zavi-blue-500 transition-all"
            whileHover={{ x: 6 }}
          >
            Watch it in action
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
