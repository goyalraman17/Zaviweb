'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const messyWords = [
  "Hey", "um", "so", "I", "wanted", "to", "uh", "reach", "out", "about", "the",
  "project", "you", "know", "because", "uh", "we", "need", "to", "like",
  "finalize", "the", "budget", "and", "stuff", "you", "know"
];

const cleanText = "Hey, I wanted to reach out about the project. We need to finalize the budget.";

const fillerWords = ["um", "uh", "you know", "like", "so", "stuff"];

export default function LiveDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState<Array<{ word: string; isFiller: boolean }>>([]);
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const [cleanedText, setCleanedText] = useState("");
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    // Phase 1: Show words appearing one by one
    if (currentWordIndex < messyWords.length && !isCleaningUp) {
      const timer = setTimeout(() => {
        const word = messyWords[currentWordIndex];
        setDisplayedWords(prev => [
          ...prev,
          { word, isFiller: fillerWords.includes(word.toLowerCase()) }
        ]);
        setCurrentWordIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }

    // Phase 2: Start cleanup after all words shown
    if (currentWordIndex >= messyWords.length && !isCleaningUp) {
      const timer = setTimeout(() => {
        setIsCleaningUp(true);
      }, 800);
      return () => clearTimeout(timer);
    }

    // Phase 3: Type out clean text
    if (isCleaningUp && cleanedText.length < cleanText.length) {
      const timer = setTimeout(() => {
        setCleanedText(cleanText.slice(0, cleanedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }

    // Phase 4: Show final state
    if (isCleaningUp && cleanedText.length >= cleanText.length && !showFinal) {
      const timer = setTimeout(() => {
        setShowFinal(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, currentWordIndex, isCleaningUp, cleanedText, showFinal]);

  return (
    <section ref={ref} className="py-32 md:py-40 bg-white relative overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-zavi-gray-50/50 to-white" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zavi-gray-900 mb-6 leading-tight">
            Watch it think
          </h2>
          <p className="text-xl md:text-2xl text-zavi-gray-600 max-w-2xl mx-auto font-light">
            Speech goes in. Clean text comes out. No editing.
          </p>
        </motion.div>

        {/* Demo Container */}
        <div className="max-w-4xl mx-auto">
          {/* Keyboard-inspired container */}
          <motion.div
            className="relative bg-zavi-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Mic button (like app) */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-zavi-blue-400 to-zavi-blue-600 flex items-center justify-center shadow-lg"
                  animate={!isCleaningUp ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 4px 14px 0 rgba(29, 78, 216, 0.4)",
                      "0 4px 24px 0 rgba(29, 78, 216, 0.6)",
                      "0 4px 14px 0 rgba(29, 78, 216, 0.4)"
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: !isCleaningUp ? Infinity : 0 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15Z" fill="white"/>
                    <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12M12 17V21M12 21H8M12 21H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
                <div>
                  <motion.p
                    className="text-sm font-semibold text-zavi-gray-700"
                    animate={isCleaningUp ? { opacity: 0 } : { opacity: 1 }}
                  >
                    {!isCleaningUp ? "Listening..." : ""}
                  </motion.p>
                  <AnimatePresence>
                    {isCleaningUp && (
                      <motion.p
                        className="text-sm font-semibold text-zavi-blue-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Cleaning up...
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {showFinal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-green-600"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" fill="currentColor" fillOpacity="0.1"/>
                    <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">Done</span>
                </motion.div>
              )}
            </div>

            {/* Text Display Area */}
            <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[240px] shadow-inner">
              {!isCleaningUp ? (
                // Phase 1: Show messy speech
                <div className="text-lg md:text-xl leading-relaxed flex flex-wrap gap-2">
                  <AnimatePresence>
                    {displayedWords.map((item, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={item.isFiller ? "text-red-500 line-through opacity-60" : "text-zavi-gray-900"}
                      >
                        {item.word}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                // Phase 2: Show cleaned text being typed
                <motion.div
                  className="text-lg md:text-xl leading-relaxed text-zavi-gray-900 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {cleanedText}
                  {!showFinal && (
                    <motion.span
                      className="inline-block w-0.5 h-6 bg-zavi-blue-600 ml-1"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              )}
            </div>

            {/* Progress indicator */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {[0, 1, 2].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    (step === 0 && currentWordIndex > 0) ||
                    (step === 1 && isCleaningUp) ||
                    (step === 2 && showFinal)
                      ? 'w-12 bg-zavi-blue-500'
                      : 'w-8 bg-zavi-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom callout */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <p className="text-lg text-zavi-gray-600">
              Happens in <span className="font-semibold text-zavi-gray-900">under 2 seconds</span>. Every time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
