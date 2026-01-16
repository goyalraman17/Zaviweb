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
import LiveVoiceDemoRedesign from './LiveVoiceDemoRedesign';

export default function HeroRedesign() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-zavi-paper/30 to-white pt-32 pb-16">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zavi-blue/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerSlow}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 bg-zavi-blue/5 border border-zavi-blue/20 rounded-full mb-8"
              variants={fadeUp}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zavi-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zavi-blue"></span>
              </span>
              <span className="text-xs text-zavi-charcoal font-medium uppercase tracking-wide">
                The Future of Writing
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
              variants={fadeUpLarge}
            >
              The Voice
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-blue to-purple-600">
                Writing
              </span>
              <br />
              Layer.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-zavi-gray-text mb-8 leading-relaxed max-w-xl"
              variants={fadeUp}
            >
              Speak naturally. Get clean, professional writing instantly. The most advanced way to turn thought into text.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <motion.button
                onClick={scrollToDemo}
                className="px-8 py-4 text-base font-semibold text-white bg-zavi-blue rounded-xl hover:bg-zavi-blue-500 transition-all shadow-lg hover:shadow-xl shadow-zavi-blue/30 hover:shadow-zavi-blue/40 inline-flex items-center gap-2"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Try Live Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>

              <motion.button
                onClick={() => {
                  const downloadSection = document.querySelector('[data-section="download"]');
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 text-base font-semibold text-zavi-charcoal bg-white border border-zavi-border rounded-xl hover:border-zavi-blue/30 hover:bg-zavi-blue/5 transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaSecondary}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download App
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="flex items-center gap-2"
              variants={fadeUp}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-zavi-blue/10 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs text-zavi-blue font-bold">👤</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-zavi-gray-text">
                Loved by <span className="font-semibold text-zavi-charcoal">10k+ innovators</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Demo */}
          <div ref={demoRef}>
            <LiveVoiceDemoRedesign />
          </div>
        </div>
      </div>
    </section>
  );
}
