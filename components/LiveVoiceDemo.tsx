'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  fadeIn,
  fadeUp,
  staggerContainer,
  pressCompression,
  successPop,
  duration,
  easing,
} from '@/lib/animations';

type RecordingState = 'idle' | 'listening' | 'processing' | 'complete';
type DemoMode = 'user' | 'auto';

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

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

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
              setState('complete');
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

      // Simulate AI processing
      setTimeout(() => {
        // In real app, this would call the API
        const polished = rawText
          .replace(/um|uh|like|you know|basically|so/gi, '')
          .replace(/\s+/g, ' ')
          .trim();

        const capitalized = polished.charAt(0).toUpperCase() + polished.slice(1);
        setPolishedText(capitalized + (capitalized.endsWith('.') ? '' : '.'));
        setState('complete');
      }, 1200);
    }
  };

  const handleMicClick = () => {
    if (state === 'idle') {
      startRecording();
    } else if (state === 'listening') {
      stopRecording();
    } else if (state === 'complete') {
      reset();
    }
  };

  const reset = () => {
    setState('idle');
    setRawText('');
    setPolishedText('');
    setWaveformActive(false);
    setCopied(false);
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
        {/* Language Selectors */}
        <div className="flex items-center justify-between gap-4 p-6 border-b border-zavi-border/30">
          <div className="flex-1">
            <label className="block text-xs font-medium text-zavi-gray-text mb-2">
              Speak in
            </label>
            <select
              value={inputLang}
              onChange={(e) => setInputLang(e.target.value)}
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
              onChange={(e) => setOutputLang(e.target.value)}
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

        {/* Recording Interface */}
        <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
          {/* Microphone Button */}
          <motion.button
            onClick={handleMicClick}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              state === 'listening'
                ? 'bg-red-500 shadow-lg shadow-red-500/50'
                : state === 'processing'
                ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                : state === 'complete'
                ? 'bg-green-500 shadow-lg shadow-green-500/50'
                : 'bg-zavi-blue shadow-lg shadow-zavi-blue/50'
            }`}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={pressCompression}
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
              {state === 'complete' && (
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
              {state === 'idle' && 'Click to start speaking'}
              {state === 'listening' && 'Listening...'}
              {state === 'processing' && 'Polishing your words...'}
              {state === 'complete' && 'Ready to use'}
            </p>
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
        </div>

        {/* Transcription Panels */}
        <AnimatePresence>
          {(rawText || polishedText) && (
            <motion.div
              className="border-t border-zavi-border/30 p-6 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {/* Raw Transcription */}
              {rawText && (
                <motion.div
                  className="p-4 bg-zavi-paper rounded-xl"
                  variants={fadeUp}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zavi-gray-text uppercase tracking-wide">
                      Raw Speech
                    </span>
                    {state !== 'complete' && (
                      <motion.div
                        className="flex gap-1"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-zavi-gray-text" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zavi-gray-text" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zavi-gray-text" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-zavi-gray-text/70 leading-relaxed">
                    {rawText}
                  </p>
                </motion.div>
              )}

              {/* Polished Output */}
              {polishedText && (
                <motion.div
                  className="p-4 bg-gradient-to-br from-zavi-blue/5 to-blue-50/50 rounded-xl border border-zavi-blue/20"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: easing.smooth }}
                  variants={successPop}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-zavi-blue uppercase tracking-wide">
                      Professional Output
                    </span>
                    <span className="text-xs text-zavi-blue/60">
                      No editing needed
                    </span>
                  </div>
                  <p className="text-base text-zavi-charcoal leading-relaxed font-medium mb-4">
                    {polishedText}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 px-4 py-2 bg-white hover:bg-zavi-blue/10 border border-zavi-border rounded-lg text-sm font-medium text-zavi-charcoal transition-all focus:outline-none focus:ring-2 focus:ring-zavi-blue/20"
                    >
                      {copied ? (
                        <>
                          <svg className="inline-block w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadText}
                      className="flex-1 px-4 py-2 bg-white hover:bg-zavi-blue/10 border border-zavi-border rounded-lg text-sm font-medium text-zavi-charcoal transition-all focus:outline-none focus:ring-2 focus:ring-zavi-blue/20"
                    >
                      <svg className="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                  </div>
                </motion.div>
              )}
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
