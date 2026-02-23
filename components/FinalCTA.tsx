'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function FinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-zavi-blue-100/60 via-indigo-100/60 to-purple-100/60 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-12 md:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight text-balance"
                    >
                        Stop typing.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-blue-600 to-indigo-600">Start speaking.</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium"
                    >
                        Start saving 1+ hours every day with the voice assistant that actually does the work.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
                        <a
                            href="/#download"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                        >
                            <span className="relative z-10">Try Zavi For Free</span>
                            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                        </a>

                        <div className="flex items-center gap-4 text-sm font-semibold text-gray-500 mt-2">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                1,000 Free Words Daily
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                No Credit Card
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
