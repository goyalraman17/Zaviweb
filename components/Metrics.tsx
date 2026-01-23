'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from './animated/AnimatedCounter';

const metrics = [
  {
    value: 5,
    suffix: "x",
    label: "Faster",
    detail: "than typing"
  },
  {
    value: 2,
    prefix: "<",
    suffix: "s",
    label: "Response time",
    detail: "speech to perfect text"
  },
  {
    value: 100,
    suffix: "+",
    label: "Languages",
    detail: "speak any, write English"
  },
  {
    value: 99,
    suffix: "%",
    label: "Accurate",
    detail: "out of the box"
  }
];

export default function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-gray-900 to-blue-600 bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {metric.prefix}
                <AnimatedCounter
                  end={metric.value}
                  duration={2}
                  decimals={0}
                />
                {metric.suffix}
              </motion.div>
              <motion.div
                className="text-lg md:text-xl font-semibold text-blue-600 mb-1"
                whileHover={{ scale: 1.05 }}
              >
                {metric.label}
              </motion.div>
              <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                {metric.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
