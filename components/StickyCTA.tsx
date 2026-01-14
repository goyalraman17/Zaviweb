'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

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
        <motion.a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full px-6 py-4 text-center text-base font-semibold text-white rounded-xl overflow-hidden shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-zavi-blue" />
          <span className="relative flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C8.89543 2 7.80254 2.21506 6.78265 2.6326C5.76276 3.05013 4.8373 3.66303 4.04942 4.4342C2.45847 6.00369 1.55556 8.15889 1.55556 10.4C1.55556 12.6411 2.45847 14.7963 4.04942 16.3658C4.8373 17.137 5.76276 17.7499 6.78265 18.1674C7.80254 18.5849 8.89543 18.8 10 18.8C12.2676 18.8 14.4428 17.9114 16.0284 16.3658C17.6139 14.8203 18.4444 12.6411 18.4444 10.4C18.4444 9.30684 18.2263 8.2243 17.8031 7.21502C17.3799 6.20574 16.7597 5.29129 15.9789 4.51586C15.1981 3.74043 14.2701 3.12511 13.2435 2.7076C12.2169 2.29009 11.1106 2.08008 10 2.08008Z" fill="currentColor" fillOpacity="0.2"/>
              <path d="M8.33333 6.93333L13.8889 10L8.33333 13.0667V6.93333Z" fill="currentColor"/>
            </svg>
            Download Free
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}
