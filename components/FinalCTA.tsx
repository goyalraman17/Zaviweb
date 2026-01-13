'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-zavi-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-zavi-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stop typing. Start speaking.
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-zavi-gray-700 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of Android users who've already made the switch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 text-xl font-semibold text-white bg-zavi-black rounded-2xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Zavi on Google Play
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
