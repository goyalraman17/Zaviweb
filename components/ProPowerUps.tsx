'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';

export default function ProPowerUps() {
    return (
        <section className="py-24 bg-[#0a0f1c] relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Power Users</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
                        Transform your device with technical capabilities that standard dictation keyboards simply can't match.
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
                    <motion.div variants={fadeUp} className="group relative bg-[#121a2f] border border-blue-900/30 rounded-3xl p-8 hover:bg-[#16203a] transition-all duration-300 overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                            <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Zero Corrections</h3>
                        <p className="text-slate-400 leading-relaxed mb-6 font-medium">
                            Stop fighting with autocorrect. Add industry jargon, client names, and acronyms to your <strong className="text-blue-300 font-semibold">Custom Dictionary</strong> so Zavi gets it right 100% of the time. Create custom text Snippets for instant address expansions.
                        </p>
                    </motion.div>

                    {/* Card 2: 0ms Latency */}
                    <motion.div variants={fadeUp} className="group relative bg-[#121a2f] border border-blue-900/30 rounded-3xl p-8 hover:bg-[#16203a] transition-all duration-300 overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
                            <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">0ms Latency</h3>
                        <p className="text-slate-400 leading-relaxed mb-6 font-medium">
                            Experience instant-on recording. Zavi's advanced <strong className="text-indigo-300 font-semibold">Darwin IPC</strong> architecture keeps the audio engine warm in the background. Tap the mic, feel the haptic pulse, and speak instantly with zero delay.
                        </p>
                    </motion.div>

                    {/* Card 3: Live Web Search */}
                    <motion.div variants={fadeUp} className="group relative bg-[#121a2f] border border-blue-900/30 rounded-3xl p-8 hover:bg-[#16203a] transition-all duration-300 overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20">
                            <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Live Web Search</h3>
                        <p className="text-slate-400 leading-relaxed mb-6 font-medium">
                            Stay in your flow. Use your voice agent to instantly pull live data from the web using the built-in <strong className="text-cyan-300 font-semibold">Tavily integration</strong>. Ask a question and insert the answer without ever switching apps.
                        </p>
                    </motion.div>

                    {/* Card 4: Bring Your Own Key */}
                    <motion.div variants={fadeUp} className="group relative bg-[#121a2f] border border-blue-900/30 rounded-3xl p-8 hover:bg-[#16203a] transition-all duration-300 overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                            <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Bring Your Own Key</h3>
                        <p className="text-slate-400 leading-relaxed mb-6 font-medium">
                            Ultimate control for the privacy-conscious. Connect your own <strong className="text-emerald-300 font-semibold">OpenAI, Claude, or Gemini API keys</strong> to power your Voice Agent, ensuring total data sovereignty and cost management.
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
