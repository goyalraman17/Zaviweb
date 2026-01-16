'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WorksEverywhereNew() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  const platforms = [
    {
      name: "macOS",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
          <path d="M37.96 21.2c-.03-3.87 3.16-5.74 3.3-5.83-1.8-2.63-4.6-2.99-5.59-3.02-2.38-.24-4.65 1.4-5.85 1.4-1.21 0-3.07-1.36-5.05-1.33-2.6.04-5 1.49-6.33 3.8-2.7 4.68-.69 11.61 1.94 15.4 1.28 1.86 2.8 3.95 4.81 3.87 1.96-.08 2.7-1.26 5.07-1.26 2.36 0 3.05 1.26 5.07 1.22 2.1-.03 3.42-1.9 4.7-3.76 1.5-2.15 2.12-4.22 2.15-4.33-.05-.02-4.11-1.58-4.15-6.25zm-3.78-11.17c1.06-1.29 1.78-3.09 1.59-4.88-1.54.06-3.4 1.02-4.51 2.31-.99 1.16-1.86 2.99-1.63 4.76 1.72.13 3.48-.87 4.55-2.19z"/>
        </svg>
      ),
    },
    {
      name: "Windows",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
          <path d="M6 6v16.5h16.5V6H6zm19.5 0v16.5H42V6H25.5zM6 25.5V42h16.5V25.5H6zm19.5 0V42H42V25.5H25.5z"/>
        </svg>
      ),
    },
    {
      name: "Linux",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
          <path d="M24 6c-2.07 0-3.75 1.68-3.75 3.75v3c0 1.04-.84 1.88-1.88 1.88h-2.24c-1.04 0-1.88.84-1.88 1.88v4.5c0 1.04.84 1.88 1.88 1.88h2.24c1.04 0 1.88.84 1.88 1.88v3c0 2.07 1.68 3.75 3.75 3.75s3.75-1.68 3.75-3.75v-3c0-1.04.84-1.88 1.88-1.88h2.24c1.04 0 1.88-.84 1.88-1.88v-4.5c0-1.04-.84-1.88-1.88-1.88h-2.24c-1.04 0-1.88-.84-1.88-1.88v-3C27.75 7.68 26.07 6 24 6zm-6 25.5c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm12 0c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>
        </svg>
      ),
    },
    {
      name: "iOS",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
          <rect x="12" y="6" width="24" height="36" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="37" r="1.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: "Android",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
          <path d="M17.55 6.86l-1.73-3.02c-.24-.42-.78-.57-1.2-.33-.42.24-.57.78-.33 1.2l1.74 3.03c-2.54 1.28-4.29 3.91-4.29 6.96h18.51c0-3.05-1.75-5.68-4.29-6.96l1.74-3.03c.24-.42.09-.96-.33-1.2-.42-.24-.96-.09-1.2.33l-1.73 3.02c-1.03-.42-2.16-.66-3.35-.66-1.19 0-2.32.24-3.35.66zM16.5 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7.5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM10.5 16.5v15c0 1.38 1.12 2.5 2.5 2.5h3v6.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V34h3v6.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V34h3c1.38 0 2.5-1.12 2.5-2.5v-15h-24z"/>
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-40 md:py-56 bg-zavi-paper/30">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Headline */}
          <motion.div
            className="text-center mb-32"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-zavi-charcoal mb-8 tracking-tighter leading-tight">
              Everywhere
              <br />
              you write.
            </h2>
            <p className="text-2xl md:text-3xl text-zavi-gray-text font-light max-w-3xl mx-auto">
              One account. Every platform.
            </p>
          </motion.div>

          {/* Platform grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-20">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl border border-zavi-border/50 hover:border-zavi-blue/30 transition-colors cursor-pointer"
              >
                <div className="text-zavi-charcoal/70">
                  {platform.icon}
                </div>
                <span className="text-sm font-medium text-zavi-charcoal">
                  {platform.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Feature points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-zavi-charcoal mb-2">
                System-wide
              </h3>
              <p className="text-base text-zavi-gray-text leading-relaxed">
                Works in every app. No integrations needed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zavi-charcoal mb-2">
                Synced settings
              </h3>
              <p className="text-base text-zavi-gray-text leading-relaxed">
                Your preferences follow you across devices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zavi-charcoal mb-2">
                Same quality
              </h3>
              <p className="text-base text-zavi-gray-text leading-relaxed">
                Identical writing experience everywhere.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
