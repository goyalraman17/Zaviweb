'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

export default function FinalCTANew() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);
  const [detectedOS, setDetectedOS] = useState<string>('');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) setDetectedOS('macOS');
    else if (userAgent.includes('win')) setDetectedOS('Windows');
    else if (userAgent.includes('linux')) setDetectedOS('Linux');
    else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('iOS');
    else if (userAgent.includes('android')) setDetectedOS('Android');
    else setDetectedOS('your device');
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden bg-gradient-to-br from-zavi-blue/5 via-white to-purple-50/30">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-zavi-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Headline */}
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-zavi-charcoal mb-6 leading-tight"
            variants={fadeUpLarge}
          >
            Stop Translating Thoughts
            <br />
            Into Text.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-2xl md:text-3xl text-zavi-gray-text mb-16 font-light"
            variants={fadeUp}
          >
            Let writing happen naturally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
          >
            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-3 px-12 py-6 text-xl font-bold text-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaPrimary}
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 bg-zavi-blue" />
              <div className="absolute inset-0 bg-gradient-to-r from-zavi-blue-400 to-zavi-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg className="relative w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="relative">Start Speaking</span>
            </motion.button>

            <motion.button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative inline-flex items-center gap-3 px-12 py-6 text-xl font-semibold text-zavi-charcoal bg-white rounded-2xl border-2 border-zavi-border hover:border-zavi-blue/30 hover:bg-zavi-blue/5 transition-all shadow-xl hover:shadow-2xl"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaPrimary}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Zavi</span>
            </motion.button>
          </motion.div>

          {/* Supporting Text */}
          <motion.div
            className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            variants={fadeUp}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-zavi-blue mb-2">50,000+</div>
              <div className="text-sm text-zavi-gray-text">Active users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-zavi-blue mb-2">5x</div>
              <div className="text-sm text-zavi-gray-text">Faster writing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-zavi-blue mb-2">&lt;200ms</div>
              <div className="text-sm text-zavi-gray-text">Response time</div>
            </div>
          </motion.div>

          <motion.p
            className="text-sm text-zavi-gray-text mt-12"
            variants={fadeUp}
          >
            Free to install • Works across all platforms • No credit card required
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
