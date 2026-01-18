'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Lock, Brain, Zap, Gift, Monitor, Languages, MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    title: "Before You Install",
    items: [
      {
        icon: Lock,
        question: "Is my voice data private?",
        answer: "Private by design.",
        details: "Your voice stays on your device and is never stored, shared, or used to train public models.",
        features: ["Zero storage", "On-device processing", "No model training"]
      },
      {
        icon: Brain,
        question: "How is Zavi different from normal voice typing?",
        answer: "While Google voice typing captures everything you say word-for-word, Zavi goes further by removing filler words (um, uh, like), fixing grammar, and structuring your thoughts into professional text. Think of it as having an editor clean up your speech in real-time."
      },
      {
        icon: Zap,
        question: "Does Zavi work offline?",
        answer: "Zavi requires an internet connection for AI processing. The advanced language models that clean up your speech and fix grammar run in the cloud to ensure maximum accuracy and speed."
      },
      {
        icon: Gift,
        question: "What's included in the free plan?",
        answer: "The free version includes AI-powered speech cleanup, works in every Android app, supports 100+ languages, and provides professional-grade text editing. You'll have daily usage limits and standard processing speed."
      }
    ]
  },
  {
    title: "After You Install",
    items: [
      {
        icon: Monitor,
        question: "What platforms are supported?",
        answer: "Zavi works on Android 8.0 (Oreo) and above. The app is optimized for modern Android devices and requires approximately 20MB of storage space."
      },
      {
        icon: Languages,
        question: "Can I speak in one language and write in another?",
        answer: "Yes! Zavi supports 100+ languages and can transcribe your speech in one language while outputting text in another. This is perfect for multilingual users and content creators."
      },
      {
        icon: MessageCircle,
        question: "Can I cancel anytime?",
        answer: "Absolutely. You can cancel your subscription at any time with no questions asked. Your Pro features will remain active until the end of your billing period, and you can always resubscribe later."
      }
    ]
  }
];

const promoFeatures = [
  "Private by design",
  "Works in every app",
  "No credit card needed",
  "Cancel anytime"
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<string | null>("0-0"); // Open first item by default

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <section id="faq" ref={ref} className="section-pad bg-gradient-to-b from-white to-gray-50">
      <div className="container-wide">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zavi-charcoal mb-4">
            Frequently asked Questions
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Promotional Card */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-zavi-charcoal mb-4">
                Still unsure?
              </h3>
              <p className="text-gray-600 mb-6">
                Most users install Zavi after reading this.
              </p>

              <div className="space-y-4 mb-8">
                {promoFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-zavi-charcoal font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#download"
                className="block w-full bg-zavi-blue hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl text-center transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Get Zavi Free
              </a>
              <p className="text-sm text-gray-500 text-center mt-3">
                No credit card required
              </p>
            </div>
          </motion.div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                >
                  <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wide mb-6">
                    {category.title}
                  </h3>

                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => {
                      const key = `${categoryIndex}-${itemIndex}`;
                      const isOpen = openIndex === key;
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.4, delay: 0.05 * itemIndex }}
                          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
                        >
                          <button
                            onClick={() => toggleItem(categoryIndex, itemIndex)}
                            className="w-full px-6 py-5 text-left flex items-start gap-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mt-0.5">
                              <Icon className="w-5 h-5 text-zavi-charcoal" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-lg font-semibold text-zavi-charcoal block">
                                {item.question}
                              </span>
                            </div>
                            <motion.svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="flex-shrink-0 text-gray-400 mt-1"
                              animate={{ rotate: isOpen ? 180 : 0 }}
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
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pl-20">
                                  {item.details && (
                                    <div className="mb-4">
                                      <h4 className="text-lg font-semibold text-zavi-charcoal mb-2">
                                        {item.answer}
                                      </h4>
                                      <p className="text-gray-600 leading-relaxed">
                                        {item.details}
                                      </p>
                                    </div>
                                  )}

                                  {!item.details && (
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                      {item.answer}
                                    </p>
                                  )}

                                  {item.features && (
                                    <div className="flex flex-wrap gap-4 mt-4 bg-gray-50 rounded-lg p-4">
                                      {item.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                                          </div>
                                          <span className="text-sm font-medium text-zavi-charcoal">
                                            {feature}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-zavi-charcoal to-gray-800 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-zavi-blue rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Kill your keyboard. Forever.
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Writing faster is one click away.
              </p>

              <a
                href="#download"
                className="inline-block bg-zavi-blue hover:bg-blue-600 text-white font-semibold py-4 px-10 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Get Zavi for Mac
              </a>
              <p className="text-sm text-gray-400 mt-4">
                No credit card. Cancel anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
