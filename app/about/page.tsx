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
                className="text-5xl sm:text-6xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight"
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
                className="text-xl sm:text-2xl lg:text-4xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Re-imagining the Next Generation of Human–Computer Interaction
              </motion.p>

              {/* Animated stats */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerFast}
                className="grid grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto"
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
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      <NumberCounter target={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-gray-600 mt-2 font-medium">{stat.label}</div>
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
                className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
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
                  className="text-xl sm:text-2xl text-gray-800 leading-relaxed mb-8 font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Computing has always evolved through its input layers.
                </motion.p>

                <motion.div
                  className="space-y-6 mb-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {[
                    { icon: '⌨️', text: 'Keyboards', subtext: 'enabled personal computing.' },
                    { icon: '👆', text: 'Touch', subtext: 'unlocked mobile computing.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="text-3xl"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {item.icon}
                      </motion.div>
                      <p className="text-lg sm:text-xl text-gray-700">
                        <span className="font-semibold">{item.text}</span> {item.subtext}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  className="text-xl sm:text-2xl text-gray-900 font-semibold leading-relaxed flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎤
                  </motion.span>
                  We believe voice defines the next era.
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
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, rotateX: 20 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
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
                  className="text-xl sm:text-2xl leading-relaxed mb-6 font-light"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  But voice, as it exists today, is incomplete.
                </motion.p>
                <motion.p
                  className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  While speech recognition is nearly perfect, writing quality is not. People still do not trust voice to produce serious, professional output. As a result, the most natural interface humans have remains under-utilized for real work.
                </motion.p>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  Zavi exists to change that.
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
                  <Rocket className="w-8 h-8 text-indigo-600" />
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Our Mission</h2>
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
                className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
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
                  className="text-xl sm:text-2xl text-gray-800 leading-relaxed mb-8 font-medium relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Our mission is to make interacting with computers as natural as thinking and speaking, without sacrificing clarity, professionalism, or trust.
                </motion.p>

                <motion.div
                  className="space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed relative z-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.p variants={fadeUp}>
                    We are building the <motion.span
                      className="font-bold text-indigo-600"
                      whileHover={{ scale: 1.05 }}
                      style={{ display: 'inline-block' }}
                    >
                      Voice Writing Layer
                    </motion.span>: an input layer that converts spoken intent into high-quality written output in real time, across every app and platform.
                  </motion.p>

                  <motion.div
                    className="grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200"
                    variants={staggerContainer}
                  >
                    {['Not a dictation tool', 'Not a note-taking app'].map((text, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        className="flex items-center gap-3 text-gray-600"
                        whileHover={{ x: 5 }}
                      >
                        <motion.span
                          className="text-2xl"
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
                    className="text-2xl font-bold text-gray-900 pt-6"
                    variants={scaleIn}
                  >
                    It is input infrastructure for the AI era.
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
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Why Zavi Exists</h2>
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
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-12 shadow-2xl border border-indigo-100 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-xl sm:text-2xl text-gray-800 leading-relaxed mb-6 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Humans think and speak far faster than they type. Yet modern knowledge work still forces people to translate thoughts into text manually, spending hours each day writing emails, messages, documents, tickets, and updates.
                </motion.p>

                <motion.div
                  className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                >
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-4">
                    <span className="font-bold text-red-600">Voice promised speed, but failed on quality.</span>
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Raw speech as text introduces errors, filler, tone issues, and ambiguity. The resulting rewrite loop destroys trust, pushing users back to typing.
                  </p>
                </motion.div>

                <motion.p
                  className="text-xl sm:text-2xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Zavi removes this friction entirely by inserting intelligence before text exists, not after.
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
                className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-12 shadow-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, rotateY: 10 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated orbs */}
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Globe className="w-10 h-10 text-blue-300" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl font-bold">A Global Perspective on Language</h2>
                  </motion.div>

                  <motion.div
                    className="space-y-6 text-lg sm:text-xl leading-relaxed"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <motion.p
                      className="text-2xl font-semibold text-blue-200"
                      variants={fadeUp}
                    >
                      The world does not think in English.<br />
                      Work still demands it.
                    </motion.p>

                    <motion.p
                      className="text-gray-200"
                      variants={fadeUp}
                    >
                      For billions of people, professional writing requires mental translation, tone correction, and loss of nuance. This "fluency tax" slows individuals and limits global teams.
                    </motion.p>

                    <motion.div
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                      variants={scaleIn}
                      whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    >
                      <p className="text-xl font-semibold mb-3">
                        Zavi allows people to think in one language and work in another, preserving intent while producing clear, professional writing instantly.
                      </p>
                      <p className="text-lg text-blue-100">
                        This capability does not exist at the input layer anywhere else in the world today.
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
                  className="flex items-center justify-center gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-10 h-10 text-indigo-600" />
                  </motion.div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Built as Infrastructure, Not an App</h2>
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
                className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Zavi works wherever writing happens:
                </p>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerFast}
                >
                  {['Android', 'iOS', 'macOS', 'Windows', 'Linux'].map((platform, i) => (
                    <motion.div
                      key={platform}
                      variants={scaleIn}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center border border-indigo-100 cursor-pointer"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.3)'
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="font-semibold text-gray-900">{platform}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  className="text-lg text-gray-600 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  It functions across email, chat, documents, CRM systems, internal tools, and more.
                </motion.p>

                <motion.div
                  className="space-y-3 text-xl font-semibold text-gray-900"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.p variants={fadeUp}>No app switching.</motion.p>
                  <motion.p variants={fadeUp}>No behavior change.</motion.p>
                  <motion.p
                    className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    variants={scaleIn}
                  >
                    Zavi disappears into the workflow, becoming the default way people write.
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
                  className="flex items-center justify-center gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Users className="w-10 h-10 text-indigo-600" />
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">The Founders</h2>
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
                  <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-[0_20px_70px_-10px_rgba(99,102,241,0.3)] transition-all duration-500 relative overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />

                    <div className="flex flex-col items-center text-center mb-6 relative z-10">
                      {/* Avatar with pulse animation */}
                      <div className="relative mb-6">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-lg opacity-30"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                          className="relative w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          RG
                        </motion.div>
                      </div>

                      <motion.h3
                        className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        Raman Goyal
                      </motion.h3>
                      <motion.p
                        className="text-lg text-indigo-600 font-semibold mb-4"
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
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: '#004182',
                          boxShadow: '0 20px 25px -5px rgba(10, 102, 194, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5" />
                        Connect on LinkedIn
                      </motion.a>
                    </div>

                    <motion.div
                      className="space-y-4 text-gray-700 leading-relaxed relative z-10"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      <motion.p className="text-base sm:text-lg" variants={fadeUp}>
                        Raman leads product, go-to-market, and overall vision at Zavi.
                      </motion.p>
                      <motion.p className="text-base" variants={fadeUp}>
                        He graduated from the <span className="font-semibold text-gray-900">University of Edinburgh</span> and brings a deep obsession with building systems that feel inevitable to users. Raman has spent years thinking about how AI can move beyond tools and become foundational infrastructure that reshapes how humans interact with technology.
                      </motion.p>
                      <motion.p
                        className="text-base italic text-gray-600 border-l-4 border-indigo-500 pl-4 py-2"
                        variants={fadeUp}
                      >
                        Zavi was born from his own frustration with writing as a bottleneck to thinking speed and clarity.
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
                  <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-[0_20px_70px_-10px_rgba(139,92,246,0.3)] transition-all duration-500 relative overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />

                    <div className="flex flex-col items-center text-center mb-6 relative z-10">
                      {/* Avatar with pulse animation */}
                      <div className="relative mb-6">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg opacity-30"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                        />
                        <motion.div
                          className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          HK
                        </motion.div>
                      </div>

                      <motion.h3
                        className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        Himanshu Kumar
                      </motion.h3>
                      <motion.p
                        className="text-lg text-purple-600 font-semibold mb-4"
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
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: '#004182',
                          boxShadow: '0 20px 25px -5px rgba(10, 102, 194, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5" />
                        Connect on LinkedIn
                      </motion.a>
                    </div>

                    <motion.div
                      className="space-y-4 text-gray-700 leading-relaxed relative z-10"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      <motion.p className="text-base sm:text-lg" variants={fadeUp}>
                        Himanshu leads engineering and system architecture at Zavi.
                      </motion.p>
                      <motion.p className="text-base" variants={fadeUp}>
                        He is an alumnus of <span className="font-semibold text-gray-900">IIT Kharagpur</span>, with deep expertise in edge machine learning, low-latency systems, and real-time AI. His work focuses on solving the hardest constraint in voice computing: delivering writing-level intelligence at keyboard-level speed.
                      </motion.p>
                      <motion.p
                        className="text-base italic text-gray-600 border-l-4 border-purple-500 pl-4 py-2"
                        variants={fadeUp}
                      >
                        Zavi's hybrid architecture and real-time performance are a direct result of this systems focus.
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
                  className="flex items-center justify-center gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Target className="w-10 h-10 text-indigo-600" />
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">What We Believe</h2>
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
                className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  {[
                    'Input layers define platforms',
                    'The best technology disappears into use',
                    'Voice is inevitable, but trust is earned',
                    'Language should never limit opportunity',
                    'Quality belongs at the beginning, not the end'
                  ].map((belief, index) => (
                    <motion.li
                      key={index}
                      variants={fadeUp}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.5, rotate: 180 }}
                        transition={{ type: "spring" }}
                      />
                      <p className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed">{belief}</p>
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
                className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl text-white relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated background orbs */}
                <motion.div
                  className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
                  animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                  animate={{
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                    scale: [1.1, 1, 1.1]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Where We Are Going
                  </motion.h2>

                  <motion.div
                    className="space-y-6 text-lg sm:text-xl leading-relaxed mb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <motion.p
                      className="text-xl sm:text-2xl font-medium text-blue-200"
                      variants={fadeUp}
                    >
                      We are building Zavi to become the default input layer for written communication in the AI era.
                    </motion.p>
                    <motion.p
                      className="text-gray-200"
                      variants={fadeUp}
                    >
                      As computing becomes more conversational, Zavi ensures that clarity, professionalism, and intent are never lost.
                    </motion.p>
                    <motion.p
                      className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
                      variants={scaleIn}
                    >
                      We are just getting started.
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerFast}
                  >
                    <motion.div variants={scaleIn}>
                      <Link
                        href="/#download"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl transition-all duration-300 shadow-xl text-lg"
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
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                    <motion.div variants={scaleIn}>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 text-lg"
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Zavi
              </motion.h3>
              <motion.p
                className="text-xl sm:text-2xl text-gray-600 font-medium mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                The Voice Writing Layer
              </motion.p>
              <motion.a
                href="https://zavivoice.com"
                className="text-lg text-indigo-600 hover:text-indigo-700 font-semibold"
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
