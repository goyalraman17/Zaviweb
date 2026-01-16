'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const LANGUAGES = [
  { name: 'Hindi', code: 'HI', flag: '🇮🇳' },
  { name: 'Portuguese', code: 'PT', flag: '🇧🇷' },
  { name: 'Spanish', code: 'ES', flag: '🇪🇸' },
  { name: 'French', code: 'FR', flag: '🇫🇷' },
  { name: 'German', code: 'DE', flag: '🇩🇪' },
  { name: 'Chinese', code: 'ZH', flag: '🇨🇳' },
  { name: 'Japanese', code: 'JA', flag: '🇯🇵' },
  { name: 'Korean', code: 'KO', flag: '🇰🇷' },
];

export default function LanguageUnlock() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-br from-zavi-blue/5 via-purple-50/30 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeUpLarge}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zavi-charcoal mb-6 leading-tight">
              Think in Your Language.
              <br />
              <span className="text-zavi-blue">Send in Perfect English.</span>
            </h2>
            <p className="text-xl md:text-2xl text-zavi-gray-text max-w-3xl mx-auto">
              Speak naturally in Hindi, Portuguese, or any language.
              <br />
              <span className="text-zavi-charcoal font-semibold">
                Zavi preserves intent and delivers professional English instantly.
              </span>
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl border border-zavi-border/50 p-12 shadow-xl"
            variants={fadeUp}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-zavi-gray-text uppercase tracking-wide mb-4">
                  Input (Your Language)
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {LANGUAGES.map((lang) => (
                    <div
                      key={lang.code}
                      className="flex flex-col items-center gap-2 p-3 bg-zavi-paper rounded-xl hover:bg-zavi-blue/5 transition-colors"
                    >
                      <span className="text-3xl">{lang.flag}</span>
                      <span className="text-xs font-medium text-zavi-charcoal">
                        {lang.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0">
                <svg
                  className="w-12 h-12 text-zavi-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-zavi-gray-text uppercase tracking-wide mb-4">
                  Output (Professional English)
                </h3>
                <div className="bg-gradient-to-br from-zavi-blue/10 to-blue-50/50 rounded-xl p-6 border border-zavi-blue/20">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">🇬🇧</span>
                    <div>
                      <p className="text-lg font-bold text-zavi-charcoal">English</p>
                      <p className="text-sm text-zavi-gray-text">Professional Quality</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-zavi-charcoal">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Intent preserved
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zavi-charcoal">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Professional tone
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zavi-charcoal">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Clear structure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="text-center text-lg text-zavi-gray-text mt-12"
            variants={fadeUp}
          >
            Break the language barrier in professional communication.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
