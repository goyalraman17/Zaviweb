import { useState, useEffect, useRef, useCallback } from 'react';

type RecordingState = 'idle' | 'listening' | 'processing' | 'ready';

interface VoiceGatewayOptions {
  inputLang: string;
  outputLang?: string;
  enableTranslation?: boolean;
}

export function useVoiceGateway({ inputLang, outputLang, enableTranslation }: VoiceGatewayOptions) {
  const [state, setState] = useState<RecordingState>('idle');
  const [rawText, setRawText] = useState('');
  const [polishedText, setPolishedText] = useState('');
  const [waveformActive, setWaveformActive] = useState(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [firebaseReady, setFirebaseReady] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const isRecordingRef = useRef<boolean>(false);

  // Initialize Firebase auth
  useEffect(() => {
    // Check if Firebase is loaded
    const checkFirebase = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).firebase) {
        setFirebaseReady(true);
        clearInterval(checkFirebase);
      }
    }, 100);

    return () => clearInterval(checkFirebase);
  }, []);

  // Auto-authenticate
  useEffect(() => {
    if (!firebaseReady) return;

    const initAuth = async () => {
      try {
        const response = await fetch('/api/config');
        const config = await response.json();

        if (!config.authEnabled || !config.firebase?.apiKey) {
          // No auth required
          connectWebSocket(null);
          return;
        }

        const firebase = (window as any).firebase;

        // Initialize Firebase if not already initialized
        if (!firebase.apps?.length) {
          firebase.initializeApp(config.firebase);
        }

        // Auto-login with demo credentials
        const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL;
        const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD;

        if (demoEmail && demoPassword) {
          const userCredential = await firebase.auth().signInWithEmailAndPassword(demoEmail, demoPassword);
          const token = await userCredential.user.getIdToken();
          setAuthToken(token);
          connectWebSocket(token);
        } else {
          // No demo credentials - connect without auth
          connectWebSocket(null);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Try connecting without auth
        connectWebSocket(null);
      }
    };

    initAuth();
  }, [firebaseReady]);

  // Connect to WebSocket
  const connectWebSocket = useCallback((token: string | null) => {
    // Close existing WebSocket if any
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://zavivoice.com/ws';
    const url = token ? `${wsUrl}?token=${encodeURIComponent(token)}` : wsUrl;

    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      setIsConnected(true);
      console.log('Voice gateway connected');
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      wsRef.current = null;
      console.log('Voice gateway disconnected:', event.code);

      // Auto-reconnect after a delay
      setTimeout(() => {
        if (firebaseReady) {
          connectWebSocket(authToken);
        }
      }, 2000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleMessage(data);
      } catch (error) {
        console.error('Failed to parse message:', event.data, error);
      }
    };

    wsRef.current = ws;
  }, [authToken, firebaseReady]);

  // Handle incoming WebSocket messages
  const handleMessage = (data: any) => {
    switch (data.type) {
      case 'transcript':
        if (data.rawText) {
          setRawText(data.rawText);
        }

        if (data.isFinal) {
          if (data.text) {
            setPolishedText(data.text);
          }
          setState('ready');
          setWaveformActive(false);
        } else if (data.text) {
          // Interim result
          setRawText(data.text);
        }
        break;

      case 'event':
        if (data.eventType === 'SESSION_STARTED') {
          setState('listening');
          setWaveformActive(true);
        } else if (data.eventType === 'LLM_PROCESSING') {
          setState('processing');
          setWaveformActive(false);
        }
        break;

      case 'error':
        console.error('Voice gateway error:', data.code, data.message);
        stopRecording();
        break;
    }
  };

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      setRawText('');
      setPolishedText('');

      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.log('WebSocket not connected, reconnecting...');
        connectWebSocket(authToken);
        // Wait a bit for connection
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
          console.error('Failed to connect to voice gateway');
          return;
        }
      }

      // Request microphone access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Create AudioContext
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000
      });

      // Resume AudioContext - required for mobile Safari
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const source = audioContext.createMediaStreamSource(mediaStream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        if (!isRecordingRef.current || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const inputData = e.inputBuffer.getChannelData(0);

        // Convert Float32Array to Int16Array (PCM 16-bit little-endian)
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const sample = Math.max(-1, Math.min(1, inputData[i]));
          pcmData[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        }

        // Send as ArrayBuffer
        if (wsRef.current.readyState === WebSocket.OPEN) {
          try {
            wsRef.current.send(pcmData.buffer);
          } catch (error) {
            console.error('Error sending audio data:', error);
          }
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      mediaStreamRef.current = mediaStream;
      audioContextRef.current = audioContext;
      processorRef.current = processor;
      isRecordingRef.current = true;

      // Send start message
      const startMessage: any = {
        type: 'start',
        language: inputLang === 'auto' ? 'en-US' : inputLang,
        interim: true
      };

      if (enableTranslation && outputLang) {
        startMessage.targetLanguage = outputLang;
      }

      wsRef.current.send(JSON.stringify(startMessage));
      setState('listening');
      setWaveformActive(true);
    } catch (error: any) {
      console.error('Error starting recording:', error);
      setState('idle');
    }
  }, [inputLang, outputLang, enableTranslation, authToken, connectWebSocket]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'stop' }));
    }

    isRecordingRef.current = false;
    setWaveformActive(false);

    // If we have text, move to processing state, otherwise idle
    if (rawText || polishedText) {
      setState('processing');
    } else {
      setState('idle');
    }
  }, [rawText, polishedText]);

  // Reset
  const reset = useCallback(() => {
    stopRecording();
    setState('idle');
    setRawText('');
    setPolishedText('');
    setWaveformActive(false);
    setUndoStack([]);
  }, [stopRecording]);

  // Undo
  const undo = useCallback(() => {
    if (undoStack.length > 0) {
      setPolishedText(undoStack[0]);
      setUndoStack([]);
    }
  }, [undoStack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      stopRecording();
    };
  }, [stopRecording]);

  return {
    state,
    demoMode: 'user' as const, // Always user mode with real gateway
    rawText,
    polishedText,
    waveformActive,
    undoStack,
    isConnected,
    startRecording,
    stopRecording,
    reset,
    undo,
    setPolishedText,
  };
}
