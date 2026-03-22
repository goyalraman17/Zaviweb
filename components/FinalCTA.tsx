'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { analytics } from '@/lib/analytics';

export default function FinalCTA() {
    return (
        <section className="py-14 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6"
                    >
                        While you read this, someone dictated 3 emails with Zavi.
                    </motion.p>

                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0a0a0a] mb-8 tracking-tight"
                        style={{ lineHeight: 1.05 }}
                    >
                        Reclaim your time.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                            Install Zavi.
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium"
                    >
                        30 seconds to set up. Works inside every app you already use. 
                        Your keyboard becomes your most powerful tool.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col items-center gap-6">
                        <a
                            href="/#download"
                            onClick={(e) => {
                                e.preventDefault();
                                analytics.track('cta_final_click');
                                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold text-white bg-[#0a0a0a] rounded-2xl transition-all hover:scale-[1.03] shadow-xl hover:shadow-2xl"
                        >
                            Download Zavi Free
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>

                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                1,000 Free Words Daily
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                No Credit Card
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                Cancel Anytime
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
