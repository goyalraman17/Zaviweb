'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "What is Zavi AI and how does it work?",
    answer: "Zavi AI is an AI-powered voice typing keyboard that transforms natural speech into clean, professional text. Unlike regular voice typing that transcribes word-for-word (including filler words like 'um' and 'uh'), Zavi's AI automatically removes fillers, fixes grammar, restructures sentences, and produces polished, ready-to-send text. It works as a system-wide keyboard, so you can use it in Gmail, WhatsApp, Slack, Notion, ChatGPT, and every other app."
  },
  {
    question: "Is my voice data private?",
    answer: "Absolutely. Your voice is processed in real-time and immediately deleted. We never store, share, or use your audio to train models. Your conversations are yours alone. Zavi is built with a privacy-first architecture — voice data is processed and discarded instantly."
  },
  {
    question: "How is Zavi different from regular voice typing?",
    answer: "Regular voice typing captures everything word for word, including all your 'um's, 'uh's, and awkward phrasing. Zavi removes fillers, fixes grammar, and turns messy speech into professional text automatically. This is our core technology called Zero-Prompting — no commands needed, the AI understands that clean, polished text is the default output."
  },
  {
    question: "How fast is voice typing with Zavi compared to regular typing?",
    answer: "Voice typing with Zavi is approximately 4x faster than typing on a mobile keyboard. The average person types at 40 words per minute but speaks at 150 words per minute. Since Zavi eliminates the editing phase entirely, a 500-word email that takes 12 minutes to type can be dictated in about 3 minutes — saving professionals an estimated 40+ hours per year."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes AI-powered speech cleanup with filler word removal, grammar correction, works in every Android app, supports 100+ languages with auto-detection, and comes with generous daily usage limits. Upgrade to Pro for $4.99/month (or $39.99/year) for unlimited usage, 3x faster processing, and advanced formatting."
  },
  {
    question: "Which platforms and apps does Zavi support?",
    answer: "Zavi works on Android 8.0+, iOS 16+, macOS, Windows, and Linux. On Android and iOS, it integrates as a system-wide keyboard in every app — Gmail, WhatsApp, Slack, Notion, Google Docs, Microsoft Teams, ChatGPT, and hundreds more. On desktop, it works as a standalone application with system-wide voice input."
  },
  {
    question: "How does Zavi handle multiple languages and translation?",
    answer: "Zavi supports 100+ languages with automatic language detection — no manual switching needed. You can even speak in one language and have the output appear in another language in real-time. For example, speak in Hindi and get polished English text, or speak in Spanish and get professional French output. Zavi also handles code-switching (mixing languages in one sentence) intelligently."
  },
  {
    question: "How does Zavi compare to Wispr Flow and Willow?",
    answer: "Wispr Flow is desktop-only (macOS/Windows), focuses on contextual editing with command mode, uses cloud processing, and costs $10/month. Willow is macOS-only with ultra-low 200ms latency and local processing. Zavi is cross-platform (Android, macOS, Windows, Linux), mobile-first, supports 100+ languages with real-time translation, starts free with Pro at $4.99/month, and works as a system-wide keyboard on Android."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes. Cancel anytime with no questions asked. Your Pro features remain active until the end of your billing period, and you can resubscribe whenever you want."
  },
  {
    question: "Does Zavi work offline?",
    answer: "Zavi requires an internet connection for AI processing. The advanced language models that clean up your speech, fix grammar, and handle translation run in the cloud to ensure maximum accuracy, speed, and support for 100+ languages."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
      <div className="container-wide max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Questions? Answered.
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Zavi AI voice typing keyboard.
          </p>
        </div>

        {/* FAQ Items — Using semantic HTML for AI readability */}
        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-200 last:border-0"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-lg md:text-xl font-semibold text-gray-900 pr-8 group-hover:text-[#2563EB] transition-colors"
                    itemProp="name"
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#2563EB]' : ''
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p
                        className="pb-6 text-gray-600 leading-relaxed text-base md:text-lg"
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hidden answer for AI crawlers — always present in DOM */}
                {!isOpen && (
                  <div
                    className="sr-only"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <span itemProp="text">{faq.answer}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
