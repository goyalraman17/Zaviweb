'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ctaPrimary, duration, easing } from '@/lib/animations';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling down 400px (mobile optimized), hide when near bottom (last 600px)
      const showThreshold = 400;
      const hideThreshold = documentHeight - windowHeight - 600;

      setIsVisible(currentScroll > showThreshold && currentScroll < hideThreshold);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: duration.base, ease: easing.smooth }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="bg-white/95 backdrop-blur-lg border-t border-zavi-border px-6 py-4 shadow-2xl">
        <motion.a
          href="/#download"
          className="group relative block w-full px-6 py-4 text-center text-base font-semibold text-white rounded-xl overflow-hidden shadow-lg"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={ctaPrimary}
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-zavi-blue" />
          <span className="relative flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Zavi Free
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}
