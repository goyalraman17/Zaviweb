'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { fadeUp, staggerContainerSlow } from '@/lib/animations';

export default function VideoDemo() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50"
    >
      <div className="container-large">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-display text-[#1a1a1a] mb-4">
              See Zavi in Action
            </h2>
            <p className="text-body-lg text-gray-700 max-w-2xl mx-auto">
              Watch how Zavi transforms your voice into polished, professional text in real-time
            </p>
          </motion.div>

          {/* Video Player Placeholder */}
          <motion.div variants={fadeUp} className="relative">
            {/* Video Container */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Play Button Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm cursor-pointer group hover:bg-black/30 transition-all duration-300"
                role="button"
                aria-label="Play Video"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  {/* Pulsing Ring */}
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />

                  {/* Play Button */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#5381d2] ml-1 fill-current" />
                  </div>
                </motion.div>
              </div>

              {/* Placeholder Content - Replace with actual video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/40">
                  <svg
                    className="w-32 h-32 mx-auto mb-4 opacity-20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="2.18" strokeWidth="1.5" />
                    <line x1="7" y1="2" x2="7" y2="22" strokeWidth="1.5" />
                    <line x1="17" y1="2" x2="17" y2="22" strokeWidth="1.5" />
                    <line x1="2" y1="12" x2="22" y2="12" strokeWidth="1.5" />
                    <line x1="2" y1="7" x2="7" y2="7" strokeWidth="1.5" />
                    <line x1="2" y1="17" x2="7" y2="17" strokeWidth="1.5" />
                    <line x1="17" y1="17" x2="22" y2="17" strokeWidth="1.5" />
                    <line x1="17" y1="7" x2="22" y2="7" strokeWidth="1.5" />
                  </svg>
                  <p className="text-sm font-medium">Video Demo Placeholder</p>
                </div>
              </div>

              {/* Gradient Overlay for Visual Polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#2563EB]/20 to-[#3B82F6]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#0EA5E9]/20 to-[#60A5FA]/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Feature Pill Badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mt-12"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-full text-sm font-semibold text-blue-700 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Real-Time Processing
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/80 backdrop-blur-sm border-2 border-sky-200 rounded-full text-sm font-semibold text-sky-700 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Natural Speech
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-full text-sm font-semibold text-blue-700 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Works Everywhere
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
