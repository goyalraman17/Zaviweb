'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { analytics } from '@/lib/analytics';
import { detectPlatform, getDownloadLabel } from '@/lib/platform';
import { handlePlatformDownloadFlow } from '@/lib/clientDownloadFlow';
import type { DetectedPlatform } from '@/lib/platform';
import LiveProductDemo from './LiveProductDemo';

export default function HeroWithScreenshot() {
  const [detectedOS, setDetectedOS] = useState<DetectedPlatform>('Unknown');

  useEffect(() => {
    setDetectedOS(
      detectPlatform({
        userAgent: window.navigator.userAgent,
        maxTouchPoints: window.navigator.maxTouchPoints,
      })
    );
  }, []);

  const downloadText = getDownloadLabel(detectedOS, {
    fallback: 'Download Zavi free',
  });

  const goToDownload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    analytics.track('cta_hero_click', { text: downloadText, os: detectedOS });
    handlePlatformDownloadFlow(detectedOS, { fallbackHref: '/#download' });
  };

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-[110px]"
        animate={{
          x: ['-50%', '-44%', '-53%', '-50%'],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="container-large relative">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-600 shadow-sm backdrop-blur sm:text-sm"
            >
              <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
                ★★★★★
              </span>
              <span>5/5 on iOS & Android</span>
              <span className="text-slate-300">·</span>
              <span>#7 Product of the Day</span>
            </motion.div>

            <h1 className="mt-8 overflow-hidden pb-2 text-[3rem] font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-7xl lg:text-[6.4rem]">
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                  Speak.
                </motion.span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block text-slate-700"
                  initial={{ y: '110%', rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  Zavi writes.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-slate-600 sm:text-xl lg:text-2xl"
            >
              Talk naturally. Zavi turns your voice into polished text inside
              every app.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
              className="mt-9 flex flex-col items-center"
            >
              <a
                href="#download"
                onClick={goToDownload}
                className="inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-2xl sm:px-10 sm:py-5 sm:text-lg"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.4}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4-4 4m0 0-4-4m4 4V4"
                  />
                </svg>
                {downloadText}
              </a>
              <p className="mt-4 text-sm text-slate-500">
                Free every day · No credit card
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 sm:mt-20"
          >
            <LiveProductDemo />
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-semibold text-slate-500 sm:text-sm">
            <span>One shortcut</span>
            <span className="text-slate-200">●</span>
            <span>100+ languages</span>
            <span className="text-slate-200">●</span>
            <span>Mac, Windows, iOS & Android</span>
          </div>
        </div>
      </div>
    </section>
  );
}
