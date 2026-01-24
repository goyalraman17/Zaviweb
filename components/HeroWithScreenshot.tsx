'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';
import { analytics } from '@/lib/analytics';
import VoiceDemoCard from './VoiceDemoCard';
import FloatingElements from './animated/FloatingElements';
import TextReveal from './animated/TextReveal';
import GridPattern from './animated/GridPattern';
import MorphingBlob from './animated/MorphingBlob';

export default function HeroWithScreenshot() {
  const [detectedOS, setDetectedOS] = useState<string>('Unknown');

  // Detect OS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) setDetectedOS('macOS');
      else if (userAgent.includes('win')) setDetectedOS('Windows');
      else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('iOS');
      else if (userAgent.includes('android')) setDetectedOS('Android');
      else if (userAgent.includes('linux')) setDetectedOS('Linux');
      else setDetectedOS('Unknown');
    }
  }, []);

  // Get download text based on detected OS
  const getDownloadText = () => {
    if (detectedOS === 'Android') return 'Download Free';
    return 'Get Early Access';
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-32 pb-16 md:pb-20 bg-white">
      {/* Grid Pattern Background */}
      <GridPattern className="opacity-30" width={60} height={60} strokeWidth={0.5} />

      {/* Morphing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-20">
        <MorphingBlob duration={15} color="rgba(37, 99, 235, 0.3)" />
      </div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 opacity-15">
        <MorphingBlob duration={20} color="rgba(59, 130, 246, 0.3)" />
      </div>

      {/* Floating Elements */}
      <FloatingElements count={6} />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-zavi-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zavi-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-zavi-blue-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container-large relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Simplified Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerSlow}
            className="text-center mb-12"
          >
            {/* Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] mb-6"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              Your Voice.<br />
              <motion.span
                className="bg-gradient-to-r from-zavi-blue-600 via-zavi-blue-400 to-zavi-blue-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Perfectly Written.
              </motion.span>
            </motion.h1>

            {/* Process Visual - Replaces sub-headline */}
            <motion.div
              className="flex items-center justify-center gap-4 md:gap-8 mb-12"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-zavi-blue-600 shadow-sm border border-blue-100 relative group">
                  <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-tighter">Speak</span>
              </div>

              <motion.div
                className="text-zavi-blue-300"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-zavi-blue-600 to-zavi-blue-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200 relative">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.455l.259-1.036.259 1.036a3.375 3.375 0 002.455 2.455l1.035.259-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-zavi-blue-600 uppercase tracking-tighter">Analyze</span>
              </div>

              <motion.div
                className="text-zavi-blue-300"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-zavi-blue-600 shadow-sm border border-blue-100">
                  <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-tighter">Write</span>
              </div>
            </motion.div>

            {/* Main CTA */}
            <motion.div
              variants={fadeUp}
              className="mb-12 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 100 }}
            >
              {/* Floating App Icons around CTA */}
              <motion.div
                className="absolute -left-12 top-0 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 hidden lg:flex"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#EA4335]">
                  <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </motion.div>
              <motion.div
                className="absolute -right-12 bottom-0 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 hidden lg:flex"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#4A154B]">
                  <path fill="currentColor" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                </svg>
              </motion.div>

              <motion.a
                href="/#download"
                onClick={(e) => {
                  e.preventDefault();
                  analytics.track('cta_hero_click', {
                    text: getDownloadText(),
                    os: detectedOS,
                  });
                  const downloadSection = document.getElementById('download');
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="relative inline-flex items-center gap-3 px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-zavi-blue-600 to-zavi-blue-500 rounded-2xl transition-all shadow-2xl overflow-hidden group"
                initial="rest"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-zavi-blue-600 to-zavi-blue-500 opacity-0 group-hover:opacity-75 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />

                <motion.svg
                  className="w-6 h-6 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </motion.svg>
                <span className="relative z-10">{getDownloadText()}</span>
              </motion.a>
            </motion.div>

            {/* Feature Ribbon - Consolidated */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-16 px-4 py-6 bg-slate-50/50 backdrop-blur-sm rounded-3xl border border-slate-100 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-600 border border-emerald-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 leading-tight">Privacy First</p>
                  <p className="text-[11px] text-slate-500 font-medium">Safe & Encrypted</p>
                </div>
              </div>

              <div className="w-px h-8 bg-slate-200 hidden md:block" />

              <div className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-zavi-blue-600 border border-blue-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 leading-tight">Auto-Clean</p>
                  <p className="text-[11px] text-slate-500 font-medium">Removes Fillers</p>
                </div>
              </div>

              <div className="w-px h-8 bg-slate-200 hidden md:block" />

              <div className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-500 border border-amber-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 leading-tight">Instant Format</p>
                  <p className="text-[11px] text-slate-500 font-medium">Ready to Use</p>
                </div>
              </div>

              <div className="w-px h-8 bg-slate-200 hidden md:block" />

              <div className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600 border border-indigo-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 leading-tight">Works Anywhere</p>
                  <p className="text-[11px] text-slate-500 font-medium">All Your Apps</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Live Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <VoiceDemoCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
