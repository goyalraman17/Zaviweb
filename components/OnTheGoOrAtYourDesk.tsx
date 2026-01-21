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
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E8E5F5 0%, #DDD6F3 50%, #D4C5F0 100%)',
      }}
    >
      <div className="container-large relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerSlow}
          >
            {/* Main Heading */}
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6"
              variants={fadeUpLarge}
              style={{
                lineHeight: 1.15,
                background: 'linear-gradient(135deg, #4A3F8F 0%, #7B68EE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              On-the-go or at your desk
            </motion.h2>

            {/* Feature Pills */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-indigo-200 rounded-full text-sm font-semibold text-indigo-700 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Auto-Sync
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-violet-200 rounded-full text-sm font-semibold text-violet-700 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                All Devices
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-blue-200 rounded-full text-sm font-semibold text-blue-700 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure
              </span>
            </motion.div>

            {/* Platform Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8"
            >
              {/* iOS Badge */}
              <div className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-md">
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span className="text-sm font-semibold text-gray-800">iOS</span>
              </div>

              {/* Mac Badge */}
              <div className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-md">
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span className="text-sm font-semibold text-gray-800">Mac</span>
              </div>

              {/* Windows Badge */}
              <div className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-md">
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5.45v6.11l7.5.02V3.45L3 5.45zm7.5 7.68L3 13.11v6.14l7.5 1.98v-8.1zm1.5-8.1v8.12l9-.02V3.45l-9 1.58zm9 9.68l-9 .02v8.08l9 1.58v-9.68z"/>
                </svg>
                <span className="text-sm font-semibold text-gray-800">Windows</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeUp} className="mb-4 md:mb-6">
              <motion.button
                onClick={() => {
                  const downloadSection = document.querySelector('[data-section="download"]');
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, #7B68EE 0%, #9370DB 100%)',
                }}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span>Download for macOS</span>
              </motion.button>
            </motion.div>

            {/* Sync Info Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/70 backdrop-blur-sm border border-purple-200 rounded-full text-xs md:text-sm font-medium text-gray-700 shadow-sm"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Instant sync across devices
            </motion.div>
          </motion.div>

          {/* Right Side - Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* MacBook Mockup */}
              <div className="relative z-20">
                <div className="relative rounded-xl shadow-2xl overflow-hidden bg-gray-900 border-4 border-gray-800">
                  {/* Screen */}
                  <div className="aspect-[16/10] bg-white p-6">
                    {/* Zavi App Interface */}
                    <div className="flex h-full bg-gray-50 rounded-lg overflow-hidden">
                      {/* Sidebar */}
                      <div className="w-48 bg-[#2d2d3d] text-white p-4 space-y-2">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#7B68EE] to-[#9370DB] rounded"></div>
                          <span className="font-semibold">Zavi</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
                            <span>🏠</span>
                            <span>Home</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
                            <span>🔍</span>
                            <span>Search</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded bg-gray-700">
                            <span>🎙️</span>
                            <span>Record</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
                            <span>📝</span>
                            <span>My Notes</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 p-6 bg-white">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold">Daily Notes</h3>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded">🔍</button>
                            <button className="p-2 hover:bg-gray-100 rounded">⚙️</button>
                            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"></div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="border-l-4 border-purple-500 pl-4">
                            <h4 className="font-bold text-base mb-2">Starlight Product Launch</h4>
                            <p className="text-xs text-gray-500 mb-3">📅 Today team is excited. Clarify def on unclear</p>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <span className="text-purple-500">📄</span>
                                <span>update proposal deck</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-purple-500">📄</span>
                                <span>finalize pricing plan</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-purple-500">📄</span>
                                <span>book demo meeting</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Keyboard */}
                  <div className="h-8 bg-gray-800"></div>
                </div>
              </div>

              {/* iPhone Mockup */}
              <div className="absolute bottom-[-60px] left-[-40px] z-30 w-48">
                <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-gray-900 border-4 border-gray-800">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>

                  {/* Screen */}
                  <div className="aspect-[9/19] bg-white p-4 pt-8">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-xs mb-4">
                      <span className="font-semibold">9:41</span>
                      <div className="flex items-center gap-1">
                        <span>📶</span>
                        <span>📡</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <button className="text-lg">←</button>
                        <h3 className="text-sm font-bold flex-1">Reason</h3>
                        <button className="text-sm">⊕</button>
                      </div>
                    </div>

                    {/* Note Content */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <h4 className="font-bold text-xs mb-1">Starlight Product Launch</h4>
                      <p className="text-[10px] text-gray-500 mb-2">Today team is excited. I def on unclear</p>
                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex items-center gap-1">
                          <span>□</span>
                          <span>update proposal deck</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>□</span>
                          <span>finalize pricing plan</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>□</span>
                          <span>book demo meeting</span>
                        </div>
                      </div>
                    </div>

                    {/* Recording Bar */}
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-3 flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-1 h-8">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-full"
                            style={{
                              background: 'linear-gradient(to top, #7B68EE, #9370DB)',
                              height: `${20 + Math.random() * 60}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                      <button className="w-12 h-12 bg-gradient-to-br from-[#7B68EE] to-[#9370DB] rounded-full flex items-center justify-center text-white shadow-lg">
                        ▶
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* iPad Mockup */}
              <div className="absolute top-[80px] right-[-100px] z-10 w-80">
                <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-gray-900 border-4 border-gray-800">
                  {/* Screen */}
                  <div className="aspect-[4/3] bg-white p-6">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold">Prep Notes</h3>
                      <div className="flex items-center gap-2 text-xs">
                        <span>Feb 5</span>
                        <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Note Content */}
                    <div className="space-y-3">
                      <div className="border-l-4 border-purple-500 pl-3">
                        <h4 className="font-bold text-sm mb-2">Starlight Product Launch</h4>
                        <p className="text-xs text-gray-500 mb-3">📅 Today team is excited. Clarify def on unclear</p>
                        <div className="space-y-1.5 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <span>□</span>
                            <span>update proposal deck</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>□</span>
                            <span>finalize pricing plan</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>□</span>
                            <span>book demo meeting</span>
                          </div>
                        </div>
                      </div>

                      {/* Recording indicator */}
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-2">🎤 Zavi rec settings for optimum</p>
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <span>✉️</span>
                            <span>Gmail</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>💬</span>
                            <span>Slack</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>📝</span>
                            <span>Notion</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Platform Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 md:mt-16 lg:mt-24 text-center"
        >
          <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 font-semibold">
            Available on all platforms
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-6">
            {/* Mac */}
            <div className="flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 bg-white rounded-xl md:rounded-2xl shadow-md">
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-base font-semibold text-gray-800">Mac</span>
            </div>

            {/* iOS */}
            <div className="flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 bg-white rounded-xl md:rounded-2xl shadow-md">
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-base font-semibold text-gray-800">iOS</span>
            </div>

            {/* iPad */}
            <div className="flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 bg-white rounded-xl md:rounded-2xl shadow-md">
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span className="text-base font-semibold text-gray-800">iPad</span>
            </div>

            {/* Windows */}
            <div className="flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 bg-white rounded-xl md:rounded-2xl shadow-md">
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5.45v6.11l7.5.02V3.45L3 5.45zm7.5 7.68L3 13.11v6.14l7.5 1.98v-8.1zm1.5-8.1v8.12l9-.02V3.45l-9 1.58zm9 9.68l-9 .02v8.08l9 1.58v-9.68z"/>
              </svg>
              <span className="text-base font-semibold text-gray-800">Windows</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
