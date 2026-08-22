'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { analytics } from '@/lib/analytics';
import { detectPlatform, getDownloadLabel } from '@/lib/platform';
import { handlePlatformDownloadFlow } from '@/lib/clientDownloadFlow';
import type { DetectedPlatform } from '@/lib/platform';

const bars = [10, 24, 38, 18, 31, 14, 42, 25, 12, 34, 20, 28, 11];

export default function FinalCTA() {
  const [platform, setPlatform] = useState<DetectedPlatform>('Unknown');

  useEffect(() => {
    setPlatform(
      detectPlatform({
        userAgent: navigator.userAgent,
        maxTouchPoints: navigator.maxTouchPoints,
      })
    );
  }, []);

  const label = getDownloadLabel(platform, { fallback: 'Download Zavi free' });

  return (
    <section className="bg-[#f3f1eb] px-4 pb-8 sm:px-6 sm:pb-12">
      <motion.div
        initial={{ opacity: 0.86, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.7rem] bg-[#151716] px-6 py-20 text-center text-white sm:px-10 sm:py-28 lg:py-36"
      >
        <motion.div
          className="absolute left-[10%] top-[-25%] h-96 w-96 rounded-full bg-blue-500/15 blur-[100px]"
          animate={{ x: [0, 100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-40%] right-[5%] h-[430px] w-[430px] rounded-full bg-emerald-400/10 blur-[110px]"
          animate={{ x: [0, -80, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
            Your keyboard can rest
          </p>
          <h2 className="mt-6 text-5xl font-black tracking-[-0.045em] sm:text-6xl lg:text-8xl">
            Say it. Send it.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400 sm:text-xl">
            One install. Every app. Polished writing at the speed of your voice.
          </p>

          <button
            type="button"
            onClick={() => {
              analytics.track('cta_final_click', { platform });
              handlePlatformDownloadFlow(platform, {
                fallbackHref: '/#download',
              });
            }}
            className="group mt-10 inline-flex items-center gap-4 rounded-2xl bg-white px-8 py-4 text-base font-black text-slate-950 shadow-2xl transition hover:-translate-y-1 sm:px-10 sm:py-5 sm:text-lg"
          >
            {label}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          <div
            className="mx-auto mt-14 flex h-[74px] w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-6 backdrop-blur-xl"
            aria-hidden="true"
          >
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-sky-200"
                animate={{ height: [6, height, 7] }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.04,
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              />
            ))}
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">
            1,000 free words daily · No card required
          </p>
        </div>
      </motion.div>
    </section>
  );
}
