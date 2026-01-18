'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
  ctaPrimary,
} from '@/lib/animations';

type OSType = 'iOS' | 'Android' | 'macOS' | 'Windows' | 'Linux' | null;

const PLATFORMS = [
  {
    name: 'iOS',
    osKey: 'iOS' as OSType,
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    valueDescription: 'Speak and write naturally on your phone',
    buttonText: 'Start on iPhone',
  },
  {
    name: 'Android',
    osKey: 'Android' as OSType,
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 0 0-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 11.16 3.5 13.8 3.5 16.5h17c0-2.7-1.3-5.34-2.9-7.02M7 13.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m10 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z" />
      </svg>
    ),
    valueDescription: 'Speak and write naturally across your phone',
    buttonText: 'Start on Android',
  },
  {
    name: 'macOS',
    osKey: 'macOS' as OSType,
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z" />
      </svg>
    ),
    valueDescription: 'Voice to text in every Mac app you use',
    buttonText: 'Start on Mac',
  },
  {
    name: 'Windows',
    osKey: 'Windows' as OSType,
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
    valueDescription: 'Turn speech into writing system wide',
    buttonText: 'Start on Windows',
  },
  {
    name: 'Linux',
    osKey: 'Linux' as OSType,
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.581 19.049c-.55-.446-.336-1.431-.907-1.917.553-3.365-.997-6.331-2.845-8.232-1.551-1.595-1.051-3.147-1.051-4.49 0-2.146-.881-4.41-3.55-4.41-2.853 0-3.635 2.38-3.663 3.738-.068 3.262.659 4.11-1.25 6.484-2.246 2.793-2.577 5.579-2.07 7.057-.237.276-.557.582-1.155.835-1.652.72-.441 1.925-.898 2.78-.13.243-.192.497-.192.74 0 .75.596 1.399 1.679 1.302 1.461-.13 2.809.905 3.681.905.77 0 1.402-.438 1.696-1.041 1.377-.339 3.077-.296 4.453.059.247.691.917 1.141 1.662 1.141 1.631 0 1.945-1.849 3.816-2.475.674-.225 1.013-.879 1.013-1.488 0-.39-.139-.761-.419-.988M13.7 14.034c.658 1.137 1.461 2.061 2.464 2.061.635 0 1.186-.309 1.659-.847.968-1.1 1.528-3.137 1.528-5.557 0-.491-.045-.979-.13-1.461-.317-1.848-1.218-3.203-2.254-3.203-1.159 0-2.186 1.519-2.864 3.986a17.745 17.745 0 0 0-.403 3.021c0 1.035.098 2.052.285 3M12.3 14.034c.187-.948.285-1.965.285-3 0-1.035-.098-2.052-.285-3-.678-2.467-1.705-3.986-2.864-3.986-1.036 0-1.937 1.355-2.254 3.203-.085.482-.13.97-.13 1.461 0 2.42.56 4.457 1.528 5.557.473.538 1.024.847 1.659.847 1.003 0 1.806-.924 2.464-2.061" />
      </svg>
    ),
    valueDescription: 'Voice to text across your desktop',
    buttonText: 'Start on Linux',
  },
];

export default function DownloadSection() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);
  const [detectedOS, setDetectedOS] = useState<OSType>(null);

  // Detect user's OS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        setDetectedOS('iOS');
      } else if (userAgent.includes('android')) {
        setDetectedOS('Android');
      } else if (userAgent.includes('mac')) {
        setDetectedOS('macOS');
      } else if (userAgent.includes('win')) {
        setDetectedOS('Windows');
      } else if (userAgent.includes('linux')) {
        setDetectedOS('Linux');
      }
    }
  }, []);

  return (
    <section ref={ref} className="section-pad bg-gray-50" data-section="download">
      <div className="container-large">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-zavi-charcoal mb-6"
              variants={fadeUpLarge}
            >
              Ready in 30 Seconds.
              <br />
              Works Everywhere You Type.
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeUp}
            >
              Choose your device and start writing faster
            </motion.p>
          </div>

          {/* Platform Grid - Simplified Decision */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
            variants={staggerContainer}
          >
            {PLATFORMS.map((platform) => {
              const isRecommended = platform.osKey === detectedOS;

              return (
                <motion.div
                  key={platform.name}
                  className={`group relative card p-6 transition-all duration-300 ${
                    isRecommended
                      ? 'border-zavi-blue shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  variants={fadeUp}
                >
                  {/* Recommended Badge */}
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zavi-blue text-white text-xs font-semibold rounded-full">
                      For you
                    </div>
                  )}

                  <div className={`mb-4 ${
                    isRecommended ? 'text-zavi-blue' : 'text-gray-600 group-hover:text-zavi-charcoal'
                  } transition-colors`}>
                    {platform.icon}
                  </div>

                  <h3 className="text-xl font-bold text-zavi-charcoal mb-2">
                    {platform.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-6 min-h-[40px]">
                    {platform.valueDescription}
                  </p>

                  <button
                    className={`w-full font-semibold rounded-lg transition-all inline-flex items-center justify-center gap-2 py-3 ${
                      isRecommended
                        ? 'btn-primary'
                        : 'text-sm text-zavi-blue bg-white border-2 border-gray-200 hover:border-zavi-blue hover:bg-zavi-blue/5'
                    }`}
                  >
                    <span className="text-sm">
                      {platform.buttonText}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Microcopy */}
          <motion.p
            className="text-center text-sm text-gray-500"
            variants={fadeUp}
          >
            No signup • No learning curve • No credit card
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
