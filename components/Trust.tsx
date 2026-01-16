'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    {
      value: "50K+",
      label: "Active users",
    },
    {
      value: "<2s",
      label: "Processing time",
    },
    {
      value: "100+",
      label: "Languages supported",
    },
    {
      value: "5",
      label: "Platforms",
    },
  ];

  const privacyFeatures = [
    {
      title: "User-activated microphone",
      description: "Your voice is processed only when you press the button.",
    },
    {
      title: "No stored recordings",
      description: "Audio is immediately deleted after processing. Nothing is saved.",
    },
    {
      title: "Encrypted processing",
      description: "All data transmission is encrypted end-to-end.",
    },
    {
      title: "Hybrid architecture",
      description: "On-device processing when possible. Cloud only when necessary.",
    },
  ];

  return (
    <section ref={ref} className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        {/* Usage metrics - enterprise grade */}
        <motion.div
          className="max-w-6xl mx-auto mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-zavi-charcoal mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-zavi-gray-text font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy section - architectural messaging */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-zavi-charcoal mb-6">
              Built for privacy
            </h2>
            <p className="text-xl text-zavi-gray-text max-w-2xl mx-auto">
              Privacy is architectural, not optional. Your data is protected by design.
            </p>
          </div>

          {/* Privacy features grid - clean, minimal */}
          <div className="grid md:grid-cols-2 gap-8">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="bg-zavi-paper/50 rounded-xl p-6 border border-zavi-border"
              >
                <h3 className="text-lg font-semibold text-zavi-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-base text-zavi-gray-text leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
