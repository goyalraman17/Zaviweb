'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
  const [detectedOS, setDetectedOS] = useState<string>('Unknown');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showDetectedTooltip, setShowDetectedTooltip] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Close mobile menu function
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Detect OS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) setDetectedOS('macOS');
      else if (userAgent.includes('win')) setDetectedOS('Windows');
      else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('iOS');
      else if (userAgent.includes('android')) setDetectedOS('Android');
      else if (userAgent.includes('linux')) setDetectedOS('Linux');
      else setDetectedOS('Unknown');
    }
  }, []);

  // Handle scroll for navbar visibility and height
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setIsScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Get download text - always show a neutral CTA
  const getDownloadText = () => {
    if (detectedOS === 'Android') return 'Download Free';
    return 'Get Early Access';
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMobileMenu();
  };

  const navLinks = [
    { name: 'Demo', href: '/#how-it-works', id: 'how-it-works' },
    { name: 'Pricing', href: '/#pricing', id: 'pricing' },
    { name: 'Try Zavi', href: '/demo', id: 'demo' },
    { name: 'About', href: '/about', id: 'about' },
  ];

  return (
    <motion.nav
      initial="top"
      animate="visible"
      variants={headerReveal}
      className={`fixed left-0 right-0 z-[9997] bg-white/95 backdrop-blur-lg border-b border-gray-200 transition-all duration-300 ${isVisible ? 'top-0' : '-top-24'
        }`}
      style={{ transitionProperty: 'top, height' }}
    >
      <div className="container-large">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}>
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3 group relative z-50 cursor-pointer"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={hoverScaleSubtle}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img
                src="/zavi-logo.png"
                alt="Zavi Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-zavi-charcoal">Zavi</span>
          </motion.a>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div key={link.name} className="relative">
                <a
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-zavi-charcoal transition-colors"
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
                </a>
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-zavi-blue pointer-events-none"
                  initial={{ width: 0 }}
                  animate={{ width: activeLink === link.id ? '70%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block relative">
            <motion.a
              href="/#download"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-zavi-blue hover:bg-zavi-blue-500 rounded-lg transition-all shadow-sm hover:shadow-md"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={ctaPrimary}
              onMouseEnter={() => setShowDetectedTooltip(true)}
              onMouseLeave={() => setShowDetectedTooltip(false)}
            >
              {getDownloadText()}
            </motion.a>
            {showDetectedTooltip && detectedOS !== 'Unknown' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap"
              >
                Detected: {detectedOS}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </motion.div>
            )}
          </div>

          {/* CTA Button - Mobile (visible outside menu) */}
          <motion.a
            href="/#download"
            className="md:hidden flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-zavi-blue hover:bg-zavi-blue-500 rounded-lg transition-all shadow-sm mr-2"
            initial="rest"
            whileTap="tap"
            variants={ctaPrimary}
          >
            {getDownloadText()}
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-3 text-zavi-charcoal relative z-[10000] touch-manipulation"
            onClick={toggleMobileMenu}
            initial="rest"
            whileTap="tap"
            variants={hoverScaleSubtle}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-[9998] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              style={{ top: isScrolled ? '56px' : '64px' }}
            />

            {/* Dropdown Menu Panel */}
            <motion.div
              className="fixed left-0 right-0 w-full bg-white z-[9999] md:hidden shadow-lg border-b border-gray-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ top: isScrolled ? '56px' : '64px', overflow: 'hidden' }}
            >
              <div className="max-w-screen-xl mx-auto px-4 py-4">
                {/* CTA Button - First in menu */}
                <motion.a
                  href="/#download"
                  className="block w-full px-6 py-3 text-center text-base font-semibold text-white bg-zavi-blue hover:bg-zavi-blue-500 rounded-lg transition-all mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  onClick={closeMobileMenu}
                >
                  {getDownloadText()}
                </motion.a>

                {/* Navigation Links */}
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-zavi-charcoal hover:bg-gray-50 rounded-lg transition-colors"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index + 1) * 0.05 }}
                      onClick={closeMobileMenu}
                    >
                      {link.name}
                    </motion.a>
                  ))}

                  {/* Privacy Policy Link */}
                  <motion.a
                    href="/privacy"
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-zavi-charcoal hover:bg-gray-50 rounded-lg transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.05 }}
                    onClick={closeMobileMenu}
                  >
                    Privacy Policy
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
