'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export default function StickyDownloadCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 600px
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDownload = () => {
        analytics.track('cta_sticky_click');
        const downloadSection = document.getElementById('download');
        if (downloadSection) {
            downloadSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-4 md:bottom-8 left-0 w-full pointer-events-none z-[100] flex justify-center px-4">
                    <motion.div
                        initial={{ y: 80, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 80, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="pointer-events-auto w-full md:w-auto md:min-w-[480px]"
                    >
                        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.15)] rounded-full p-2.5 flex flex-row items-center justify-between gap-4">

                            {/* Social Proof / Mini Info (Desktop Only) */}
                            <div className="hidden md:flex items-center pl-4 pr-2 space-x-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-sky-50 flex items-center justify-center text-blue-600 z-[${10 - i}] shadow-sm`}>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs font-semibold text-slate-600 leading-tight">
                                    <span className="text-blue-600 font-bold text-sm">Loved by</span><br />Professionals
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={handleDownload}
                                className="flex-1 md:flex-none relative overflow-hidden bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold py-3.5 md:py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center md:justify-between group"
                            >
                                {/* Shimmer Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                />
                                <span className="relative z-10 whitespace-nowrap tracking-wide">Start Speaking for Free</span>
                                <div className="ml-3 bg-white/20 p-1.5 rounded-full relative z-10 transition-transform group-hover:translate-x-1 hidden md:block">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
