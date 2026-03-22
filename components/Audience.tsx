'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

const audiences = [
  {
    title: "Professionals",
    description: "Write clear emails on the go. Respond to Slack without breaking stride. Document meetings while they're fresh."
  },
  {
    title: "Creators",
    description: "Capture ideas before they vanish. Draft social posts while walking. Turn voice memos into polished text."
  },
  {
    title: "Students",
    description: "Take notes in lectures. Write essays on your commute. Study with voice-to-text flashcards."
  },
  {
    title: "Anyone tired of typing",
    description: "Send thoughtful messages. Write without thumb pain. Say what you mean, exactly how you mean it."
  }
];

export default function Audience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Made for people who think faster than they type
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg flex flex-col"
            >
              <h3 className="text-2xl font-semibold text-zavi-black mb-3">
                {audience.title}
              </h3>
              <p className="text-base text-zavi-gray-700 leading-relaxed mb-6 flex-grow">
                {audience.description}
              </p>
              <motion.a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-sm font-medium text-zavi-black bg-transparent border-2 border-zavi-gray-200 rounded-xl text-center transition-all"
                whileHover={{
                  borderColor: '#0a0a0a',
                  backgroundColor: '#fafafa'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Install on Google Play
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
