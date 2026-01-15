'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden bg-gradient-to-br from-zavi-blue-50 via-white to-zavi-blue-100">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-zavi-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-zavi-gold/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-zavi-charcoal mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join 50,000+ users typing 5x faster
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-zavi-gray-text mb-12 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Free to install. Works in 30 seconds. Start speaking, stop editing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <motion.a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-12 py-6 text-xl font-semibold text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-zavi-blue" />
              <div className="absolute inset-0 bg-gradient-to-r from-zavi-blue-400 to-zavi-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg className="relative" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 2C12.0222 2 10.0575 2.38664 8.22252 3.13834C6.38756 3.89005 4.71802 5.00033 3.30883 6.40952C-0.536223 10.2549 -0.536223 16.4118 3.30883 20.2571C5.71802 22.6663 8.84698 23.8333 14 23.8333C19.153 23.8333 22.282 22.6663 24.6912 20.2571C28.5365 16.4118 28.5365 10.2549 24.6912 6.40952C23.282 5.00033 21.6124 3.89005 19.7775 3.13834C17.9425 2.38664 15.9778 2 14 2Z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M11.6667 9.33334L18.6667 14L11.6667 18.6667V9.33334Z" fill="currentColor"/>
              </svg>
              <span className="relative">Download Free on Google Play</span>
            </motion.a>
          </motion.div>

          <motion.p
            className="text-sm text-zavi-gray-text mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            ⭐ 4.8/5 rating · Free · Android 8.0+ · No account required
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
