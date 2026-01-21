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
              Your Voice.<br />
              <span className="bg-gradient-to-r from-[#6B7FE8] to-[#8B5CF6] bg-clip-text text-transparent">
                Perfectly Written.
              </span>
            </motion.h1>

            {/* Short declarative lines - Speech → Writing → Outcome */}
            <motion.div
              className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto space-y-3"
              variants={fadeUp}
            >
              <p className="font-medium">Speak naturally.</p>
              <p>Get professional text.</p>
              <p className="text-lg md:text-xl text-gray-600">No filler words. Perfect grammar. Instant formatting.</p>
            </motion.div>

            {/* Single Dominant CTA */}
            <motion.div
              variants={fadeUp}
              className="mb-10"
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
                className="inline-flex items-center gap-3 px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-[#6B7FE8] to-[#8B5CF6] hover:from-[#5A6DD7] hover:to-[#7A4BE5] rounded-2xl transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Free
              </motion.a>
            </motion.div>

            {/* Minimal trust line */}
            <motion.p
              variants={fadeUp}
              className="text-sm text-gray-600 mb-16"
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
