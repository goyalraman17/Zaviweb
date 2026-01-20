'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  successPop,
  duration,
  easing,
} from '@/lib/animations';

type RecordingState = 'idle' | 'listening' | 'processing' | 'ready';
type DemoMode = 'user' | 'auto';
type Tone = 'neutral' | 'formal' | 'casual';

interface Language {
  code: string;
  name: string;
}

const INPUT_LANGUAGES: Language[] = [
  { code: 'auto', name: 'Auto Detect' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
];

const OUTPUT_LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
];

const DEMO_EXAMPLES = [
  {
    raw: "yeah so maybe just tell them we will check and come back next week",
    polished: "We will review this and follow up next week."
  },
  {
    raw: "um I think we should probably like discuss this with the team first you know",
    polished: "Let's discuss this with the team before proceeding."
  },
  {
    raw: "so basically what I'm trying to say is we need more time to finish this properly",
    polished: "We need additional time to complete this properly."
  },
];

export default function LiveVoiceDemo() {
  const [state, setState] = useState<RecordingState>('idle');
  const [demoMode, setDemoMode] = useState<DemoMode>('user');
  const [inputLang, setInputLang] = useState('auto');
  const [outputLang, setOutputLang] = useState('en');
  const [rawText, setRawText] = useState('');
  const [polishedText, setPolishedText] = useState('');
  const [waveformActive, setWaveformActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);
  const [detectedLang, setDetectedLang] = useState<string>('');
  const [showLangPill, setShowLangPill] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
  const [showAdvancedMenu, setShowAdvancedMenu] = useState(false);
  const [selectedTone, setSelectedTone] = useState<Tone>('neutral');
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const longPressTimerRef = useRef<NodeJS.Timeout>();

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = inputLang === 'auto' ? 'en-US' : `${inputLang}-US`;

        recognitionRef.current.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setRawText(prev => prev + transcript + ' ');
            } else {
              interim += transcript;
            }
          }
          if (interim) {
            setRawText(prev => prev + interim);
          }
        };

        recognitionRef.current.onerror = () => {
          // Fallback to auto demo
          startAutoDemo();
        };
      } else {
        // No speech recognition support, start auto demo
        setDemoMode('auto');
        startAutoDemo();
      }
    }
  }, [inputLang]);

  const startAutoDemo = () => {
    setDemoMode('auto');
    setState('idle');
    const example = DEMO_EXAMPLES[currentExample];

    // Simulate recording
    setTimeout(() => {
      setState('listening');
      setWaveformActive(true);
      setRawText('');

      // Type out raw text character by character
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < example.raw.length) {
          setRawText(example.raw.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Process after raw text is complete
          setTimeout(() => {
            setState('processing');
            setWaveformActive(false);
            setTimeout(() => {
              setPolishedText(example.polished);
              setState('ready');
              setCurrentExample((prev) => (prev + 1) % DEMO_EXAMPLES.length);
            }, 800);
          }, 500);
        }
      }, 50);
    }, 500);
  };

  const startRecording = () => {
    if (demoMode === 'auto') {
      startAutoDemo();
      return;
    }

    if (recognitionRef.current) {
      setRawText('');
      setPolishedText('');
      setState('listening');
      setWaveformActive(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && state === 'listening') {
      recognitionRef.current.stop();
      setWaveformActive(false);
      setState('processing');

      // Simulate language detection
      if (inputLang === 'auto') {
        setDetectedLang('English');
      }

      // Simulate AI processing
      setTimeout(() => {
        // Save raw text to undo stack
        setUndoStack([rawText]);

        // In real app, this would call the API
        const polished = rawText
          .replace(/um|uh|like|you know|basically|so/gi, '')
          .replace(/\s+/g, ' ')
          .trim();

        const capitalized = polished.charAt(0).toUpperCase() + polished.slice(1);
        setPolishedText(capitalized + (capitalized.endsWith('.') ? '' : '.'));
        setState('ready');
      }, 1200);
    }
  };

  const handleMicClick = () => {
    if (state === 'idle') {
      startRecording();
    } else if (state === 'listening') {
      stopRecording();
    } else if (state === 'ready') {
      reset();
    }
  };

  const handleMicLongPress = () => {
    if (state === 'idle') {
      setShowAdvancedMenu(true);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(polishedText);
  };

  const handleInsert = () => {
    // In real app, this would insert into the active field
    copyToClipboard();
    setTimeout(() => {
      reset();
    }, 1000);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      setPolishedText(undoStack[0]);
      setUndoStack([]);
    }
  };

  const reset = () => {
    setState('idle');
    setRawText('');
    setPolishedText('');
    setWaveformActive(false);
    setCopied(false);
    setDetectedLang('');
    setIsEditing(false);
    setEditedText('');
    setUndoStack([]);
    setShowAdvancedMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(polishedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([polishedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zavi-output.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Demo Card */}
      <motion.div
        className="relative bg-white rounded-3xl border border-zavi-border/50 shadow-2xl overflow-hidden"
        variants={fadeUp}
      >
        {/* Compact Language Toggle Pill */}
        {!showLangPill && state === 'idle' && (
          <div className="flex items-center justify-between gap-4 p-4 border-b border-zavi-border/30">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLangPill(!showLangPill)}
                className="flex items-center gap-2 px-4 py-2 bg-zavi-paper border border-zavi-border rounded-full text-xs font-medium text-zavi-charcoal hover:bg-white transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span>{inputLang === 'auto' ? 'Auto-detect' : INPUT_LANGUAGES.find(l => l.code === inputLang)?.name}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <svg className="w-4 h-4 text-zavi-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="text-xs font-medium text-zavi-charcoal">
                {OUTPUT_LANGUAGES.find(l => l.code === outputLang)?.name}
              </span>
            </div>

            {/* Privacy Badge */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowPrivacyPopup(true)}
                onMouseLeave={() => setShowPrivacyPopup(false)}
                onClick={() => setShowPrivacyPopup(!showPrivacyPopup)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700 hover:bg-green-100 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Private by design
              </button>

              {/* Privacy Popup */}
              <AnimatePresence>
                {showPrivacyPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-64 p-4 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                  >
                    <h4 className="text-sm font-semibold text-zavi-charcoal mb-2">Your privacy is protected</h4>
                    <ul className="space-y-2 text-xs text-zavi-gray-text">
                      <li className="flex items-start gap-2">
                        <svg className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        On-device processing
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        No storage of voice data
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Not used for AI training
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Expanded Language Selectors */}
        <AnimatePresence>
          {showLangPill && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 p-6 border-b border-zavi-border/30">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-zavi-gray-text mb-2">
                    Speak in
                  </label>
                  <select
                    value={inputLang}
                    onChange={(e) => {
                      setInputLang(e.target.value);
                      setShowLangPill(false);
                    }}
                    className="w-full px-4 py-2 bg-zavi-paper border border-zavi-border rounded-lg text-sm font-medium text-zavi-charcoal focus:outline-none focus:ring-2 focus:ring-zavi-blue/20 focus:border-zavi-blue transition-all"
                    disabled={state === 'listening' || state === 'processing'}
                  >
                    {INPUT_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-center px-4">
                  <svg className="w-5 h-5 text-zavi-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-medium text-zavi-gray-text mb-2">
                    Output in
                  </label>
                  <select
                    value={outputLang}
                    onChange={(e) => {
                      setOutputLang(e.target.value);
                      setShowLangPill(false);
                    }}
                    className="w-full px-4 py-2 bg-zavi-paper border border-zavi-border rounded-lg text-sm font-medium text-zavi-charcoal focus:outline-none focus:ring-2 focus:ring-zavi-blue/20 focus:border-zavi-blue transition-all"
                    disabled={state === 'listening' || state === 'processing'}
                  >
                    {OUTPUT_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recording Interface */}
        <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
          {/* Microphone Button */}
          <motion.button
            onClick={handleMicClick}
            onMouseDown={() => {
              longPressTimerRef.current = setTimeout(() => {
                handleMicLongPress();
              }, 500);
            }}
            onMouseUp={() => {
              if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
              }
            }}
            onMouseLeave={() => {
              if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
              }
            }}
            className={`relative w-28 h-28 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 touch-manipulation ${
              state === 'listening'
                ? 'bg-red-500 shadow-lg shadow-red-500/50'
                : state === 'processing'
                ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                : state === 'ready'
                ? 'bg-green-500 shadow-lg shadow-green-500/50'
                : 'bg-zavi-blue shadow-lg shadow-zavi-blue/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={state === 'processing'}
          >
            <AnimatePresence mode="wait">
              {state === 'idle' && (
                <motion.svg
                  key="mic"
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </motion.svg>
              )}
              {state === 'listening' && (
                <motion.svg
                  key="stop"
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </motion.svg>
              )}
              {state === 'processing' && (
                <motion.svg
                  key="processing"
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
              )}
              {state === 'ready' && (
                <motion.svg
                  key="check"
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* Pulse rings when listening */}
            {state === 'listening' && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500"
                  animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500"
                  animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                />
              </>
            )}
          </motion.button>

          {/* Status Label */}
          <motion.div
            className="mt-6 text-center"
            variants={fadeIn}
          >
            <p className="text-sm font-semibold text-zavi-charcoal">
              {state === 'idle' && 'Click to start • Long press for options'}
              {state === 'listening' && 'Listening...'}
              {state === 'processing' && 'Polishing your words...'}
              {state === 'ready' && 'Ready • Click mic to start over'}
            </p>
            {state === 'listening' && detectedLang && inputLang === 'auto' && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-zavi-blue mt-2"
              >
                Detected {detectedLang} → Writing {OUTPUT_LANGUAGES.find(l => l.code === outputLang)?.name}
              </motion.p>
            )}
          </motion.div>

          {/* Waveform Visualization */}
          {waveformActive && (
            <motion.div
              className="flex items-center justify-center gap-1 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-zavi-blue rounded-full"
                  animate={{
                    height: [8, 24, 8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Advanced Menu Modal */}
          <AnimatePresence>
            {showAdvancedMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
                onClick={() => setShowAdvancedMenu(false)}
              >
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  <h3 className="text-lg font-semibold text-zavi-charcoal mb-4">Advanced Options</h3>

                  {/* Tone Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-zavi-gray-text mb-2">
                      Output Tone
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['neutral', 'formal', 'casual'] as Tone[]).map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setSelectedTone(tone)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedTone === tone
                              ? 'bg-zavi-blue text-white shadow-md'
                              : 'bg-zavi-paper text-zavi-charcoal hover:bg-white'
                          }`}
                        >
                          {tone.charAt(0).toUpperCase() + tone.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowAdvancedMenu(false)}
                    className="w-full px-6 py-3 bg-zavi-blue text-white rounded-lg font-semibold hover:bg-zavi-blue/90 transition-all"
                  >
                    Done
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Split Preview During Processing */}
        <AnimatePresence>
          {state === 'processing' && rawText && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-zavi-border/30 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-4 p-6">
                {/* You Said */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-xs font-semibold text-zavi-gray-text uppercase tracking-wide mb-2">
                    You said
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {rawText}
                  </p>
                </div>

                {/* Zavi Writes */}
                <div className="p-4 bg-gradient-to-br from-zavi-blue/5 to-blue-50/50 rounded-xl border border-zavi-blue/20">
                  <h4 className="text-xs font-semibold text-zavi-blue uppercase tracking-wide mb-2">
                    Zavi writes
                  </h4>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-zavi-blue border-t-transparent rounded-full"
                    />
                    <p className="text-sm text-zavi-blue/60">Polishing...</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Bar (Ready State) */}
        <AnimatePresence>
          {state === 'ready' && polishedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="border-t border-zavi-border/30"
            >
              {/* Preview Text with Highlight Glow */}
              <motion.div
                className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-zavi-border/30"
                initial={{ backgroundColor: 'rgba(240, 253, 244, 0)' }}
                animate={{ backgroundColor: ['rgba(240, 253, 244, 1)', 'rgba(240, 253, 244, 1)', 'rgba(255, 255, 255, 0.5)'] }}
                transition={{ duration: 1, times: [0, 0.5, 1] }}
              >
                <p className="text-base text-zavi-charcoal leading-relaxed font-medium text-center">
                  {polishedText}
                </p>
              </motion.div>

              {/* Action Bar */}
              <div className="flex items-center justify-between gap-2 p-4 bg-white">
                {/* Left: Edit */}
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>

                {/* Center: Undo */}
                {undoStack.length > 0 && (
                  <button
                    onClick={handleUndo}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-zavi-blue hover:text-zavi-blue/80 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Undo
                  </button>
                )}

                {/* Right: Insert */}
                <motion.button
                  onClick={handleInsert}
                  className="flex items-center gap-2 px-8 py-3 bg-zavi-blue text-white rounded-xl text-sm font-semibold hover:bg-zavi-blue/90 transition-all shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Insert
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Small helper text */}
              <div className="px-4 pb-3 bg-white">
                <p className="text-xs text-center text-zavi-gray-text">
                  Clicking Insert will copy to clipboard • Click mic to start over
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto Demo Indicator */}
        {demoMode === 'auto' && state === 'idle' && (
          <motion.div
            className="px-6 py-3 bg-zavi-paper border-t border-zavi-border/30 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xs text-zavi-gray-text">
              Microphone not available • Click to see demo
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Help Text */}
      <motion.p
        className="text-center text-sm text-zavi-gray-text mt-6"
        variants={fadeUp}
      >
        This demo explains the product without text.
        <br />
        Speak once. Send immediately.
      </motion.p>
    </motion.div>
  );
}
