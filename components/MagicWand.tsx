'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  fadeUp,
  staggerContainer,
  staggerContainerSlow,
} from '@/lib/animations';
import GlowCard from './animated/GlowCard';

const magicExamples = [
  {
    id: 'gmail',
    app: 'Gmail',
    color: 'border-red-100',
    selected:
      'Hey, just checking if you saw this. Need the update soon because we are blocked.',
    prompt: 'Make this warmer and more professional',
    result:
      'Hi, just checking whether you had a chance to review this. We are currently blocked, so an update would be really helpful when you have a moment.',
    icon: (
      <div className="relative w-full h-full">
        <Image
          src="/icons/gmail.svg"
          alt="Gmail"
          fill
          className="object-contain filter drop-shadow-sm"
        />
      </div>
    ),
  },
  {
    id: 'slack',
    app: 'Slack',
    color: 'border-emerald-100',
    selected:
      'The release is done but there are some small things we should talk about later.',
    prompt: 'Make this shorter and clearer',
    result:
      'The release is done. A few small follow-ups still need discussion.',
    icon: (
      <div className="relative w-full h-full">
        <Image
          src="/icons/slack.svg"
          alt="Slack"
          fill
          className="object-contain filter drop-shadow-sm"
        />
      </div>
    ),
  },
];

export default function MagicWand() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const sequence = magicExamples.map((example) => example.id);
    let currentIndex = 0;

    // Start the first one immediately
    setActiveCard(sequence[0]);

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setActiveCard(sequence[currentIndex]);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [autoPlay]);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-white to-white pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-bold mb-6 shadow-sm group cursor-default"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="text-lg opacity-80"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </motion.span>
            <span className="tracking-wide uppercase text-[10px]">
              Magic Wand
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Need an edit? Use the Magic Wand.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto font-medium mb-6"
          >
            Use Magic Wand after text already exists. Highlight text anywhere
            and tell Zavi the edit you want: rewrite, translate, shorten, or
            clean it up without opening another app.
          </motion.p>

          {/* Benefit Badges */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {[
              {
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                ),
                text: 'No prompt box',
              },
              {
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                text: 'Instant rewrites',
              },
              {
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
                text: 'Knows the context',
              },
              {
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                ),
                text: 'In any text field',
              },
            ].map((badge, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="px-5 py-2.5 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/80 flex items-center gap-2.5 text-gray-800 font-bold text-xs hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <span className="text-base">{badge.icon}</span>
                <span className="tracking-tight">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainerSlow}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {magicExamples.map((item) => (
            <MagicCard
              key={item.id}
              item={item}
              isActive={activeCard === item.id}
              onActivate={() => {
                setAutoPlay(false);
                setActiveCard(item.id === activeCard ? null : item.id);
              }}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function MagicCard({
  item,
  isActive,
  onActivate,
}: {
  item: any;
  isActive: boolean;
  onActivate: () => void;
}) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (isActive) {
      setTypedText('');
      const text = item.result;
      const speed = 12;
      let currentIndex = 0;

      const typing = setInterval(() => {
        if (currentIndex <= text.length) {
          setTypedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typing);
        }
      }, speed);

      return () => clearInterval(typing);
    } else {
      setTypedText('');
    }
  }, [isActive, item.result]);

  return (
    <GlowCard glowColor="rgba(37, 99, 235, 0.4)" className="h-full">
      <motion.div
        variants={fadeUp}
        className={`
                    bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all duration-500 relative group flex flex-col min-h-[340px] overflow-hidden
                    ${isActive ? 'border-blue-400/50 ring-[12px] ring-blue-50/50' : 'border-white/60 hover:border-blue-200/50'}
                `}
      >
        {/* Visual Glow behind icons */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* App Icon - Top Right - Official Brand Style */}
        <div className="absolute top-6 right-6 w-10 h-10 transition-transform duration-300 group-hover:scale-110">
          {item.icon}
        </div>

        <div className="mt-2 mb-5 pr-12">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-sans">
            Selected text
          </p>
          <p className="text-gray-900 font-semibold text-base leading-relaxed tracking-tight">
            "{item.selected}"
          </p>
          <p className="mt-3 text-xs font-bold text-blue-600">
            Say: "{item.prompt}"
          </p>
        </div>

        {/* Interaction Zone */}
        <div className="flex-1 flex flex-col gap-0 mt-2 relative">
          {/* Floating Action Button */}
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-20">
            <button
              onClick={onActivate}
              className={`
                            flex items-center justify-center w-14 h-14 rounded-full border-4 border-white shadow-sm transition-all duration-300
                            ${
                              isActive
                                ? 'bg-gray-900 scale-105 shadow-md'
                                : 'bg-white border-2 border-gray-200 hover:bg-gray-50'
                            }
                        `}
            >
              <Image
                src="/icons/magic-wand-filled.svg"
                alt="Activate"
                width={24}
                height={24}
                className={`object-contain transition-transform duration-500 ${isActive ? 'brightness-0 invert' : 'opacity-70'} ${isActive ? 'rotate-[15deg]' : ''}`}
              />
            </button>
          </div>

          {/* Result Container */}
          <div
            className={`mt-0 flex-1 rounded-2xl border p-5 pt-9 relative overflow-hidden transition-all duration-500 md:min-h-[150px]
                    ${
                      isActive
                        ? 'bg-white border-gray-200 shadow-sm'
                        : 'bg-gray-50/50 border-gray-100'
                    }`}
          >
            {/* Static preview when not active, shows the result text so cards never look empty */}
            {!isActive && (
              <div className="opacity-60 transition-opacity duration-300 group-hover:opacity-80">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Updated text
                </p>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {item.result}
                </p>
              </div>
            )}

            {/* Content */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 w-full"
                >
                  <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                    Updated text
                  </p>
                  <p className="text-[15px] text-gray-900 leading-relaxed">
                    {typedText}
                    <span className="inline-block w-0.5 h-5 ml-0.5 align-middle bg-blue-600 animate-pulse"></span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </GlowCard>
  );
}
