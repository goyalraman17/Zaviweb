'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

export default function FinalCTANew() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);
  const [detectedOS, setDetectedOS] = useState<string>('');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) setDetectedOS('macOS');
    else if (userAgent.includes('win')) setDetectedOS('Windows');
    else if (userAgent.includes('linux')) setDetectedOS('Linux');
    else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('iOS');
    else if (userAgent.includes('android')) setDetectedOS('Android');
    else setDetectedOS('your device');
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50"
    >
      {/* Premium background decoration with enhanced glow */}
      <div className="absolute inset-0 opacity-[0.12]">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Subtle radial glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent"></div>

      <div className="container-medium relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Headline */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.15] px-4"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #34384c 50%, #4A4D53 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            variants={fadeUpLarge}
          >
            Your Thoughts.
            <br />
            Instantly Written.
          </motion.h2>

          {/* Short declarative outcome */}
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl text-zavi-gray-700 mb-16 max-w-3xl mx-auto space-y-3 px-4"
            variants={fadeUp}
          >
            <p className="font-medium">Stop typing.</p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600">Start speaking.</p>
          </motion.div>

          {/* Single Dominant CTA */}
          <motion.div
            className="flex justify-center"
            variants={fadeUp}
          >
            <motion.a
              href="/#download"
              className="relative inline-flex items-center gap-3 px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl transition-all shadow-2xl overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-75 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
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
              <span className="relative z-10">Download Free</span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 max-w-3xl mx-auto px-4"
            variants={fadeUp}
          >
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                50K+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-zavi-gray-600 font-medium">Active users</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                5x
              </div>
              <div className="text-xs sm:text-sm md:text-base text-zavi-gray-600 font-medium">Faster writing</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                &lt;1s
              </div>
              <div className="text-xs sm:text-sm md:text-base text-zavi-gray-600 font-medium">Response time</div>
            </div>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-semibold text-slate-700 shadow-sm">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free Install
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-semibold text-slate-700 shadow-sm">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              All Platforms
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-semibold text-slate-700 shadow-sm">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              No Card
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
