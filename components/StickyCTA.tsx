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
          href="/try-free"
          className="group relative block w-full px-6 py-4 text-center text-base font-semibold text-white rounded-xl overflow-hidden shadow-lg"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={ctaPrimary}
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-zavi-blue" />
          <span className="relative flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Try Zavi Free
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}
