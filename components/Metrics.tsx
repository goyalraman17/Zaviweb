'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const metrics = [
  {
    value: "50K+",
    label: "Active users",
    detail: "and growing daily"
  },
  {
    value: "<2s",
    label: "Processing time",
    detail: "from speech to text"
  },
  {
    value: "99%",
    label: "Accuracy rate",
    detail: "across 100+ languages"
  },
  {
    value: "4.8★",
    label: "User rating",
    detail: "on Google Play Store"
  }
];

export default function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-24 bg-gradient-to-b from-zavi-navy-900 to-zavi-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {metric.value}
              </div>
              <div className="text-base md:text-lg font-semibold text-zavi-blue-300 mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-zavi-navy-400">
                {metric.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
