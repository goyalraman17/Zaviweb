'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
  ctaSecondary,
} from '@/lib/animations';

export default function HeroWithScreenshot() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-32 pb-16 md:pb-20" style={{ background: 'linear-gradient(135deg, #E8E5F5 0%, #F5E8F0 50%, #E5F0F5 100%)' }}>
      <div className="container-large relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerSlow}
          >
            {/* Headline */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-3 text-[#1a1a1a]"
              variants={fadeUpLarge}
              style={{ lineHeight: 1.15 }}
            >
              Your voice. Perfectly written. Everywhere.
            </motion.h1>

            {/* Authority Line */}
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-6 font-medium"
              variants={fadeUp}
            >
              Real-time voice to professional text.
            </motion.p>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-xl"
              variants={fadeUp}
            >
              Speak normally. Zavi removes fillers, fixes grammar, and writes clean text as you talk.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start gap-4 mb-4"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex flex-col gap-2">
                  <motion.a
                    href="/try-free"
                    className="px-8 py-4 text-base font-semibold text-white bg-[#6B7FE8] rounded-xl hover:bg-[#5a6fd4] transition-all shadow-lg hover:shadow-xl inline-block"
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    variants={ctaPrimary}
                  >
                    Start Speaking Free
                  </motion.a>
                  <span className="text-xs text-gray-600 text-center">No credit card required</span>
                </div>

                <motion.button
                  onClick={() => {
                    // Scroll to demo or open video
                  }}
                  className="px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={ctaSecondary}
                >
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.p
              variants={fadeUp}
              className="text-sm text-gray-600 mb-16 font-medium"
            >
              Trusted by 10,000+ users typing less every day
            </motion.p>

            {/* Feature Icons */}
            <motion.div variants={fadeUp} className="space-y-6">
              {/* Features Row */}
              <div className="flex flex-wrap items-center gap-8 text-center">
                {/* Say it once */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Say it once.<br />No "um" or rambling</span>
                </div>

                {/* No spelling mistakes */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">No spelling<br />mistakes</span>
                </div>

                {/* No grammar errors */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">No grammar<br />errors</span>
                </div>

                {/* Sounds like you */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
                      <line x1="10" y1="11" x2="14" y2="11" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Sounds<br />like you</span>
                </div>
              </div>

              {/* Platform Icons */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  {/* Apple */}
                  <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>

                  {/* Windows */}
                  <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5.45v6.11l7.5.02V3.45L3 5.45zm7.5 7.68L3 13.11v6.14l7.5 1.98v-8.1zm1.5-8.1v8.12l9-.02V3.45l-9 1.58zm9 9.68l-9 .02v8.08l9 1.58v-9.68z"/>
                  </svg>

                  {/* Android */}
                  <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.43 11.43 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.81 10.81 0 001 18h22a10.81 10.81 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
                  </svg>

                  <span className="text-sm font-medium text-gray-600 ml-2">Works in Gmail, WhatsApp, LinkedIn, Notes, Slack, and anywhere you type.</span>
                </div>

                {/* Privacy Trust Line */}
                <span className="text-xs text-gray-500">Your voice is not stored or shared.</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Product Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
              <Image
                src="/hero-screenshot.svg"
                alt="Zavi AI interface showing voice transcription and refinement"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
