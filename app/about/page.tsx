'use client';

import Link from 'next/link';
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
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-indigo-100"
              >
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-900">Building the Future of Human-AI Interaction</span>
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

                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 sm:mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Every revolution in computing started with how we interact with machines.
                </motion.p>

                <motion.div
                  className="space-y-4 sm:space-y-6 mb-6 sm:mb-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {[
                    { icon: '⌨️', text: 'Keyboards', subtext: 'put computers on every desk.' },
                    { icon: '👆', text: 'Touchscreens', subtext: 'put computers in every pocket.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-3 sm:gap-4 group"
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="text-2xl sm:text-3xl flex-shrink-0"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {item.icon}
                      </motion.div>
                      <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                        <span className="font-semibold">{item.text}</span> {item.subtext}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-gray-900 font-semibold leading-relaxed flex items-center gap-2 sm:gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.span
                    className="flex-shrink-0"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎤
                  </motion.span>
                  <span>Voice is the next leap. We're making it real.</span>
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

                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl leading-relaxed mb-4 sm:mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Here's the frustrating truth:
                </motion.p>
                <motion.p
                  className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  You've tried voice typing. Maybe you dictated a text message that came out garbled. Maybe you sent an email with "um" sprinkled throughout. You fixed it by hand. Then you went back to typing.
                  <br /><br />
                  Speech recognition works beautifully. But <span className="font-semibold text-white">writing quality</span>? That's still broken. Nobody trusts voice for anything that matters.
                </motion.p>
                <motion.p
                  className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  We're fixing that. For real.
                </motion.p>
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
                  className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 sm:mb-8 font-medium relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  We're making talking to your computer feel as natural as talking to a friend—but the output? That's polished, professional, and ready to send.
                </motion.p>

                <motion.div
                  className="space-y-4 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed relative z-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.p variants={fadeUp}>
                    We're building the <motion.span
                      className="font-bold text-indigo-600"
                      whileHover={{ scale: 1.05 }}
                      style={{ display: 'inline-block' }}
                    >
                      Voice Writing Layer
                    </motion.span>—an invisible intelligence that turns your spoken thoughts into crisp, clear writing. Instantly. Everywhere.
                  </motion.p>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200"
                    variants={staggerContainer}
                  >
                    {['Not a dictation tool', 'Not a note-taking app'].map((text, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        className="flex items-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base"
                        whileHover={{ x: 5 }}
                      >
                        <motion.span
                          className="text-xl sm:text-2xl flex-shrink-0"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          ✗
                        </motion.span>
                        <span>{text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p
                    className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 pt-4 sm:pt-6"
                    variants={scaleIn}
                  >
                    It's the input layer for how humans will work in the AI era.
                  </motion.p>
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
                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Your brain moves at the speed of thought. Your fingers? Not so much.
                </motion.p>

                <motion.div
                  className="bg-white rounded-2xl p-5 sm:p-7 lg:p-8 mb-6 shadow-xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.01, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                >
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-3 sm:mb-4">
                    <span className="font-bold text-red-600">Voice was supposed to fix this.</span> But it didn't.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    Dictation gives you raw speech—full of "um," "uh," weird phrasing, and typos. You end up rewriting everything anyway. So you go back to typing. The promise dies.
                  </p>
                </motion.div>

                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Zavi doesn't transcribe your words. It understands your intent—then writes it properly the first time.
                </motion.p>
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
                    className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <motion.p
                      className="text-xl sm:text-2xl font-semibold text-blue-200"
                      variants={fadeUp}
                    >
                      Most of the world doesn't think in English.<br />
                      But work still demands it.
                    </motion.p>

                    <motion.p
                      className="text-gray-200 text-sm sm:text-base lg:text-lg"
                      variants={fadeUp}
                    >
                      Imagine having a brilliant idea in your native language—then spending 15 minutes translating it, second-guessing tone, worrying if it sounds "professional enough." Billions of people do this every single day. We call it the "fluency tax."
                    </motion.p>

                    <motion.div
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-7 border border-white/20"
                      variants={scaleIn}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    >
                      <p className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                        With Zavi, you think in your language. Speak naturally. And out comes polished, professional English.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg text-blue-100">
                        No other input layer in the world can do this.
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
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  Zavi works everywhere you write. Because that's the point.
                </p>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerFast}
                >
                  {['Android', 'iOS', 'macOS', 'Windows', 'Linux'].map((platform, i) => (
                    <motion.div
                      key={platform}
                      variants={scaleIn}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-4 text-center border border-indigo-100 cursor-pointer"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.3)'
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{platform}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Gmail. Slack. Notion. Salesforce. Your company's internal tools. Anywhere text goes, Zavi goes.
                </motion.p>

                <motion.div
                  className="space-y-2 sm:space-y-3 text-base sm:text-lg lg:text-xl font-semibold text-gray-900"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.p variants={fadeUp}>No app switching.</motion.p>
                  <motion.p variants={fadeUp}>No new workflow.</motion.p>
                  <motion.p
                    className="text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pt-2"
                    variants={scaleIn}
                  >
                    You just talk. Zavi handles the rest.
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
                          className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-2xl"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          RG
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
                      <motion.p
                        className="text-base sm:text-lg text-indigo-600 font-semibold mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        Founder & CEO
                      </motion.p>

                      <motion.a
                        href="https://www.linkedin.com/in/ramangoyal3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0A66C2] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-sm sm:text-base"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: '#004182',
                          boxShadow: '0 20px 25px -5px rgba(10, 102, 194, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        Connect on LinkedIn
                      </motion.a>
                    </div>

                    <motion.div
                      className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed relative z-10"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      <motion.p className="text-sm sm:text-base lg:text-lg" variants={fadeUp}>
                        Raman leads product, vision, and how Zavi shows up in the world.
                      </motion.p>
                      <motion.p className="text-sm sm:text-base" variants={fadeUp}>
                        A <span className="font-semibold text-gray-900">University of Edinburgh</span> grad who's obsessed with building things that feel obvious in hindsight. He's spent years thinking about how AI stops being a "tool" and starts being infrastructure—the kind you forget exists because it just works.
                      </motion.p>
                      <motion.p
                        className="text-sm sm:text-base italic text-gray-600 border-l-4 border-indigo-500 pl-3 sm:pl-4 py-2"
                        variants={fadeUp}
                      >
                        "I built Zavi because I was tired of my fingers being slower than my brain."
                      </motion.p>
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
                          className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-2xl"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          HK
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
                      <motion.p
                        className="text-base sm:text-lg text-purple-600 font-semibold mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        Co-founder & CTO
                      </motion.p>

                      <motion.a
                        href="https://www.linkedin.com/in/hsyvy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0A66C2] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-sm sm:text-base"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: '#004182',
                          boxShadow: '0 20px 25px -5px rgba(10, 102, 194, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        Connect on LinkedIn
                      </motion.a>
                    </div>

                    <motion.div
                      className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed relative z-10"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      <motion.p className="text-sm sm:text-base lg:text-lg" variants={fadeUp}>
                        Himanshu builds the engine that makes Zavi feel like magic.
                      </motion.p>
                      <motion.p className="text-sm sm:text-base" variants={fadeUp}>
                        An <span className="font-semibold text-gray-900">IIT Kharagpur</span> alum with deep expertise in edge ML, low-latency systems, and real-time AI. He's solving the hardest problem in voice: making intelligence feel instant. Not "wait for it" instant. Actually instant.
                      </motion.p>
                      <motion.p
                        className="text-sm sm:text-base italic text-gray-600 border-l-4 border-purple-500 pl-3 sm:pl-4 py-2"
                        variants={fadeUp}
                      >
                        "The hybrid architecture isn't a feature. It's why Zavi doesn't make you wait."
                      </motion.p>
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
                    'Input layers define platforms.',
                    'The best technology disappears.',
                    'Voice is inevitable. Trust is earned.',
                    'Language should never limit opportunity.',
                    'Quality belongs at the beginning, not the end.'
                  ].map((belief, index) => (
                    <motion.li
                      key={index}
                      variants={fadeUp}
                      className="flex items-start gap-3 sm:gap-4 group"
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.5, rotate: 180 }}
                        transition={{ type: "spring" }}
                      />
                      <p className="text-base sm:text-lg lg:text-2xl text-gray-800 font-medium leading-relaxed">{belief}</p>
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
                    className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <motion.p
                      className="text-lg sm:text-xl lg:text-2xl font-medium text-blue-200"
                      variants={fadeUp}
                    >
                      In five years, voice will be how most people write. And Zavi will be the reason why.
                    </motion.p>
                    <motion.p
                      className="text-gray-200 text-sm sm:text-base lg:text-lg"
                      variants={fadeUp}
                    >
                      We're not building a feature. We're building the layer that makes AI feel human—and makes humans more productive than ever.
                    </motion.p>
                    <motion.p
                      className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
                      variants={scaleIn}
                    >
                      This is just the beginning.
                    </motion.p>
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
                          whileHover={{ x: 5 }}
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
