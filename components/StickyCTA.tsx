'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateVisibility = () => {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling down 800px, hide when near bottom (last 600px)
      const showThreshold = 800;
      const hideThreshold = documentHeight - windowHeight - 600;

      setIsVisible(currentScroll > showThreshold && currentScroll < hideThreshold);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility);
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
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-white/95 backdrop-blur-lg border-t border-zavi-border px-6 py-4 shadow-2xl">
        <motion.button
          onClick={() => {
            const downloadSection = document.querySelector('[data-section="download"]');
            if (downloadSection) {
              downloadSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group relative block w-full px-6 py-4 text-center text-base font-semibold text-white rounded-xl overflow-hidden shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-zavi-blue" />
          <span className="relative flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 13v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-4M5 8l5 5 5-5M10 13V1"/>
            </svg>
            Download Free
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
