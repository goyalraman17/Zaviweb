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
      className="fixed top-0 left-0 right-0 z-50 bg-zavi-charcoal/95 backdrop-blur-lg border-b border-white/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Platform Badges */}
          <div className="flex items-center gap-8">
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={hoverScaleSubtle}
            >
              <div className="relative w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10 group-hover:border-zavi-blue/50 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="5" width="12" height="2" rx="1" fill="#5381d2"/>
                  <path d="M8 7Q9 9 10 11T11 17" stroke="#5381d2" strokeWidth="2.5" strokeLinecap="round"/>
                  <rect x="6" y="17" width="12" height="2" rx="1" fill="#5381d2"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Zavi</span>
            </motion.a>

            {/* Platform Badges */}
            <div className="hidden lg:flex items-center gap-2">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial="hidden"
                  animate="visible"
                  variants={fadeDown}
                  transition={{ delay: getStaggerDelay(index, 0.05, 0.1) }}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center gap-2 text-white/70 text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {platform.icon === 'apple' && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  )}
                  {platform.icon === 'windows' && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 5.45v6.11l7.5.02V3.45L3 5.45zm7.5 7.68L3 13.11v6.14l7.5 1.98v-8.1zm1.5-8.1v8.12l9-.02V3.45l-9 1.58zm9 9.68l-9 .02v8.08l9 1.58v-9.68z"/>
                    </svg>
                  )}
                  {platform.icon === 'android' && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 15.3414c-.5511-.0001-.9993-.4484-.9993-.9995s.4483-.9995.9993-.9995c.5511 0 .9993.4484.9993.9995s-.4482.9995-.9993.9995m-5.046-8.3476c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m-5.046 8.3476c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m0-7.5466c-.5511 0-.9993-.4484-.9993-.9995s.4482-.9995.9993-.9995.9993.4484.9993.9995-.4482.9995-.9993.9995m12.5455 13.7512c-.1555 1.3-1.1033 2.348-2.4035 2.6085-3.7422.747-7.5477.747-11.29 0-1.3-.2605-2.248-1.3085-2.4035-2.6085-.3645-3.0403-.3645-6.1195 0-9.1598.1555-1.3 1.1035-2.348 2.4035-2.6085 3.7423-.747 7.5478-.747 11.29 0 1.3002.2605 2.248 1.3085 2.4035 2.6085.3645 3.0403.3645 6.1195 0 9.1598z"/>
                    </svg>
                  )}
                  {platform.name}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
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
            className="hidden md:flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zavi-charcoal bg-white rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={ctaPrimary}
          >
            {getOSIcon()}
            Download for {detectedOS}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white"
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
