'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

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
    { name: 'Product', href: '/#features' },
    { name: 'Privacy', href: '/privacy' },
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

            <motion.button
              onClick={() => {
                const downloadSection = document.querySelector('[data-section="download"]');
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-zavi-blue rounded-xl hover:bg-zavi-blue-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download
            </motion.button>
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
