'use client';

import { motion } from 'framer-motion';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

export default function Footer() {
  return (
    <footer className="bg-zavi-navy-950 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 max-w-6xl mx-auto">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="5" width="12" height="2" rx="1" fill="#1a8cff"/>
                  <path d="M8 7Q9 9 10 11T11 17" stroke="#1a8cff" strokeWidth="2.5" strokeLinecap="round"/>
                  <rect x="6" y="17" width="12" height="2" rx="1" fill="#1a8cff"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Zavi AI</span>
            </motion.div>
            <motion.p
              className="text-base text-zavi-navy-300 mb-4 max-w-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Voice typing keyboard for Android. Turn natural speech into professional text in any app.
            </motion.p>
            <motion.div
              className="flex items-center gap-2 text-sm text-zavi-navy-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>⭐ 4.8</span>
              <span>•</span>
              <span>50K+ downloads</span>
              <span>•</span>
              <span>Android 8.0+</span>
            </motion.div>
          </div>

          {/* Product Column */}
          <div>
            <motion.h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Product
            </motion.h3>
            <motion.ul
              className="space-y-3 text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <li>
                <a href="/#features" className="text-zavi-navy-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-zavi-navy-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-zavi-navy-300 hover:text-white transition-colors">
                  Download
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-zavi-navy-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Company Column */}
          <div>
            <motion.h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Company
            </motion.h3>
            <motion.ul
              className="space-y-3 text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <li>
                <a href="/about" className="text-zavi-navy-300 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-zavi-navy-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-zavi-navy-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-zavi-navy-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </motion.ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-zavi-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-sm text-zavi-navy-400">
            © 2026 Zavi. Built for people who think faster than they type.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zavi-navy-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zavi-navy-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
