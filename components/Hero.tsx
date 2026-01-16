'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const [detectedOS, setDetectedOS] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) setDetectedOS('macOS');
    else if (userAgent.includes('win')) setDetectedOS('Windows');
    else if (userAgent.includes('linux')) setDetectedOS('Linux');
    else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('iOS');
    else if (userAgent.includes('android')) setDetectedOS('Android');
    else setDetectedOS('your device');
  }, []);

  const demoSteps = [
    {
      input: "um so I wanted to uh reach out about the project",
      output: "",
      label: "Speaking..."
    },
    {
      input: "um so I wanted to uh reach out about the project",
      output: "I wanted to reach out about the project.",
      label: "Cleaned instantly"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-zavi-paper/20 via-white to-white" />

      <motion.div
        className="container mx-auto px-6 py-40 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Trust badge */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-zavi-border/50 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-xs text-zavi-gray-text font-medium tracking-wide">
                50,000+ PROFESSIONALS
              </span>
            </div>
          </motion.div>

          {/* Editorial headline */}
          <motion.h1
            className="text-7xl sm:text-8xl md:text-9xl font-bold mb-10 text-zavi-charcoal tracking-tighter leading-[0.95] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Write by
            <br />
            <span className="text-zavi-blue">speaking.</span>
          </motion.h1>

          {/* Single sentence subheadline */}
          <motion.p
            className="text-2xl md:text-3xl text-zavi-gray-text mb-16 max-w-3xl mx-auto leading-snug text-center font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Your voice becomes professional writing instantly—no editing, no friction.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <motion.button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-12 py-5 text-lg font-semibold text-white bg-zavi-blue rounded-2xl hover:bg-zavi-blue-500 transition-colors shadow-sm"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Download for {detectedOS}
            </motion.button>

            {/* Trust line */}
            <p className="text-sm text-zavi-gray-text">
              Platform-agnostic · No app switching · No lock-in
            </p>
            <p className="text-xs text-zavi-gray-text/70">
              Free · Mac, Windows, Linux, iOS, Android · Privacy-first
            </p>
          </motion.div>

          {/* Subtle animated demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto mt-20"
          >
            <div className="bg-white rounded-3xl border border-zavi-border/50 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-zavi-gray-text">
                  {demoSteps[currentStep].label}
                </span>
              </div>

              <div className="space-y-4">
                {/* Input */}
                <div className="text-base text-zavi-gray-text/60 font-mono leading-relaxed">
                  {demoSteps[currentStep].input}
                </div>

                {/* Arrow */}
                {demoSteps[currentStep].output && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-zavi-blue"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 10h10M10 5l5 5-5 5"/>
                    </svg>
                    <span className="text-xs font-medium tracking-wide">INSTANT</span>
                  </motion.div>
                )}

                {/* Output */}
                {demoSteps[currentStep].output && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-base text-zavi-charcoal font-medium leading-relaxed"
                  >
                    {demoSteps[currentStep].output}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        style={{ opacity: scrollOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-zavi-gray-text/30"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4V16M10 16L6 12M10 16L14 12"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
