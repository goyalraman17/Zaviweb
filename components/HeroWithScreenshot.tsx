'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';
import { analytics } from '@/lib/analytics';
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
      case 'macOS': return 'Download Free for macOS';
      case 'Windows': return 'Download Free for Windows';
      case 'iOS': return 'Download on App Store';
      case 'Android': return 'Download on Play Store';
      case 'Linux': return 'Download Free for Linux';
      default: return 'Download Zavi Free';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

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
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              Your Voice.<br />
              <motion.span
                className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Perfectly Written.
              </motion.span>
            </motion.h1>

            {/* Short declarative lines - Speech → Writing → Outcome */}
            <motion.div
              className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto space-y-3"
              variants={fadeUp}
            >
              <motion.p
                className="font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Speak naturally.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Get professional text.
              </motion.p>
              <motion.p
                className="text-lg md:text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                No filler words. Perfect grammar. Instant formatting.
              </motion.p>
            </motion.div>

            {/* Single Dominant CTA with glow effect */}
            <motion.div
              variants={fadeUp}
              className="mb-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <motion.a
                href="/#download"
                onClick={(e) => {
                  e.preventDefault();
                  analytics.track('cta_hero_click', {
                    text: getDownloadText(),
                    os: detectedOS,
                  });
                  const downloadSection = document.getElementById('download');
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="relative inline-flex items-center gap-3 px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl transition-all shadow-2xl overflow-hidden group"
                initial="rest"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-75 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />

                <motion.svg
                  className="w-6 h-6 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </motion.svg>
                <span className="relative z-10">Download Free</span>
              </motion.a>
            </motion.div>

            {/* Minimal trust line */}
            <motion.p
              variants={fadeUp}
              className="text-sm text-gray-600 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              Free forever • No credit card • 50,000+ users
            </motion.p>
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
