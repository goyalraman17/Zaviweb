'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zavi-blue-50 via-white to-zavi-paper">
      {/* Subtle grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1A1C20 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          y: y
        }}
      />

      {/* Ambient glow - multiple layers */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-zavi-blue/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zavi-gold/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="container mx-auto px-6 py-20 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo/Icon */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
          >
            <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-zavi-border hover:border-zavi-blue transition-all duration-300">
              {/* Z wave flow icon matching app logo */}
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <defs>
                  <linearGradient id="zavi-gradient-top" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5BA4FF" />
                    <stop offset="100%" stopColor="#3D8FEB" />
                  </linearGradient>
                  <linearGradient id="zavi-gradient-flow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#85CAFF" />
                    <stop offset="50%" stopColor="#5BA4FF" />
                    <stop offset="100%" stopColor="#3D8FEB" />
                  </linearGradient>
                </defs>
                {/* Top bar */}
                <rect x="12" y="10" width="28" height="5" rx="2.5" fill="url(#zavi-gradient-top)"/>
                {/* Flowing wave */}
                <path
                  d="M 16 15 Q 20 18, 22 22 T 26 30 T 30 38"
                  stroke="url(#zavi-gradient-flow)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.9"
                />
                <path
                  d="M 22 15 Q 26 20, 28 24 T 32 32 T 36 38"
                  stroke="url(#zavi-gradient-flow)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                />
                {/* Bottom bar */}
                <rect x="12" y="37" width="28" height="5" rx="2.5" fill="url(#zavi-gradient-top)"/>
              </svg>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-zavi-charcoal tracking-tight leading-[1.2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Type 5x Faster
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-zavi-blue to-zavi-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Just by Speaking
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-zavi-gray-text mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Voice typing keyboard for Android that removes filler words, fixes grammar, and writes perfectly — in under 2 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 sm:px-10 py-4 sm:py-5 text-lg font-semibold text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-zavi-blue"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-zavi-blue-400 to-zavi-blue-600 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative flex items-center gap-3">
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                </motion.svg>
                <span>Download Free on Google Play</span>
              </span>
            </motion.a>
          </motion.div>

          <motion.p
            className="text-sm text-zavi-gray-text mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            ⭐ 4.8/5 rating · 50,000+ Android users · Free to install
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        style={{ opacity: scrollOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-zavi-gray-text cursor-pointer group"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs uppercase tracking-wider group-hover:text-zavi-blue transition-colors">See how it works</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="group-hover:text-zavi-blue transition-colors"
          >
            <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
