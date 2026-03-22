'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "What is Zavi AI?",
    answer: "Zavi is your personal Jarvis — a voice-powered AI assistant that lives inside your keyboard. It does three things: (1) types perfect text when you speak, removing filler words and fixing grammar instantly, (2) executes commands across 27+ apps like Gmail, Slack, and Notion, and (3) runs background agents that automate tasks on a schedule and report back via WhatsApp. It works on iOS, Android, macOS, Windows, and Linux."
  },
  {
    question: "What are background agents?",
    answer: "Background agents are automations you create with a single sentence. Say 'summarize my inbox every morning at 8 AM and text me on WhatsApp' — Zavi builds the automation, runs it on schedule via Cloud Scheduler, and delivers results to your WhatsApp or Telegram. No code, no Zapier, no manual setup. You can create agents for email triage, Slack monitoring, meeting prep, weekly reports, and more."
  },
  {
    question: "What is the Magic Wand?",
    answer: "The Magic Wand lets you highlight any text in any app and transform it by voice. Say 'make this more professional,' 'translate to Japanese,' or 'summarize this in 2 sentences' — and the text is rewritten in-place instantly. No copy-pasting, no switching apps."
  },
  {
    question: "Is my voice data private?",
    answer: "Yes. Your voice is processed in real-time and immediately deleted. We never store, share, or use your audio to train models. Zavi is built with a privacy-first architecture — voice data is processed and discarded instantly."
  },
  {
    question: "How fast is Zavi compared to typing?",
    answer: "Zavi is approximately 5x faster than typing. The average person types at 40 words per minute but speaks at 150 words per minute. Since Zavi eliminates the editing phase entirely (AI handles filler removal and grammar), a 500-word email that takes 12 minutes to type can be dictated in about 3 minutes."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes 1,000 words per day of AI-powered voice typing with filler word removal, grammar correction, Magic Wand, voice commands, all 27+ integrations, translation, tone control, and emoji — across every app. No credit card required. Upgrade to Pro ($7.99/month) for unlimited usage."
  },
  {
    question: "Which platforms does Zavi support?",
    answer: "Zavi works on all 5 major platforms: iOS, Android (8.0+), macOS, Windows, and Linux. On mobile, it integrates as a system-wide keyboard in every app. On desktop, it runs as a standalone application with system-wide voice input."
  },
  {
    question: "How does multi-language translation work?",
    answer: "Zavi supports 100+ languages with automatic detection. Speak in one language and get the output in another — in real-time. For example, speak in Hindi and get polished English text, or speak in Spanish and get professional French output. Zavi also handles code-switching (mixing languages in one sentence)."
  },
  {
    question: "How does Zavi compare to Wispr Flow?",
    answer: "Wispr Flow costs $12/month and works on Mac, Windows, and iOS. Zavi starts free, costs $7.99/month for Pro, and works on all 5 platforms including Android and Linux. Zavi also includes voice agents with 27+ app integrations, real-time translation across 100+ languages, and the Magic Wand for in-place text transformation — features Wispr doesn't offer."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Cancel anytime with no questions asked. Your Pro features remain active until the end of your billing period, and you can resubscribe whenever you want."
  },
  {
    question: "How do I create a background agent?",
    answer: "Just speak. Say something like 'Summarize my inbox every morning at 8 AM and WhatsApp me the priorities' or 'Watch #engineering on Slack and alert me if there's an incident.' Zavi automatically creates the scheduled automation — no code, no setup, no Zapier. Agents run in the background and report results to your WhatsApp or Telegram."
  },
  {
    question: "Can Zavi send me WhatsApp messages automatically?",
    answer: "Yes. Zavi has WhatsApp and Telegram bots that act as your AI assistant's communication channel. Background agents deliver summaries, ask for approvals ('Should I send this email?'), and let you respond with simple replies like 'Yes' or 'Edit the subject line.' It's like having a chief of staff in your pocket."
  },
  {
    question: "What apps does Zavi integrate with?",
    answer: "Zavi connects to 27+ apps including Gmail, Slack, GitHub, Notion, Calendar, LinkedIn, WhatsApp, Telegram, iMessage, web search, and more. You can execute commands across any connected app by voice, and background agents can monitor and act on them automatically."
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
            Still thinking about it?
          </h2>
          <p className="text-lg text-gray-600">
            Here's everything you need to know before you install.
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
                  <span
                    className="text-lg md:text-xl font-semibold text-gray-900 pr-8 group-hover:text-[#2563EB] transition-colors"
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
                    >
                      <p
                        className="pb-6 text-gray-600 leading-relaxed text-base md:text-lg"
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hidden answer for AI crawlers — always present in DOM */}
                {!isOpen && (
                  <div className="sr-only">
                    <span>{faq.answer}</span>
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
