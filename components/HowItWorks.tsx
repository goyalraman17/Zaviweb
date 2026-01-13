'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: "1",
    title: "Tap the mic",
    visual: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="50" fill="#f3f4f6"/>
        <circle cx="60" cy="60" r="40" fill="url(#mic-gradient)"/>
        <path d="M60 50C62.7614 50 65 47.7614 65 45V35C65 32.2386 62.7614 30 60 30C57.2386 30 55 32.2386 55 35V45C55 47.7614 57.2386 50 60 50Z" fill="white"/>
        <path d="M70 45C70 50.5228 65.5228 55 60 55C54.4772 55 50 50.5228 50 45M60 55V65M60 65H53M60 65H67" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <defs>
          <linearGradient id="mic-gradient" x1="20" y1="20" x2="100" y2="100">
            <stop offset="0%" stopColor="#4da6ff"/>
            <stop offset="100%" stopColor="#0073e6"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    number: "2",
    title: "Speak naturally",
    visual: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="50" fill="#f3f4f6"/>
        <path d="M35 50 Q50 40, 55 50 T75 50" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M35 60 Q45 55, 50 60 T65 60 T85 60" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M40 70 Q55 65, 65 70 T80 70" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <motion.circle
          cx="35" cy="50" r="4" fill="#4da6ff"
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        />
      </svg>
    )
  },
  {
    number: "3",
    title: "Get clean text",
    visual: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <rect x="30" y="30" width="60" height="60" rx="8" fill="#f3f4f6"/>
        <rect x="38" y="42" width="44" height="6" rx="3" fill="#0073e6"/>
        <rect x="38" y="54" width="36" height="6" rx="3" fill="#0073e6" fillOpacity="0.7"/>
        <rect x="38" y="66" width="40" height="6" rx="3" fill="#0073e6" fillOpacity="0.5"/>
        <motion.path
          d="M75 75 L82 82 L95 65"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
        />
      </svg>
    )
  }
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-gradient-to-b from-white to-zavi-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-gray-900 mb-4">
            Three taps away
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <motion.div
                className="flex justify-center mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {step.visual}
              </motion.div>

              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-zavi-blue-500 text-white flex items-center justify-center text-lg font-bold">
                  {step.number}
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-zavi-gray-900 mb-2">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
