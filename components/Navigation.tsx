'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl shadow-sm border-b border-zavi-border' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-zavi-border group-hover:border-zavi-blue transition-colors duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="5" width="12" height="2" rx="1" fill="#5BA4FF"/>
                <path d="M8 7Q9 9 10 11T11 17" stroke="#5BA4FF" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="6" y="17" width="12" height="2" rx="1" fill="#5BA4FF"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-zavi-charcoal">Zavi</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-base font-medium text-zavi-gray-text hover:text-zavi-charcoal transition-colors group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zavi-blue group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}

            <motion.a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-zavi-blue" />
              <div className="absolute inset-0 bg-gradient-to-r from-zavi-blue-400 to-zavi-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2C7.11634 2 6.24254 2.17415 5.42614 2.51307C4.60974 2.85199 3.86803 3.34815 3.24264 3.97363C2.00089 5.21538 1.29999 6.90869 1.29999 8.68C1.29999 10.4513 2.00089 12.1446 3.24264 13.3864C3.86803 14.0119 4.60974 14.508 5.42614 14.8469C6.24254 15.1859 7.11634 15.36 8 15.36C9.78407 15.36 11.4954 14.6591 12.7574 13.3864C14.0194 12.1137 14.7 10.4513 14.7 8.68C14.7 7.78547 14.5214 6.89944 14.1755 6.07202C13.8296 5.24459 13.3233 4.49303 12.6831 3.86269C12.043 3.23235 11.2816 2.73609 10.4414 2.39608C9.60113 2.05607 8.69851 1.88006 7.8 1.88006Z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M6.66667 5.46667L11.1111 8L6.66667 10.5333V5.46667Z" fill="currentColor"/>
                </svg>
                Download
              </span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-zavi-charcoal"
            whileTap={{ scale: 0.95 }}
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
