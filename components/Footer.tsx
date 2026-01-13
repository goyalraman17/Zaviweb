'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-zavi-navy-950 py-12">
      <div className="container mx-auto px-6 text-center">
        <motion.p
          className="text-base font-medium text-zavi-navy-200 mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Zavi AI – Voice Typing Keyboard for Android
        </motion.p>
        <motion.p
          className="text-sm text-zavi-navy-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          © 2026 Zavi. Built for people who think faster than they type.
        </motion.p>
      </div>
    </footer>
  );
}
