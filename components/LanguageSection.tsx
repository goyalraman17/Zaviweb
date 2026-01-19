'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const LANGUAGE_FLOWS = [
  {
    input: { flag: '🇮🇳', name: 'Hindi', example: 'आज मीटिंग में...' },
    output: { flag: '🇬🇧', name: 'English', text: 'In today\'s meeting, we discussed the quarterly targets and agreed to increase our marketing budget by 15%.' },
  },
  {
    input: { flag: '🇪🇸', name: 'Spanish', example: 'Necesitamos hablar sobre...' },
    output: { flag: '🇬🇧', name: 'English', text: 'We need to discuss the project timeline and ensure all stakeholders are aligned on the deliverables.' },
  },
  {
    input: { flag: '🇧🇷', name: 'Portuguese', example: 'Gostaria de informar que...' },
    output: { flag: '🇬🇧', name: 'English', text: 'I would like to inform you that the proposal has been approved and we can proceed with the next phase.' },
  },
];

export default function LanguageSection() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-white to-zavi-paper/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Heading */}
          <div className="text-center mb-8 md:mb-12 lg:mb-20">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zavi-charcoal mb-4 md:mb-6 lg:mb-8 leading-[1.1]"
              variants={fadeUpLarge}
            >
              Speak in Your Native Language.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-blue to-purple-600">
                Get Polished Writing in Another.
              </span>
            </motion.h2>
            <motion.p
              className="text-base md:text-lg lg:text-xl xl:text-2xl text-zavi-gray-text max-w-3xl mx-auto leading-relaxed"
              variants={fadeUp}
            >
              Think naturally in your language. Zavi translates your intent into professional English instantly.
            </motion.p>
          </div>

          {/* Language Flow Examples */}
          <motion.div
            className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            variants={staggerContainer}
          >
            {LANGUAGE_FLOWS.map((flow, index) => (
              <motion.div
                key={index}
                className={`group bg-white rounded-xl md:rounded-2xl border border-zavi-border/50 p-4 md:p-6 lg:p-8 hover:shadow-xl hover:border-zavi-blue/30 transition-all duration-500 ${index > 0 ? 'hidden md:block' : ''}`}
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                {/* Input */}
                <div className="mb-3 md:mb-4">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <span className="text-2xl md:text-3xl">{flow.input.flag}</span>
                    <div>
                      <p className="text-[10px] md:text-xs font-semibold text-zavi-gray-text uppercase tracking-wide">
                        You speak
                      </p>
                      <p className="text-xs md:text-sm font-bold text-zavi-charcoal">
                        {flow.input.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-zavi-gray-text/70 italic">
                    {flow.input.example}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center my-2 md:my-3 lg:my-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-zavi-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Output */}
                <div className="p-3 md:p-4 bg-gradient-to-br from-zavi-blue/5 to-purple-50/30 rounded-lg md:rounded-xl border border-zavi-blue/20">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <span className="text-2xl md:text-3xl">{flow.output.flag}</span>
                    <div>
                      <p className="text-[10px] md:text-xs font-semibold text-zavi-blue uppercase tracking-wide">
                        Zavi writes
                      </p>
                      <p className="text-xs md:text-sm font-bold text-zavi-charcoal">
                        {flow.output.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-zavi-charcoal leading-relaxed">
                    {flow.output.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Supported Languages */}
          <motion.div
            className="mt-8 md:mt-10 lg:mt-12 text-center"
            variants={fadeUp}
          >
            <p className="text-sm text-zavi-gray-text mb-4">
              Supports 30+ languages including:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Hindi', 'Spanish', 'Portuguese', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Italian'].map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 bg-zavi-paper border border-zavi-border rounded-full text-xs font-medium text-zavi-charcoal"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
