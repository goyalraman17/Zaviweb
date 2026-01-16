'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    <section ref={ref} className="relative py-40 md:py-56 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-zavi-paper/20 via-white to-white" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-zavi-charcoal mb-10 tracking-tighter leading-tight">
            Start now.
          </h2>

          <p className="text-2xl md:text-3xl text-zavi-gray-text mb-16 font-light max-w-2xl mx-auto leading-snug">
            Free to install. Works in seconds. No credit card.
          </p>

          <motion.button
            onClick={() => {
              const downloadSection = document.querySelector('[data-section="download"]');
              if (downloadSection) {
                downloadSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-14 py-6 text-xl font-semibold text-white bg-zavi-blue rounded-2xl hover:bg-zavi-blue-500 transition-colors shadow-sm"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Download for {detectedOS}
          </motion.button>

          <motion.p
            className="text-sm text-zavi-gray-text mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Mac · Windows · Linux · iOS · Android
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
