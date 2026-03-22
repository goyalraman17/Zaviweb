'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const beforeText = "Hey um so I wanted to uh reach out about the project timeline because you know we've been kind of going back and forth on this and uh I think we should probably like nail down some concrete dates so everyone's on the same page you know what I mean and also uh can you send me that document you mentioned last week I think it was the budget breakdown or something like that thanks";

const afterText = "Hey, I wanted to reach out about the project timeline. We've been going back and forth on this, and I think we should nail down some concrete dates so everyone's on the same page. Can you also send me the budget breakdown document you mentioned last week? Thanks.";

export default function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = useMotionValue(0);
  const displayedText = useTransform(progress, [0, 1], [beforeText, afterText]);

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        animate(progress, 1, {
          duration: 2.5,
          ease: [0.22, 1, 0.36, 1]
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, isAnimating, progress]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-zavi-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zavi-black mb-4">
            Watch Zavi clean up your speech
          </h2>
          <p className="text-xl text-zavi-gray-600 mt-4">
            Speak naturally. Zavi handles the rest.
          </p>
        </motion.div>

        {/* Desktop: Side by Side */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <div className="text-xs font-semibold text-zavi-gray-500 uppercase tracking-wider mb-4">
              What you said
            </div>
            <p className="text-base text-zavi-gray-600 leading-relaxed italic">
              {beforeText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-zavi-black">
              <path d="M7 16H25M25 16L18 9M25 16L18 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-zavi-black"
          >
            <div className="text-xs font-semibold text-zavi-black uppercase tracking-wider mb-4">
              What Zavi writes
            </div>
            <p className="text-base text-zavi-black leading-relaxed font-medium">
              {afterText}
            </p>
          </motion.div>
        </div>

        {/* Mobile: Animated Morph */}
        <div className="md:hidden max-w-lg mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-xl"
          >
            <motion.div
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              animate={{
                color: isInView ? ['#909090', '#0a0a0a'] : '#909090'
              }}
              transition={{ duration: 2.5, delay: 0.5 }}
            >
              <motion.span>
                {isAnimating ? 'What Zavi writes' : 'What you said'}
              </motion.span>
            </motion.div>

            <motion.p
              className="text-base leading-relaxed min-h-[200px]"
              style={{
                color: useTransform(progress, [0, 1], ['#606060', '#0a0a0a']),
                fontStyle: useTransform(progress, [0, 0.5, 1], ['italic', 'italic', 'normal']),
                fontWeight: useTransform(progress, [0, 1], [400, 500]),
              }}
            >
              <motion.span>
                {isAnimating ? afterText : beforeText}
              </motion.span>
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-lg font-medium text-zavi-gray-900 max-w-2xl mx-auto">
            No editing required. No cleanup needed. Just professional text, instantly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
