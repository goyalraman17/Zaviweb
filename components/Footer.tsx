'use client';

import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

export default function Footer() {
  return (
    <footer className="bg-[#313131] py-12">
      <div className="container-large">
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
                <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="512" height="512" fill="transparent"/>
                  <path d="M256 96C256 96 192 96 192 160L256 160C256 160 256 96 256 96Z" fill="#1E5EFF"/>
                  <path d="M256 96L384 96C384 96 384 224 256 224C256 224 256 160 192 160C192 160 192 288 256 288C256 288 256 352 320 352C320 352 384 352 384 288L320 288C320 288 320 352 256 352C256 352 256 288 256 288C256 288 384 288 384 160C384 160 384 96 256 96Z" fill="url(#footerGradient1)"/>
                  <path d="M256 288C256 288 128 288 128 352C128 352 128 416 256 416C256 416 256 352 320 352C320 352 320 224 256 224C256 224 256 288 256 288Z" fill="url(#footerGradient2)"/>
                  <defs>
                    <linearGradient id="footerGradient1" x1="256" y1="96" x2="256" y2="352" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2E6FFF"/>
                      <stop offset="0.5" stopColor="#4A8AFF"/>
                      <stop offset="1" stopColor="#6BA5FF"/>
                    </linearGradient>
                    <linearGradient id="footerGradient2" x1="256" y1="224" x2="256" y2="416" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4A8AFF"/>
                      <stop offset="1" stopColor="#2E6FFF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white/90 mb-2">Zavi</h2>
                <p className="text-sm text-gray-500">
                  Think faster than you type.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Product Column */}
          <div className="md:col-span-3">
            <motion.h3
              className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4"
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
                <a href="/#features" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  Download
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  FAQ
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-4">
            <motion.h3
              className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4"
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
                <a href="/about" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
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
          <p className="text-xs text-gray-600 order-2 sm:order-1">
            © 2026 Zavi. Built for people who think faster than they type.
          </p>
          <div className="flex items-center gap-4 order-1 sm:order-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-500 transition-colors"
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
              className="text-gray-600 hover:text-gray-500 transition-colors"
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
