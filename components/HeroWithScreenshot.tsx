'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';
import { analytics } from '@/lib/analytics';
const VoiceDemoCard = dynamic(() => import('./VoiceDemoCard'), {
  loading: () => <div className="h-[400px] w-full bg-gray-50 animate-pulse rounded-2xl" />
});
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
      if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod') || userAgent.includes('mobile') || (userAgent.includes('mac') && navigator.maxTouchPoints > 1)) setDetectedOS('iOS');
      else if (userAgent.includes('android')) setDetectedOS('Android');
      else if (userAgent.includes('mac')) setDetectedOS('macOS');
      else if (userAgent.includes('win')) setDetectedOS('Windows');
      else if (userAgent.includes('linux')) setDetectedOS('Linux');
      else setDetectedOS('Unknown');
    }
  }, []);

  // Get download text based on detected OS
  const getDownloadText = () => {
    if (detectedOS === 'Windows') return 'Download for Windows';
    if (detectedOS === 'iOS') return 'Get Zavi for iPhone';
    if (detectedOS === 'Android') return 'Get Zavi for Android';
    if (detectedOS === 'macOS') return 'Download for macOS';
    if (detectedOS === 'Linux') return 'Download for Linux';
    return 'Try Zavi For Free';
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
              className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#1a1a1a] tracking-tight mb-6 text-balance"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
              style={{ lineHeight: 1.1 }}
            >
              Don't type, just speak
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The voice assistant that actually does the work. It executes tasks, sends emails, and types perfectly in every app.
            </motion.p>

            {/* Interactive Product Demo - Replacing static icons */}
            <motion.div
              className="max-w-3xl mx-auto mb-12 relative"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-2xl border border-gray-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100/50 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />

                {/* Simulated Input Area */}
                <div className="relative z-10 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400"></span>
                      <span className="text-sm font-semibold text-gray-500">Manual Typing vs. Zavi Voice</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Real-time Process
                    </div>
                  </div>

                  {/* The Typing Demo Component */}
                  <div className="min-h-[100px] md:min-h-[140px] flex items-center">
                    <TextReveal text="I just spoke to Zavi and it wrote this for me in 2 seconds without a single typo." />
                  </div>
                </div>

                {/* Decorative Wand Icon */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
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
              {/* Gmail */}
              <motion.div
                className="absolute -left-16 top-0 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 hidden lg:flex"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#EA4335]">
                  <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </motion.div>

              {/* Slack */}
              <motion.div
                className="absolute -right-16 bottom-0 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 hidden lg:flex"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#4A154B]">
                  <path fill="currentColor" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                </svg>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                className="absolute -left-24 bottom-4 w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center p-1.5 hidden lg:flex"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#25D366]">
                  <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.div>

              {/* ChatGPT */}
              <motion.div
                className="absolute -right-24 top-4 w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center p-1.5 hidden lg:flex"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#10a37f]">
                  <path fill="currentColor" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
                </svg>
              </motion.div>


              {/* Messenger */}
              <motion.div
                className="absolute -right-6 -bottom-12 w-8 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center p-1.5 hidden lg:flex"
                animate={{ x: [0, -5, 0], y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#0084FF]" aria-label="Messenger Icon">
                  <path fill="currentColor" d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.303 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.291 14.194l-3.21-3.43-6.27 3.43 6.898-7.331 3.281 3.431 6.199-3.431-6.898 7.331z" />
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
                className="relative inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl transition-all shadow-2xl overflow-hidden group"
                initial="rest"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.5)" }}
              >
                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 group-hover:opacity-75 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  aria-hidden="true"
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

              {/* Sub CTA text */}
              <div className="flex flex-col items-center gap-1.5 mt-4">
                <span className="text-sm text-gray-800 font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Free Forever
                  <span className="text-gray-300 mx-1">•</span>
                  No credit card
                </span>
                <span className="text-xs text-gray-500 font-medium mt-1">
                  Available on Mac, Windows, Linux, iOS and Android
                </span>
              </div>
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
                  <p className="text-[11px] text-slate-500 font-medium">Works in all apps</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Live Interactive Demo */}
          <motion.div
            id="how-it-works"
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
