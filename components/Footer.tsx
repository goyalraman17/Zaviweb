'use client';

import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

export default function Footer() {
  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2a2d3a 0%, #1f2229 50%, #1a1c23 100%)'
      }}
    >
      {/* Premium background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container-large relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 mt-1">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Top bar */}
                  <rect x="15" y="10" width="70" height="12" rx="6" fill="url(#footerTopBar)"/>

                  {/* Flowing Z layers - from back to front */}
                  <path d="M 75 22 Q 65 30, 55 38 Q 45 46, 35 54 Q 25 62, 25 70"
                        stroke="#87CEEB" strokeWidth="8" fill="none" opacity="0.3"/>
                  <path d="M 77 22 Q 67 30, 57 38 Q 47 46, 37 54 Q 27 62, 25 70"
                        stroke="#5DADE2" strokeWidth="8" fill="none" opacity="0.4"/>
                  <path d="M 79 22 Q 69 30, 59 38 Q 49 46, 39 54 Q 29 62, 25 70"
                        stroke="#3498DB" strokeWidth="9" fill="none" opacity="0.5"/>
                  <path d="M 81 22 Q 71 30, 61 38 Q 51 46, 41 54 Q 31 62, 25 70"
                        stroke="#2E86C1" strokeWidth="10" fill="none" opacity="0.6"/>
                  <path d="M 83 22 Q 73 30, 63 38 Q 53 46, 43 54 Q 33 62, 25 70"
                        stroke="#2874A6" strokeWidth="11" fill="none" opacity="0.8"/>
                  <path d="M 85 22 Q 75 30, 65 38 Q 55 46, 45 54 Q 35 62, 25 70"
                        stroke="#1F5F8B" strokeWidth="12" fill="none" opacity="1"/>

                  {/* Bottom bar */}
                  <rect x="15" y="78" width="70" height="12" rx="6" fill="url(#footerBottomBar)"/>

                  <defs>
                    <linearGradient id="footerTopBar" x1="15" y1="16" x2="85" y2="16" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#2E5FDD"/>
                      <stop offset="50%" stopColor="#3B82F6"/>
                      <stop offset="100%" stopColor="#60A5FA"/>
                    </linearGradient>
                    <linearGradient id="footerBottomBar" x1="15" y1="84" x2="85" y2="84" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#2E5FDD"/>
                      <stop offset="50%" stopColor="#3B82F6"/>
                      <stop offset="100%" stopColor="#60A5FA"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Zavi</h2>
                <p className="text-sm text-gray-400">
                  Think faster than you type.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Product Column */}
          <div className="md:col-span-3">
            <motion.h3
              className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Product
            </motion.h3>
            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <li>
                <a href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Download
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-4">
            <motion.h3
              className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Company
            </motion.h3>
            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <li>
                <a href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </motion.ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs text-gray-500 order-2 sm:order-1">
            © 2026 Zavi. Built for people who think faster than they type.
          </p>
          <div className="flex items-center gap-4 order-1 sm:order-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
