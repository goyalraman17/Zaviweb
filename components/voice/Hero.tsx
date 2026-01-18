'use client';

import { motion } from 'framer-motion';
import { fadeIn, fadeUp } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F1EC] rounded-b-[3rem] px-6 py-24 md:py-32 lg:py-40">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Headline */}
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#34384c] leading-[1.1] mb-6"
          style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
        >
          Don't type,{' '}
          <span className="text-[#9B86BD] inline-block">
            just speak
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="text-lg md:text-xl lg:text-2xl text-[#5A5766] font-light max-w-2xl mx-auto mb-12"
        >
          Transform your thoughts into polished text instantly.
          Just speak naturally and watch the magic happen.
        </motion.p>

        {/* Mic Icon with Pulse */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Pulse Rings */}
            <div className="absolute inset-0 -m-4">
              <div className="w-full h-full rounded-full bg-[#9B86BD] opacity-20 animate-pulse" />
            </div>
            <div className="absolute inset-0 -m-8 animation-delay-150">
              <div className="w-full h-full rounded-full bg-[#9B86BD] opacity-10 animate-pulse" />
            </div>

            {/* Mic Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#9B86BD] to-[#7B6B99] shadow-lg shadow-[#9B86BD]/20 flex items-center justify-center group transition-all duration-300 hover:shadow-xl hover:shadow-[#9B86BD]/30"
            >
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-white group-hover:scale-110 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Call to Action Hint */}
        <motion.p
          {...fadeIn}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-sm md:text-base text-[#9B86BD] font-medium"
        >
          Click the mic to start speaking
        </motion.p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#E8DFD0] rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#B8D4C8] rounded-full blur-3xl opacity-30" />
    </section>
  );
}
