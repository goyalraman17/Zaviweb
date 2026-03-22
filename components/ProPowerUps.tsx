'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';

export default function ProPowerUps() {
    return (
        <section className="py-24 bg-zavi-paper relative overflow-hidden border-t border-gray-100">
            {/* Glow Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-zavi-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zavi-blue-50 border border-zavi-blue-100 mb-6">
                        <span className="w-2 h-2 rounded-full bg-zavi-blue-500 animate-pulse"></span>
                        <span className="text-sm font-bold tracking-wide text-zavi-blue-700 uppercase">Power Features</span>
                    </div>
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-zavi-blue-600 to-indigo-600">Professionals</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                        Technical capabilities that standard dictation keyboards simply can't match.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                >
                    {/* Card 1: Zero Corrections */}
                    <motion.div variants={fadeUp} className="group relative bg-white border border-gray-200/60 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 border border-blue-200/50 shadow-sm">
                            <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Zero Corrections</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Add industry jargon and acronyms to your <strong className="text-blue-700 font-semibold">Custom Dictionary</strong>. Ensure 100% accuracy and never fight autocorrect again.
                        </p>
                    </motion.div>

                    {/* Card 2: 0ms Latency */}
                    <motion.div variants={fadeUp} className="group relative bg-white border border-gray-200/60 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 border border-indigo-200/50 shadow-sm">
                            <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">0ms Latency</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Speak instantly with zero delay. Our <strong className="text-indigo-700 font-semibold">0-Latency Engine</strong> keeps the mic warm in the background for instant-on recording.
                        </p>
                    </motion.div>

                    {/* Card 3: Live Web Search */}
                    <motion.div variants={fadeUp} className="group relative bg-white border border-gray-200/60 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 border border-cyan-200/50 shadow-sm">
                            <svg className="w-7 h-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Live Web Search</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Ask a question and insert the answer without switching apps, powered by our built-in <strong className="text-cyan-700 font-semibold">Live Web</strong> integration.
                        </p>
                    </motion.div>

                    {/* Card 4: Bring Your Own Key */}
                    <motion.div variants={fadeUp} className="group relative bg-white border border-gray-200/60 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 border border-emerald-200/50 shadow-sm">
                            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Bring Your Own Key</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Connect your own <strong className="text-emerald-700 font-semibold">OpenAI, Claude, or Gemini</strong> API keys for ultimate privacy and cost control over your Voice Agent.
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
