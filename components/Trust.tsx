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
    label: "Private by design"
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 10V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: "No background listening"
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 4C22.6274 4 28 9.37258 28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
      </svg>
    ),
    label: "No saved audio"
  }
];

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zavi-gray-900 mb-4">
              Your voice stays yours
            </h2>
            <p className="text-xl text-zavi-gray-600 font-light">
              Mic activates only when you tap. Nothing stored. Nothing shared.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zavi-gray-50 flex items-center justify-center text-zavi-gray-700"
                  whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                  transition={{ duration: 0.2 }}
                >
                  {point.icon}
                </motion.div>
                <p className="text-lg font-medium text-zavi-gray-900">
                  {point.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
