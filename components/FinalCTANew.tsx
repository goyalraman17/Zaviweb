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
    <section
      ref={ref}
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E8E5F5 0%, #F5E8F0 50%, #E5F0F5 100%)'
      }}
    >
      {/* Premium background decoration with enhanced glow */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle radial glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent"></div>

      <div className="container-medium relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Headline */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.15] px-4"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #34384c 50%, #4A4D53 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            variants={fadeUpLarge}
          >
            Stop Translating Thoughts
            <br />
            Into Text.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-zavi-gray-700 mb-16 max-w-3xl mx-auto font-light px-4"
            variants={fadeUp}
          >
            Let writing happen naturally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            variants={fadeUp}
          >
            <a
              href="/#download"
              className="btn-primary inline-flex items-center gap-3 text-xl px-10 py-5"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Free</span>
            </a>

            <a
              href="/#pricing"
              className="btn-secondary inline-flex items-center gap-3 text-xl px-10 py-5"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>View Pricing</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 max-w-3xl mx-auto px-4"
            variants={fadeUp}
          >
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #5381d2 0%, #7B68EE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                50K+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-zavi-gray-600 font-medium">Active users</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #5381d2 0%, #7B68EE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                5x
              </div>
              <div className="text-xs sm:text-sm md:text-base text-zavi-gray-600 font-medium">Faster writing</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #5381d2 0%, #7B68EE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                &lt;200ms
              </div>
              <div className="text-xs sm:text-sm md:text-base text-zavi-gray-600 font-medium">Response time</div>
            </div>
          </motion.div>

          <motion.p
            className="text-base text-zavi-gray-600 mt-16 font-medium"
            variants={fadeUp}
          >
            Free to install • Works across all platforms • No credit card required
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
