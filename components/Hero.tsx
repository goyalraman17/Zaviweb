'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const [detectedOS, setDetectedOS] = useState<string>('');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Minimal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zavi-paper/30 via-white to-white" />

      {/* Subtle ambient glow - static, calm */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-zavi-blue/5 rounded-full blur-3xl" />

      <motion.div
        className="container mx-auto px-6 py-32 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Social proof badge - calm, professional */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-zavi-border/50 rounded-full mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm text-zavi-gray-text font-medium">
              Trusted by 50,000+ professionals across all platforms
            </span>
          </motion.div>

          {/* Sharp, confident headline - single statement */}
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 text-zavi-charcoal tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Speak naturally.
            <br />
            <span className="text-zavi-blue">Get professional writing.</span>
          </motion.h1>

          {/* Clean, single-line subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-zavi-gray-text mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            AI-powered voice writing that understands intent, not just words. Works everywhere you write.
          </motion.p>

          {/* Clean, professional CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <motion.button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-10 py-4 text-base font-semibold text-white bg-zavi-blue rounded-xl hover:bg-zavi-blue-500 transition-all shadow-sm hover:shadow-md"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Free
            </motion.button>

            <motion.button
              onClick={() => {
                const demoSection = document.querySelector('[data-section="demo"]');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-10 py-4 text-base font-semibold text-zavi-charcoal border border-zavi-border rounded-xl hover:border-zavi-blue/50 hover:bg-zavi-blue/5 transition-all"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              See How It Works
            </motion.button>
          </motion.div>

          {/* Trust indicators - minimal */}
          <motion.p
            className="text-sm text-zavi-gray-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            No credit card required · Works across Mac, Windows, Linux, iOS, and Android
          </motion.p>
        </div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        style={{ opacity: scrollOpacity }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-zavi-gray-text/40"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3V13M8 13L4 9M8 13L12 9"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
