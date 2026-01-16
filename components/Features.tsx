'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="6" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 12H26M14 18H26M14 24H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "System-wide keyboard",
    description: "Works in every app. Gmail, WhatsApp, Slack, LinkedIn, Notes—anywhere you type."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 14V20L24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI auto-editing",
    description: "Removes filler words, fixes grammar, and structures your thoughts—all in real time."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M10 10H30V30H10V10Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 16H30M16 10V30" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: "Long-form ready",
    description: "Speak for paragraphs, not sentences. Perfect for emails, messages, and notes."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="14" cy="20" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="26" cy="20" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20H32" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: "100+ languages",
    description: "Speak in your language. Zavi understands and adapts to how you naturally talk."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 8V14M20 26V32M8 20H14M26 20H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: "Privacy-first",
    description: "Your voice stays on your device. No recordings stored. No data sold."
  }
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-white to-zavi-paper/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-zavi-blue tracking-wider uppercase">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold text-zavi-charcoal mt-3 mb-4">
            Built for real phone usage
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="card p-8 group"
            >
              <motion.div
                className="w-14 h-14 mb-5 flex items-center justify-center bg-gradient-to-br from-zavi-blue/10 to-blue-500/10 rounded-2xl text-zavi-blue group-hover:from-zavi-blue/20 group-hover:to-blue-500/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-zavi-charcoal mb-3 group-hover:text-zavi-blue transition-colors">
                {feature.title}
              </h3>
              <p className="text-base text-zavi-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
