import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { comparisons, masterComparison, masterComparisonColumns } from '@/lib/comparisonData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Zavi AI vs Every Alternative — The Voice AGI That Replaces Typing, Prompting & Automation (2026)',
    description: 'Compare Zavi AI to Wispr Flow, ChatGPT, Claude, Gemini Live, Gboard, Dragon, Zapier, Siri & more. The only tool with voice input, zero prompting, screen awareness, and in-app execution. Free download.',
    alternates: { canonical: 'https://zavi.ai/compare' },
    openGraph: {
        title: 'Zavi AI vs Every Alternative — Voice AGI Comparison 2026',
        description: 'Dictation tools transcribe. Chat AI needs prompts. Zavi speaks, understands, and executes. See the full landscape comparison.',
        url: 'https://zavi.ai/compare',
    },
};

const categoryMeta: Record<string, { title: string; subtitle: string; description: string }> = {
    'voice-tools': {
        title: 'vs Voice & Dictation Tools',
        subtitle: 'Wispr Flow · Willow · Otter.ai · Dragon',
        description: 'Dictation tools turn speech into text. Zavi turns speech into intent and action — with 100+ languages, real-time translation, and mobile support they lack.',
    },
    'chat-ai': {
        title: 'vs Chat-First AI',
        subtitle: 'ChatGPT · Claude',
        description: 'Chat AI is powerful intelligence locked behind a prompt box. Zavi embeds that intelligence inside every app — triggered by voice, no copy-paste needed.',
    },
    'screen-assistants': {
        title: 'vs Screen-Aware Assistants',
        subtitle: 'Gemini Live · Siri',
        description: 'Screen-aware assistants can discuss what you see. Only Zavi can act on it — writing, replying, and executing inside the active app.',
    },
    'automation': {
        title: 'vs Automation & RPA',
        subtitle: 'Zapier · Make · OpenClaw',
        description: 'Automation tools execute pre-defined workflows. Zavi executes ad-hoc human decisions by voice — no setup, no triggers, no Zap-building.',
    },
    'keyboards': {
        title: 'vs Mobile Keyboards',
        subtitle: 'Google Gboard · SwiftKey',
        description: 'Default keyboards transcribe speech verbatim — filler words, grammar errors, and all. Zavi produces professional-quality text with AI cleanup.',
    },
};

const categoryOrder = ['voice-tools', 'chat-ai', 'screen-assistants', 'automation', 'keyboards'];

export default function ComparePage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavi.ai' },
        { name: 'Compare', url: 'https://zavi.ai/compare' },
    ]);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Compare</span>
                    </nav>

                    {/* Hero — Thesis-level positioning */}
                    <div className="mb-20">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            The Next Interface Shift<br />Is Voice to Action
                        </h1>
                        <div className="max-w-3xl">
                            <p className="text-xl text-gray-600 mb-4">
                                Every generational tech company owned an interface. Microsoft owned keyboard and mouse. Apple owned touch. Google owned search.
                            </p>
                            <p className="text-xl text-gray-600 mb-4">
                                The next interface is not chat. The next interface is <strong className="text-gray-900">voice as execution</strong>.
                            </p>
                            <p className="text-xl font-semibold text-blue-600">
                                Zavi is building the Voice AGI inside every app — turning natural human speech directly into action.
                            </p>
                        </div>
                    </div>

                    {/* The Problem — Why existing tools fail */}
                    <div className="mb-20 bg-gray-50 rounded-2xl p-8 sm:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Why Every Other Approach Falls Short</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <div className="text-2xl mb-3">🎙️</div>
                                <h3 className="font-bold text-gray-900 mb-2">Dictation Tools</h3>
                                <p className="text-sm text-gray-600">Turn speech into text. But text is not action. You still have to edit, format, and send manually.</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <div className="text-2xl mb-3">💬</div>
                                <h3 className="font-bold text-gray-900 mb-2">Chat AI</h3>
                                <p className="text-sm text-gray-600">Powerful intelligence locked in a chat window. Requires prompting, context-switching, and copy-paste.</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <div className="text-2xl mb-3">👁️</div>
                                <h3 className="font-bold text-gray-900 mb-2">Screen Assistants</h3>
                                <p className="text-sm text-gray-600">Can see your screen and discuss it. But they can&apos;t type, reply, or execute actions inside apps.</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <div className="text-2xl mb-3">⚙️</div>
                                <h3 className="font-bold text-gray-900 mb-2">Automation / RPA</h3>
                                <p className="text-sm text-gray-600">Pre-defined triggers for known workflows. Can&apos;t handle ad-hoc decisions or voice-triggered actions.</p>
                            </div>
                        </div>
                        <p className="text-center text-gray-500 mt-8 text-lg">
                            Zavi is the only platform that combines <strong className="text-gray-900">voice input + zero prompting + screen awareness + in-app execution</strong>.
                        </p>
                    </div>

                    {/* Master Comparison Matrix */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">The Capability Matrix</h2>
                        <p className="text-gray-600 mb-8">Seven capabilities. Five categories. Only one platform checks every box.</p>

                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="min-w-[800px] px-4 sm:px-0">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="text-left py-4 px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider w-[200px]">
                                                Core Capability
                                            </th>
                                            {masterComparisonColumns.map((col) => (
                                                <th
                                                    key={col.key}
                                                    className={`text-center py-4 px-3 text-sm font-semibold uppercase tracking-wider ${col.key === 'zavi'
                                                        ? 'text-blue-600 bg-blue-50/60'
                                                        : 'text-gray-500'
                                                        }`}
                                                >
                                                    <div>{col.label}</div>
                                                    {col.examples && (
                                                        <div className="text-[10px] font-normal normal-case text-gray-400 mt-1">{col.examples}</div>
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {masterComparison.map((row, i) => (
                                            <tr key={row.capability} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/30' : ''}`}>
                                                <td className="py-4 px-3 font-medium text-gray-900 text-sm">{row.capability}</td>
                                                {masterComparisonColumns.map((col) => {
                                                    const val = row[col.key];
                                                    const isZavi = col.key === 'zavi';
                                                    const isCheck = val === '✓';
                                                    const isCross = val === '✗';
                                                    return (
                                                        <td
                                                            key={col.key}
                                                            className={`py-4 px-3 text-center text-sm ${isZavi ? 'bg-blue-50/60' : ''} ${isCheck
                                                                ? isZavi ? 'text-blue-600 font-bold text-lg' : 'text-green-600 font-bold text-lg'
                                                                : isCross ? 'text-gray-300 text-lg' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            {val}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Zavi Replaces Entire Interaction Layers */}
                    <div className="mb-20">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 sm:p-12 text-white">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Zavi Replaces Entire Interaction Layers</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div>
                                    <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Free Layer — The Wedge</div>
                                    <h3 className="text-xl font-bold mb-3">Input Ownership</h3>
                                    <ul className="space-y-2 text-blue-100 text-sm">
                                        <li>• Replaces keyboards and typing</li>
                                        <li>• Replaces dictation tools</li>
                                        <li>• Replaces translation tools</li>
                                        <li>• Replaces Grammarly-style rewriting</li>
                                        <li>• Replaces copy-paste across apps</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Paid Layer</div>
                                    <h3 className="text-xl font-bold mb-3">Screen Context</h3>
                                    <ul className="space-y-2 text-blue-100 text-sm">
                                        <li>• Replaces reading screens manually</li>
                                        <li>• Replaces copying context into chat AI</li>
                                        <li>• Replaces app-switching to act</li>
                                        <li>• Replaces &quot;handle this later&quot; workflows</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Enterprise Layer</div>
                                    <h3 className="text-xl font-bold mb-3">Execution Infrastructure</h3>
                                    <ul className="space-y-2 text-blue-100 text-sm">
                                        <li>• Replaces manual CRM updates</li>
                                        <li>• Replaces rigid automations</li>
                                        <li>• Replaces command-based assistants</li>
                                        <li>• Replaces dashboards no one checks</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The 31 Core Features Breakdown */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Under the Hood: 31 Core Capabilities</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                The most advanced voice architecture ever built into a mobile OS. Everything you need to eliminate typing permanently.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-16">
                            {/* 1. Core Voice Features */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-blue-600">🎙️</span> Core Voice Features
                                </h3>
                                <ul className="space-y-6">
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">1. Voice Typing <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Free</span></div>
                                        <p className="text-sm text-gray-600">Tap the mic, speak naturally, and get perfectly punctuated, grammar-corrected text. Works in every app. Real-time interim transcripts with final Gemini LLM enhancement. Supports 19 languages + regional variants.</p>
                                    </li>
                                    <li className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                                        <div className="font-bold text-gray-900 mb-1">2. Magic Wand <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Pro</span></div>
                                        <p className="text-sm text-gray-600">Transform existing text instantly based on your voice command: &quot;make it more professional&quot;, &quot;shorten this&quot;, or &quot;rewrite as bullet points&quot;. Zavi edits the text field natively.</p>
                                    </li>
                                    <li className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                                        <div className="font-bold text-gray-900 mb-1">3. Voice Agent <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Pro</span></div>
                                        <p className="text-sm text-gray-600">Speak commands like &quot;Send David an email about Thursday&quot; or &quot;Post to Slack #updates&quot;. Executes multi-turn tool-calling loops (up to 7 turns) across connected apps, reading out results via ultra-realistic TTS.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">4. Live Translation <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Free*</span></div>
                                        <p className="text-sm text-gray-600">Speak in your native language, output perfectly translated text into 15 global targets. *Unlimited with Pro tier.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">5. Style / Tone Engine <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Free</span></div>
                                        <p className="text-sm text-gray-600">Cycle through 4 specialized AI tones: Professional, Casual (Smile), Chat (Bubbles), or Witty (Playful), ensuring your text matches the structural necessity of the active app.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">6. Emoji Auto-Generation <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Free</span></div>
                                        <p className="text-sm text-gray-600">When toggled, the AI analyzes semantic intent and injects high-converting contextual emojis directly into the output string.</p>
                                    </li>
                                </ul>
                            </div>

                            {/* 2. Integrations & Background Audio */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-purple-600">⚡</span> Superpowers & Flow
                                </h3>
                                <ul className="space-y-6">
                                    <li className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                                        <div className="font-bold text-gray-900 mb-1">7. Connected Services (OAuth) <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Pro</span></div>
                                        <p className="text-sm text-gray-600">Connect Gmail, Slack, GitHub, Notion, LinkedIn, Google Calendar, Docs, Drive, Contacts, YouTube, and Sheets. The Voice Agent intelligently routes actions natively via API to the correct service.</p>
                                    </li>
                                    <li className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                                        <div className="font-bold text-gray-900 mb-1">8. Web Search Engine <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Pro</span></div>
                                        <p className="text-sm text-gray-600">Built-in Tavily API allows you to pull real-time web facts into the agent via voice (e.g., &quot;What is Apple&apos;s stock price right now?&quot;).</p>
                                    </li>
                                    <li className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                                        <div className="font-bold text-gray-900 mb-1">9. BYO API Keys <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Pro</span></div>
                                        <p className="text-sm text-gray-600">Inject your own enterprise OpenAI, Claude, or Gemini API keys for hyper-specialized agent reasoning loops.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">10. Continuous Flow Session <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Free</span></div>
                                        <p className="text-sm text-gray-600">Deep-link audio activation keeps the mic engine &quot;warm&quot; in the background with a 1-second IPC heartbeat. Jump between any app while maintaining a flawless 5 minute continuous transcription stream.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">11. Custom Dictionary <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Free</span></div>
                                        <p className="text-sm text-gray-600">Add proprietary internal project names, proper nouns, and localized geography terms to guarantee 100% spelling accuracy.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">12. Voice Snippets <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold">Free</span></div>
                                        <p className="text-sm text-gray-600">Create fast trigger phrases mapped to massive boilerplate text blocks. Say &quot;Insert my address&quot; to expand to your full shipping format instantly.</p>
                                    </li>
                                </ul>
                            </div>

                            {/* 3. Keyboard UI & Hardware */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-orange-500">⌨️</span> Keyboard UI Architecture
                                </h3>
                                <ul className="space-y-6">
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">13. Action Buttons</div>
                                        <p className="text-sm text-gray-600">Bottom row mapping for customizable actions (Undo, Redo, Enter, Space). Backspace supports hold-to-delete with rapid 50ms interval repeats to wipe paragraphs cleanly without leaving the home row.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">14. OS-Level Integration</div>
                                        <p className="text-sm text-gray-600">Zavi replaces the stock OS keyboard. Four dynamic modes automatically resize to context: Number Pad, QWERTY, Symbols, and Voice Module.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">15. Multi-Ring Mic Indicator</div>
                                        <p className="text-sm text-gray-600">Physical UI visualizer tracks audio state: 3 concentric expanding rings when capturing vocal data, shifting to an active loading spinner when routing via WebSocket.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">16. Tap-to-Cancel Rescue</div>
                                        <p className="text-sm text-gray-600">Never get bricked by slow Wi-Fi. Tapping the active processing loop banner forces an immediate kill-switch reset back to a ready-state.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">17. Fallback Banner Recovery</div>
                                        <p className="text-sm text-gray-600">If the OS aggressively kills the background audio engine to save battery, Zavi injects an in-keyboard banner deep-link to bounce you rapidly through the activation setup overlay.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">18. Deep-Linked Settings</div>
                                        <p className="text-sm text-gray-600">Control center parameters accessible directly from the keyboard layout interface.</p>
                                    </li>
                                </ul>
                            </div>

                            {/* 4. Infrastructure & Zavi App Core */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-slate-800">🛠️</span> Core App & Infrastructure
                                </h3>
                                <ul className="space-y-6">
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">19. gRPC Bidirectional Streaming</div>
                                        <p className="text-sm text-gray-600">The protocol engine establishing simultaneous real-time audio chunk uploads and finalized AI transcript downward streaming for ultra-low latency inputs.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">20. Infinite Stream Rotation</div>
                                        <p className="text-sm text-gray-600">Bypass typical OS 60-second dictation limits. Zavi dynamically bridges 5-minute chunked sessions with a 1.5s algorithmic crossover to ensure zero dropped syllables during marathon dictations.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">21. Darwin Notification IPC</div>
                                        <p className="text-sm text-gray-600">11 distinct low-level OS protocols enable the background App to communicate in real-time with the Keyboard extension independently.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">22. App Group UserDefaults</div>
                                        <p className="text-sm text-gray-600">40+ shared keychain/storage vectors allow secure Auth token transmission and macro data injection across the system layer sandbox.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">23. Cloud History Vault</div>
                                        <p className="text-sm text-gray-600">Total recovery logging. Access all previous voice inputs filtered by mode (Typing, Wand, Agent). Never lose an important dictated draft.</p>
                                    </li>
                                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                        <div className="font-bold text-gray-900 mb-1">24. Contextual Haptics</div>
                                        <p className="text-sm text-gray-600">Custom Taptic Engine profiles confirming positive dictation starts, loop failures, and tool-call routing finishes.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Minor details grid at the bottom */}
                        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                                <div className="font-bold text-gray-900 text-sm">25. Onboarding Aurora Engine</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                                <div className="font-bold text-gray-900 text-sm">26. Firebase Auth Integration</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                                <div className="font-bold text-gray-900 text-sm">27. TTS Voice Selection (Premium)</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                                <div className="font-bold text-gray-900 text-sm">28. Stale State IPC Recovery</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                                <div className="font-bold text-gray-900 text-sm">29. Analytics Gamification</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                                <div className="font-bold text-gray-900 text-sm">30. StoreKit 2 Subs</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                                <div className="font-bold text-gray-900 text-sm">31. Free Limit (1k Words) Tracking</div>
                            </div>
                        </div>
                    </div>

                    {/* Individual Comparisons by Category */}
                    <div className="space-y-14 mb-20">
                        <h2 className="text-3xl font-bold text-gray-900">Detailed Head-to-Head Comparisons</h2>

                        {categoryOrder.map((cat) => {
                            const meta = categoryMeta[cat];
                            const catComparisons = comparisons.filter((c) => c.category === cat);
                            if (catComparisons.length === 0) return null;

                            return (
                                <div key={cat}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{meta.title}</h3>
                                    <p className="text-sm text-gray-400 mb-2">{meta.subtitle}</p>
                                    <p className="text-gray-600 mb-5">{meta.description}</p>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {catComparisons.map((comp) => (
                                            <Link
                                                key={comp.slug}
                                                href={`/compare/${comp.slug}`}
                                                className="group block p-6 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all"
                                            >
                                                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    Zavi AI vs {comp.competitorName}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{comp.verdict}</p>
                                                <span className="text-blue-600 text-sm font-semibold">Read full comparison →</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-3">Speak Once. Everything Happens.</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                            AI that talks is impressive. AI that executes across all software and languages is inevitable. Try Zavi free today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/#download" className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg">
                                Download Free →
                            </Link>
                            <Link href="/#demo" className="inline-block px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-colors text-lg">
                                Watch Live Demo →
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
