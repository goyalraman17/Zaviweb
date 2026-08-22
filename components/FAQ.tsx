'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const faqs = [
  [
    'What does Zavi do?',
    'Speak naturally in any app. Zavi removes filler words, fixes grammar, adds punctuation, and writes polished text where your cursor is.',
  ],
  [
    'Where does it work?',
    'On iOS, Android, macOS, Windows, and Linux—inside the apps and text fields you already use.',
  ],
  [
    'Is my voice private?',
    'Yes. Audio is processed in real time, immediately deleted, and never used to train models.',
  ],
  [
    'What is Magic Wand?',
    'Select existing text and say the edit you want: shorter, warmer, translated, summarized, or more professional.',
  ],
  [
    'Can it translate while I speak?',
    'Yes. Zavi supports 100+ languages, mixed-language speech, and output in a different language.',
  ],
  [
    'What is included for free?',
    'You get 1,000 AI-powered words every day, including dictation, multilingual output, and Magic Wand. No card required.',
  ],
  [
    'Can I cancel Pro anytime?',
    'Yes. Your Pro access continues through the current billing period, and you can return whenever you want.',
  ],
] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#f3f1eb] py-20 sm:py-28 lg:py-36">
      <div className="container-large">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0.84, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
              Good questions
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Everything before install.
            </h2>
            <p className="mt-5 max-w-sm text-lg text-slate-500">
              The short answers. No technical detour.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-600"
            >
              Ask us directly <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white">
            {faqs.map(([question, answer], index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={question}
                  className="border-b border-slate-200 last:border-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                  >
                    <span className="text-lg font-bold text-slate-900 sm:text-xl">
                      {question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full ${isOpen ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500'}`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl px-6 pb-7 text-base leading-relaxed text-slate-500 sm:px-8 sm:text-lg">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!isOpen && <span className="sr-only">{answer}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
