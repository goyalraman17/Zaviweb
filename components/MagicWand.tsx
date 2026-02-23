'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { analytics } from '@/lib/analytics';
import {
    fadeUp,
    staggerContainer,
    staggerContainerSlow,
    ctaPrimary,
} from '@/lib/animations';
import GlowCard from './animated/GlowCard';

const magicExamples = [
    {
        id: 'instagram',
        app: 'Instagram',
        color: 'border-indigo-100',
        icon: <div className="relative w-full h-full"><Image src="/icons/instagram.svg" alt="Instagram" fill className="object-contain filter drop-shadow-sm" /></div>,
        prompt: "Post about how magical Zavi is",
        result: "You guys, I just found the ultimate cheat code for content creation! 🪄 Zavi writes my captions instantly. It's like magic! ✨ #ContentCreator #ZaviMagic"
    },
    {
        id: 'gmail',
        app: 'Gmail',
        color: 'border-red-100',
        icon: <div className="relative w-full h-full"><Image src="/icons/gmail.svg" alt="Gmail" fill className="object-contain filter drop-shadow-sm" /></div>,
        prompt: "Write an email with positive feedback",
        result: "Subject: Loving the app! ❤️\n\nHi Zavi Team,\n\nJust wanted to share that your app has completely changed how I work. The 'No Prompts' feature is genius. Keep it up!\n\nBest,\n[Name]"
    },
    {
        id: 'slack',
        app: 'Slack',
        color: 'border-emerald-100',
        icon: <div className="relative w-full h-full"><Image src="/icons/slack.svg" alt="Slack" fill className="object-contain filter drop-shadow-sm" /></div>,
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
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/50 backdrop-blur-md border border-indigo-100/50 text-indigo-600 text-sm font-bold mb-6 shadow-sm group cursor-default"
                    >
                        <motion.span
                            animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="text-lg"
                        >
                            ✨
                        </motion.span>
                        <span className="tracking-wide uppercase text-[10px]">Magic Wand</span>
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
                                className="px-5 py-2.5 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/80 flex items-center gap-2.5 text-gray-800 font-bold text-xs hover:shadow-md transition-all hover:-translate-y-0.5"
                            >
                                <span className="text-base">{badge.icon}</span>
                                <span className="tracking-tight">{badge.text}</span>
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
                        className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-[0.2em] mb-10 relative z-10 flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></span>
                            Stop Doing This
                            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-300"></span>
                        </h3>

                        <div className="flex flex-wrap justify-center gap-4 py-8 px-6 bg-gradient-to-b from-white/40 to-white/20 rounded-[2rem] border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] mb-12 relative z-10 max-w-3xl mx-auto backdrop-blur-md">
                            {[
                                "Switching Apps",
                                "Copy-Pasting",
                                "Formatting",
                                "Prompt Engineering"
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    className="group/tag px-6 py-3.5 rounded-2xl bg-white/80 border border-red-100/50 text-red-500 font-bold text-[13px] tracking-wide shadow-sm flex items-center gap-2.5 transition-all hover:bg-red-50/50"
                                >
                                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-400 group-hover/tag:bg-red-100 transition-colors">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <span className="line-through decoration-red-200 decoration-2">{text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
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
                                className="inline-flex justify-center w-full sm:w-auto items-center gap-3 px-10 py-5 bg-gradient-to-r from-zavi-blue-600 to-indigo-600 hover:from-zavi-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-[0_8px_20px_rgba(37,99,235,0.25)] group"
                            >
                                <span>Get Magic Wand</span>
                                <Image
                                    src="/icons/magic-wand-filled.svg"
                                    alt="Magic Wand"
                                    width={20}
                                    height={20}
                                    className="object-contain brightness-0 invert"
                                />
                            </a>
                        </div>
                        <p className="mt-6 text-sm text-gray-500 font-medium relative z-10 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                            Automatic • Private • Native Integration
                        </p>
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
        <GlowCard glowColor="rgba(37, 99, 235, 0.4)" className="h-full">
            <motion.div
                variants={fadeUp}
                className={`
                    bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all duration-500 relative group flex flex-col h-full overflow-hidden
                    ${isActive ? 'border-blue-400/50 ring-[12px] ring-blue-50/50' : 'border-white/60 hover:border-blue-200/50'}
                `}
            >
                {/* Visual Glow behind icons */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                {/* App Icon - Top Right - Official Brand Style */}
                <div className="absolute top-6 right-6 w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                </div>

                <div className="mt-2 mb-8 pr-12">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-sans">You Say</p>
                    <p className="text-gray-900 font-bold text-xl leading-snug tracking-tight">"{item.prompt}"</p>
                </div>

                {/* Interaction Zone */}
                <div className="flex-1 flex flex-col gap-0 mt-4 relative">
                    {/* Floating Action Button */}
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-20">
                        <button
                            onClick={onActivate}
                            className={`
                            group/btn flex items-center justify-center w-14 h-14 rounded-full border-4 border-white shadow-md transition-all duration-300
                            ${isActive
                                    ? 'bg-blue-600 scale-110 shadow-blue-500/30 ring-2 ring-blue-100 ring-offset-2'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-lg'
                                }
                        `}
                        >
                            <Image
                                src="/icons/magic-wand-filled.svg"
                                alt="Activate"
                                width={24}
                                height={24}
                                className={`object-contain transition-transform duration-500 brightness-0 invert ${isActive ? 'rotate-[15deg] scale-110' : ''}`}
                            />
                        </button>
                    </div>

                    {/* Result Container */}
                    <div className={`mt-0 flex-1 rounded-2xl border p-6 pt-10 relative overflow-hidden transition-all duration-500 md:min-h-[180px]
                    ${isActive
                            ? 'bg-white border-blue-200 shadow-[0_2px_15px_-3px_rgba(37,99,235,0.1)]'
                            : 'bg-gray-50 border-gray-100'
                        }`}
                    >

                        {/* Pre-fill UI (Skeleton-ish State) */}
                        {!isActive && (
                            <div className="flex flex-col gap-3 opacity-40 grayscale pointer-events-none transition-opacity duration-300 group-hover:opacity-60">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="h-2.5 w-24 bg-gray-200 rounded-full" />
                                        <div className="h-2 w-16 bg-gray-100 rounded-full" />
                                    </div>
                                </div>
                                <div className="h-2.5 w-full bg-gray-200 rounded-full mt-2" />
                                <div className="h-2.5 w-4/5 bg-gray-200 rounded-full" />
                                <div className="h-2.5 w-2/3 bg-gray-200 rounded-full" />
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
        </GlowCard>
    );
}
