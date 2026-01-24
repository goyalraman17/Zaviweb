'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'

const NUM_BARS = 60

// Declare Firebase types
declare const firebase: any

export default function VoiceDemoCard() {
  const [isConnected, setIsConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [committedText, setCommittedText] = useState('')
  const [editableText, setEditableText] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [pendingRecordStart, setPendingRecordStart] = useState(false)
  const [latencyDisplay, setLatencyDisplay] = useState('--ms')
  const [language, setLanguage] = useState('auto')
  const [enableTranslation, setEnableTranslation] = useState(true)
  const [targetLanguage, setTargetLanguage] = useState('English')
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'demo' | 'error'>('loading')
  const [firebaseReady, setFirebaseReady] = useState(false)

  const wsRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const waveBarsRef = useRef<number[]>(new Array(NUM_BARS).fill(20))
  const idTokenRef = useRef<string | null>(null)
  const isRecordingRef = useRef<boolean>(false)
  const pendingRecordStartRef = useRef<boolean>(false)

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

      <div className="w-full max-w-4xl mx-auto">
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
            {/* Centered Microphone Card - Primary Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-4"
            >
              {/* Status indicators - Subtle, inside card */}
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md">
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${isConnected ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  <span className="text-xs text-gray-600">
                    {isConnected ? 'Connected' : 'Connecting...'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md">
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
                    }`} />
                  <span className="text-xs text-gray-600">
                    {isRecording ? 'Recording' : 'Ready'}
                  </span>
                </div>
              </div>

              {/* Language Selection - Inline, Horizontal Flow */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {/* I speak */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">I speak</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      disabled={isRecording}
                      className="px-3 py-1.5 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <option value="auto">🌐 Auto-detect</option>
                      {/* Global backbone */}
                      <option value="en-US">🇺🇸 English (US)</option>
                      <option value="en-GB">🇬🇧 English (UK)</option>
                      <option value="es-ES">🇪🇸 Spanish (Spain)</option>
                      <option value="es-MX">🇲🇽 Spanish (Mexico)</option>
                      <option value="cmn-Hans-CN">🇨🇳 Mandarin Chinese (Simplified)</option>
                      <option value="cmn-Hant-TW">🇹🇼 Mandarin Chinese (Traditional)</option>
                      <option value="hi-IN">🇮🇳 Hindi</option>
                      <option value="ar-SA">🇸🇦 Arabic</option>
                      <option value="pt-BR">🇧🇷 Portuguese (Brazil)</option>
                      <option value="pt-PT">🇵🇹 Portuguese (Portugal)</option>
                      <option value="fr-FR">🇫🇷 French (France)</option>
                      <option value="fr-CA">🇨🇦 French (Canada)</option>
                      <option value="ru-RU">🇷🇺 Russian</option>
                      {/* South Asia (mobile-first, massive scale) */}
                      <option value="bn-IN">🇮🇳 Bengali</option>
                      <option value="ur-PK">🇵🇰 Urdu</option>
                      <option value="pa-Guru-IN">🇮🇳 Punjabi</option>
                      <option value="mr-IN">🇮🇳 Marathi</option>
                      <option value="te-IN">🇮🇳 Telugu</option>
                      <option value="ta-IN">🇮🇳 Tamil</option>
                      {/* East & Southeast Asia */}
                      <option value="id-ID">🇮🇩 Indonesian</option>
                      <option value="ja-JP">🇯🇵 Japanese</option>
                      <option value="ko-KR">🇰🇷 Korean</option>
                      <option value="vi-VN">🇻🇳 Vietnamese</option>
                      <option value="th-TH">🇹🇭 Thai</option>
                      <option value="fil-PH">🇵🇭 Filipino</option>
                      {/* Europe + regional connectors */}
                      <option value="de-DE">🇩🇪 German</option>
                      <option value="it-IT">🇮🇹 Italian</option>
                      <option value="pl-PL">🇵🇱 Polish</option>
                      <option value="tr-TR">🇹🇷 Turkish</option>
                      {/* Africa / L2 bridge */}
                      <option value="sw-KE">🇰🇪 Swahili</option>
                    </select>
                  </div>

                  <span className="text-gray-400">→</span>

                  {/* Output Language - Always visible */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">I want text in</span>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      disabled={isRecording}
                      className="px-3 py-1.5 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {/* Global backbone */}
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Mandarin Chinese">Mandarin Chinese</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="French">French</option>
                      <option value="Russian">Russian</option>
                      {/* South Asia (mobile-first, massive scale) */}
                      <option value="Bengali">Bengali</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Tamil">Tamil</option>
                      {/* East & Southeast Asia */}
                      <option value="Indonesian">Indonesian</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                      <option value="Vietnamese">Vietnamese</option>
                      <option value="Thai">Thai</option>
                      <option value="Filipino">Filipino</option>
                      {/* Europe + regional connectors */}
                      <option value="German">German</option>
                      <option value="Italian">Italian</option>
                      <option value="Polish">Polish</option>
                      <option value="Turkish">Turkish</option>
                      {/* Africa / L2 bridge */}
                      <option value="Swahili">Swahili</option>
                    </select>
                  </div>
                </div>
                {isRecording && (
                  <p className="text-center text-xs text-gray-500 mt-2">Stop recording to change languages</p>
                )}
              </div>

              {/* Compact Waveform */}
              <div className="w-full h-12 mb-4 flex items-center justify-center gap-0.5">
                {Array.from({ length: NUM_BARS }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-0.5 rounded-full transition-all duration-100 ${isRecording && waveBarsRef.current[i] > 20
                        ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                        : 'bg-gray-200'
                      }`}
                    style={{ height: `${Math.min(waveBarsRef.current[i] || 20, 48)}px` }}
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

              {/* Large Microphone Button - Primary CTA */}
              <div className="flex flex-col items-center mb-4">
                <button
                  type="button"
                  onClick={toggleRecording}
                  disabled={authStatus === 'error'}
                  className={`relative w-20 h-20 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none ${isRecording
                      ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95'
                      : 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95'
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
                        <div className="w-7 h-7 bg-white rounded pointer-events-none" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="mic"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <svg className="w-10 h-10 text-white pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                  className="mt-2 text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {isRecording ? (
                    <span className="font-semibold text-red-600">
                      Listening...
                    </span>
                  ) : pendingRecordStart ? (
                    <span className="font-medium text-gray-500">
                      Connecting...
                    </span>
                  ) : (
                    <span className="font-medium text-gray-700">
                      Tap to speak • Tap again to view the output
                    </span>
                  )}
                </motion.p>
                <p className="mt-1 text-xs text-gray-500">
                  Or press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 font-mono text-xs">Space</kbd>
                </p>
              </div>

              {/* App Compatibility Badges - Subtle */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Works everywhere you type</p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {/* Gmail */}
                  <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                    <span className="text-[10px] text-gray-600">Gmail</span>
                  </div>
                  {/* WhatsApp */}
                  <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-[10px] text-gray-600">WhatsApp</span>
                  </div>
                  {/* Google Docs */}
                  <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-5.09zm-.545 10.455H7.09v-1.364h7.09v1.364zm2.727-3.273H7.091v-1.364h9.818v1.364zm0-3.273H7.091V9.273h9.818v1.363zM14.727 6h6l-6-6v6z" />
                    </svg>
                    <span className="text-[10px] text-gray-600">Docs</span>
                  </div>
                  {/* Slack */}
                  <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                    </svg>
                    <span className="text-[10px] text-gray-600">Slack</span>
                  </div>
                  {/* ChatGPT */}
                  <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
                    </svg>
                    <span className="text-[10px] text-gray-600">ChatGPT</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live Transcript - Collapsed when empty */}
            <AnimatePresence>
              {hasText && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Live Transcript
                    </h3>
                    <button
                      onClick={clearTranscript}
                      className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-all flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear
                    </button>
                  </div>
                  <div className="max-h-32 overflow-y-auto p-3 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg border border-gray-100">
                    <div className="text-sm leading-relaxed">
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </>
  )
}
