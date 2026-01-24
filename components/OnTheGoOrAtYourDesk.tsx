'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

export default function OnTheGoOrAtYourDesk() {
  return (
    <section
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-white"
    >
      <div className="container-large relative z-10 text-center">
        {/* Main Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpLarge}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
            style={{
              lineHeight: 1.2,
              color: '#1E40AF'
            }}
          >
            Work anywhere you want
          </h2>
        </motion.div>

        {/* Device Mockups - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* MacBook Mockup */}
            <div className="relative z-20">
              <div className="relative rounded-xl shadow-2xl overflow-hidden bg-gray-900 border-4 border-gray-800">
                {/* Screen */}
                <div className="aspect-[16/10] bg-white p-2 sm:p-4 md:p-6">
                  {/* Zavi App Interface */}
                  <div className="flex h-full bg-gray-50 rounded-lg overflow-hidden">
                    {/* Sidebar */}
                    <div className="hidden sm:block w-32 md:w-48 bg-[#2d2d3d] text-white p-2 md:p-4 space-y-2">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded"></div>
                        <span className="font-semibold text-xs md:text-sm">Zavi</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 p-1 md:p-2 rounded hover:bg-gray-700">
                          <span>🏠</span>
                          <span className="hidden md:inline">Home</span>
                        </div>
                        <div className="flex items-center gap-2 p-1 md:p-2 rounded bg-gray-700">
                          <span>🎙️</span>
                          <span className="hidden md:inline">Record</span>
                        </div>
                        <div className="flex items-center gap-2 p-1 md:p-2 rounded hover:bg-gray-700">
                          <span>📝</span>
                          <span className="hidden md:inline">My Notes</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-3 md:p-6 bg-white overflow-hidden text-left">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm md:text-lg font-bold">Daily Notes</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full"></div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-3 md:pl-4">
                          <h4 className="font-bold text-xs md:text-base mb-1">Starlight Product Launch</h4>
                          <p className="text-[10px] md:text-xs text-gray-500 mb-2">📅 Today's team is focused on voice AI quality</p>
                          <div className="space-y-1 md:space-y-2 text-[10px] md:text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-500">📄</span>
                              <span>finalize response engine</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-500">📄</span>
                              <span>book developer demo</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keyboard area */}
                <div className="h-4 md:h-8 bg-gray-800"></div>
              </div>
            </div>

            {/* iPhone Mockup */}
            <div className="absolute bottom-[-30px] sm:bottom-[-60px] left-[-20px] sm:left-[-40px] z-30 w-24 sm:w-32 md:w-48 lg:w-56 scale-[0.8] sm:scale-100 origin-bottom-left">
              <div className="relative rounded-[20px] sm:rounded-3xl shadow-2xl overflow-hidden bg-gray-900 border-[2px] sm:border-4 border-gray-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-32 h-3 sm:h-6 bg-gray-900 rounded-b-xl sm:rounded-b-2xl z-10"></div>

                {/* Screen */}
                <div className="aspect-[9/19] bg-white p-2 sm:p-4 pt-4 sm:pt-8 text-left">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-[8px] sm:text-xs mb-2 sm:mb-4 px-1">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <span>📶</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="mb-2 sm:mb-3 px-1">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <span className="text-xs sm:text-lg">←</span>
                      <h3 className="text-[10px] sm:text-sm font-bold flex-1">Record</h3>
                    </div>
                  </div>

                  {/* Note Content */}
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
                    <h4 className="font-bold text-[8px] sm:text-xs mb-1">Product Launch</h4>
                    <p className="text-[7px] sm:text-[10px] text-gray-500 mb-1 sm:mb-2 leading-tight">Focusing on high quality voice input for mobility...</p>
                    <div className="space-y-1 text-[7px] sm:text-[10px]">
                      <div className="flex items-center gap-1">
                        <span>□</span>
                        <span>update deck</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>□</span>
                        <span>finalize plan</span>
                      </div>
                    </div>
                  </div>

                  {/* Recording Bar */}
                  <div className="bg-gradient-to-r from-blue-100 to-sky-100 rounded-full p-1 sm:p-3 flex items-center gap-1 sm:gap-2 mb-2">
                    <div className="flex-1 flex items-center gap-0.5 sm:gap-1 h-4 sm:h-8">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full"
                          style={{
                            background: 'linear-gradient(to top, #2563EB, #3B82F6)',
                            height: `${30 + Math.random() * 60}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="flex justify-center">
                    <button className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-full flex items-center justify-center text-white shadow-lg text-xs sm:text-base">
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* iPad Mockup */}
            <div className="absolute top-[40px] sm:top-[80px] right-[-30px] sm:right-[-100px] z-10 w-40 sm:w-60 md:w-80 lg:w-96 scale-[0.8] sm:scale-100 origin-top-right">
              <div className="relative rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden bg-gray-900 border-[2px] sm:border-4 border-gray-800">
                {/* Screen */}
                <div className="aspect-[4/3] bg-white p-3 sm:p-6 text-left">
                  {/* App Header */}
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <h3 className="text-xs sm:text-base font-bold">Strategy Prep</h3>
                    <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-xs">
                      <span>Feb 2026</span>
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Note Content */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="border-l-4 border-blue-500 pl-2 sm:pl-3">
                      <h4 className="font-bold text-[10px] sm:text-sm mb-1 sm:mb-2">Starlight AI Expansion</h4>
                      <p className="text-[8px] sm:text-xs text-gray-500 mb-1 sm:mb-3">Defining the voice writing infrastructure layer</p>
                      <div className="space-y-1 sm:space-y-1.5 text-[8px] sm:text-xs text-gray-600">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span>□</span>
                          <span>Multi-language sync</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span>□</span>
                          <span>Instant formatting</span>
                        </div>
                      </div>
                    </div>

                    {/* Recording indicator */}
                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg p-2 sm:p-3">
                      <p className="text-[8px] sm:text-xs text-gray-500 mb-1 sm:mb-2">🎤 Integration partners</p>
                      <div className="flex items-center gap-2 sm:gap-3 text-[7px] sm:text-[10px]">
                        <span className="px-1.5 py-0.5 bg-white rounded border border-blue-100">Slack</span>
                        <span className="px-1.5 py-0.5 bg-white rounded border border-blue-100">Notion</span>
                        <span className="px-1.5 py-0.5 bg-white rounded border border-blue-100">Gmail</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
