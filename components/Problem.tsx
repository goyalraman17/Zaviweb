'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const problems = [
  {
    title: "You have things to say",
    description: "Long messages. Thoughtful replies. Real ideas. But your thumbs can't keep up with your brain."
  },
  {
    title: "Basic voice typing fails",
    description: "It captures every \"um,\" \"uh,\" and rambling thought. You still spend minutes cleaning up the mess."
  },
  {
    title: "So you just type less",
    description: "Shorter emails. Surface-level responses. Half-formed thoughts. Not because you want to—because typing takes too long."
  }
];

export default function Problem() {
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
            Typing on your phone is exhausting
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-zavi-black mb-3">
                  {problem.title}
                </h3>
                <p className="text-lg text-zavi-gray-700 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
