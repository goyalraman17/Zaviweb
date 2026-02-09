'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import {
    fadeUp,
    staggerContainer,
    staggerContainerSlow,
} from '@/lib/animations';

const magicExamples = [
    {
        id: 'instagram',
        app: 'Instagram',
        color: 'border-indigo-100',
        icon: <img src="/icons/instagram.svg" alt="Instagram" className="w-full h-full object-contain filter drop-shadow-sm" />,
        prompt: "Post about how magical Zavi is",
        result: "You guys, I just found the ultimate cheat code for content creation! 🪄 Zavi writes my captions instantly. It's like magic! ✨ #ContentCreator #ZaviMagic"
    },
    {
        id: 'gmail',
        app: 'Gmail',
        color: 'border-red-100',
        icon: <img src="/icons/gmail.svg" alt="Gmail" className="w-full h-full object-contain filter drop-shadow-sm" />,
        prompt: "Write an email with positive feedback",
        result: "Subject: Loving the app! ❤️\n\nHi Zavi Team,\n\nJust wanted to share that your app has completely changed how I work. The 'No Prompts' feature is genius. Keep it up!\n\nBest,\n[Name]"
    },
    {
        id: 'slack',
        app: 'Slack',
        color: 'border-emerald-100',
        icon: <img src="/icons/slack.svg" alt="Slack" className="w-full h-full object-contain filter drop-shadow-sm" />,
        prompt: "Tell team about this new tool",
        result: "Hey team! 👋 You have to install Zavi. It's saving me so much time on documentation and messages. Let's get a team plan! 🚀"
    }
];

export default function MagicWand() {
    const [activeCard, setActiveCard] = useState<string | null>(null);

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-white pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6 shadow-sm"
                    >
                        <span className="text-lg">✨</span>
                        <span>Magic Wand</span>
                    </motion.div>

                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight"
                    >
                        Your Wish is Zavi&apos;s Command.
                    </motion.h2>

                    {/* Benefit Badges */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 sm:gap-4"
                    >
                        {[
                            { icon: "🚫", text: "No Prompts" },
                            { icon: "⚡️", text: "Instant Drafts" },
                            { icon: "🧠", text: "Context Aware" },
                            { icon: "📱", text: "Works Everywhere" }
                        ].map((badge, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-2 text-gray-600 font-medium text-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                            >
                                <span className="text-lg">{badge.icon}</span>
                                <span>{badge.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainerSlow}
                    className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20"
                >
                    {magicExamples.map((item) => (
                        <MagicCard
                            key={item.id}
                            item={item}
                            isActive={activeCard === item.id}
                            onActivate={() => setActiveCard(item.id === activeCard ? null : item.id)}
                        />
                    ))}
                </motion.div>

                {/* Bottom Section - Visual "Replaces" & CTA */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden ring-1 ring-gray-100 shadow-2xl"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest mb-10 relative z-10">
                            Stop Doing This 👇
                        </h3>

                        <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
                            {[
                                "Switching Apps",
                                "Copy-Pasting",
                                "Formatting",
                                "Prompt Engineering"
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-6 py-3 rounded-2xl bg-red-50/80 border border-red-100 text-red-500 font-bold text-sm line-through decoration-red-400/50 decoration-2 shadow-sm"
                                >
                                    {text}
                                </motion.div>
                            ))}
                        </div>

                        <a
                            href="#download"
                            onClick={(e) => {
                                e.preventDefault();
                                analytics.track('cta_magic_wand_click', {
                                    location: 'magic_wand_section'
                                });
                                const downloadSection = document.getElementById('download');
                                if (downloadSection) {
                                    downloadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-xl transition-all hover:scale-105 shadow-xl shadow-blue-500/20 group relative z-10"
                        >
                            <span>Try Magic Wand</span>
                            <motion.img
                                src="/icons/magic-wand-filled.svg"
                                alt="Magic Wand"
                                className="w-6 h-6 object-contain brightness-0 invert"
                                animate={{ rotate: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                            />
                        </a>
                        <p className="mt-6 text-sm text-gray-500 font-medium relative z-10">Automatic • Private • Works in any app</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function MagicCard({ item, isActive, onActivate }: { item: any, isActive: boolean, onActivate: () => void }) {
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        if (isActive) {
            setTypedText("");
            const text = item.result;
            const speed = 12;
            let currentIndex = 0;

            const typing = setInterval(() => {
                if (currentIndex <= text.length) {
                    setTypedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(typing);
                }
            }, speed);

            return () => clearInterval(typing);
        } else {
            setTypedText("");
        }
    }, [isActive, item.result]);

    return (
        <motion.div
            variants={fadeUp}
            className={`
                bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 relative group flex flex-col h-full
                ${isActive ? 'border-blue-400 ring-4 ring-blue-50 shadow-lg' : 'border-gray-100 hover:border-blue-200 hover:shadow-md'}
            `}
        >
            {/* App Icon - Top Right - Official Brand Style */}
            <div className="absolute top-6 right-6 w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
            </div>

            <div className="mt-2 mb-8 pr-12">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-sans">You Say</p>
                <p className="text-gray-900 font-bold text-xl leading-snug tracking-tight">"{item.prompt}"</p>
            </div>

            {/* Interaction Zone */}
            <div className="flex-1 flex flex-col gap-5">
                <div className="flex justify-center -my-4 relative z-10">
                    <button
                        onClick={onActivate}
                        className={`
                            group/btn flex items-center justify-center w-14 h-14 rounded-full border-4 border-white shadow-lg transition-all duration-300
                            ${isActive
                                ? 'bg-blue-600 scale-110 rotate-0'
                                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 rotate-0'
                            }
                        `}
                    >
                        <img
                            src="/icons/magic-wand-filled.svg"
                            alt="Activate"
                            className={`w-7 h-7 object-contain transition-transform duration-500 brightness-0 invert ${isActive ? 'rotate-12' : ''}`}
                        />
                    </button>
                    {/* Click me text removed */}
                </div>

                {/* Result Container */}
                <div className={`mt-2 flex-1 rounded-2xl border p-5 relative overflow-hidden transition-all duration-500 min-h-[140px]
                    ${isActive
                        ? 'bg-white border-blue-200 shadow-inner'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                >

                    {/* Placeholder */}
                    {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-semibold">
                            Magic happens here...
                        </div>
                    )}

                    {/* Content */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative z-10 w-full"
                            >
                                {/* Instagram UI */}
                                {item.id === 'instagram' && (
                                    <div className="space-y-3">
                                        {/* User Header - Fixed Visibility */}
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold ring-2 ring-white shadow-sm">
                                                you
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900 leading-none">@zavivoice</span>
                                                <span className="text-[10px] text-gray-400 font-medium">Original Audio</span>
                                            </div>
                                        </div>
                                        <div className="text-[15px] text-gray-800 leading-relaxed font-normal">
                                            {typedText}
                                            <span className="inline-block w-0.5 h-5 ml-0.5 align-middle bg-blue-600 animate-pulse"></span>
                                        </div>
                                    </div>
                                )}

                                {/* Gmail UI */}
                                {item.id === 'gmail' && (
                                    <div className="text-sm text-gray-800">
                                        {/* User Header */}
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-[10px] font-bold">
                                                Y
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                To: <span className="font-semibold text-gray-900">Zavi Team</span>
                                            </div>
                                        </div>

                                        <div className="mb-2 text-xs font-bold text-gray-900">
                                            Subject: Loving the app! ❤️
                                        </div>

                                        <div className="text-[15px] leading-relaxed whitespace-pre-wrap font-sans text-gray-800">
                                            {typedText}
                                            <span className="inline-block w-0.5 h-5 ml-0.5 align-middle bg-blue-600 animate-pulse"></span>
                                        </div>
                                    </div>
                                )}

                                {/* Slack UI */}
                                {item.id === 'slack' && (
                                    <div className="flex gap-3">
                                        {/* User Avatar */}
                                        <div className="w-9 h-9 rounded bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold text-sm shadow-sm">
                                            Y
                                        </div>
                                        <div className="flex-1 space-y-0.5">
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-bold text-gray-900 text-sm">You</span>
                                                <span className="text-[10px] text-gray-400">10:42 AM</span>
                                            </div>
                                            <div className="text-[15px] text-gray-900 leading-relaxed">
                                                {typedText}
                                                <span className="inline-block w-0.5 h-5 ml-0.5 align-middle bg-blue-600 animate-pulse"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
