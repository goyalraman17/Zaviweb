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
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-zavi-paper/50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zavi-blue/8 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-zavi-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        className="container mx-auto px-6 py-32 relative z-10"
        style={{ opacity, scale, y }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-zavi-border/60 rounded-full mb-10 shadow-sm"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-zavi-gray-text font-medium">
              Trusted by 50,000+ professionals
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 text-zavi-charcoal tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Speak Naturally and Get
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-blue to-blue-600">Professional Text Everywhere</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-zavi-gray-text mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            AI-powered voice writing that understands intent, not just words. Works everywhere you write.
          </motion.p>

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
              className="btn-primary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Free
              <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => {
                const demoSection = document.querySelector('[data-section="demo"]');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-secondary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              See How It Works
              <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.p
            className="text-sm text-zavi-gray-text/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="mx-3 text-zavi-border">·</span>
            <span>Works across Mac, Windows, Linux, iOS, and Android</span>
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        style={{ opacity: scrollOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-14 rounded-full border-2 border-zavi-border/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-zavi-blue/60"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
