'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const faqs = [
  {
    question: "Does Zavi work offline?",
    answer: "Zavi requires an internet connection for AI processing. The advanced language models that clean up your speech and fix grammar run in the cloud to ensure maximum accuracy and speed."
  },
  {
    question: "Which Android versions are supported?",
    answer: "Zavi works on Android 8.0 (Oreo) and above. The app is optimized for modern Android devices and requires approximately 20MB of storage space."
  },
  {
    question: "How does Zavi compare to Google's voice typing?",
    answer: "While Google voice typing captures everything you say word-for-word, Zavi goes further by removing filler words (um, uh, like), fixing grammar, and structuring your thoughts into professional text. Think of it as having an editor clean up your speech in real-time."
  },
  {
    question: "Is my voice data really private?",
    answer: "Yes. Your microphone only activates when you tap the button. Audio is processed and immediately deleted—we never store recordings. All data transmission is encrypted. You can request deletion of your data at any time."
  },
  {
    question: "Can I easily switch back to my regular keyboard?",
    answer: "Absolutely. Zavi works like any other Android keyboard. You can switch between Zavi and your regular keyboard anytime using the keyboard selector button. No settings changes needed."
  },
  {
    question: "What's included in the free version?",
    answer: "The free version includes AI-powered speech cleanup, works in every Android app, supports 100+ languages, and provides professional-grade text editing. You'll have daily usage limits and standard processing speed."
  },
  {
    question: "What's the difference between Free and Pro?",
    answer: "Pro removes all usage limits, provides faster processing (<1 second), unlocks professional-grade editing features, and includes priority support. Perfect for power users who rely on voice typing daily."
  },
  {
    question: "What happens to my data if I uninstall Zavi?",
    answer: "If you uninstall Zavi, all local data is removed from your device. Since we don't store audio recordings, there's nothing to delete on our servers. If you had a Pro subscription, you can request account data deletion through our support team."
  }
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="section-pad bg-white">
      <div className="container-medium">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-zavi-charcoal mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Zavi
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-base sm:text-lg font-semibold text-zavi-charcoal">
                  {faq.question}
                </span>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="flex-shrink-0 text-gray-400"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
