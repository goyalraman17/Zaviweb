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
    <section ref={ref} className="section-pad-lg bg-white">
      <div className="container-medium">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Headline */}
          <motion.h2
            className="text-zavi-charcoal mb-6"
            variants={fadeUpLarge}
            style={{ lineHeight: 1.1 }}
          >
            Stop Translating Thoughts
            <br />
            Into Text.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            variants={fadeUp}
          >
            Let writing happen naturally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
          >
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary inline-flex items-center gap-2 text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Start Speaking</span>
            </button>

            <button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-secondary inline-flex items-center gap-2 text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Zavi</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            variants={fadeUp}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-zavi-blue mb-1">50K+</div>
              <div className="text-sm text-gray-600">Active users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-zavi-blue mb-1">5x</div>
              <div className="text-sm text-gray-600">Faster writing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-zavi-blue mb-1">&lt;200ms</div>
              <div className="text-sm text-gray-600">Response time</div>
            </div>
          </motion.div>

          <motion.p
            className="text-sm text-gray-500 mt-12"
            variants={fadeUp}
          >
            Free to install • Works across all platforms • No credit card required
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
