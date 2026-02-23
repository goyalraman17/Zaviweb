'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import Link from 'next/link';

const superpowers = [
    {
        name: 'Gmail',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#EA4335]">
                <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
        ),
        command: '"Reply to Sarah\'s email saying I approve..."',
        color: 'from-red-50 to-red-100/50',
        borderColor: 'border-red-200/50',
        slug: 'gmail'
    },
    {
        name: 'Slack',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#4A154B]">
                <path fill="currentColor" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
            </svg>
        ),
        command: '"Post an update to #general..."',
        color: 'from-purple-50 to-purple-100/50',
        borderColor: 'border-purple-200/50',
        slug: 'slack'
    },
    {
        name: 'GitHub',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#181717]">
                <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
        command: '"What PRs need my review?"',
        color: 'from-slate-100 to-slate-200/50',
        borderColor: 'border-slate-300/50',
        slug: 'github'
    },
    {
        name: 'Notion',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-black">
                <path fill="currentColor" d="M21.328 1.854L3.899 3.178C3.047 3.242 2.652 3.733 2.652 4.542v15.228c0 .647.243.953.943 1.006l16.143 1.393c1.071.108 1.611-.474 1.611-1.38V2.857c0-.668-.313-.93-.996-1.003L21.328 1.854zM7.346 17.165l-.893.181a.508.508 0 0 1-.564-.325c-.092-.206-.118-.475-.118-.69V7.126c0-.237.031-.506.12-.71c.07-.164.212-.303.385-.357l1.093-.243a1.59 1.59 0 0 1 1.139.112l5.77 4.256V7.072l-.76-.145c-.234-.055-.42-.19-.487-.417a1.006 1.006 0 0 1-.035-.3v-1.12c0-.206.035-.411.13-.574c.08-.145.215-.272.378-.316l3.374-.75h.082l.092.006c.216.031.503.111.455.516l-.234 11.23c-.022.373-.311.666-.676.732l-1.355.27a.9.9 0 0 1-.689-.13L9.66 11.83v5.62l.839.182c.264.043.468.204.542.45a.995.995 0 0 1 .035.302v1.077a.644.644 0 0 1-.168.497c-.126.133-.314.218-.507.251l-2.486.516c-.23.045-.53.11-.645-.251v-.004a.972.972 0 0 1-.031-.383v-1.4e-1l.107-1.524" />
            </svg>
        ),
        command: '"Read my Notion page about the project"',
        color: 'from-gray-50 to-gray-100/50',
        borderColor: 'border-gray-200/50',
        slug: 'notion'
    },
    {
        name: 'LinkedIn',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#0A66C2]">
                <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zM3.56 20.452H7.11V9H3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        command: '"Post on LinkedIn about our launch..."',
        color: 'from-blue-50 to-blue-100/50',
        borderColor: 'border-blue-200/50',
        slug: 'linkedin'
    },
    {
        name: 'ChatGPT',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#10a37f]">
                <path fill="currentColor" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
            </svg>
        ),
        command: '"Ask ChatGPT to brainstorm ideas..."',
        color: 'from-emerald-50 to-emerald-100/50',
        borderColor: 'border-emerald-200/50',
        slug: 'chatgpt'
    }
];

export default function SuperpowersSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-zavi-blue-100/40 via-purple-100/40 to-zavi-blue-100/40 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Give Your OS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Superpowers</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                        Just speak. Control your favorite apps, send DMs, or search the web entirely hands-free.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {superpowers.map((app, index) => (
                        <motion.div
                            key={app.name}
                            variants={fadeUp}
                            className={`group relative bg-gradient-to-br ${app.color} border ${app.borderColor} rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer`}
                        >
                            <Link href={`/integrations/${app.slug}`} className="absolute inset-0 z-20" aria-label={`Read more about Zavi integration with ${app.name}`}>
                                <span className="sr-only">Learn about {app.name}</span>
                            </Link>

                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm relative z-10">
                                    {app.icon}
                                </div>
                                <div className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
                                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Connected</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{app.name}</h3>

                            <div className="px-4 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-inner group-hover:bg-white/90 transition-colors">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="flex gap-0.5 items-center">
                                        <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500">You say:</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 italic">
                                    {app.command}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-12 text-center"
                >
                    <Link href="/integrations" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                        View All 27+ Superpowers
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
