'use client';

import { motion } from 'framer-motion';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';
import RevealOnScroll from './animated/RevealOnScroll';

export default function KillYourKeyboard() {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
      <div className="container-large relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
          className="text-center"
        >
          {/* Main Heading */}
          <RevealOnScroll direction="bottom" duration={0.8}>
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 text-[#1a1a1a]"
              variants={fadeUpLarge}
              style={{ lineHeight: 1.15 }}
            >
              Kill Your Keyboard. Forever.
            </motion.h2>
          </RevealOnScroll>

          {/* Feature Pills */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-semibold text-blue-700 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Removes Fillers
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-50 border border-sky-200 rounded-full text-sm font-semibold text-sky-700 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Perfect Grammar
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-semibold text-emerald-700 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant Polish
            </span>
          </motion.div>

          {/* Demo Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-5xl mx-auto mb-20"
          >
            <div
              className="relative rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
              style={{
                background: 'linear-gradient(135deg, #E8E5F5 0%, #F5E8F0 100%)',
              }}
            >
              {/* Email Interface Mock */}
              <div className="p-6 md:p-10 lg:p-12">
                {/* macOS-style window controls */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]"></div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-300">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                </div>

                {/* Email Header with Draft Label */}
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm w-12">To:</span>
                      <div className="h-4 bg-white/60 rounded w-32"></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gray-600 text-sm w-12">Cc:</span>
                      <div className="flex items-center gap-2">
                        {/* Removed Filler Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-sm font-medium shadow-md">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M15 9l-6 6M9 9l6 6" />
                          </svg>
                          <span>Removed Filler</span>
                        </div>
                        <span className="text-xs text-gray-600 italic">(uh, yeah, like, um, idk)</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 italic">draft</span>
                </div>

                {/* Before/After Comparison */}
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                  {/* Before Text */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 relative">
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      uh yeah so like we should probably tell Jenny from legal about the NDA um being not ready yet or maybe she did send it idk
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="hidden md:block">
                      <svg className="w-12 h-12 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="md:hidden">
                      <svg className="w-8 h-8 text-[#2563EB] transform rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* After Text */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 relative">
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      Let&apos;s inform Jenny from Legal that the NDA is not yet finalized, or check if she has already sent it.
                    </p>
                  </div>
                </div>

                {/* Fixed Phrasing Badge */}
                <div className="flex justify-center mt-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-sm font-medium shadow-md">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    <span>Fixed Phrasing</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto"
          >
            {/* Smart Editing */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                <div className="relative">
                  <svg className="w-10 h-10 text-[#5381d2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 003 3 3 3 0 00-3 3 3 3 0 00-3-3 3 3 0 003-3z" />
                    <path d="M19 11a3 3 0 003 3 3 3 0 00-3 3 3 3 0 00-3-3 3 3 0 003-3z" />
                    <path d="M5 17a3 3 0 003 3 3 3 0 00-3 3 3 3 0 00-3-3 3 3 0 003-3z" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#5381d2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Editing</h3>
              <p className="text-gray-600">Filter out. Clarity in.</p>
            </div>

            {/* 100+ Languages */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center relative">
                {/* Globe with flags */}
                <svg className="w-10 h-10 text-[#5381d2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                {/* Mini flag decorations */}
                <div className="absolute -top-1 -right-1 w-4 h-3 rounded-sm bg-gradient-to-br from-red-500 to-red-600 border border-white"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-3 rounded-sm bg-gradient-to-br from-green-500 to-green-600 border border-white"></div>
                <div className="absolute top-1 -left-1 w-4 h-3 rounded-sm bg-gradient-to-br from-blue-500 to-blue-600 border border-white"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100+ Languages</h3>
              <p className="text-gray-600">Automatically detected.</p>
            </div>

            {/* Instant Translation */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-[#5381d2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 8h6m-3-3v6M3 12a9 9 0 019-9" />
                  <path d="M16 16l1.5-1.5M21.5 8.5l-3-3-3 3" />
                  <path d="M21 12a9 9 0 01-9 9" />
                  <path d="M8 16l6-6" />
                  <path d="M12 20l-3-3 3-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Translation</h3>
              <p className="text-gray-600">One voice. Any language.</p>
            </div>

            {/* Works Everywhere */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center relative">
                {/* Shield with app icons */}
                <svg className="w-10 h-10 text-[#5381d2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {/* Mini app icons around shield */}
                <div className="absolute -top-1 right-2 w-3 h-3 rounded-sm bg-gradient-to-br from-blue-500 to-blue-600 border border-white"></div>
                <div className="absolute top-3 -right-1 w-3 h-3 rounded-sm bg-gradient-to-br from-green-500 to-green-600 border border-white"></div>
                <div className="absolute -bottom-1 left-2 w-3 h-3 rounded-sm bg-gradient-to-br from-blue-500 to-blue-600 border border-white"></div>
                <div className="absolute bottom-3 -left-1 w-3 h-3 rounded-sm bg-gradient-to-br from-orange-500 to-orange-600 border border-white"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Works Everywhere</h3>
              <p className="text-gray-600">Every app. No setup.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
