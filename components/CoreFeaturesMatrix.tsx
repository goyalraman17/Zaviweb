import React from 'react';

export default function CoreFeaturesMatrix() {
    return (
        <div className="mb-32 relative">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-blue-50 rounded-[100%] blur-3xl -z-10 opacity-70 pointer-events-none"></div>

            <div className="text-center mb-16 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Includes 31 Architecture Upgrades
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-gray-900 to-gray-900 mb-6 tracking-tight">
                    Try Everything Free.<br />Upgrade When You Need Scale.
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    The most advanced voice architecture ever built into a mobile OS. <strong className="text-gray-900">Every single feature below is available to try on the Free Tier.</strong> Zavi Pro simply gives you unlimited usage and priority processing.
                </p>
            </div>

            <div className="space-y-20">
                {/* 1. Core Voice Capabilities */}
                <div>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-3xl shadow-sm">🎙️</div>
                        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Core Voice Capabilities</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(37,99,235,0.1)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">1</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-green-100 text-green-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">Free (1k Words)</span>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-sm">Unlimited on Pro</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Voice Typing</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Tap the mic, speak naturally, and get perfectly punctuated, grammar-corrected text. Works natively inside every single app you own. Real-time interim transcripts with final Gemini LLM enhancement. Supports 19+ languages.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(37,99,235,0.1)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">2</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-sm">Unlimited on Pro</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Magic Wand</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Transform existing text instantly based on your voice command: <span className="italic text-gray-700">&quot;make it more professional&quot;</span>, <span className="italic text-gray-700">&quot;shorten this&quot;</span>, or <span className="italic text-gray-700">&quot;rewrite as bullet points&quot;</span>. Zavi edits the active text field directly.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(37,99,235,0.1)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">3</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-sm">Unlimited on Pro</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Voice Agent</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Speak commands like <span className="italic text-gray-700">&quot;Send David an email about Thursday&quot;</span> or <span className="italic text-gray-700">&quot;Post to Slack #updates&quot;</span>. Executes multi-turn tool-calling loops across connected apps and reads results out loud natively.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(37,99,235,0.1)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">4</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-green-100 text-green-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">Free Feature</span>
                                    <span className="bg-gray-100 text-gray-600 text-[9px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">Enhanced on Pro</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Live Translation</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Speak in your native language, output perfectly translated text into 15 global targets. Essential for distributed teams or rapid international negotiations across WhatsApp.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(37,99,235,0.1)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">5</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-green-100 text-green-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">100% Free</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Style & Tone Engine</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Cycle through 4 specialized AI tones: Professional, Casual (Smile), Chat (Bubbles), or Witty (Playful), ensuring your text perfectly matches the structural necessity of the active app.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(37,99,235,0.1)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">6</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-green-100 text-green-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">100% Free</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Emoji Auto-Location</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">When toggled, the AI engine analyzes semantic intent and automatically injects high-converting contextual emojis directly into the output string. Zero hunting for the right smiley.</p>
                        </div>
                    </div>
                </div>

                {/* 2. Superpowers */}
                <div>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-3xl shadow-sm">⚡</div>
                        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Superpowers & OAuth</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.1)] hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">7</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-sm">Unlimited on Pro</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Connected Services</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Connect Gmail, Slack, GitHub, Notion, LinkedIn, Google Calendar, Docs, Drive, Contacts, YouTube, and Sheets. The Voice Agent intelligently routes actions natively via APIs.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.1)] hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">8</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold shadow-sm">Unlimited on Pro</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Live Web Search</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Built-in Tavily API allows you to pull real-time web facts into the agent via voice (e.g., <span className="italic text-gray-700">&quot;What is Apple&apos;s stock price right now?&quot;</span>).</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.1)] hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">9</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-purple-100 text-purple-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">Pro Feature</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">BYO API Keys</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Inject your own enterprise OpenAI, Claude, or Gemini API keys for hyper-specialized agent reasoning loops across your infrastructure without limits.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.1)] hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">10</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-green-100 text-green-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">100% Free</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Continuous Flow Session</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Deep-link audio activation keeps the mic engine &quot;warm&quot; in the background with a 1-second IPC heartbeat. Jump between any app while maintaining a flawless 5 minute continuous transcription stream.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.1)] hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">11</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-green-100 text-green-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">100% Free</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Custom Dictionary</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Add proprietary internal project names, proper nouns, and localized geography terms to guarantee 100% spelling accuracy for your specific domain.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(147,51,234,0.1)] hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">12</div>
                                <div className="flex flex-col gap-2 items-end">
                                    <span className="bg-green-100 text-green-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">100% Free</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Voice Snippets</h4>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">Create fast trigger phrases mapped to massive boilerplate text blocks. Say <span className="italic text-gray-700">&quot;Insert my address&quot;</span> to expand to your full shipping format instantly.</p>
                        </div>
                    </div>
                </div>

                {/* 3. Keyboard UI */}
                <div>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-3xl shadow-sm">⌨️</div>
                        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">OS-Level Keyboard Integration</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { id: 13, title: "Action Buttons", desc: "Bottom row mapping for customizable actions (Undo, Redo, Enter, Space). Backspace supports hold-to-delete with rapid 50ms interval repeats to wipe paragraphs cleanly." },
                            { id: 14, title: "OS-Level Placement", desc: "Zavi replaces the stock OS keyboard natively. Four dynamic modes automatically resize to context: Number Pad, QWERTY, Symbols, and Voice Module." },
                            { id: 15, title: "Multi-Ring Mic Indicator", desc: "Physical UI visualizer tracks audio state: 3 concentric expanding rings when capturing vocal data, shifting to an active loading spinner when routing via WebSocket." },
                            { id: 16, title: "Tap-to-Cancel Rescue", desc: "Never get bricked by slow Wi-Fi. Tapping the active processing loop banner forces an immediate kill-switch reset back to a ready-state." },
                            { id: 17, title: "Fallback Banner Recovery", desc: "If the OS aggressively kills the background audio engine to save battery, Zavi injects an in-keyboard banner deep-link to bounce you rapidly through the activation setup overlay." },
                            { id: 18, title: "Deep-Linked Settings", desc: "Control center parameters accessible directly from the keyboard layout interface without manual app-switching." },
                        ].map(item => (
                            <div key={item.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.1)] hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-lg group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">{item.id}</div>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Infrastructure */}
                <div>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-3xl shadow-sm">🛠️</div>
                        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Core Engine Infrastructure</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { id: 19, title: "gRPC Bidirectional Strm", desc: "The protocol engine establishing simultaneous real-time audio chunk uploads and finalized AI transcript downward streaming for ultra-low latency inputs." },
                            { id: 20, title: "Infinite Stream Rotation", desc: "Bypass typical OS 60-second dictation limits. Zavi dynamically bridges 5-minute chunked sessions with a 1.5s crossover to ensure zero dropped syllables." },
                            { id: 21, title: "Darwin Notification IPC", desc: "11 distinct low-level OS protocols enable the background App to communicate in real-time with the Keyboard extension independently." },
                            { id: 22, title: "App Group UserDefaults", desc: "40+ shared keychain/storage vectors allow secure Auth token transmission and macro data injection across the system layer sandbox." },
                            { id: 23, title: "Cloud History Vault", free: true, desc: "Total recovery logging. Access all previous voice inputs filtered by mode (Typing, Wand, Agent). Never lose an dictated draft again." },
                            { id: 24, title: "Contextual Haptics", desc: "Custom Taptic Engine profiles confirming positive dictation starts, loop failures, and tool-call routing finishes entirely through physical touch." },
                        ].map(item => (
                            <div key={item.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(30,41,59,0.1)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center font-bold text-lg group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">{item.id}</div>
                                    {item.free && <span className="bg-green-100 text-green-800 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-bold ml-2">100% Free</span>}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Minor details - compact flex map */}
            <div className="mt-16 bg-gray-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -z-0"></div>

                <h3 className="text-center font-bold text-white mb-8 text-xl tracking-tight relative z-10">Plus everything else included in the download...</h3>

                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                    {[
                        { id: 25, title: "Onboarding Aurora Engine" },
                        { id: 26, title: "Firebase Auth Integration" },
                        { id: 27, title: "TTS Voice Selection" },
                        { id: 28, title: "Stale State IPC Recovery" },
                        { id: 29, title: "Analytics Gamification" },
                        { id: 30, title: "StoreKit 2 Auto-Subs" },
                        { id: 31, title: "Smart Daily Quota Trackers", free: true },
                    ].map(item => (
                        <div key={item.id} className="bg-gray-800/80 border border-gray-700/50 backdrop-blur-sm rounded-2xl py-3 px-5 flex items-center gap-3 relative">
                            {item.free && <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">FREE</div>}
                            <div className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-xs font-bold">{item.id}</div>
                            <span className="text-gray-200 text-sm font-medium">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
