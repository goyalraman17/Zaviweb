'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  staggerContainerSlow,
  fadeUp,
} from '@/lib/animations';
import { analytics } from '@/lib/analytics';
import GridPattern from './animated/GridPattern';

export default function HeroWithScreenshot() {
  const [detectedOS, setDetectedOS] = useState<string>('Unknown');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod') || ua.includes('mobile') || (ua.includes('mac') && navigator.maxTouchPoints > 1)) setDetectedOS('iOS');
      else if (ua.includes('android')) setDetectedOS('Android');
      else if (ua.includes('mac')) setDetectedOS('macOS');
      else if (ua.includes('win')) setDetectedOS('Windows');
      else if (ua.includes('linux')) setDetectedOS('Linux');
      else setDetectedOS('Unknown');
    }
  }, []);

  const getDownloadText = () => {
    if (detectedOS === 'Windows') return 'Download for Windows';
    if (detectedOS === 'iOS') return 'Get Zavi for iPhone';
    if (detectedOS === 'Android') return 'Get Zavi for Android';
    if (detectedOS === 'macOS') return 'Download for macOS';
    if (detectedOS === 'Linux') return 'Download for Linux';
    return 'Download Zavi Free';
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 md:pt-32 pb-10 md:pb-24 bg-white">
      <GridPattern className="opacity-20" width={60} height={60} strokeWidth={0.5} />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-b from-blue-50/60 to-transparent blur-[80px] rounded-full" />
      </div>

      <div className="container-large relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerSlow}
            className="text-center"
          >
            {/* Proof Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-600"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>5/5 on iOS & Android</span>
              <span className="text-slate-300 mx-1">|</span>
              <span>#7 Product of the Day</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[2.4rem] leading-tight sm:text-6xl lg:text-[5.5rem] font-black text-[#0a0a0a] tracking-tight mb-5 text-balance"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ lineHeight: 1.05 }}
            >
              Your personal Jarvis.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                Powered by voice.
              </span>
            </motion.h1>

            {/* Subheadline — outcome-driven, zero jargon */}
            <motion.p
              className="text-base sm:text-xl lg:text-2xl text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Zavi lives inside your keyboard. Speak to write perfect text, or command it to manage your email, Slack, and calendar — even while you sleep.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.a
                href="/#download"
                onClick={(e) => {
                  e.preventDefault();
                  analytics.track('cta_hero_click', { text: getDownloadText(), os: detectedOS });
                  document.getElementById('download')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-white bg-[#0a0a0a] rounded-2xl transition-all hover:bg-[#1a1a1a] hover:scale-[1.02] shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {getDownloadText()}
              </motion.a>
            </motion.div>

            {/* Trust Microcopy */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Set up in 30 seconds
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  1,000 free words daily
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Works inside every app
                </span>
              </div>
              <p className="text-xs text-gray-400">Android, iOS, Mac, Windows, Linux</p>
            </motion.div>

            {/* Secondary CTA */}
            <motion.a
              href="#how-it-works"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-500 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See how it works
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.a>

            {/* Live Use-Case Ticker */}
            <motion.div
              className="mt-10 sm:mt-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">What you can say right now:</p>
                <div className="space-y-3">
                  {[
                    { cmd: '"Summarize my last 5 emails and text me the urgent ones on WhatsApp."', tag: 'Background Agent' },
                    { cmd: '"Reply to Sarah saying I approve the budget. Keep it professional."', tag: 'Voice Command' },
                    { cmd: '"Translate this paragraph to Japanese and make it more formal."', tag: 'Magic Wand' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] sm:text-[15px] text-slate-700 font-medium leading-relaxed">{item.cmd}</p>
                        <span className="inline-block mt-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{item.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
