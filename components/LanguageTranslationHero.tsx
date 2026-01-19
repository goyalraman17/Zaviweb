'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

export default function LanguageTranslationHero() {
  return (
    <section
      className="relative flex items-center overflow-hidden py-16 md:py-24 lg:py-32 min-h-[600px] md:min-h-[700px] lg:min-h-screen"
      style={{ background: 'linear-gradient(135deg, #E8E5F5 0%, #F5E8F0 50%, #E5F0F5 100%)' }}
    >
      <div className="container-large relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 text-[#34384c]"
            variants={fadeUpLarge}
            style={{ lineHeight: 1.15 }}
          >
            Speak in Any{' '}
            <span
              className="bg-gradient-to-r from-[#7B68EE] to-[#9370DB] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Language
            </span>
            .
          </motion.h1>

          {/* Second Line */}
          <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-[#34384c]"
            variants={fadeUpLarge}
            style={{ lineHeight: 1.15 }}
          >
            Sound Perfect in{' '}
            <span
              className="bg-gradient-to-r from-[#7B68EE] to-[#9370DB] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Another
            </span>
            .
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-[#34384c] mb-8 max-w-4xl mx-auto"
            variants={fadeUp}
          >
            Zavi rewrites your speech into polished writing instantly, across every app.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeUp} className="mb-4">
            <motion.button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-10 py-5 text-lg font-semibold text-white bg-[#5381d2] rounded-full hover:bg-[#4570c1] transition-all shadow-lg hover:shadow-xl"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaPrimary}
            >
              Download for macOS
            </motion.button>
          </motion.div>

          {/* Compatibility Text */}
          <motion.p
            className="text-sm md:text-base text-gray-600 mb-12"
            variants={fadeUp}
          >
            Works in Gmail, WhatsApp, Slack, Notion, Chrome
          </motion.p>

          {/* Demo Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-6xl mx-auto mb-12"
          >
            <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50">
              {/* Email Interface Mock */}
              <div className="p-6 md:p-8 lg:p-12">
                {/* Browser-style header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]"></div>
                </div>

                {/* Email Interface */}
                <div className="space-y-4 mb-6">
                  {/* Toolbar */}
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </button>
                  </div>

                  {/* Email Fields */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm w-12">To:</span>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm w-12">Cc:</span>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                  </div>
                </div>

                {/* Translation Demo - Two Columns */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                  {/* Left: Original Hindi Text */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-blue-100">
                    <div className="space-y-3 text-left">
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        haan haan client ko batana hai proposal approve ho gaya hai aur hum next phase start kar sakte hain umm
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <svg className="w-12 h-12 text-[#5381d2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Mobile Arrow */}
                  <div className="flex md:hidden items-center justify-center py-2">
                    <svg className="w-8 h-8 text-[#5381d2] transform rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Right: Translated English Text */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-green-100">
                    <div className="space-y-3 text-left">
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        The proposal has been approved, and we can proceed with the next phase.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Audio Waves */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-30 hidden lg:block">
              <div className="flex items-end gap-1 h-32">
                {[3, 5, 2, 6, 4, 7, 3, 5, 2, 6, 4, 3].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#5381d2] to-[#7B68EE] rounded-full"
                    style={{ height: `${height * 10}%` }}
                    animate={{
                      height: [`${height * 10}%`, `${height * 15}%`, `${height * 10}%`],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* App Icons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {/* Gmail Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#EA4335"/>
                <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            {/* WhatsApp Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            {/* Slack Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M6 15a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2h2v2zm1 0a2 2 0 012-2 2 2 0 012 2v5a2 2 0 01-2 2 2 2 0 01-2-2v-5z" fill="#E01E5A"/>
                <path d="M9 6a2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2v2H9zm0 1a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2 2 2 0 012-2h5z" fill="#36C5F0"/>
                <path d="M18 9a2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2h-2V9zm-1 0a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2 2 2 0 012 2v5z" fill="#2EB67D"/>
                <path d="M15 18a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2v-2h2zm0-1a2 2 0 01-2-2 2 2 0 012-2h5a2 2 0 012 2 2 2 0 01-2 2h-5z" fill="#ECB22E"/>
              </svg>
            </div>

            {/* Notion Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" fill="#000"/>
              </svg>
            </div>

            {/* Chrome Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#fff"/>
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" fill="url(#chrome-a)"/>
                <circle cx="12" cy="12" r="4" fill="#fff"/>
                <circle cx="12" cy="12" r="3" fill="#1A73E8"/>
                <defs>
                  <radialGradient id="chrome-a">
                    <stop offset="0%" stopColor="#fff" stopOpacity=".1"/>
                    <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <span className="text-sm md:text-base text-gray-600 font-medium">
              Gmail, WhatsApp, Slack, Notion, Chrome
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
