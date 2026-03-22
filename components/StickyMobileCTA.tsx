'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (roughly 600px)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[9990] md:hidden"
        >
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#0a0a0a] truncate">Zavi AI</p>
              <p className="text-[10px] text-gray-500 truncate">Free — no credit card</p>
            </div>
            <a
              href="/#download"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-shrink-0 px-5 py-2.5 text-xs font-bold text-white bg-[#0a0a0a] rounded-lg"
            >
              Install Free
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
