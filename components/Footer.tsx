'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainerSlow } from '@/lib/animations';

export default function Footer() {
  return (
    <footer
      className="relative py-12 md:py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E8E5F5 0%, #F5E8F0 50%, #E5F0F5 100%)',
      }}
    >
      <div className="container-large relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerSlow}
          className="text-center"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Top bar */}
                  <rect x="15" y="10" width="70" height="12" rx="6" fill="url(#footerTopBar)"/>

                  {/* Flowing Z layers */}
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
                      <stop offset="0%" stopColor="#6B7FE8"/>
                      <stop offset="50%" stopColor="#8B5CF6"/>
                      <stop offset="100%" stopColor="#A855F7"/>
                    </linearGradient>
                    <linearGradient id="footerBottomBar" x1="15" y1="84" x2="85" y2="84" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#6B7FE8"/>
                      <stop offset="50%" stopColor="#8B5CF6"/>
                      <stop offset="100%" stopColor="#A855F7"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Zavi</h2>
            </div>
            <p className="text-sm text-gray-600">
              Think faster than you type.
            </p>
          </motion.div>

          {/* Essential Links Only */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a
                href="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Privacy
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="/terms"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Terms
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="/contact"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-gray-600 order-2 sm:order-1">
            © 2026 Zavi. Built for people who think faster than they type.
          </p>
          <div className="flex items-center gap-4 order-1 sm:order-2">
            <a
              href="https://twitter.com/zavihq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/zavihq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
