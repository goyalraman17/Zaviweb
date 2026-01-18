'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

export default function KillYourKeyboard() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#F8F7FC] via-[#FDF7FB] to-[#F7FBFD]">
      <div className="container-large relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerSlow}
          className="text-center"
        >
          {/* Headline */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-[#1a1a1a]"
            variants={fadeUpLarge}
            style={{ lineHeight: 1.1 }}
          >
            Kill Your Keyboard. Forever.
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-12"
            variants={fadeUp}
          >
            Speak naturally. Sound professional everywhere.
          </motion.p>

          {/* Product Demo Image */}
          <motion.div
            variants={fadeUp}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="relative rounded-3xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
              <Image
                src="/hero-screenshot.svg"
                alt="Zavi AI voice-to-text transformation"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {/* Smart Editing */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#E8E5F5] flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#5a6fd4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeWidth="1.5"/>
                  <path d="M8 12h8" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Editing</h3>
              <p className="text-gray-600">Filler out. Clarity in.</p>
            </div>

            {/* 100+ Languages */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#E8E5F5] flex items-center justify-center mb-4">
                <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="28" fill="#5a6fd4" fillOpacity="0.2" stroke="#5a6fd4" strokeWidth="2"/>
                  <circle cx="32" cy="32" r="20" fill="none" stroke="#5a6fd4" strokeWidth="1.5"/>
                  <ellipse cx="32" cy="32" rx="8" ry="20" fill="none" stroke="#5a6fd4" strokeWidth="1.5"/>
                  <path d="M10 32h44M32 10v44" stroke="#5a6fd4" strokeWidth="1.5"/>
                  {/* Mini flags representation */}
                  <circle cx="18" cy="18" r="3" fill="#DC2626"/>
                  <circle cx="46" cy="18" r="3" fill="#16A34A"/>
                  <circle cx="18" cy="46" r="3" fill="#2563EB"/>
                  <circle cx="46" cy="46" r="3" fill="#F59E0B"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100+ Languages</h3>
              <p className="text-gray-600">Automatically detected.</p>
            </div>

            {/* Instant Translation */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#E8E5F5] flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#5a6fd4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
                  <path d="M12 14l-3-3m0 0l3-3m-3 3h8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Translation</h3>
              <p className="text-gray-600">One voice. Any language.</p>
            </div>

            {/* Works Everywhere */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#E8E5F5] flex items-center justify-center mb-4 relative">
                {/* App icons grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="w-4 h-4 rounded bg-[#5a6fd4]"></div>
                  <div className="w-4 h-4 rounded bg-[#7c3aed]"></div>
                  <div className="w-4 h-4 rounded bg-[#2563eb]"></div>
                  <div className="w-4 h-4 rounded bg-[#059669]"></div>
                </div>
                {/* Shield/checkmark overlay */}
                <svg className="w-6 h-6 text-[#16A34A] absolute -top-1 -right-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Works Everywhere</h3>
              <p className="text-gray-600">Every app. No setup.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
