'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const privacyItems = [
  {
    title: "No recordings stored.",
    description: "Your audio is processed in real time, then deleted."
  },
  {
    title: "No data sold.",
    description: "We don't sell your information to advertisers or third parties."
  },
  {
    title: "On-device processing.",
    description: "Most of the work happens on your phone, not in the cloud."
  },
  {
    title: "Standard permissions.",
    description: "Zavi only needs microphone access to function as a voice keyboard."
  }
];

export default function Privacy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-zavi-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zavi-black mb-4">
            Your voice stays yours
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {privacyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6"
            >
              <p className="text-lg text-zavi-gray-800 leading-relaxed">
                <strong className="font-semibold text-zavi-black">{item.title}</strong> {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
