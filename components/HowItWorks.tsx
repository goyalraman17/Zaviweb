'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: "1",
    title: "Tap the mic",
    description: "Zavi works like your normal keyboard. Just tap the microphone icon."
  },
  {
    number: "2",
    title: "Speak naturally",
    description: "Talk like you would to a friend. Filler words, pauses, rambling—all fine."
  },
  {
    number: "3",
    title: "Clean text appears",
    description: "Zavi removes the mess and writes professional text. Ready to send."
  }
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zavi-black mb-4">
            Three steps. That's it.
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-start gap-8"
            >
              <motion.div
                className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl font-bold text-white bg-zavi-black rounded-full"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                {step.number}
              </motion.div>
              <div className="flex-grow pt-2">
                <h3 className="text-2xl md:text-3xl font-semibold text-zavi-black mb-2">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-zavi-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
