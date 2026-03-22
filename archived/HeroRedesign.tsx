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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-24 md:pt-32 pb-16 md:pb-24">
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
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-zavi-charcoal"
              variants={fadeUpLarge}
              style={{ lineHeight: 1.1 }}
            >
              Don't type,
              <br />
              just speak
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
              variants={fadeUp}
            >
              The voice-to-text AI that turns speech into clear, polished writing in every app.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start gap-4 mb-8"
            >
              <motion.button
                onClick={() => {
                  const downloadSection = document.querySelector('[data-section="download"]');
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary inline-flex items-center gap-2"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Download for free
              </motion.button>

              <motion.button
                onClick={scrollToDemo}
                className="btn-secondary inline-flex items-center gap-2"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaSecondary}
              >
                Watch in action
              </motion.button>
            </motion.div>

            {/* Platform Availability */}
            <motion.p
              className="text-sm text-gray-500"
              variants={fadeUp}
            >
              Available on Mac, Windows and iPhone / Android coming soon
            </motion.p>
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
