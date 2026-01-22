'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Linkedin, ArrowRight, Globe, Zap, Users, Target } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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

function AnimatedSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                About <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Zavi</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed">
                Re-imagining the Next Generation of Human–Computer Interaction
              </p>
            </motion.div>
          </div>
        </section>

        {/* Evolution of Computing */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
              <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed mb-8 font-light">
                Computing has always evolved through its input layers.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl text-gray-700"><span className="font-semibold">Keyboards</span> enabled personal computing.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl text-gray-700"><span className="font-semibold">Touch</span> unlocked mobile computing.</p>
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-gray-900 font-semibold leading-relaxed">
                We believe voice defines the next era.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* The Problem */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-white">
              <p className="text-xl sm:text-2xl leading-relaxed mb-6 font-light">
                But voice, as it exists today, is incomplete.
              </p>
              <p className="text-lg sm:text-xl leading-relaxed mb-6 text-gray-300">
                While speech recognition is nearly perfect, writing quality is not. People still do not trust voice to produce serious, professional output. As a result, the most natural interface humans have remains under-utilized for real work.
              </p>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Zavi exists to change that.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Mission */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full" />
            </div>
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
              <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed mb-8 font-medium">
                Our mission is to make interacting with computers as natural as thinking and speaking, without sacrificing clarity, professionalism, or trust.
              </p>
              <div className="space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed">
                <p>
                  We are building the <span className="font-bold text-indigo-600">Voice Writing Layer</span>: an input layer that converts spoken intent into high-quality written output in real time, across every app and platform.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="text-2xl">✗</span>
                    <span>Not a dictation tool</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="text-2xl">✗</span>
                    <span>Not a note-taking app</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 pt-6">
                  It is input infrastructure for the AI era.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Why Zavi Exists */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Why Zavi Exists</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-12 shadow-xl border border-indigo-100">
              <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed mb-6 font-medium">
                Humans think and speak far faster than they type. Yet modern knowledge work still forces people to translate thoughts into text manually, spending hours each day writing emails, messages, documents, tickets, and updates.
              </p>
              <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-md">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-4">
                  <span className="font-bold text-red-600">Voice promised speed, but failed on quality.</span>
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Raw speech as text introduces errors, filler, tone issues, and ambiguity. The resulting rewrite loop destroys trust, pushing users back to typing.
                </p>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                Zavi removes this friction entirely by inserting intelligence before text exists, not after.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Global Perspective */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-12 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-10 h-10 text-blue-300" />
                  <h2 className="text-3xl sm:text-4xl font-bold">A Global Perspective on Language</h2>
                </div>
                <div className="space-y-6 text-lg sm:text-xl leading-relaxed">
                  <p className="text-2xl font-semibold text-blue-200">
                    The world does not think in English.<br />
                    Work still demands it.
                  </p>
                  <p className="text-gray-200">
                    For billions of people, professional writing requires mental translation, tone correction, and loss of nuance. This "fluency tax" slows individuals and limits global teams.
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <p className="text-xl font-semibold mb-3">
                      Zavi allows people to think in one language and work in another, preserving intent while producing clear, professional writing instantly.
                    </p>
                    <p className="text-lg text-blue-100">
                      This capability does not exist at the input layer anywhere else in the world today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Built as Infrastructure */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-10 h-10 text-indigo-600" />
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Built as Infrastructure, Not an App</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full" />
            </div>
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Zavi works wherever writing happens:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
                {['Android', 'iOS', 'macOS', 'Windows', 'Linux'].map((platform) => (
                  <div key={platform} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center border border-indigo-100">
                    <p className="font-semibold text-gray-900">{platform}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                It functions across email, chat, documents, CRM systems, internal tools, and more.
              </p>
              <div className="space-y-3 text-xl font-semibold text-gray-900">
                <p>No app switching.</p>
                <p>No behavior change.</p>
                <p className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Zavi disappears into the workflow, becoming the default way people write.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Founders Section */}
        <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-10 h-10 text-indigo-600" />
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">The Founders</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 lg:gap-12"
            >
              {/* Raman Goyal */}
              <motion.div variants={fadeUp} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center mb-6">
                    {/* Avatar Circle with Gradient Border */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                        RG
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Raman Goyal</h3>
                    <p className="text-lg text-indigo-600 font-semibold mb-4">Founder & CEO</p>

                    <a
                      href="https://www.linkedin.com/in/ramangoyal3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-xl hover:bg-[#004182] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Linkedin className="w-5 h-5" />
                      Connect on LinkedIn
                    </a>
                  </div>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-base sm:text-lg">
                      Raman leads product, go-to-market, and overall vision at Zavi.
                    </p>
                    <p className="text-base">
                      He graduated from the <span className="font-semibold text-gray-900">University of Edinburgh</span> and brings a deep obsession with building systems that feel inevitable to users. Raman has spent years thinking about how AI can move beyond tools and become foundational infrastructure that reshapes how humans interact with technology.
                    </p>
                    <p className="text-base italic text-gray-600 border-l-4 border-indigo-500 pl-4 py-2">
                      Zavi was born from his own frustration with writing as a bottleneck to thinking speed and clarity.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Himanshu Kumar */}
              <motion.div variants={fadeUp} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center mb-6">
                    {/* Avatar Circle with Gradient Border */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                        HK
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Himanshu Kumar</h3>
                    <p className="text-lg text-purple-600 font-semibold mb-4">Co-founder & CTO</p>

                    <a
                      href="https://www.linkedin.com/in/hsyvy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-xl hover:bg-[#004182] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Linkedin className="w-5 h-5" />
                      Connect on LinkedIn
                    </a>
                  </div>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-base sm:text-lg">
                      Himanshu leads engineering and system architecture at Zavi.
                    </p>
                    <p className="text-base">
                      He is an alumnus of <span className="font-semibold text-gray-900">IIT Kharagpur</span>, with deep expertise in edge machine learning, low-latency systems, and real-time AI. His work focuses on solving the hardest constraint in voice computing: delivering writing-level intelligence at keyboard-level speed.
                    </p>
                    <p className="text-base italic text-gray-600 border-l-4 border-purple-500 pl-4 py-2">
                      Zavi's hybrid architecture and real-time performance are a direct result of this systems focus.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* What We Believe */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="w-10 h-10 text-indigo-600" />
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">What We Believe</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full" />
            </div>
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
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
                  <motion.li key={index} variants={fadeUp} className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed">{belief}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Where We Are Going */}
        <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">Where We Are Going</h2>
                <div className="space-y-6 text-lg sm:text-xl leading-relaxed mb-10">
                  <p className="text-xl sm:text-2xl font-medium text-blue-200">
                    We are building Zavi to become the default input layer for written communication in the AI era.
                  </p>
                  <p className="text-gray-200">
                    As computing becomes more conversational, Zavi ensures that clarity, professionalism, and intent are never lost.
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    We are just getting started.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <Link
                    href="/#download"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl text-lg"
                  >
                    Get Started with Zavi
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 text-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Footer Tagline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Zavi</h3>
              <p className="text-xl sm:text-2xl text-gray-600 font-medium mb-2">The Voice Writing Layer</p>
              <a
                href="https://zavivoice.com"
                className="text-lg text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                zavivoice.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
