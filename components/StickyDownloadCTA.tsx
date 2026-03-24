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
      const pricingSection = document.getElementById('pricing');
      const pricingRect = pricingSection?.getBoundingClientRect();
      const pricingInView =
        pricingRect &&
        pricingRect.top < window.innerHeight - 120 &&
        pricingRect.bottom > 180;

      if (window.scrollY > 720 && !pricingInView) {
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
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[9990] hidden w-full -translate-x-1/2 justify-center px-4 md:flex">
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="pointer-events-auto w-full max-w-[420px] md:w-auto"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/80 p-1.5 shadow-[0_8px_32px_rgba(37,99,235,0.15)] backdrop-blur-2xl md:gap-2.5 md:p-2">
              {/* Social Proof / Mini Info (Desktop Only) */}
              <div className="hidden items-center space-x-2.5 pl-3 pr-1 xl:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4a3 3 0 00-3 3v4a3 3 0 006 0V7a3 3 0 00-3-3zm5 7a5 5 0 01-10 0M12 16v4m-3 0h6"
                    />
                  </svg>
                </div>
                <div className="text-[11px] font-semibold leading-tight text-slate-600">
                  <span className="text-sm font-bold text-blue-600">
                    No Credit Card
                  </span>
                  <br />
                  1,000 free words daily
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleDownload}
                className="group relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] md:px-7"
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
                <div className="relative z-10 ml-3 hidden rounded-full bg-white/20 p-1.5 transition-transform group-hover:translate-x-1 md:block">
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
