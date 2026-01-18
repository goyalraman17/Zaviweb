'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  headerReveal,
  navItem,
  ctaPrimary,
  hoverScaleSubtle,
  fadeDown,
  getStaggerDelay,
} from '@/lib/animations';

export default function Navigation() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [detectedOS, setDetectedOS] = useState<string>('macOS');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) setDetectedOS('macOS');
      else if (userAgent.includes('win')) setDetectedOS('Windows');
      else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('iOS');
      else if (userAgent.includes('android')) setDetectedOS('Android');
      else setDetectedOS('macOS');
    }
  }, []);

  const navLinks = [
    { name: 'Product', href: '/', id: 'product' },
    { name: 'Pricing', href: '/#pricing', id: 'pricing' },
    { name: 'Privacy', href: '/privacy', id: 'privacy' },
  ];

  const platforms = [
    { name: 'iOS', icon: 'apple' },
    { name: 'Mac', icon: 'apple' },
    { name: 'Windows', icon: 'windows' },
    { name: 'Android', icon: 'android' },
  ];

  const getOSIcon = () => {
    if (detectedOS === 'macOS' || detectedOS === 'iOS') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
      );
    } else if (detectedOS === 'Windows') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 5.45v6.11l7.5.02V3.45L3 5.45zm7.5 7.68L3 13.11v6.14l7.5 1.98v-8.1zm1.5-8.1v8.12l9-.02V3.45l-9 1.58zm9 9.68l-9 .02v8.08l9 1.58v-9.68z"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.523 15.3414c-.5511-.0001-.9993-.4484-.9993-.9995s.4483-.9995.9993-.9995c.5511 0 .9993.4484.9993.9995s-.4482.9995-.9993.9995m-5.046-8.3476c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m-5.046 8.3476c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m0-7.5466c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m12.5455 13.7512c-.1555 1.3-1.1033 2.348-2.4035 2.6085-3.7422.747-7.5477.747-11.29 0-1.3-.2605-2.248-1.3085-2.4035-2.6085-.3645-3.0403-.3645-6.1195 0-9.1598.1555-1.3 1.1035-2.348 2.4035-2.6085 3.7423-.747 7.5478-.747 11.29 0 1.3002.2605 2.248 1.3085 2.4035 2.6085.3645 3.0403.3645 6.1195 0 9.1598z"/>
        </svg>
      );
    }
  };

  return (
    <motion.nav
      initial="top"
      animate="visible"
      variants={headerReveal}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="container-large">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3 group"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverScaleSubtle}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top bar */}
                <rect x="15" y="10" width="70" height="12" rx="6" fill="url(#topBar)"/>

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
                <rect x="15" y="78" width="70" height="12" rx="6" fill="url(#bottomBar)"/>

                <defs>
                  <linearGradient id="topBar" x1="15" y1="16" x2="85" y2="16" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2E5FDD"/>
                    <stop offset="50%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#60A5FA"/>
                  </linearGradient>
                  <linearGradient id="bottomBar" x1="15" y1="84" x2="85" y2="84" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2E5FDD"/>
                    <stop offset="50%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#60A5FA"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-bold text-zavi-charcoal">Zavi</span>
          </motion.a>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-zavi-charcoal transition-colors group"
                initial="hidden"
                animate="visible"
                variants={fadeDown}
                transition={{ delay: getStaggerDelay(index, 0.05, 0.15) }}
                onMouseEnter={() => setActiveLink(link.id)}
                onMouseLeave={() => setActiveLink(null)}
              >
                <motion.span
                  initial="rest"
                  whileHover="hover"
                  variants={navItem}
                >
                  {link.name}
                </motion.span>
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-zavi-blue"
                  initial={{ width: 0 }}
                  animate={{ width: activeLink === link.id ? '70%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => {
              const downloadSection = document.querySelector('[data-section="download"]');
              if (downloadSection) {
                downloadSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#3B4AA3] rounded-lg hover:bg-[#323e8a] transition-all shadow-sm hover:shadow-md"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={ctaPrimary}
          >
            Download for macOS
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-zavi-charcoal"
            initial="rest"
            whileTap="tap"
            variants={hoverScaleSubtle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
