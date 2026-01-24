'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Linkedin, Target, Users, Heart, Zap, Globe } from 'lucide-react';

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
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                About Zavi
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
                We're building voice input infrastructure for the next era of computing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-600 mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Zavi started with a simple observation: our brains think faster than our fingers can type. In 2023, our founders spent countless hours typing emails, messages, and documents—always feeling the frustration of their thoughts bottlenecking at the keyboard.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Voice typing existed, but it was broken. It gave you "um, uh, like" filled transcripts that needed extensive editing. It defeated the whole purpose of speed.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  So we built Zavi—not as another note-taking app, but as fundamental input infrastructure. A system that understands intent, removes fillers, fixes grammar, and delivers perfect writing from natural speech.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Mission & Vision */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-sky-50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To eliminate the gap between human thought and written communication by making voice the primary input method for professional writing.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  A world where keyboards are optional—where anyone can communicate in perfect, professional writing just by speaking naturally in any language.
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: "User First",
                  description: "Every decision starts with what's best for people using Zavi. Privacy, speed, and quality are non-negotiable."
                },
                {
                  icon: Zap,
                  title: "Move Fast",
                  description: "Ship quickly, iterate constantly. The best product comes from real-world feedback, not endless planning."
                },
                {
                  icon: Globe,
                  title: "Break Barriers",
                  description: "Language shouldn't limit anyone's ability to communicate professionally. We're building for 8 billion people."
                }
              ].map((value, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-sky-100 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">The Team</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Raman Goyal */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-blue-100 mb-4">
                    <Image
                      src="/images/team/raman.jpg"
                      alt="Raman Goyal"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Raman Goyal</h3>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      Founder & CEO
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      University of Edinburgh
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Previously built voice AI systems. Frustrated by spending hours typing when ideas came in seconds. Founded Zavi to fix this for everyone.
                  </p>

                  <a
                    href="https://www.linkedin.com/in/ramangoyal3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold rounded-xl transition-all shadow-md"
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </motion.div>

              {/* Himanshu Kumar */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-sky-100 mb-4">
                    <Image
                      src="/images/team/himanshu.jpg"
                      alt="Himanshu Kumar"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Himanshu Kumar</h3>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">
                      Co-founder & CTO
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      IIT Kharagpur
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Deep expertise in ML systems and infrastructure. Builds the technology that makes Zavi's voice-to-text transformation feel like magic.
                  </p>

                  <a
                    href="https://www.linkedin.com/in/himanshukr033"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold rounded-xl transition-all shadow-md"
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Why Now */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Now</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-600 mx-auto rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-8 shadow-lg border border-blue-100">
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Every major computing platform was defined by a new input method:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">⌨️</span>
                    <span><strong>PCs:</strong> Keyboard enabled text-based computing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">👆</span>
                    <span><strong>Smartphones:</strong> Touch made mobile computing possible</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">🎤</span>
                    <span><strong>Next Era:</strong> Voice will define the next platform</span>
                  </li>
                </ul>
                <p className="pt-4">
                  AI models are finally good enough to understand intent, not just transcribe words. Hardware is powerful enough to run this locally. The time is now.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Join Us CTA */}
        <AnimatedSection className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-sky-600">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join Us
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              We're building the future of human-computer interaction. If you're passionate about making technology more human, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-lg"
              >
                Get in Touch
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg text-lg"
              >
                Try Zavi
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}
