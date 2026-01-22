'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'

const NUM_BARS = 60

// Declare Firebase types
declare const firebase: any

export default function DemoPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [committedText, setCommittedText] = useState('')
  const [editableText, setEditableText] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [pendingRecordStart, setPendingRecordStart] = useState(false)
  const [latencyDisplay, setLatencyDisplay] = useState('--ms')
  const [language, setLanguage] = useState('en-US')
  const [enableTranslation, setEnableTranslation] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState('')
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'demo' | 'error'>('loading')
  const [firebaseReady, setFirebaseReady] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const wsRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const waveBarsRef = useRef<number[]>(new Array(NUM_BARS).fill(20))
  const idTokenRef = useRef<string | null>(null)
  const isRecordingRef = useRef<boolean>(false)
  const pendingRecordStartRef = useRef<boolean>(false)

  // Check if first time visitor
  useEffect(() => {
    const hasVisited = localStorage.getItem('zavi-demo-visited')
    if (!hasVisited) {
      setShowOnboarding(true)
    }
  }, [])

  // Initialize Firebase and auto-login
  useEffect(() => {
    if (!firebaseReady) return

    const initAuth = async () => {
      try {
        const response = await fetch('/api/config')
        const config = await response.json()

        if (!config.authEnabled || !config.firebase?.apiKey) {
          // No auth required - connect directly
          setAuthStatus('demo')
          connect()
          return
        }

        // Initialize Firebase
        if (!firebase.apps?.length) {
          firebase.initializeApp(config.firebase)
        }

        // Auto-login with demo credentials
        const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL
        const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD

        if (demoEmail && demoPassword) {
          console.log('Auto-authenticating with demo account...')

          try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(demoEmail, demoPassword)
            const token = await userCredential.user.getIdToken()
            idTokenRef.current = token
            setAuthStatus('authenticated')
            console.log('Demo authentication successful')
            connect()
          } catch (error: any) {
            console.error('Demo authentication failed:', error)
            setAuthStatus('error')
            alert('Demo authentication failed. Please check your credentials.')
          }
        } else {
          // No demo credentials - try anonymous connection
          setAuthStatus('demo')
          connect()
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        setAuthStatus('demo')
        connect()
      }
    }

    initAuth()
  }, [firebaseReady])

  // Connect to WebSocket
  const connect = () => {
    // Close existing WebSocket if any
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING) {
        wsRef.current.close()
      }
      wsRef.current = null
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://zavivoice.com/ws'

    // Append auth token if available
    const url = idTokenRef.current
      ? `${wsUrl}?token=${encodeURIComponent(idTokenRef.current)}`
      : wsUrl

    console.log('Connecting to gateway:', wsUrl)

    const ws = new WebSocket(url)

    // Set binary type for ArrayBuffer handling
    ws.binaryType = 'arraybuffer'

    ws.onopen = () => {
      setIsConnected(true)
      console.log('Connected to gateway')

      // Use ref to avoid stale closure issue
      if (pendingRecordStartRef.current) {
        console.log('Auto-starting recording after connection')
        pendingRecordStartRef.current = false
        setPendingRecordStart(false)
        startRecording()
      }
    }

    ws.onclose = (event) => {
      setIsConnected(false)
      pendingRecordStartRef.current = false
      setPendingRecordStart(false)
      stopRecording()
      wsRef.current = null // Clear the reference so we can reconnect
      console.log('Disconnected from gateway', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean
      })
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onmessage = (event) => {
      console.log('Received message:', event.data)
      try {
        const data = JSON.parse(event.data)
        handleMessage(data)
      } catch (error) {
        console.error('Failed to parse message:', event.data, error)
      }
    }

    wsRef.current = ws
  }

  // Handle incoming messages
  const handleMessage = (data: any) => {
    switch (data.type) {
      case 'transcript':
        if (data.permanentCommit) {
          setCommittedText(prev => prev + (prev ? ' ' : '') + data.permanentCommit)
        }

        if (data.isReplacement) {
          setEditableText(data.text || '')
          setInterimTranscript('')
        } else if (data.isFinal) {
          if (data.text && data.text.trim()) {
            setEditableText(prev => prev + (prev ? ' ' : '') + data.text.trim())
          }
          setInterimTranscript('')
        } else {
          setInterimTranscript(data.text || '')
        }

        if (data.confidence) {
          setLatencyDisplay(`${Math.round(data.confidence * 100)}% conf`)
        }
        break

      case 'error':
        console.error('Error:', data.code, data.message)
        stopRecording()
        if (data.code === 'QUOTA_EXCEEDED') {
          alert('Daily word limit reached. Upgrade to Premium for unlimited access!')
        }
        break
    }
  }

  // Start recording
  const startRecording = async () => {
    try {
      setCommittedText('')
      setEditableText('')
      setInterimTranscript('')

      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.log('WebSocket not connected')
        return
      }

      // First, set up the microphone and audio processing
      console.log('Requesting microphone access...')
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      // Create AudioContext with explicit 16kHz sample rate
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000
      })

      // Resume AudioContext - required for mobile Safari
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }

      console.log('AudioContext sample rate:', audioContext.sampleRate)

      const source = audioContext.createMediaStreamSource(mediaStream)

      // Use larger buffer for better performance (4096 samples = 256ms at 16kHz)
      const processor = audioContext.createScriptProcessor(4096, 1, 1)

      let frameCount = 0
      processor.onaudioprocess = (e) => {
        // Use ref instead of state to avoid stale closure issues
        if (!isRecordingRef.current || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return

        const inputData = e.inputBuffer.getChannelData(0)

        // Convert Float32Array to Int16Array (PCM 16-bit little-endian)
        const pcmData = new Int16Array(inputData.length)
        for (let i = 0; i < inputData.length; i++) {
          // Clamp the value between -1 and 1
          const sample = Math.max(-1, Math.min(1, inputData[i]))
          // Convert to 16-bit PCM
          pcmData[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF
        }

        // Debug: Log first chunk
        if (frameCount === 0) {
          console.log('First audio chunk:', {
            length: pcmData.length,
            bufferSize: pcmData.buffer.byteLength,
            sampleRate: audioContext.sampleRate,
            firstSamples: Array.from(pcmData.slice(0, 10))
          })
        }
        frameCount++

        // Send as ArrayBuffer (binary data)
        if (wsRef.current.readyState === WebSocket.OPEN) {
          try {
            wsRef.current.send(pcmData.buffer)
          } catch (error) {
            console.error('Error sending audio data:', error)
          }
        }

        updateWaveform(inputData)
      }

      source.connect(processor)
      processor.connect(audioContext.destination)

      mediaStreamRef.current = mediaStream
      audioContextRef.current = audioContext
      processorRef.current = processor

      // Set both ref and state - ref for audio processor, state for UI
      isRecordingRef.current = true
      setIsRecording(true)

      console.log('Audio setup complete, ready to stream')

      // NOW send the start message after audio is ready to stream
      const startMessage: any = {
        type: 'start',
        language: language,
        interim: true
      }

      if (enableTranslation && targetLanguage) {
        startMessage.targetLanguage = targetLanguage
      }

      console.log('Sending start message:', startMessage)
      wsRef.current.send(JSON.stringify(startMessage))

      console.log('Recording started')

      // Mark as having recorded for first-time user flow
      if (!hasRecorded) {
        setHasRecorded(true)
        setCurrentStep(2)
      }
    } catch (error: any) {
      console.error('Error starting recording:', error)
      alert('Microphone error: ' + error.message)
    }
  }

  // Stop recording
  const stopRecording = () => {
    // Check if we were recording before cleaning up
    const wasRecording = isRecordingRef.current

    // Always clean up audio resources, even if isRecording is false
    if (processorRef.current) {
      processorRef.current.disconnect()
      processorRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }

    // Only send stop message if we were actually recording
    if (wasRecording && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'stop' }))
    }

    // Set both ref and state
    isRecordingRef.current = false
    setIsRecording(false)
    waveBarsRef.current = new Array(NUM_BARS).fill(20)

    if (wasRecording) {
      console.log('Recording stopped')
      if (hasRecorded && currentStep === 2) {
        setCurrentStep(3)
      }
    }
  }

  // Update waveform visualization
  const updateWaveform = (audioData: Float32Array) => {
    const step = Math.floor(audioData.length / NUM_BARS)
    const newBars = []

    for (let i = 0; i < NUM_BARS; i++) {
      const start = i * step
      let sum = 0
      for (let j = 0; j < step; j++) {
        sum += Math.abs(audioData[start + j] || 0)
      }
      const avg = sum / step
      const height = Math.max(4, Math.min(100, avg * 500))
      newBars.push(height)
    }

    waveBarsRef.current = newBars
  }

  // Toggle recording
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.log('WebSocket not connected, reconnecting...', {
          hasRef: !!wsRef.current,
          state: wsRef.current?.readyState
        })
        // Set both ref and state - ref for the onopen callback, state for UI
        pendingRecordStartRef.current = true
        setPendingRecordStart(true)
        connect()
        return
      }
      startRecording()
    }
  }

  // Clear transcript
  const clearTranscript = () => {
    setCommittedText('')
    setEditableText('')
    setInterimTranscript('')
  }

  // Close onboarding
  const closeOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem('zavi-demo-visited', 'true')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      stopRecording()
    }
  }, [])

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target instanceof HTMLElement &&
          e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
        e.preventDefault()
        toggleRecording()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isRecording, isConnected])

  // Animation frame for waveform
  useEffect(() => {
    let animationFrame: number
    const animate = () => {
      animationFrame = requestAnimationFrame(animate)
    }
    if (isRecording) {
      animate()
    }
    return () => cancelAnimationFrame(animationFrame)
  }, [isRecording])

  const hasText = committedText.trim() || editableText.trim() || interimTranscript

  return (
    <>
      {/* Load Firebase SDK */}
      <Script
        src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"
        onLoad={() => setFirebaseReady(true)}
      />
      <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js" />

      <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Grid background - subtle */}
        <div
          className="fixed inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 px-6 md:px-10 py-4 flex justify-between items-center z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3 no-underline text-gray-900 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="10" width="70" height="12" rx="6" fill="url(#topBar)"/>
                <path d="M 85 22 Q 75 30, 65 38 Q 55 46, 45 54 Q 35 62, 25 70"
                      stroke="#1F5F8B" strokeWidth="12" fill="none" opacity="1"/>
                <rect x="15" y="78" width="70" height="12" rx="6" fill="url(#bottomBar)"/>
                <defs>
                  <linearGradient id="topBar" x1="15" y1="16" x2="85" y2="16" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2E5FDD"/>
                    <stop offset="50%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#60A5FA"/>
                  </linearGradient>
                  <linearGradient id="bottomBar" x1="15" y1="84" x2="85" y2="84" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2E5FDD"/>
                    <stop offset="50%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#60A5FA"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-bold">Zavi</span>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 no-underline text-sm font-medium transition-colors hidden sm:block">
              Home
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 no-underline text-sm font-medium transition-colors hidden sm:block">
              Privacy
            </Link>
            <Link href="/demo" className="text-blue-600 no-underline text-sm font-semibold">
              Demo
            </Link>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-20 relative z-10">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Interactive Demo
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
              Experience Voice Magic
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              See how Zavi transforms your voice into perfectly formatted text in real-time
            </p>
          </motion.header>

          {/* Loading state */}
          {authStatus === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600">Initializing demo...</p>
            </motion.div>
          )}

          {/* Main demo area */}
          {authStatus !== 'loading' && (
            <>
              {/* Step indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center items-center gap-4 mb-12"
              >
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentStep >= step ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
                      }`}>
                        {currentStep > step ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : step}
                      </div>
                      <span className="text-sm font-medium hidden sm:inline">
                        {step === 1 && 'Click Record'}
                        {step === 2 && 'Speak'}
                        {step === 3 && 'See Magic'}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={`w-8 h-0.5 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300'}`} />
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Status indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center gap-6 mb-12 flex-wrap"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                  <span className={`w-2 h-2 rounded-full transition-all ${
                    isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">
                    {isConnected ? 'Connected' : 'Connecting...'}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                  <span className={`w-2 h-2 rounded-full transition-all ${
                    isRecording ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">
                    {isRecording ? 'Recording' : 'Ready'}
                  </span>
                </div>
                {latencyDisplay !== '--ms' && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-700">{latencyDisplay}</span>
                  </div>
                )}
              </motion.div>

              {/* Language Selection - Prominent Feature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <label htmlFor="language-select" className="text-lg font-semibold text-gray-900">
                    Select Your Language
                  </label>
                </div>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={isRecording}
                  className="w-full max-w-md mx-auto block px-6 py-4 bg-white border-2 border-blue-200 text-gray-900 rounded-xl text-center text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-blue-300 shadow-sm"
                >
                  <option value="en-US">🇺🇸 English (US)</option>
                  <option value="en-GB">🇬🇧 English (UK)</option>
                  <option value="es-ES">🇪🇸 Spanish (Spain)</option>
                  <option value="es-MX">🇲🇽 Spanish (Mexico)</option>
                  <option value="fr-FR">🇫🇷 French</option>
                  <option value="de-DE">🇩🇪 German</option>
                  <option value="it-IT">🇮🇹 Italian</option>
                  <option value="pt-BR">🇧🇷 Portuguese</option>
                  <option value="ja-JP">🇯🇵 Japanese</option>
                  <option value="ko-KR">🇰🇷 Korean</option>
                  <option value="cmn-Hans-CN">🇨🇳 Chinese (Simplified)</option>
                  <option value="hi-IN">🇮🇳 Hindi</option>
                  <option value="ar-XA">🇸🇦 Arabic</option>
                </select>
                {isRecording && (
                  <p className="mt-2 text-center text-xs text-gray-500">Stop recording to change language</p>
                )}
              </motion.div>

              {/* Main recording area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8"
              >
                {/* Waveform visualization */}
                <div className="w-full h-32 mb-8 flex items-center justify-center gap-1">
                  {Array.from({ length: NUM_BARS }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-100 ${
                        isRecording && waveBarsRef.current[i] > 20
                          ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                          : 'bg-gray-200'
                      }`}
                      style={{ height: `${waveBarsRef.current[i] || 20}px` }}
                      animate={isRecording ? {
                        opacity: [0.5, 1, 0.5],
                      } : {}}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.01
                      }}
                    />
                  ))}
                </div>

                {/* Record button */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={toggleRecording}
                    disabled={authStatus === 'error'}
                    className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none ${
                      isRecording
                        ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isRecording ? (
                        <motion.div
                          key="stop"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <div className="w-12 h-12 bg-white rounded-lg pointer-events-none" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="mic"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <svg className="w-16 h-16 text-white pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Pulse effect when recording */}
                    {isRecording && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-red-500 pointer-events-none z-[-1]"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </button>

                  <motion.p
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {isRecording ? (
                      <span className="text-lg font-semibold text-red-600">
                        🎙️ Listening... Click to stop
                      </span>
                    ) : pendingRecordStart ? (
                      <span className="text-lg font-medium text-gray-500">
                        Connecting...
                      </span>
                    ) : (
                      <span className="text-lg font-medium text-gray-700">
                        Click the microphone to start recording
                      </span>
                    )}
                  </motion.p>
                  <p className="mt-2 text-sm text-gray-500">
                    Or press <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 font-mono text-xs">Space</kbd> to toggle
                  </p>
                </div>
              </motion.div>

              {/* Transcript area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Live Transcript
                  </h2>
                  <button
                    onClick={clearTranscript}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear
                  </button>
                </div>
                <div className="min-h-[200px] max-h-[400px] overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100">
                  {!hasText ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      <p className="text-gray-400 text-lg">Your transcript will appear here...</p>
                      <p className="text-gray-400 text-sm mt-2">Try saying: "Hello, this is a test of voice recognition."</p>
                    </div>
                  ) : (
                    <div className="text-lg leading-relaxed">
                      {committedText && <span className="text-gray-900 font-medium">{committedText} </span>}
                      {editableText && <span className="text-gray-900">{editableText} </span>}
                      {interimTranscript && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-blue-600 italic"
                        >
                          {interimTranscript}
                        </motion.span>
                      )}
                    </div>
                  )}
                </div>
                {hasText && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Great! Your voice is being transcribed in real-time.</span>
                  </motion.div>
                )}
              </motion.div>

              {/* Translation Settings panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="text-lg font-semibold text-gray-900">Translation Settings</span>
                  </div>
                  <motion.svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: showSettings ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-6 space-y-6">
                        {/* Translation toggle */}
                        <div className="flex items-start gap-4">
                          <div className="flex items-center h-6">
                            <input
                              type="checkbox"
                              id="enableTranslation"
                              checked={enableTranslation}
                              onChange={(e) => setEnableTranslation(e.target.checked)}
                              disabled={isRecording}
                              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </div>
                          <div className="flex-1">
                            <label htmlFor="enableTranslation" className="block text-sm font-semibold text-gray-700 cursor-pointer">
                              Enable Translation
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                              Translate your speech to another language in real-time
                            </p>
                          </div>
                        </div>

                        {/* Target language */}
                        {enableTranslation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <label htmlFor="targetLanguage" className="block text-sm font-semibold text-gray-700 mb-2">
                              Translate To
                            </label>
                            <select
                              id="targetLanguage"
                              value={targetLanguage}
                              onChange={(e) => setTargetLanguage(e.target.value)}
                              disabled={isRecording}
                              className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              <option value="">Select language...</option>
                              <option value="English">English</option>
                              <option value="Spanish">Spanish</option>
                              <option value="French">French</option>
                              <option value="German">German</option>
                              <option value="Italian">Italian</option>
                              <option value="Portuguese">Portuguese</option>
                              <option value="Japanese">Japanese</option>
                              <option value="Korean">Korean</option>
                              <option value="Chinese (Simplified)">Chinese (Simplified)</option>
                              <option value="Hindi">Hindi</option>
                              <option value="Arabic">Arabic</option>
                            </select>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Call to action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-center"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Ready to transform how you write?
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    Download Zavi and experience the full power of voice-first writing with unlimited transcription, smart editing, and cross-platform sync.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/#download"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl no-underline"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download Zavi Free
                    </Link>
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition-all border-2 border-gray-200 no-underline"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Zavi · Voice-Powered Writing · <Link href="/privacy" className="text-blue-600 hover:text-blue-700 no-underline">Privacy Policy</Link>
            </p>
          </footer>
        </div>

        {/* Onboarding Modal */}
        <AnimatePresence>
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={closeOnboarding}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
              >
                <button
                  onClick={closeOnboarding}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Zavi Demo!</h2>
                  <p className="text-gray-600">Experience the magic of voice-to-text in 3 simple steps</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Click the microphone</h3>
                      <p className="text-sm text-gray-600">Press the blue button to start recording</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Speak clearly</h3>
                      <p className="text-sm text-gray-600">Try: "Hello, this is a test of voice recognition"</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Watch the magic happen</h3>
                      <p className="text-sm text-gray-600">See your words appear in real-time!</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeOnboarding}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Got it, let's try! 🚀
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
