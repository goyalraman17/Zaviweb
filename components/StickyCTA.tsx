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
      <div className="bg-white/95 backdrop-blur-lg border-t border-zavi-gray-200 px-6 py-4 shadow-2xl">
        <motion.a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-6 py-4 text-center text-base font-semibold text-white bg-zavi-black rounded-xl"
          whileTap={{ scale: 0.95 }}
        >
          Install on Google Play
        </motion.a>
      </div>
    </motion.div>
  );
}
