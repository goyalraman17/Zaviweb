import { useState, useEffect, useRef } from 'react';

type RecordingState = 'idle' | 'listening' | 'processing' | 'ready';
type DemoMode = 'user' | 'auto';

interface DemoExample {
  raw: string;
  polished: string;
}

const DEMO_EXAMPLES: DemoExample[] = [
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

export function useVoiceRecording(inputLang: string) {
  const [state, setState] = useState<RecordingState>('idle');
  const [demoMode, setDemoMode] = useState<DemoMode>('user');
  const [rawText, setRawText] = useState('');
  const [polishedText, setPolishedText] = useState('');
  const [waveformActive, setWaveformActive] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);
  const [undoStack, setUndoStack] = useState<string[]>([]);

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
          startAutoDemo();
        };
      } else {
        setDemoMode('auto');
        startAutoDemo();
      }
    }
  }, [inputLang]);

  const startAutoDemo = () => {
    setDemoMode('auto');
    setState('idle');
    const example = DEMO_EXAMPLES[currentExample];

    setTimeout(() => {
      setState('listening');
      setWaveformActive(true);
      setRawText('');

      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < example.raw.length) {
          setRawText(example.raw.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
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

      setTimeout(() => {
        setUndoStack([rawText]);
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

  const reset = () => {
    setState('idle');
    setRawText('');
    setPolishedText('');
    setWaveformActive(false);
    setUndoStack([]);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      setPolishedText(undoStack[0]);
      setUndoStack([]);
    }
  };

  return {
    state,
    demoMode,
    rawText,
    polishedText,
    waveformActive,
    undoStack,
    startRecording,
    stopRecording,
    reset,
    undo,
    setPolishedText,
  };
}
