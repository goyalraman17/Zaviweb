'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { fadeUp, successPop, easing } from '@/lib/animations';

type RecordingState = 'idle' | 'listening' | 'processing' | 'complete';

const DEMO_EXAMPLES = [
  {
    raw: "yeah so basically just wanted to let them know that we received the email and we're probably gonna review it internally and then reply sometime next week or s",
    polished: "We received your email and will review it internally. Expect a response by next week."
  },
  {
    raw: "um so like I was thinking maybe we could schedule a call for next Tuesday or Wednesday afternoon if that works for you guys",
    polished: "I suggest scheduling a call for Tuesday or Wednesday afternoon. Please let me know if this works for you."
  },
  {
    raw: "hey just following up on that thing we talked about last week wondering if you had a chance to look at it yet",
    polished: "Following up on our previous discussion. Have you had a chance to review it?"
  },
];

export default function LiveVoiceDemoRedesign() {
  const [state, setState] = useState<RecordingState>('idle');
  const [inputLang, setInputLang] = useState('English');
  const [outputLang, setOutputLang] = useState('Professional');
  const [rawText, setRawText] = useState('');
  const [polishedText, setPolishedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);

  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

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
          startAutoDemo();
        };
      }
    }
  }, []);

  const startAutoDemo = () => {
    setState('idle');
    const example = DEMO_EXAMPLES[currentExample];

    setTimeout(() => {
      setState('listening');
      setRawText('');
      setPolishedText('');

      // Type out raw text
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < example.raw.length) {
          setRawText(example.raw.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setState('processing');
            setTimeout(() => {
              setPolishedText(example.polished);
              setState('complete');
              setCurrentExample((prev) => (prev + 1) % DEMO_EXAMPLES.length);
            }, 1200);
          }, 500);
        }
      }, 40);
    }, 500);
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      setRawText('');
      setPolishedText('');
      setState('listening');
      recognitionRef.current.start();
    } else {
      startAutoDemo();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && state === 'listening') {
      recognitionRef.current.stop();
      setState('processing');

      setTimeout(() => {
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
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easing.smooth }}
    >
      {/* Demo Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-zavi-border/30 overflow-hidden">
        {/* Language Selectors */}
        <div className="flex items-center justify-between gap-4 p-6 border-b border-zavi-border/30 bg-zavi-paper/30">
          <div className="flex-1">
            <label className="block text-xs font-medium text-zavi-gray-text mb-2">
              Input:
            </label>
            <select
              value={inputLang}
              onChange={(e) => setInputLang(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-zavi-border rounded-lg text-sm font-medium text-zavi-charcoal focus:outline-none focus:ring-2 focus:ring-zavi-blue/20 focus:border-zavi-blue transition-all"
              disabled={state === 'listening' || state === 'processing'}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-zavi-gray-text mb-2">
              Output:
            </label>
            <select
              value={outputLang}
              onChange={(e) => setOutputLang(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-zavi-border rounded-lg text-sm font-medium text-zavi-charcoal focus:outline-none focus:ring-2 focus:ring-zavi-blue/20 focus:border-zavi-blue transition-all"
              disabled={state === 'listening' || state === 'processing'}
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Formal</option>
            </select>
          </div>

          <motion.button
            className="mt-6 p-2 hover:bg-zavi-paper rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-zavi-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
        </div>

        {/* Demo Interface */}
        <div className="p-12">
          {/* Idle/Listening State */}
          {(state === 'idle' || state === 'listening' || state === 'processing') && !polishedText && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              {/* Microphone Button */}
              <motion.button
                onClick={handleMicClick}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  state === 'listening'
                    ? 'bg-zavi-blue shadow-2xl shadow-zavi-blue/50'
                    : state === 'processing'
                    ? 'bg-yellow-500 shadow-2xl shadow-yellow-500/50'
                    : 'bg-zavi-blue shadow-xl shadow-zavi-blue/30'
                }`}
                whileHover={{ scale: state === 'processing' ? 1 : 1.05 }}
                whileTap={{ scale: state === 'processing' ? 1 : 0.95 }}
                disabled={state === 'processing'}
              >
                <AnimatePresence mode="wait">
                  {state === 'listening' ? (
                    <motion.svg
                      key="recording"
                      className="w-16 h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </motion.svg>
                  ) : state === 'processing' ? (
                    <motion.svg
                      key="processing"
                      className="w-12 h-12 text-white"
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
                  ) : (
                    <motion.svg
                      key="idle"
                      className="w-16 h-16 text-white"
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
                </AnimatePresence>

                {/* Pulse Animation for Listening */}
                {state === 'listening' && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-zavi-blue"
                      animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-zavi-blue"
                      animate={{ scale: [1, 1.6, 1.6], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    />
                  </>
                )}
              </motion.button>

              {/* Status Text */}
              <motion.p
                className="mt-8 text-base text-zavi-gray-text font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {state === 'idle' && 'Tap to start speaking'}
                {state === 'listening' && 'Listening...'}
                {state === 'processing' && 'Processing...'}
              </motion.p>

              <motion.p
                className="mt-2 text-xs text-zavi-gray-text/60 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Status: {state.toUpperCase()}
              </motion.p>
            </div>
          )}

          {/* Results State */}
          {(rawText || polishedText) && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Raw Stream */}
              {rawText && (
                <div>
                  <p className="text-xs font-semibold text-zavi-gray-text uppercase tracking-wider mb-3">
                    Raw Stream
                  </p>
                  <div className="p-4 bg-zavi-paper/50 rounded-xl border border-zavi-border/30">
                    <p className="text-sm text-zavi-gray-text/70 leading-relaxed italic">
                      {rawText}
                    </p>
                  </div>
                </div>
              )}

              {/* Zavi Output */}
              {polishedText && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: easing.smooth }}
                >
                  <p className="text-xs font-semibold text-zavi-blue uppercase tracking-wider mb-3">
                    Zavi Output
                  </p>
                  <div className="p-6 bg-gradient-to-br from-zavi-blue/5 to-purple-50/30 rounded-xl border border-zavi-blue/20">
                    <p className="text-base text-zavi-charcoal leading-relaxed font-medium mb-6">
                      {polishedText}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={copyToClipboard}
                        className="flex-1 px-4 py-2.5 bg-zavi-charcoal hover:bg-zavi-charcoal/90 text-white text-sm font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-zavi-charcoal/30 inline-flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copied ? 'Copied!' : 'Copy Text'}
                      </button>

                      <button
                        onClick={downloadText}
                        className="px-4 py-2.5 bg-white hover:bg-zavi-paper border border-zavi-border text-zavi-charcoal text-sm font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-zavi-blue/20 inline-flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Save .txt
                      </button>
                    </div>
                  </div>

                  {/* Footer Text */}
                  <p className="text-xs text-zavi-gray-text/60 text-center mt-4">
                    No editing required. AI detected intent and tone automatically.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
