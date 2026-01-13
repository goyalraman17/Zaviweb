'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const trustPoints = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L6 8V14C6 20.6 10.4 26.4 16 28C21.6 26.4 26 20.6 26 14V8L16 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 16L15 19L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Tap to activate",
    detail: "Microphone only turns on when you press the button. No background listening, ever."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 4C22.6274 4 28 9.37258 28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
      </svg>
    ),
    label: "No recordings stored",
    detail: "Audio is processed and immediately deleted. We never keep copies of your voice."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="10" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 10V7C12 5.89543 12.8954 5 14 5H18C19.1046 5 20 5.89543 20 7V10" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="17" r="2" fill="currentColor"/>
      </svg>
    ),
    label: "Encrypted data",
    detail: "All data transmission is encrypted. Your privacy is protected at every step."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 16H22M16 10V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: "Request deletion",
    detail: "You can request deletion of your data at any time. Full control, always."
  }
];

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-gradient-to-b from-white to-zavi-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-zavi-gray-900 mb-6">
              Your voice stays yours
            </h2>
            <p className="text-xl md:text-2xl text-zavi-gray-600 font-light max-w-3xl mx-auto">
              Privacy isn't a feature. It's how Zavi is built. Your data is protected, encrypted, and never stored.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {trustPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-2xl bg-zavi-gray-50 flex items-center justify-center text-zavi-gray-700"
                  whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                  transition={{ duration: 0.2 }}
                >
                  {point.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-zavi-gray-900 mb-2">
                    {point.label}
                  </h3>
                  <p className="text-base text-zavi-gray-600 leading-relaxed">
                    {point.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-lg text-zavi-gray-600 max-w-2xl mx-auto">
              Zavi processes your speech on-device whenever possible. When cloud processing is needed, data is encrypted in transit and immediately deleted after processing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
