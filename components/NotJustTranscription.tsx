'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function NotJustTranscription() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Sharp, clear headline */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-zavi-charcoal mb-6 leading-tight">
              This is not dictation.
            </h2>
            <p className="text-xl md:text-2xl text-zavi-gray-text max-w-2xl mx-auto">
              Dictation captures words. Zavi understands intent and writes professionally.
            </p>
          </motion.div>

          {/* Clean before/after comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before - Traditional Dictation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-zavi-paper/50 rounded-2xl p-8 border border-zavi-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-zavi-gray-100 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10V5C12.5 3.61929 11.3807 2.5 10 2.5C8.61929 2.5 7.5 3.61929 7.5 5V10C7.5 11.3807 8.61929 12.5 10 12.5Z" fill="#9A9DA4"/>
                    <path d="M14.1667 10C14.1667 12.3012 12.3012 14.1667 10 14.1667C7.69881 14.1667 5.83333 12.3012 5.83333 10M10 14.1667V17.5M10 17.5H6.66667M10 17.5H13.3333" stroke="#9A9DA4" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zavi-charcoal">Traditional Dictation</h3>
              </div>
              <p className="text-base text-zavi-gray-text mb-6 leading-relaxed">
                Captures every word, filler, and false start. Requires manual editing.
              </p>
              <div className="bg-white rounded-xl p-4 border border-zavi-border">
                <p className="text-sm text-zavi-gray-text font-mono leading-relaxed">
                  "um so I wanted to uh reach out about like the project because you know we should probably uh finalize this"
                </p>
              </div>
            </motion.div>

            {/* After - Zavi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-8 border-2 border-zavi-blue shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-zavi-blue flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2.5L5 5L10 7.5L15 5L10 2.5Z" fill="white"/>
                    <path d="M5 10L10 12.5L15 10M5 15L10 17.5L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zavi-charcoal">Zavi</h3>
              </div>
              <p className="text-base text-zavi-charcoal mb-6 leading-relaxed font-medium">
                Understands intent. Structures thoughts. Delivers professional writing instantly.
              </p>
              <div className="bg-zavi-blue-50 rounded-xl p-4 border border-zavi-blue/20">
                <p className="text-sm text-zavi-charcoal font-medium leading-relaxed">
                  "I wanted to reach out about the project. We should finalize this."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
