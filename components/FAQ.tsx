'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Lock, Brain, Zap, Gift, Monitor, Languages, MessageCircle, Settings, RefreshCw, Users, CreditCard, Shield, Download, Smartphone, HelpCircle, Search } from 'lucide-react';

const faqCategories = [
  {
    title: "Getting Started",
    items: [
      {
        icon: Download,
        question: "How do I install Zavi?",
        answer: "Download Zavi from the Google Play Store, open the app, and follow the setup wizard. You'll need to enable Zavi as your keyboard in your device settings. The app will guide you through each step with clear instructions.",
      },
      {
        icon: Settings,
        question: "What permissions does Zavi need?",
        answer: "Zavi requires microphone access for voice input and keyboard permissions to function as your input method. We only request permissions essential for core functionality—no camera, contacts, or location access needed.",
      },
      {
        icon: Smartphone,
        question: "How do I set Zavi as my default keyboard?",
        answer: "After installation, go to Settings > System > Languages & input > Virtual keyboard > Manage keyboards, then enable Zavi. When typing, tap the keyboard icon in your navigation bar and select Zavi.",
      },
      {
        icon: Brain,
        question: "How is Zavi different from normal voice typing?",
        answer: "While Google voice typing captures everything you say word-for-word, Zavi goes further by removing filler words (um, uh, like), fixing grammar, and structuring your thoughts into professional text. Think of it as having an editor clean up your speech in real-time.",
      }
    ]
  },
  {
    title: "Pricing & Plans",
    items: [
      {
        icon: Gift,
        question: "What's included in the free plan?",
        answer: "The free plan includes AI-powered speech cleanup, works in every Android app, supports 100+ languages, and provides professional-grade text editing. You'll have daily usage limits and standard processing speed.",
      },
      {
        icon: Zap,
        question: "What do I get with Zavi Pro?",
        answer: "Pro unlocks unlimited voice inputs, 3x faster processing, priority support, advanced editing features, custom tone settings (formal, casual, technical), and the ability to create custom templates for repetitive tasks.",
      },
      {
        icon: CreditCard,
        question: "Can I get a refund?",
        answer: "Yes! We offer a 14-day money-back guarantee. If Zavi doesn't work for you within the first two weeks, contact support for a full refund—no questions asked.",
      },
      {
        icon: Users,
        question: "Do you offer team or student discounts?",
        answer: "Yes! Teams of 5+ get 20% off, and students with a valid .edu email get 40% off Pro plans. Contact us at team@zavi.ai or student@zavi.ai for discount codes.",
      },
      {
        icon: MessageCircle,
        question: "Can I cancel anytime?",
        answer: "Absolutely. You can cancel your subscription at any time with no questions asked. Your Pro features will remain active until the end of your billing period, and you can always resubscribe later.",
      }
    ]
  },
  {
    title: "Privacy & Security",
    items: [
      {
        icon: Lock,
        question: "Is my voice data private?",
        answer: "Private by design.",
        details: "Your voice stays on your device and is never stored, shared, or used to train public models. Audio is processed in real-time and immediately discarded after transcription.",
        features: ["Zero storage", "On-device processing", "No model training", "GDPR compliant"]
      },
      {
        icon: Shield,
        question: "Does Zavi sell my data?",
        answer: "Never. We don't sell, share, or monetize your personal data. Our business model is simple: you pay for the product, and we work for you—not advertisers. Your conversations are yours alone.",
      },
      {
        icon: HelpCircle,
        question: "What happens to my recordings?",
        answer: "Nothing—because we don't keep them. Audio is processed in real-time through encrypted connections and deleted immediately. We only store the final text output if you choose to save it in the app.",
      }
    ]
  },
  {
    title: "Features & Compatibility",
    items: [
      {
        icon: Monitor,
        question: "What platforms are supported?",
        answer: "Zavi works on Android 8.0 (Oreo) and above. The app is optimized for modern Android devices and requires approximately 20MB of storage space. iOS support is coming in 2026.",
      },
      {
        icon: Zap,
        question: "Does Zavi work offline?",
        answer: "Zavi requires an internet connection for AI processing. The advanced language models that clean up your speech and fix grammar run in the cloud to ensure maximum accuracy and speed.",
      },
      {
        icon: Languages,
        question: "Can I speak in one language and write in another?",
        answer: "Yes! Zavi supports 100+ languages and can transcribe your speech in one language while outputting text in another. This is perfect for multilingual users and content creators.",
      },
      {
        icon: Settings,
        question: "Which apps does Zavi work with?",
        answer: "Zavi works everywhere you can type—WhatsApp, Gmail, Slack, Notion, Google Docs, Twitter, LinkedIn, and any app with a text field. If your device keyboard works there, so does Zavi.",
      }
    ]
  },
  {
    title: "Troubleshooting",
    items: [
      {
        icon: RefreshCw,
        question: "Why isn't Zavi recognizing my voice?",
        answer: "Check your microphone permissions in Settings > Apps > Zavi > Permissions. Ensure you're in a quiet environment and speaking clearly. If issues persist, try restarting the app or reinstalling it.",
      },
      {
        icon: HelpCircle,
        question: "What if I have technical issues?",
        answer: "Our support team responds within 24 hours (usually faster). Email support@zavi.ai or use the in-app chat. Pro users get priority support with average response times under 2 hours.",
      },
      {
        icon: Download,
        question: "How do I update to the latest version?",
        answer: "Zavi updates automatically through the Google Play Store. To manually check for updates, open Play Store > Menu > My apps & games > find Zavi > tap Update if available.",
      }
    ]
  }
];

const promoFeatures = [
  "Private by design",
  "Works in every app",
  "100+ languages",
  "Cancel anytime"
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['0-0'])); // Open first item by default
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Filter FAQs based on search
  const filteredCategories = faqCategories
    .map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        searchQuery === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.details && item.details.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }))
    .filter(cat => cat.items.length > 0);

  return (
    <section id="faq" ref={ref} className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container-wide">
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zavi-charcoal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Zavi. Can&apos;t find an answer? Contact us at support@zavi.ai
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-base focus:outline-none focus:border-[#7B68EE] transition-all"
              aria-label="Search FAQ questions"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* FAQ Items - First on mobile, Second on desktop */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No results found for &quot;{searchQuery}&quot;</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-[#7B68EE] hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-12 bg-gradient-to-r from-[#7B68EE] to-[#5381d2] rounded-full"></div>
                    <h3 className="text-xl font-bold text-zavi-charcoal">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => {
                      const key = `${categoryIndex}-${itemIndex}`;
                      const isOpen = openItems.has(key);
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.4, delay: 0.05 * itemIndex }}
                          className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-md transition-all"
                        >
                          <button
                            onClick={() => toggleItem(categoryIndex, itemIndex)}
                            className="w-full px-6 py-5 text-left flex items-start gap-4 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B68EE] focus:ring-offset-2 rounded-2xl"
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${key}`}
                            id={`faq-question-${key}`}
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mt-0.5">
                              <Icon className="w-5 h-5 text-[#7B68EE]" />
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
                              aria-hidden="true"
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
                                id={`faq-answer-${key}`}
                                role="region"
                                aria-labelledby={`faq-question-${key}`}
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
                                    <div className="grid grid-cols-2 gap-3 mt-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
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

          {/* Promotional Card - Second on mobile, First on desktop */}
          <motion.div
            className="lg:col-span-4 order-1 lg:order-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 sticky top-24 border border-gray-200">
              <h3 className="text-2xl font-bold text-zavi-charcoal mb-4">
                Still unsure?
              </h3>
              <p className="text-gray-600 mb-6">
                Most users install Zavi after reading this.
              </p>

              <div className="space-y-4 mb-6">
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
                className="block w-full bg-gradient-to-r from-[#7B68EE] to-[#5381d2] hover:from-[#6952d6] hover:to-[#4570c0] text-white font-semibold py-4 px-6 rounded-xl text-center transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Get Zavi Free
              </a>
              <p className="text-sm text-gray-500 text-center mt-3">
                No credit card required
              </p>

              {/* Trust Signals */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center mb-3">
                  Trusted by professionals worldwide
                </p>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-zavi-charcoal">50K+</div>
                    <div className="text-xs text-gray-500">Downloads</div>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-zavi-charcoal">4.8★</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Still Have Questions Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="max-w-2xl mx-auto bg-white border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-zavi-charcoal mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <a
              href="mailto:support@zavi.ai"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#7B68EE] text-[#7B68EE] font-semibold rounded-xl hover:bg-[#7B68EE] hover:text-white transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
