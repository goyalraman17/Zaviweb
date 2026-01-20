'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';
import LiveVoiceDemo from './LiveVoiceDemo';

export default function HeroWithScreenshot() {
  const [detectedOS, setDetectedOS] = useState<string>('Unknown');

  // Detect OS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) setDetectedOS('macOS');
      else if (userAgent.includes('win')) setDetectedOS('Windows');
      else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('iOS');
      else if (userAgent.includes('android')) setDetectedOS('Android');
      else if (userAgent.includes('linux')) setDetectedOS('Linux');
      else setDetectedOS('Unknown');
    }
  }, []);

  // Get download text based on detected OS
  const getDownloadText = () => {
    switch (detectedOS) {
      case 'macOS': return 'Download for macOS';
      case 'Windows': return 'Download for Windows';
      case 'iOS': return 'Get on App Store';
      case 'Android': return 'Get on Play Store';
      case 'Linux': return 'Download for Linux';
      default: return 'Download Free';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-32 pb-16 md:pb-20" style={{ background: 'linear-gradient(135deg, #E8E5F5 0%, #F5E8F0 50%, #E5F0F5 100%)' }}>
      <div className="container-large relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Simplified Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerSlow}
            className="text-center mb-12"
          >
            {/* Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] mb-6"
              variants={fadeUpLarge}
            >
              Your Voice, Polished Instantly
            </motion.h1>

            {/* One-liner value prop */}
            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
              variants={fadeUp}
            >
              Speak naturally. Zavi removes fillers, fixes grammar, and makes you sound professional.
            </motion.p>

            {/* Single CTA - Platform Specific Download */}
            <motion.div
              variants={fadeUp}
              className="mb-8"
            >
              <motion.a
                href="/try-free"
                className="inline-flex items-center gap-2 px-10 py-5 text-lg font-semibold text-white bg-zavi-blue hover:bg-zavi-blue-500 rounded-xl transition-all shadow-xl hover:shadow-2xl"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                {getDownloadText()}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-6 mb-4"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.7 on Google Play
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm font-semibold text-gray-700">
                50K+ Active Users
              </span>
            </motion.div>

            {/* Security Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-3 mb-12"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Private by design
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No credit card required
              </span>
            </motion.div>

            {/* Micro Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-3 mb-16"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Removes fillers
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Fixes grammar
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Works everywhere
              </span>
            </motion.div>
          </motion.div>

          {/* Live Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LiveVoiceDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
