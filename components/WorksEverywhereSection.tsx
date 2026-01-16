'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const APPS = [
  {
    name: 'WhatsApp',
    category: 'Messaging',
    logo: (
      <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        W
      </div>
    ),
  },
  {
    name: 'Slack',
    category: 'Team Chat',
    logo: (
      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        S
      </div>
    ),
  },
  {
    name: 'Gmail',
    category: 'Email',
    logo: (
      <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        G
      </div>
    ),
  },
  {
    name: 'Outlook',
    category: 'Email',
    logo: (
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        O
      </div>
    ),
  },
  {
    name: 'Google Docs',
    category: 'Documents',
    logo: (
      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        D
      </div>
    ),
  },
  {
    name: 'Notion',
    category: 'Notes',
    logo: (
      <div className="w-16 h-16 bg-zavi-charcoal rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        N
      </div>
    ),
  },
  {
    name: 'LinkedIn',
    category: 'Social',
    logo: (
      <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        in
      </div>
    ),
  },
  {
    name: 'Twitter',
    category: 'Social',
    logo: (
      <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        𝕏
      </div>
    ),
  },
  {
    name: 'Discord',
    category: 'Messaging',
    logo: (
      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        D
      </div>
    ),
  },
  {
    name: 'Telegram',
    category: 'Messaging',
    logo: (
      <div className="w-16 h-16 bg-sky-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        T
      </div>
    ),
  },
  {
    name: 'Microsoft Teams',
    category: 'Team Chat',
    logo: (
      <div className="w-16 h-16 bg-purple-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        T
      </div>
    ),
  },
  {
    name: 'Zoom Chat',
    category: 'Messaging',
    logo: (
      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
        Z
      </div>
    ),
  },
];

export default function WorksEverywhereSection() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-4 leading-tight"
              variants={fadeUpLarge}
            >
              Works in Every App
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-blue to-purple-600">
                Where Writing Happens
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-zavi-gray-text max-w-3xl mx-auto"
              variants={fadeUp}
            >
              System-level integration means Zavi works everywhere you write. No copy-paste. No switching apps.
            </motion.p>
          </div>

          {/* Apps Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12"
            variants={staggerContainer}
          >
            {APPS.map((app, index) => (
              <motion.div
                key={index}
                className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-zavi-border/50 hover:border-zavi-blue/30 hover:shadow-lg transition-all duration-300"
                variants={fadeUp}
              >
                <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {app.logo}
                </div>
                <h3 className="text-sm font-bold text-zavi-charcoal mb-1">
                  {app.name}
                </h3>
                <p className="text-xs text-zavi-gray-text">
                  {app.category}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            <motion.div
              className="p-6 bg-gradient-to-br from-zavi-blue/5 to-purple-50/30 rounded-2xl border border-zavi-blue/20"
              variants={fadeUp}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zavi-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-zavi-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-zavi-charcoal mb-2">
                    System Keyboard
                  </h3>
                  <p className="text-sm text-zavi-gray-text">
                    Integrates at the OS level. Appears wherever your keyboard appears.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-gradient-to-br from-zavi-blue/5 to-purple-50/30 rounded-2xl border border-zavi-blue/20"
              variants={fadeUp}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zavi-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-zavi-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-zavi-charcoal mb-2">
                    Secure & Private
                  </h3>
                  <p className="text-sm text-zavi-gray-text">
                    Your data never leaves your device. All processing happens locally.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-gradient-to-br from-zavi-blue/5 to-purple-50/30 rounded-2xl border border-zavi-blue/20"
              variants={fadeUp}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-zavi-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-zavi-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-zavi-charcoal mb-2">
                    Context Aware
                  </h3>
                  <p className="text-sm text-zavi-gray-text">
                    Adapts to each app. Professional in email, casual in chat.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Text */}
          <motion.p
            className="text-center text-sm text-zavi-gray-text mt-12"
            variants={fadeUp}
          >
            And thousands more apps. If you can type in it, Zavi works in it.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
