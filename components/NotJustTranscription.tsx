'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function NotJustTranscription() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-32 md:py-40 bg-zavi-paper">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-zavi-charcoal mb-6">
              Why people switch from traditional dictation
            </h2>
            <p className="text-2xl md:text-3xl text-zavi-gray-text font-light">
              Zavi doesn't just transcribe. It writes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Normal Voice Typing */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div
                className="flex items-start gap-4 mb-6 bg-white p-6 rounded-2xl border border-zavi-border hover:border-zavi-gray-300 transition-all shadow-sm hover:shadow-md"
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 rounded-xl bg-zavi-gray-100 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15Z" fill="#9A9DA4"/>
                    <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12M12 17V21M12 21H8M12 21H16" stroke="#9A9DA4" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-zavi-gray-text mb-3">
                    Traditional Dictation
                  </h3>
                  <p className="text-lg text-zavi-gray-text leading-relaxed mb-4">
                    Captures every word you say. All the "um"s, "uh"s, false starts. Then you spend 5 minutes editing.
                  </p>
                  <div className="text-base text-zavi-disabled italic bg-zavi-paper px-3 py-2 rounded-lg">
                    "um so I wanted to uh reach out about like the project because you know we should probably uh finalize this"
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Zavi */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <motion.div
                className="flex items-start gap-4 mb-6 bg-white p-6 rounded-2xl border-2 border-zavi-blue shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
                whileHover={{ borderColor: "#3D8FEB" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-zavi-blue-50/50 to-transparent opacity-0 hover:opacity-100 transition-opacity"
                  initial={false}
                />
                <motion.div
                  className="flex-shrink-0 w-12 h-12 rounded-xl bg-zavi-blue flex items-center justify-center shadow-lg relative z-10"
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -10, 10, 0],
                    boxShadow: "0 10px 30px rgba(91, 164, 255, 0.4)"
                  }}
                  transition={{ duration: 0.4 }}
                  animate={{
                    y: [0, -5, 0]
                  }}
                  whileInView={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L6 6L12 9L18 6L12 3Z" fill="white"/>
                    <path d="M6 12L12 15L18 12M6 18L12 21L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-zavi-charcoal mb-3">
                    Zavi AI Keyboard
                  </h3>
                  <p className="text-lg text-zavi-charcoal leading-relaxed mb-4 font-medium">
                    Removes fillers, fixes grammar, structures thoughts. Same speech → perfect writing. Zero editing needed.
                  </p>
                  <div className="text-base text-zavi-charcoal font-semibold bg-zavi-blue-50 px-3 py-2 rounded-lg">
                    "I wanted to reach out about the project. We should finalize this."
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-xl text-zavi-gray-text max-w-3xl mx-auto font-medium">
              Save 10+ minutes per day. Never edit voice messages again.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
