'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function SpeedMagic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setIsTransformed((prev) => !prev);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const messyText = "um so yeah I think we should like move forward with this and uh you know get started on the next phase because uh it seems like the right time and stuff";
  const cleanText = "We should move forward with this and start the next phase. It seems like the right time.";

  return (
    <section ref={ref} className="py-40 md:py-56 bg-white">
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
              Instant.
              <br />
              Every time.
            </h2>
            <p className="text-2xl md:text-3xl text-zavi-gray-text font-light max-w-3xl mx-auto">
              No waiting. No editing. Just speak and send.
            </p>
          </motion.div>

          {/* Before/After Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Demo container */}
            <div className="relative bg-white rounded-3xl border border-zavi-border/50 p-12 md:p-16 shadow-lg overflow-hidden">
              {/* Status indicator */}
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-500"
                  animate={{
                    scale: isTransformed ? [1, 1.2, 1] : 1,
                    opacity: isTransformed ? [1, 0.7, 1] : 1
                  }}
                  transition={{ duration: 1, repeat: isTransformed ? Infinity : 0 }}
                />
                <span className="text-sm font-medium text-zavi-gray-text tracking-wide">
                  {isTransformed ? "CLEANED" : "RAW INPUT"}
                </span>
              </div>

              {/* Text transformation */}
              <div className="relative min-h-[180px]">
                <motion.div
                  key={isTransformed ? "clean" : "messy"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`text-xl md:text-2xl leading-relaxed ${
                    isTransformed
                      ? "text-zavi-charcoal font-medium"
                      : "text-zavi-gray-text/60 font-mono"
                  }`}
                >
                  {isTransformed ? cleanText : messyText}
                </motion.div>

                {/* Transformation indicator */}
                {isTransformed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-8 right-0 bg-zavi-blue text-white text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide"
                  >
                    <span className="inline-block animate-pulse mr-1">✓</span>
                    IN 1.8S
                  </motion.div>
                )}
              </div>

              {/* Subtle background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-zavi-blue/5 via-transparent to-transparent"
                animate={{
                  opacity: isTransformed ? [0, 0.5, 0] : 0
                }}
                transition={{ duration: 2 }}
              />
            </div>

            {/* Bottom stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 text-center"
            >
              <div>
                <div className="text-4xl font-bold text-zavi-charcoal mb-2">&lt;2s</div>
                <div className="text-sm text-zavi-gray-text">Processing time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-zavi-charcoal mb-2">0</div>
                <div className="text-sm text-zavi-gray-text">Editing needed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-zavi-charcoal mb-2">100%</div>
                <div className="text-sm text-zavi-gray-text">Ready to send</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
