'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

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

  const wsRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const waveBarsRef = useRef<number[]>(new Array(NUM_BARS).fill(20))
  const idTokenRef = useRef<string | null>(null)
  const isRecordingRef = useRef<boolean>(false)

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

      if (pendingRecordStart) {
        setPendingRecordStart(false)
        startRecording()
      }
    }

    ws.onclose = (event) => {
      setIsConnected(false)
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
    if (isRecording && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'stop' }))
    }

    // Set both ref and state
    isRecordingRef.current = false
    setIsRecording(false)
    waveBarsRef.current = new Array(NUM_BARS).fill(20)

    if (isRecording) {
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

      <div className="min-h-screen bg-[#050a14] text-[#f0f6ff] relative overflow-x-hidden">
        {/* Noise texture overlay */}
        <div
          className="fixed inset-0 opacity-[0.03] pointer-events-none z-[1000]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
          }}
        />

        {/* Grid background */}
        <div
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 px-10 py-4 flex justify-between items-center z-[100]"
             style={{ background: 'linear-gradient(to bottom, #050a14 0%, #050a14 60%, transparent 100%)' }}>
          <Link href="/" className="flex items-center gap-3 no-underline text-[#f0f6ff]">
            <div className="w-9 h-9 bg-gradient-to-br from-[#2563eb] to-[#60a5fa] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 fill-[#050a14]" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </div>
            <span className="text-xl font-normal" style={{ fontFamily: 'serif' }}>Zavi</span>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-[#7da1c4] no-underline text-xs uppercase tracking-wider hover:text-[#f0f6ff] transition-colors">
              Home
            </Link>
            <Link href="/privacy" className="text-[#7da1c4] no-underline text-xs uppercase tracking-wider hover:text-[#f0f6ff] transition-colors">
              Privacy
            </Link>
            <Link href="/demo" className="text-[#2563eb] no-underline text-xs uppercase tracking-wider">
              Demo
            </Link>
          </div>
        </nav>

        <div className="max-w-[900px] mx-auto px-10 py-20 relative z-[1]">
          {/* Header */}
          <header className="mb-20 animate-[fadeSlideDown_0.8s_ease-out]">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2563eb] to-[#60a5fa] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(96,165,250,0.6)]">
                <svg className="w-6 h-6 fill-[#050a14]" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-[3.5rem] font-normal leading-tight tracking-tight" style={{ fontFamily: 'serif' }}>
                  Zavi <em className="italic text-[#2563eb]">Demo</em>
                </h1>
                <p className="text-[0.85rem] text-[#7da1c4] mt-4 uppercase tracking-[0.15em]">Real-time Speech Recognition</p>
              </div>
            </div>
          </header>

          {/* Status bar */}
          <div className="flex items-center gap-6 px-6 py-4 bg-[#0a1628] border border-[#1e3a5f] rounded-lg mb-10 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
              <span className={`w-2 h-2 rounded-full transition-all ${isConnected ? 'bg-[#22d3ee] shadow-[0_0_12px_rgba(74,222,128,0.5)]' : 'bg-[#7da1c4]'}`} />
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
              <span className={`w-2 h-2 rounded-full transition-all ${isRecording ? 'bg-[#2563eb] animate-pulse shadow-[0_0_12px_rgba(37,99,235,0.4)]' : 'bg-[#7da1c4]'}`} />
              <span>{isRecording ? 'Recording' : 'Idle'}</span>
            </div>
            {authStatus === 'authenticated' && (
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#22d3ee]" />
                <span>Demo Mode</span>
              </div>
            )}
            <div className="ml-auto">
              <span className="text-xs uppercase tracking-wider">{latencyDisplay}</span>
            </div>
          </div>

          {/* Loading state */}
          {authStatus === 'loading' && (
            <div className="text-center py-10 text-[#7da1c4]">
              <p>Initializing demo...</p>
            </div>
          )}

          {/* Main control area */}
          {authStatus !== 'loading' && (
            <>
              <div className="flex flex-col items-center py-16 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]">
                {/* Waveform visualization */}
                <div className="w-full h-[120px] mb-12 flex items-center justify-center gap-1">
                  {Array.from({ length: NUM_BARS }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded transition-all duration-100 ${
                        isRecording && waveBarsRef.current[i] > 20
                          ? 'bg-gradient-to-t from-[#2563eb] to-[#60a5fa] shadow-[0_0_10px_rgba(96,165,250,0.6)]'
                          : 'bg-[#1e3a5f]'
                      }`}
                      style={{ height: `${waveBarsRef.current[i] || 20}px` }}
                    />
                  ))}
                </div>

                {/* Record button */}
                <button
                  onClick={toggleRecording}
                  disabled={!isConnected}
                  className={`w-[140px] h-[140px] rounded-full border-[3px] bg-[#0a1628] cursor-pointer relative transition-all flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecording
                      ? 'border-[#60a5fa] shadow-[0_0_50px_rgba(96,165,250,0.6)]'
                      : 'border-[#1e3a5f] hover:border-[#2563eb]'
                  }`}
                >
                  <div className={`bg-gradient-to-br from-[#2563eb] to-[#60a5fa] transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] ${
                    isRecording ? 'w-10 h-10 rounded-lg' : 'w-15 h-15 rounded-full'
                  }`} />
                </button>
                <p className="mt-6 text-xs text-[#7da1c4] uppercase tracking-[0.15em]">
                  {isRecording ? 'Click to stop' : 'Tap to record, speak, then stop'}
                </p>
              </div>

              {/* Transcript area */}
              <div className="w-full mt-16 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#1e3a5f]">
                  <h2 className="text-2xl font-normal" style={{ fontFamily: 'serif' }}>Transcript</h2>
                  <button
                    onClick={clearTranscript}
                    className="text-xs uppercase tracking-wider text-[#7da1c4] bg-transparent border border-[#1e3a5f] px-4 py-2 rounded cursor-pointer hover:text-[#f0f6ff] hover:border-[#7da1c4] transition-all"
                  >
                    Clear
                  </button>
                </div>
                <div className="min-h-[200px] max-h-[400px] overflow-y-auto px-6 py-6 bg-[#0a1628] border border-[#1e3a5f] rounded-lg text-lg leading-relaxed">
                  {!hasText ? (
                    <p className="text-[#7da1c4] italic text-center py-10">Start recording to see your transcript...</p>
                  ) : (
                    <>
                      {committedText && <span className="text-[#f0f6ff]">{committedText} </span>}
                      {editableText && <span className="text-[#f0f6ff]">{editableText} </span>}
                      {interimTranscript && <span className="text-[#7da1c4] italic">{interimTranscript}</span>}
                    </>
                  )}
                </div>
              </div>

              {/* Settings panel */}
              <div className="mt-16 px-6 py-6 bg-[#0a1628] border border-[#1e3a5f] rounded-lg animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]">
                <p className="text-xs uppercase tracking-[0.15em] text-[#7da1c4] mb-5">Settings</p>
                <div className="flex items-center gap-6 flex-wrap mb-4">
                  <div className="flex items-center gap-3">
                    <label htmlFor="language" className="text-sm text-[#7da1c4]">Language</label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="text-sm bg-[#0f1f3a] border border-[#1e3a5f] text-[#f0f6ff] px-3 py-2 rounded cursor-pointer focus:outline-none focus:border-[#2563eb]"
                      style={{ fontFamily: 'monospace' }}
                    >
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es-ES">Spanish (Spain)</option>
                      <option value="es-MX">Spanish (Mexico)</option>
                      <option value="fr-FR">French (France)</option>
                      <option value="de-DE">German</option>
                      <option value="it-IT">Italian</option>
                      <option value="pt-BR">Portuguese (Brazil)</option>
                      <option value="ja-JP">Japanese</option>
                      <option value="ko-KR">Korean</option>
                      <option value="cmn-Hans-CN">Chinese (Simplified)</option>
                      <option value="hi-IN">Hindi</option>
                      <option value="ar-XA">Arabic</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableTranslation}
                        onChange={(e) => setEnableTranslation(e.target.checked)}
                        className="hidden"
                      />
                      <span className={`w-[18px] h-[18px] border rounded flex items-center justify-center transition-all ${
                        enableTranslation ? 'bg-[#2563eb] border-[#2563eb]' : 'border-[#1e3a5f]'
                      }`}>
                        {enableTranslation && (
                          <svg className="w-3 h-3 fill-[#050a14]" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        )}
                      </span>
                      <span className="text-sm text-[#7da1c4]">Translate output</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <label htmlFor="targetLanguage" className="text-sm text-[#7da1c4]">Translate to</label>
                    <select
                      id="targetLanguage"
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      disabled={!enableTranslation}
                      className="text-sm bg-[#0f1f3a] border border-[#1e3a5f] text-[#f0f6ff] px-3 py-2 rounded cursor-pointer focus:outline-none focus:border-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'monospace' }}
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
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <footer className="mt-20 pt-6 border-t border-[#1e3a5f] text-xs text-[#7da1c4] text-center animate-[fadeSlideUp_0.8s_ease-out_1s_both]">
            <p>
              Zavi &middot; Voice-Powered Typing &middot; <Link href="/privacy" className="text-[#2563eb] no-underline">Privacy Policy</Link>
            </p>
          </footer>
        </div>

        <style jsx global>{`
          @keyframes fadeSlideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  )
}
