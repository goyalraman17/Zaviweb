'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const useCases = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M11 13H21M11 17H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 8L16 4L26 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "For professionals",
    description: "Write emails while walking to meetings. Respond to Slack on the go. Draft LinkedIn posts during your commute. Your thoughts, instantly professional."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L20 12L28 14L22 20L24 28L16 24L8 28L10 20L4 14L12 12L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    title: "For creators",
    description: "Capture ideas the moment they hit. Turn voice notes into structured content. Write long-form without thumb fatigue. Create more, type less."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
        <path d="M11 16L15 20L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "For everyday use",
    description: "Send longer messages without the thumb strain. Reply to group chats instantly. Write shopping lists, notes, reminders—all while multitasking."
  }
];

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-gray-900 mb-6">
            Built for real-world productivity
          </h2>
          <p className="text-xl md:text-2xl text-zavi-gray-600 max-w-3xl mx-auto font-light">
            Whether you're closing deals, creating content, or staying connected—Zavi keeps up with how you actually work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <motion.div
                className="w-16 h-16 mb-6 rounded-2xl bg-zavi-gray-50 flex items-center justify-center text-zavi-gray-700"
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                transition={{ duration: 0.2 }}
              >
                {useCase.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold text-zavi-gray-900 mb-4">
                {useCase.title}
              </h3>
              <p className="text-lg text-zavi-gray-600 leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
