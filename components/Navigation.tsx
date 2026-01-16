'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  useScrollThreshold,
  headerReveal,
  navItem,
  ctaPrimary,
  hoverScaleSubtle,
  fadeDown,
  getStaggerDelay,
} from '@/lib/animations';

export default function Navigation() {
  const isScrolled = useScrollThreshold(50);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const navLinks = [
    { name: 'Product', href: '/#features', id: 'product' },
    { name: 'Privacy', href: '/privacy', id: 'privacy' },
  ];

  return (
    <motion.nav
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={headerReveal}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled ? 'border-b border-zavi-border/50' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-zavi-border group-hover:border-zavi-blue transition-all duration-300 group-hover:shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="5" width="12" height="2" rx="1" fill="#5381d2"/>
                <path d="M8 7Q9 9 10 11T11 17" stroke="#5381d2" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="6" y="17" width="12" height="2" rx="1" fill="#5381d2"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-zavi-charcoal">Zavi</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-zavi-gray-600 hover:text-zavi-charcoal transition-colors group"
                initial="hidden"
                animate="visible"
                variants={fadeDown}
                transition={{ delay: getStaggerDelay(index, 0.05, 0.1) }}
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
                  animate={{ width: activeLink === link.id ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* CTA Button */}
            <div className="ml-2 pl-2 border-l border-zavi-border">
              <motion.button
                onClick={() => {
                  const downloadSection = document.querySelector('[data-section="download"]');
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-zavi-blue rounded-xl hover:bg-zavi-blue-500 transition-all shadow-lg shadow-zavi-blue/25 hover:shadow-xl hover:shadow-zavi-blue/30"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={ctaPrimary}
              >
                Download
              </motion.button>
            </div>
          </div>

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
