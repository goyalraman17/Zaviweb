'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

const platformData: Record<string, any> = {
    macos: {
        name: 'macOS',
        fullName: 'Apple Mac (Intel & Apple Silicon)',
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.24-2.27.81-3.5-1.58.06-2.73 1.17-3.48 1.98-.7.75-1.35 1.93-1.04 3.1 1.58.12 2.98-.75 3.71-1.58z" />
            </svg>
        ),
        downloadUrl: '/downloads/Zavi_AI.dmg',
        extension: '.dmg',
        requirement: 'macOS 12.0 or later',
        steps: [
            'Download the Zavi.dmg file',
            'Double-click to open and drag Zavi to Applications',
            'Open Zavi and follow the accessibility setup',
            'Start speaking into any app!'
        ]
    },
    windows: {
        name: 'Windows',
        fullName: 'Microsoft Windows (x64)',
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12.284L10.323 11.234V4L3 4.962V12.284ZM11.161 11.161L21 9.873V3L11.161 4.161V11.161ZM21 12.839L11.161 11.614V18.839L21 21V12.839ZM10.323 12.716L3 11.716V19.038L10.323 18.038V12.716Z" />
            </svg>
        ),
        downloadUrl: '/downloads/Zavi_Windows.exe',
        extension: '.exe',
        requirement: 'Windows 10, 11 (64-bit)',
        steps: [
            'Download Zavi_Windows.exe',
            'Run the installer and follow instructions',
            'Launch Zavi from your desktop or Start menu',
            'Use the shortcut key to start speaking'
        ]
    },
    linux: {
        name: 'Linux',
        fullName: 'Linux (.deb for Debian/Ubuntu)',
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
            </svg>
        ),
        downloadUrl: '/downloads/Zavi_Linux.deb',
        extension: '.deb',
        requirement: 'Ubuntu 20.04+, Debian 11+, or derivatives',
        steps: [
            'Download the .deb package',
            'Install via Software Center or terminal: `sudo dpkg -i Zavi_Linux.deb`',
            'Open Zavi from your applications menu',
            'Voice type in any Linux window'
        ]
    },
    ios: {
        name: 'iOS',
        fullName: 'iPhone & iPad',
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
            </svg>
        ),
        downloadUrl: 'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802',
        extension: 'App Store',
        requirement: 'iOS 16.0 or later',
        steps: [
            'Get Zavi from the Apple App Store',
            'Go to Settings > General > Keyboard',
            'Add "Zavi" and enable Full Access',
            'Switch to Zavi and tap the mic to speak!'
        ]
    },
    android: {
        name: 'Android',
        fullName: 'Android Smartphones & Tablets',
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.3414c-.5511 0-.9993.4485-.9993.9997s.4482.9997.9993.9997c.5511 0 .9993-.4485.9993-.9997s-.4482-.9997-.9993-.9997zm-11.046 0c-.5511 0-.9993.4485-.9993.9997s.4482.9997.9993.9997c.5511 0 .9993-.4485.9993-.9997s-.4482-.9997-.9993-.9997zm11.3323-2.1265l1.6234-2.811c.1118-.1933.0456-.4405-.1477-.5523-.1933-.1118-.4405-.0456-.5523.1477l-1.6548 2.8654c-1.4239-.6366-3.0189-.9914-4.7212-.9914s-3.2973.3548-4.7212.9914l-1.6548-2.8654c-.1118-.1933-.359-.2595-.5523-.1477-.1933.1118-.2595.359-.1477.5523l1.6234 2.811c-2.4544 1.2581-4.1481 3.738-4.4141 6.6432h14.743c-.266-2.9052-1.9597-5.3851-4.4141-6.6432z" />
            </svg>
        ),
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
        extension: 'Play Store',
        requirement: 'Android 8.0 or later',
        steps: [
            'Get Zavi on Google Play',
            'Open the Zavi app and follow the setup',
            'Enable Zavi in your Keyboard Settings',
            'Tap the mic icon in any app to speak!'
        ]
    }
};

export default function PlatformDownloadPage() {
    const params = useParams();
    const platform = (params.platform as string)?.toLowerCase();
    const data = platformData[platform];

    if (!data) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navigation />

            <main className="pt-32 pb-24 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-3xl shadow-xl mb-6">
                            {data.icon}
                        </motion.div>
                        <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                            Download Zavi for <span className="text-blue-600">{data.name}</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                            Transform your voice into professional text on {data.fullName}. Think faster than you type.
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Download Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-200/50 border border-slate-100"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                                Install Zavi
                            </h2>

                            <a
                                href={data.downloadUrl}
                                className="inline-flex items-center justify-center gap-3 w-full py-5 bg-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:translate-y-0"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                                {platform === 'ios' || platform === 'android' ? `Get it on ${data.extension}` : `Download ${data.extension}`}
                            </a>

                            <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium tracking-wide uppercase">Requirement</span>
                                    <span className="text-slate-900 font-bold">{data.requirement}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium tracking-wide uppercase">Version</span>
                                    <span className="text-slate-900 font-bold">Latest (v1.0.5)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium tracking-wide uppercase">License</span>
                                    <span className="text-slate-900 font-bold text-green-600">Free to Start</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Guide Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                                Quick Start Guide
                            </h2>

                            <div className="space-y-6">
                                {data.steps.map((step: string, i: number) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-medium text-slate-400">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-300 font-medium leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-4 bg-slate-800 rounded-2xl border border-slate-700">
                                <p className="text-xs text-slate-400 italic">
                                    "Zavi replaces your keyboard with a high-fidelity voice engine that removes 'ums', fixes grammar, and knows your personal context."
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-slate-500 mb-6 font-medium">Looking for another device?</p>
                        <Link href="/download" className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                            View All Platforms
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
