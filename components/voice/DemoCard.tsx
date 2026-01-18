'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useState } from 'react';

export default function DemoCard() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  const examples = [
    {
      raw: "um so like i was thinking maybe we could uh meet tomorrow you know if that works for you",
      polished: "I was thinking we could meet tomorrow if that works for you."
    },
    {
      raw: "hey so basically i just wanted to say thanks for helping me out with that thing earlier",
      polished: "Thank you for your help earlier."
    },
    {
      raw: "yeah so i mean the project is going pretty well i guess we're making good progress",
      polished: "The project is progressing well and we're making good headway."
    }
  ];

  const [currentExample, setCurrentExample] = useState(0);

  return (
    <section className="px-6 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            {...fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#34384c] mb-4"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            Watch your words{' '}
            <span className="text-[#9B86BD]">transform</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="text-lg md:text-xl text-[#5A5766]"
          >
            Speak naturally, get professional results
          </motion.p>
        </motion.div>

        {/* Demo Card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-br from-[#F5F1EC] to-[#FAF8F4] rounded-3xl md:rounded-[2.5rem] p-1 shadow-xl shadow-black/5"
        >
          <div className="bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Panel - Raw Input */}
              <motion.div
                onHoverStart={() => setHoveredSide('left')}
                onHoverEnd={() => setHoveredSide(null)}
                className="relative p-8 md:p-10 lg:p-12 bg-gradient-to-br from-[#E8DFD0]/30 to-transparent"
              >
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8DFD0]/50 text-[#5A5766] text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    What you say
                  </span>
                </div>

                <motion.p
                  animate={{
                    scale: hoveredSide === 'left' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-lg md:text-xl text-[#5A5766] leading-relaxed font-light italic"
                >
                  "{examples[currentExample].raw}"
                </motion.p>

                {/* Decorative quotes */}
                <div className="absolute top-4 right-4 text-[#E8DFD0] text-6xl font-serif opacity-50">"</div>
              </motion.div>

              {/* Divider with Arrow Animation */}
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  animate={{
                    x: hoveredSide === 'right' ? 10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-full p-4 shadow-lg"
                >
                  <svg
                    className="w-8 h-8 text-[#9B86BD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <motion.path
                      animate={{
                        pathLength: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Mobile Divider */}
              <div className="md:hidden flex justify-center py-4 bg-gradient-to-r from-[#E8DFD0]/30 via-white to-[#D4C4E8]/30">
                <motion.svg
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-8 h-8 text-[#9B86BD]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>
              </div>

              {/* Right Panel - Polished Output */}
              <motion.div
                onHoverStart={() => setHoveredSide('right')}
                onHoverEnd={() => setHoveredSide(null)}
                className="relative p-8 md:p-10 lg:p-12 bg-gradient-to-br from-[#D4C4E8]/20 to-transparent"
              >
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9B86BD]/20 text-[#9B86BD] text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    What you get
                  </span>
                </div>

                <motion.p
                  animate={{
                    scale: hoveredSide === 'right' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-lg md:text-xl text-[#34384c] leading-relaxed font-medium"
                >
                  {examples[currentExample].polished}
                </motion.p>

                {/* Sparkle effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-4 right-4 text-[#9B86BD] text-3xl opacity-50"
                >
                  ✨
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Example Switcher */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-2 mt-8"
        >
          {examples.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentExample(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentExample === index
                  ? 'bg-[#9B86BD] w-8'
                  : 'bg-[#E8DFD0] hover:bg-[#9B86BD]/50'
              }`}
              aria-label={`Example ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
