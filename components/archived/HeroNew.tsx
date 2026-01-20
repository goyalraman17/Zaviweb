'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
  ctaSecondary,
} from '@/lib/animations';
import LiveVoiceDemo from './LiveVoiceDemo';

export default function HeroNew() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-zavi-paper/30 to-white pt-24 pb-16">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zavi-blue/5 via-transparent to-transparent" />
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-zavi-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
        >
          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-zavi-charcoal tracking-tight leading-[1.05]"
            variants={fadeUpLarge}
          >
            Stop Rewriting What<br />You Just Said.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-zavi-gray-text mb-4 max-w-4xl mx-auto leading-relaxed font-light"
            variants={fadeUp}
          >
            Zavi turns messy speech into clear, professional writing instantly.
            <br />
            <span className="text-zavi-charcoal font-normal">No fixing. No editing. No second pass.</span>
          </motion.p>

          {/* Reinforcement */}
          <motion.p
            className="text-lg md:text-xl text-zavi-blue font-semibold mb-12"
            variants={fadeUp}
          >
            Speak once. Send immediately.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <motion.button
              onClick={scrollToDemo}
              className="px-10 py-5 text-lg font-bold text-white bg-zavi-blue rounded-2xl hover:bg-zavi-blue-500 transition-all shadow-xl hover:shadow-2xl shadow-zavi-blue/30 hover:shadow-zavi-blue/40"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaPrimary}
              style={{ willChange: 'transform' }}
            >
              Start Speaking
              <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-10 py-5 text-lg font-semibold text-zavi-charcoal bg-white border-2 border-zavi-border rounded-2xl hover:border-zavi-blue/30 hover:bg-zavi-blue/5 transition-all shadow-lg hover:shadow-xl"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaSecondary}
            >
              Download Zavi
              <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Live Demo Section */}
        <div ref={demoRef} className="scroll-mt-24">
          <LiveVoiceDemo />
        </div>
      </div>
    </section>
  );
}
