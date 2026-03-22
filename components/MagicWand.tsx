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
        result: "You guys, I just found the ultimate cheat code for content creation! Zavi writes my captions instantly. It's like magic! #ContentCreator #ZaviMagic"
    },
    {
        id: 'gmail',
        app: 'Gmail',
        color: 'border-red-100',
        icon: <div className="relative w-full h-full"><Image src="/icons/gmail.svg" alt="Gmail" fill className="object-contain filter drop-shadow-sm" /></div>,
        prompt: "Write an email with positive feedback",
        result: "Subject: Loving the app!\n\nHi Zavi Team,\n\nJust wanted to share that your app has completely changed how I work. The 'No Prompts' feature is genius. Keep it up!\n\nBest,\n[Name]"
    },
    {
        id: 'slack',
        app: 'Slack',
        color: 'border-emerald-100',
        icon: <div className="relative w-full h-full"><Image src="/icons/slack.svg" alt="Slack" fill className="object-contain filter drop-shadow-sm" /></div>,
        prompt: "Tell team about this new tool",
        result: "Hey team! You have to install Zavi. It's saving me so much time on documentation and messages. Let's get a team plan!"
    }
];

export default function MagicWand() {
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay) return;

        const sequence = ['instagram', 'gmail', 'slack'];
        let currentIndex = 0;

        // Start the first one immediately
        setActiveCard(sequence[0]);

        const intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % sequence.length;
            setActiveCard(sequence[currentIndex]);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [autoPlay]);

    return (
        <section className="py-14 md:py-24 relative overflow-hidden bg-white">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-white to-white pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-bold mb-6 shadow-sm group cursor-default"
                    >
                        <motion.span
                            animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="text-lg opacity-80"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
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
                        ChatGPT inside every text box.
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
                            {
                                icon: (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                ), text: "No Prompts"
                            },
                            {
                                icon: (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ), text: "Instant Drafts"
                            },
                            {
                                icon: (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                ), text: "Context Aware"
                            },
                            {
                                icon: (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ), text: "Works Everywhere"
                            }
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
                            onActivate={() => {
                                setAutoPlay(false);
                                setActiveCard(item.id === activeCard ? null : item.id);
                            }}
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
                                className="inline-flex justify-center w-full sm:w-auto items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-[0_8px_20px_rgba(37,99,235,0.25)] group"
                            >
                                <span>Try the Magic Wand Free</span>
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
                            Works inside Gmail, Slack, WhatsApp, and every other app.
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
                    bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all duration-500 relative group flex flex-col h-[420px] lg:h-[460px] overflow-hidden
                    ${isActive ? 'border-blue-400/50 ring-[12px] ring-blue-50/50' : 'border-white/60 hover:border-blue-200/50'}
                `}
            >
                {/* Visual Glow behind icons */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
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
                            flex items-center justify-center w-14 h-14 rounded-full border-4 border-white shadow-sm transition-all duration-300
                            ${isActive
                                    ? 'bg-gray-900 scale-105 shadow-md'
                                    : 'bg-white border-2 border-gray-200 hover:bg-gray-50'
                                }
                        `}
                        >
                            <Image
                                src="/icons/magic-wand-filled.svg"
                                alt="Activate"
                                width={24}
                                height={24}
                                className={`object-contain transition-transform duration-500 ${isActive ? 'brightness-0 invert' : 'opacity-70'} ${isActive ? 'rotate-[15deg]' : ''}`}
                            />
                        </button>
                    </div>

                    {/* Result Container */}
                    <div className={`mt-0 flex-1 rounded-2xl border p-6 pt-10 relative overflow-hidden transition-all duration-500 md:min-h-[180px]
                    ${isActive
                            ? 'bg-white border-gray-200 shadow-sm'
                            : 'bg-gray-50/50 border-gray-100'
                        }`}
                    >

                        {/* Static preview when not active — shows the result text so cards never look empty */}
                        {!isActive && (
                            <div className="opacity-60 transition-opacity duration-300 group-hover:opacity-80">
                                <p className="text-[14px] text-gray-600 leading-relaxed">{item.result}</p>
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
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-xs font-bold ring-2 ring-white shadow-sm">
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
                                                Subject: Loving the app!
                                            </div>

                                            <div className="text-[15px] leading-relaxed whitespace-pre-wrap font-sans text-gray-800">
                                                {typedText}
                                                <span className="inline-block w-0.5 h-5 ml-0.5 align-middle bg-gray-900 animate-pulse"></span>
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
