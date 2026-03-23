'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import { detectPlatform, getDownloadLabel } from '@/lib/platform';

export default function StickyDownloadCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [detectedOS, setDetectedOS] = useState<string>('Unknown');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDetectedOS(
        detectPlatform({
          userAgent: window.navigator.userAgent,
          maxTouchPoints: window.navigator.maxTouchPoints,
        })
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 720) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    analytics.track('cta_sticky_click');
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ctaLabel = getDownloadLabel(
    detectedOS as Parameters<typeof getDownloadLabel>[0],
    {
      fallback: 'Download Zavi Free',
    }
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="pointer-events-none fixed bottom-8 left-0 z-[9990] hidden w-full justify-center px-4 md:flex">
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="pointer-events-auto w-full md:w-auto md:min-w-[480px]"
          >
            <div className="bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.15)] rounded-full p-1.5 md:p-2.5 flex flex-row items-center justify-between gap-2 md:gap-4">
              {/* Social Proof / Mini Info (Desktop Only) */}
              <div className="hidden md:flex items-center pl-4 pr-2 space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.25}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v3m0 0a9 9 0 109-9m-9 9A9 9 0 013 12m9 9V11m0 0a3 3 0 100-6 3 3 0 000 6z"
                    />
                  </svg>
                </div>
                <div className="text-xs font-semibold leading-tight text-slate-600">
                  <span className="text-sm font-bold text-blue-600">
                    5 platforms
                  </span>
                  <br />
                  1,000 free words daily
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleDownload}
                className="flex-1 md:flex-none relative overflow-hidden bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold py-2.5 md:py-3 px-4 md:px-8 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center md:justify-between group text-sm md:text-base"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10 whitespace-nowrap tracking-wide">
                  {ctaLabel}
                </span>
                <div className="ml-3 bg-white/20 p-1.5 rounded-full relative z-10 transition-transform group-hover:translate-x-1 hidden md:block">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
