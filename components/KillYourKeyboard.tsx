'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const beforeText = `"Um hi Sarah, we shipped the update and I can walk you through the changes tomorrow if that works for you, let me know what time is convenient."`;

const afterLines = [
  'Hi Sarah,',
  '',
  'We shipped the update and I can walk you through the changes tomorrow if that works for you.',
  '',
  'Let me know what time is convenient.',
  '',
  'Best,',
];

export default function KillYourKeyboard() {
  const afterRef = useRef(null);
  const isInView = useInView(afterRef, { once: true, margin: '-50px' });
  const [displayedChars, setDisplayedChars] = useState(0);
  const fullAfterText = afterLines.join('\n');

  useEffect(() => {
    if (!isInView) return;
    if (displayedChars >= fullAfterText.length) return;
    const timeout = setTimeout(
      () => {
        setDisplayedChars((c) => c + 1);
      },
      15 + Math.random() * 20
    );
    return () => clearTimeout(timeout);
  }, [isInView, displayedChars, fullAfterText.length]);

  const visibleText = fullAfterText.slice(0, displayedChars);
  const showCursor = isInView && displayedChars < fullAfterText.length;

  return (
    <section
      id="how-it-works"
      className="relative py-12 md:py-28 overflow-hidden bg-gray-50"
    >
      <div className="container-large relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-14">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 md:mb-6 text-[#0a0a0a] tracking-tight text-balance"
              style={{ lineHeight: 1.1 }}
            >
              It does not just transcribe. It cleans up{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                what you said.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
              That is the difference between plain dictation and AI voice writing.
            </p>
          </div>

          {/* Before / After */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-4 md:gap-8"
          >
            {/* Before */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 relative">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Raw speech
                </span>
              </div>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed italic">
                {beforeText}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Um', 'hi', 'if that works for you', 'let me know'].map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1, textDecoration: 'line-through' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="px-2 py-0.5 bg-red-50 text-red-400 text-xs font-bold rounded-full border border-red-100 line-through"
                  >
                    {w}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* After, with typing animation */}
            <div
              ref={afterRef}
              className="bg-white rounded-2xl p-6 md:p-8 border-2 border-blue-200 relative shadow-lg shadow-blue-50"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Ready to send
                </span>
              </div>
              <div className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line min-h-[180px]">
                {visibleText}
                {showCursor && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-blue-500 ml-0.5 align-middle animate-pulse" />
                )}
              </div>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold border border-blue-100">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  &lt;200ms
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="/#download"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                document
                  .getElementById('download')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-all"
            >
              Try speaking instead of typing
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
