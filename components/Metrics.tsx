'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const metrics = [
  {
    value: "5x",
    label: "Faster",
    detail: "than typing"
  },
  {
    value: "<2s",
    label: "Response time",
    detail: "speech to perfect text"
  },
  {
    value: "100+",
    label: "Languages",
    detail: "speak any, write English"
  },
  {
    value: "50K+",
    label: "Users",
    detail: "downloaded this month"
  }
];

export default function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-24 bg-gradient-to-b from-white to-zavi-paper/30 border-y border-zavi-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="text-center group cursor-pointer"
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-zavi-charcoal to-zavi-blue bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {metric.value}
              </motion.div>
              <motion.div
                className="text-lg md:text-xl font-semibold text-zavi-blue mb-1"
                whileHover={{ scale: 1.05 }}
              >
                {metric.label}
              </motion.div>
              <div className="text-sm text-zavi-gray-500 group-hover:text-zavi-gray-700 transition-colors">
                {metric.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
