'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { Linkedin, ArrowRight, Globe, Zap, Users, Target, Sparkles, Rocket, TrendingUp } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeUpLarge = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    }
  }
};

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({ delay = 0, duration = 20, className = '' }: { delay?: number, duration?: number, className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
        x: [0, 100, 0],
        y: [0, -100, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

function NumberCounter({ target, suffix = '', duration = 2 }: { target: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ParallaxSection({ children, offset = 50 }: { children: React.ReactNode, offset?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.1], [1, 0.7]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Hero Section with Parallax */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated background orbs */}
          <FloatingOrb delay={0} duration={25} className="top-20 left-10 w-96 h-96 bg-indigo-400/30" />
          <FloatingOrb delay={2} duration={30} className="top-40 right-20 w-80 h-80 bg-purple-400/30" />
          <FloatingOrb delay={4} duration={35} className="bottom-20 left-1/3 w-72 h-72 bg-pink-400/20" />

          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              style={{ scale: scaleProgress, opacity: opacityProgress }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 px-4"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-indigo-200 rounded-full text-xs sm:text-sm font-semibold text-indigo-700 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  Voice-First
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-purple-200 rounded-full text-xs sm:text-sm font-semibold text-purple-700 shadow-sm"
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  100+ Languages
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-pink-200 rounded-full text-xs sm:text-sm font-semibold text-pink-700 shadow-sm"
                >
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                  50K+ Users
                </motion.span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                About{' '}
                <motion.span
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% auto',
                  }}
                >
                  Zavi
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                What if your voice could write better than your hands?
              </motion.p>

              {/* Animated stats */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerFast}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 max-w-3xl mx-auto px-4"
              >
                {[
                  { number: 5, suffix: '+', label: 'Platforms' },
                  { number: 100, suffix: '%', label: 'Voice Quality' },
                  { number: 1, suffix: 'B+', label: 'People Impacted' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100"
                  >
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      <NumberCounter target={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Evolution of Computing with 3D cards */}
        <ParallaxSection offset={30}>
          <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  className="flex flex-wrap items-center justify-center gap-2 mb-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerFast}
                >
                  <motion.span variants={scaleIn} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
                    ⌨️ Keyboards = PCs
                  </motion.span>
                  <motion.span variants={scaleIn} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
                    👆 Touchscreens = Smartphones
                  </motion.span>
                  <motion.span variants={scaleIn} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    🎤 Voice = Next Era
                  </motion.span>
                </motion.div>

                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Every computing revolution started with a new way to interact. Voice is next. We're building it.
                </motion.p>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* The Problem with dramatic entrance */}
        <ParallaxSection offset={40}>
          <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, rotateX: 20 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full hidden sm:block"
                    initial={{ opacity: 0, x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.p
                    variants={fadeUp}
                    className="text-lg sm:text-xl lg:text-2xl leading-relaxed"
                  >
                    You've tried voice typing. It gave you garbage.
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap gap-2 justify-center"
                  >
                    <span className="inline-flex items-center px-3 py-1.5 bg-red-500/20 border border-red-400/30 rounded-full text-sm text-red-200">
                      ❌ "um, uh, like"
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 bg-red-500/20 border border-red-400/30 rounded-full text-sm text-red-200">
                      ❌ Weird phrasing
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 bg-red-500/20 border border-red-400/30 rounded-full text-sm text-red-200">
                      ❌ Tons of editing
                    </span>
                  </motion.div>

                  <motion.p
                    variants={fadeUp}
                    className="text-base sm:text-lg lg:text-xl text-gray-300"
                  >
                    So you went back to typing. The dream died.
                  </motion.p>

                  <motion.div
                    variants={scaleIn}
                    className="pt-4"
                  >
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-xl text-lg sm:text-xl font-bold shadow-xl">
                      <Zap className="w-5 h-5" />
                      Zavi fixes this
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* Mission with staggered reveals */}
        <ParallaxSection offset={35}>
          <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-indigo-600 flex-shrink-0" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Our Mission</h2>
                </motion.div>
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.div>

              <motion.div
                className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Gradient animation background */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, #6366f1 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, #8b5cf6 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, #6366f1 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />

                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 font-semibold relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Talk naturally. Get perfect writing.
                </motion.p>

                <motion.div
                  className="space-y-6 relative z-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap justify-center gap-2"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-medium text-emerald-700">
                      ✓ No "um, uh"
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-medium text-emerald-700">
                      ✓ Perfect tone
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-medium text-emerald-700">
                      ✓ Ready to send
                    </span>
                  </motion.div>

                  <motion.p
                    variants={fadeUp}
                    className="text-base sm:text-lg lg:text-xl text-gray-700"
                  >
                    Zavi is like having a <motion.span
                      className="font-bold text-indigo-600 px-3 py-1 bg-indigo-50 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      style={{ display: 'inline-block' }}
                    >
                      professional writer
                    </motion.span> who instantly translates your spoken thoughts into crisp, clear text.
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap justify-center gap-2 pt-4"
                  >
                    <span className="inline-flex items-center px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600">
                      Not dictation
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600">
                      Not notes
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg">
                      <Zap className="w-3 h-3" />
                      Input Infrastructure
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* Why Zavi Exists */}
        <ParallaxSection offset={40}>
          <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 flex-shrink-0" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Why Zavi Exists</h2>
                </motion.div>
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-indigo-100 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.p
                    variants={fadeUp}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900"
                  >
                    Your brain: 💨 Fast
                    <br />
                    Your fingers: 🐌 Slow
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-6">
                      <div className="text-red-600 font-bold text-lg mb-2">❌ Old Voice</div>
                      <div className="space-y-1 text-sm text-red-700">
                        <div>→ "um, uh, like"</div>
                        <div>→ Weird phrasing</div>
                        <div>→ Edit everything</div>
                        <div>→ Give up, type instead</div>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 sm:p-6">
                      <div className="text-emerald-600 font-bold text-lg mb-2">✓ Zavi</div>
                      <div className="space-y-1 text-sm text-emerald-700">
                        <div>→ Understand intent</div>
                        <div>→ Perfect writing</div>
                        <div>→ Zero editing</div>
                        <div>→ Never type again</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.p
                    variants={scaleIn}
                    className="text-base sm:text-lg text-center"
                  >
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl">
                      Intelligence BEFORE text. Not after.
                    </span>
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* Global Perspective with enhanced effects */}
        <ParallaxSection offset={50}>
          <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, rotateY: 10 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated orbs */}
                <motion.div
                  className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/20 rounded-full blur-3xl"
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="flex items-center gap-2 sm:gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Globe className="w-8 sm:w-10 h-8 sm:h-10 text-blue-300 flex-shrink-0" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Your Language. Your Voice.</h2>
                  </motion.div>

                  <motion.div
                    className="space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <motion.p
                      variants={fadeUp}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-100"
                    >
                      6 billion people don't think in English.
                      <br />
                      Work forces them to.
                    </motion.p>

                    <motion.div
                      variants={fadeUp}
                      className="flex flex-wrap gap-2 justify-center"
                    >
                      <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs sm:text-sm text-white">
                        💭 Think in Hindi
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs sm:text-sm text-white">
                        ⏱️ 15 min translating
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs sm:text-sm text-white">
                        😰 Sound professional?
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 bg-red-500/30 border border-red-400/50 rounded-full text-xs sm:text-sm text-red-100 font-semibold">
                        💸 Fluency Tax
                      </span>
                    </motion.div>

                    <motion.div
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-7 border-2 border-white/30 shadow-2xl"
                      variants={scaleIn}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    >
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-semibold">
                          ✓ Think: Any language
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-full text-xs font-semibold">
                          ✓ Speak: Naturally
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-full text-xs font-semibold">
                          ✓ Get: Perfect English
                        </span>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-white mb-2">
                        Zavi breaks the fluency barrier.
                      </p>
                      <p className="text-sm sm:text-base text-blue-100">
                        First and only voice input that truly understands multilingual thinking.
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* Built as Infrastructure with platform animations */}
        <ParallaxSection offset={30}>
          <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex items-center justify-center gap-2 sm:gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-shrink-0"
                  >
                    <Zap className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-indigo-600" />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 text-center">Built as Infrastructure, Not an App</h2>
                </motion.div>
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              <motion.div
                className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-8"
                >
                  <motion.p
                    variants={fadeUp}
                    className="text-xl sm:text-2xl font-bold text-gray-900 text-center"
                  >
                    Works everywhere. That's the point.
                  </motion.p>

                  {/* Platform badges */}
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3"
                  >
                    {['📱 Android', '🍎 iOS', '💻 macOS', '🪟 Windows', '🐧 Linux'].map((platform, i) => (
                      <motion.span
                        key={platform}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-full text-sm font-semibold text-gray-800 shadow-sm cursor-pointer"
                      >
                        {platform}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* App badges */}
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap justify-center gap-2"
                  >
                    {['Gmail', 'Slack', 'Notion', 'ChatGPT', 'Salesforce', 'Linear', 'Jira', 'Docs'].map((app) => (
                      <span
                        key={app}
                        className="inline-flex items-center px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700"
                      >
                        {app}
                      </span>
                    ))}
                    <span className="inline-flex items-center px-3 py-1.5 bg-indigo-100 border border-indigo-300 rounded-full text-xs font-semibold text-indigo-700">
                      + Every App
                    </span>
                  </motion.div>

                  {/* Benefits */}
                  <motion.div
                    variants={fadeUp}
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200"
                  >
                    <div className="grid sm:grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-3xl mb-2">🚫</div>
                        <div className="text-sm font-semibold text-gray-800">No app switching</div>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="text-sm font-semibold text-gray-800">No behavior change</div>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">🎯</div>
                        <div className="text-sm font-semibold text-gray-800">Just works</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.p
                    variants={scaleIn}
                    className="text-center"
                  >
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-base sm:text-lg font-bold shadow-xl">
                      <Zap className="w-4 h-4" />
                      Talk → Perfect text → Anywhere
                    </span>
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* Founders Section with enhanced cards */}
        <ParallaxSection offset={20}>
          <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex items-center justify-center gap-2 sm:gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Users className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-indigo-600 flex-shrink-0" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">The Founders</h2>
                </motion.div>
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-8 lg:gap-12"
              >
                {/* Raman Goyal */}
                <motion.div
                  variants={fadeUpLarge}
                  className="group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 hover:shadow-[0_20px_70px_-10px_rgba(99,102,241,0.3)] transition-all duration-500 relative overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />

                    <div className="flex flex-col items-center text-center mb-6 relative z-10">
                      {/* Avatar with pulse animation */}
                      <div className="relative mb-5 sm:mb-6">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-lg opacity-30 hidden sm:block"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                          className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-indigo-100"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src="/images/team/raman.svg"
                            alt="Raman Goyal - Founder & CEO"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                            priority
                          />
                        </motion.div>
                      </div>

                      <motion.h3
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        Raman Goyal
                      </motion.h3>
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                          Founder & CEO
                        </span>
                        <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                          🎓 Edinburgh
                        </span>
                      </div>

                      <motion.a
                        href="https://www.linkedin.com/in/ramangoyal3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-sm"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: '#004182',
                          boxShadow: '0 20px 25px -5px rgba(10, 102, 194, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-4 h-4" />
                        Connect
                      </motion.a>
                    </div>

                    <motion.div
                      className="space-y-4 text-gray-700 leading-relaxed relative z-10"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">
                          Product
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">
                          Vision
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 bg-pink-50 text-pink-700 rounded-md text-xs font-medium">
                          Strategy
                        </span>
                      </motion.div>

                      <motion.p className="text-sm sm:text-base" variants={fadeUp}>
                        Built Zavi after years of frustration with voice typing. Believes your voice should be as powerful as your keyboard—actually, more powerful.
                      </motion.p>

                      <motion.div
                        variants={fadeUp}
                        className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-r-lg"
                      >
                        <p className="text-sm italic text-indigo-900 font-medium">
                          "I got tired of my fingers being the bottleneck. You shouldn't have to choose between speed and quality."
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Himanshu Kumar */}
                <motion.div
                  variants={fadeUpLarge}
                  className="group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 hover:shadow-[0_20px_70px_-10px_rgba(139,92,246,0.3)] transition-all duration-500 relative overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />

                    <div className="flex flex-col items-center text-center mb-6 relative z-10">
                      {/* Avatar with pulse animation */}
                      <div className="relative mb-5 sm:mb-6">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg opacity-30 hidden sm:block"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                        />
                        <motion.div
                          className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-purple-100"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src="/images/team/himanshu.svg"
                            alt="Himanshu Kumar - Co-founder & CTO"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                            priority
                          />
                        </motion.div>
                      </div>

                      <motion.h3
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        Himanshu Kumar
                      </motion.h3>
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          Co-founder & CTO
                        </span>
                        <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                          🎓 IIT Kharagpur
                        </span>
                      </div>

                      <motion.a
                        href="https://www.linkedin.com/in/hsyvy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-sm"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: '#004182',
                          boxShadow: '0 20px 25px -5px rgba(10, 102, 194, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-4 h-4" />
                        Connect
                      </motion.a>
                    </div>

                    <motion.div
                      className="space-y-4 text-gray-700 leading-relaxed relative z-10"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">
                          Edge ML
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 bg-pink-50 text-pink-700 rounded-md text-xs font-medium">
                          Real-time AI
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                          Architecture
                        </span>
                      </motion.div>

                      <motion.p className="text-sm sm:text-base" variants={fadeUp}>
                        Believes AI should feel instant. Built Zavi's engine to understand your voice and deliver perfect text faster than you can type it.
                      </motion.p>

                      <motion.div
                        variants={fadeUp}
                        className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded-r-lg"
                      >
                        <p className="text-sm italic text-purple-900 font-medium">
                          "Waiting kills the flow. Zavi responds instantly because your ideas can't wait."
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* What We Believe with animated bullets */}
        <ParallaxSection offset={30}>
          <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex items-center justify-center gap-2 sm:gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Target className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 text-indigo-600 flex-shrink-0" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">What We Believe</h2>
                </motion.div>
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-4 sm:space-y-6"
                >
                  {[
                    { icon: '🎯', text: 'Your thoughts deserve to be heard' },
                    { icon: '⚡', text: 'Speed without sacrifice' },
                    { icon: '🎤', text: 'Voice is the future of writing' },
                    { icon: '🌍', text: 'Your language, your way' },
                    { icon: '✨', text: 'Quality happens automatically' }
                  ].map((belief, index) => (
                    <motion.li
                      key={index}
                      variants={fadeUp}
                      className="group"
                    >
                      <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all">
                        <span className="text-2xl sm:text-3xl">{belief.icon}</span>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-800 font-semibold">{belief.text}</p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* Where We Are Going with dramatic CTA */}
        <ParallaxSection offset={40}>
          <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 rounded-3xl p-6 sm:p-10 lg:p-16 shadow-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated background orbs */}
                <motion.div
                  className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl"
                  animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-3xl"
                  animate={{
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                    scale: [1.1, 1, 1.1]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.h2
                    className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Where We're Headed
                  </motion.h2>

                  <motion.div
                    className="space-y-6 mb-8 sm:mb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <motion.p
                      variants={fadeUp}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6"
                    >
                      Soon, everyone will write with their voice.
                    </motion.p>

                    <motion.div
                      variants={fadeUp}
                      className="flex flex-wrap justify-center gap-2 mb-6"
                    >
                      <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-semibold text-white">
                        ✍️ No more slow typing
                      </span>
                      <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-semibold text-white">
                        🌍 Any language → Perfect English
                      </span>
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white/50 rounded-full text-sm font-bold text-white shadow-xl">
                        ⚡ Think fast, write faster
                      </span>
                    </motion.div>

                    <motion.div
                      variants={scaleIn}
                      className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 text-center"
                    >
                      <p className="text-xl sm:text-2xl font-bold text-white mb-2">
                        Zavi makes your voice your superpower.
                      </p>
                      <p className="text-base sm:text-lg text-blue-100">
                        Write emails, messages, docs—all by just talking. No editing. No frustration.
                      </p>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-6 sm:pt-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerFast}
                  >
                    <motion.div variants={scaleIn} className="w-full sm:w-auto">
                      <Link
                        href="/#download"
                        className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-900 font-bold rounded-xl transition-all duration-300 shadow-xl text-base sm:text-lg w-full sm:w-auto"
                      >
                        <motion.span
                          whileHover={{ x: -5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          Get Started with Zavi
                        </motion.span>
                        <motion.div
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                    <motion.div variants={scaleIn} className="w-full sm:w-auto">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 text-base sm:text-lg w-full sm:w-auto"
                      >
                        Contact Us
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </ParallaxSection>

        {/* Footer Tagline with fade-in */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Zavi
              </motion.h3>
              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                The Voice Writing Layer
              </motion.p>
              <motion.a
                href="https://zavivoice.com"
                className="text-base sm:text-lg text-indigo-600 hover:text-indigo-700 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, textDecoration: 'underline' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                zavivoice.com
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
