'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const apps = [
  { name: "Gmail", icon: "📧" },
  { name: "WhatsApp", icon: "💬" },
  { name: "LinkedIn", icon: "💼" },
  { name: "Slack", icon: "💬" },
  { name: "Messages", icon: "💬" },
  { name: "Chrome", icon: "🌐" },
  { name: "Notes", icon: "📝" },
  { name: "Twitter", icon: "🐦" },
];

export default function WorksEverywhere() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-gradient-to-b from-zavi-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-gray-900 mb-6">
            Works in every app
          </h2>
          <p className="text-xl md:text-2xl text-zavi-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Zavi is a system-wide Android keyboard. That means it works everywhere you type—no app switching, no copy-paste, no limitations.
          </p>
        </motion.div>

        {/* App Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {apps.map((app, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-zavi-gray-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="text-4xl mb-3">{app.icon}</div>
              <div className="text-sm font-medium text-zavi-gray-700">{app.name}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "One keyboard for everything",
              description: "Set Zavi as your Android keyboard once. Use it everywhere, forever."
            },
            {
              title: "No app switching",
              description: "Stay in your workflow. Speak directly into any text field in any app."
            },
            {
              title: "No copy-paste",
              description: "Text appears exactly where you need it. No extra steps, no friction."
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold text-zavi-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-base text-zavi-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
