'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MobileStickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [detectedOS, setDetectedOS] = useState<string>('Unknown');

    useEffect(() => {
        // Detect OS
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('iOS');
        else if (userAgent.includes('android')) setDetectedOS('Android');
        else if (userAgent.includes('mac')) setDetectedOS('macOS');
        else if (userAgent.includes('win')) setDetectedOS('Windows');

        // Scroll listener for visibility
        const handleScroll = () => {
            // Show when scrolling past the hero section (~600px)
            // Hide when reaching the footer/final CTA to avoid double buttons
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            const pastHero = scrollPosition > 600;
            const nearBottom = scrollPosition + windowHeight > documentHeight - 800;

            setIsVisible(pastHero && !nearBottom);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getButtonText = () => {
        if (detectedOS === 'Windows') return 'Join Windows Waitlist';
        if (detectedOS === 'iOS') return 'Get Zavi for iPhone';
        if (detectedOS === 'Android') return 'Get Zavi for Android';
        return 'Try Zavi For Free';
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-0 left-0 right-0 z-[9990] p-4 md:hidden pointer-events-none"
                >
                    {/* Subtle gradient shadow behind the button to ensure readability over text */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent -z-10" />

                    <a
                        href="/#download"
                        className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-zavi-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/20 shadow-lg pointer-events-auto active:scale-95 transition-transform"
                    >
                        <span>{getButtonText()}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
