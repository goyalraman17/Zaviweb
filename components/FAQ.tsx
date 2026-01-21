'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Is my voice data private?",
    answer: "Absolutely. Your voice is processed in real-time and immediately deleted. We never store, share, or use your audio to train models. Your conversations are yours alone."
  },
  {
    question: "How is Zavi different from regular voice typing?",
    answer: "Regular voice typing captures everything word-for-word—including 'um's, 'uh's, and awkward phrasing. Zavi removes fillers, fixes grammar, and turns messy speech into professional text automatically."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes AI-powered speech cleanup, works in every Android app, supports 100+ languages, and daily usage limits. Upgrade to Pro for unlimited usage and 3x faster processing."
  },
  {
    question: "Which platforms does Zavi support?",
    answer: "Zavi works on Android 8.0+ and integrates with every app on your device—Gmail, WhatsApp, Slack, Notion, Google Docs, and more. iOS support coming in 2026."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes. Cancel anytime with no questions asked. Your Pro features remain active until the end of your billing period, and you can resubscribe whenever you want."
  },
  {
    question: "Does Zavi work offline?",
    answer: "Zavi requires an internet connection for AI processing. The advanced language models that clean up your speech run in the cloud to ensure maximum accuracy and speed."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="container-wide max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Questions? Answered.
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know to get started with Zavi.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-200 last:border-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-semibold text-gray-900 pr-8 group-hover:text-[#7B68EE] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#7B68EE]' : ''
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
                    >
                      <p className="pb-6 text-gray-600 leading-relaxed text-base md:text-lg">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions?
          </p>
          <a
            href="mailto:support@zavi.ai"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
