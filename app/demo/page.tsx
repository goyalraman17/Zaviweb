'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [committedText, setCommittedText] = useState('')
  const [editableText, setEditableText] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [pendingRecordStart, setPendingRecordStart] = useState(false)

  const wsRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)

  // Connect to WebSocket
  const connect = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//${window.location.host}/ws`

    console.log('Connecting to gateway:', wsUrl)

    const ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      setIsConnected(true)
      console.log('Connected to gateway')

      if (pendingRecordStart) {
        setPendingRecordStart(false)
        startRecording()
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      setPendingRecordStart(false)
      stopRecording()
      console.log('Disconnected from gateway')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      handleMessage(data)
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
        break

      case 'error':
        console.error('Error:', data.code, data.message)
        stopRecording()
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

      wsRef.current.send(JSON.stringify({
        type: 'start',
        language: 'en-US',
        interim: true
      }))

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        }
      })

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000
      })

      const source = audioContext.createMediaStreamSource(mediaStream)
      const processor = audioContext.createScriptProcessor(4096, 1, 1)

      processor.onaudioprocess = (e) => {
        if (!isRecording || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return

        const inputData = e.inputBuffer.getChannelData(0)
        const pcmData = new Int16Array(inputData.length)

        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]))
          pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
        }

        wsRef.current.send(pcmData.buffer)
      }

      source.connect(processor)
      processor.connect(audioContext.destination)

      mediaStreamRef.current = mediaStream
      audioContextRef.current = audioContext
      processorRef.current = processor
      setIsRecording(true)

      console.log('Recording started')
    } catch (error: any) {
      console.error('Error starting recording:', error)
      alert('Microphone error: ' + error.message)
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (!isRecording) return

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

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'stop' }))
    }

    setIsRecording(false)
    console.log('Recording stopped')
  }

  // Toggle recording
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.log('Connecting...')
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

  // Initialize WebSocket connection
  useEffect(() => {
    connect()

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

  const hasText = committedText.trim() || editableText.trim() || interimTranscript

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%)' }}>
      {/* Navigation */}
      <nav className="flex justify-between items-center px-10 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 no-underline text-slate-800">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>
          <span className="text-2xl font-bold">Zavi</span>
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/" className="text-slate-500 no-underline text-sm font-medium hover:text-slate-800 transition-colors">
            How it Works
          </Link>
          <Link href="/" className="text-slate-500 no-underline text-sm font-medium hover:text-slate-800 transition-colors">
            Pricing
          </Link>
          <Link href="/" className="text-slate-500 no-underline text-sm font-medium hover:text-slate-800 transition-colors">
            About
          </Link>
          <a
            href="https://play.google.com/store/apps/details?id=com.pingpros.keyboard"
            className="bg-indigo-500 text-white px-5 py-2.5 rounded-lg no-underline font-semibold text-sm hover:bg-indigo-600 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Download for macOS
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Feature badges */}
        <div className="flex justify-center gap-3 flex-wrap mb-16">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-3xl shadow-sm text-sm font-medium text-slate-700">
            <svg className="w-4.5 h-4.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
            Removes Fillers
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-3xl shadow-sm text-sm font-medium text-slate-700">
            <svg className="w-4.5 h-4.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Perfect Grammar
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-3xl shadow-sm text-sm font-medium text-slate-700">
            <svg className="w-4.5 h-4.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Instant Format
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-3xl shadow-sm text-sm font-medium text-slate-700">
            <svg className="w-4.5 h-4.5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Works Everywhere
          </div>
        </div>

        {/* Demo card */}
        <div className="bg-white rounded-3xl p-16 shadow-xl">
          {/* Status bar */}
          <div className="flex items-center gap-6 px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg mb-8 text-xs">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span className={`w-2 h-2 rounded-full transition-all ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span className={`w-2 h-2 rounded-full transition-all ${isRecording ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`} />
              {isRecording ? 'Recording' : 'Idle'}
            </div>
          </div>

          {/* Language bar */}
          <div className="flex items-center justify-between mb-20 pb-5 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <svg className="w-5 h-5 stroke-indigo-500" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                </svg>
                Auto-detect
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              <span className="text-slate-400 mx-2">→</span>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
                English
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 bg-green-50 border border-green-200 rounded-lg text-xs font-semibold text-green-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Private by design
            </div>
          </div>

          {/* Microphone button */}
          <div className="flex flex-col items-center gap-5 mb-16">
            <button
              onClick={toggleRecording}
              disabled={!isConnected}
              className={`w-40 h-40 bg-gradient-to-br from-indigo-500 to-purple-600 border-none rounded-full cursor-pointer flex items-center justify-center shadow-[0_8px_32px_rgba(99,102,241,0.3)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isRecording ? 'animate-pulse' : ''}`}
            >
              <svg className={`w-16 h-16 fill-white ${isRecording ? 'animate-pulse' : ''}`} viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </button>
            <div className="text-sm text-slate-500 font-medium">
              {isRecording ? 'Click to stop' : 'Click to start • Long press for options'}
            </div>
          </div>

          {/* Demo description */}
          <div className="text-center mb-10">
            <p className="text-base leading-relaxed text-slate-600">
              <strong className="text-slate-800 font-semibold">This demo explains the product without text.</strong>
              <br />
              Speak once. Send immediately.
            </p>
          </div>

          {/* Transcript section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">Transcript</h3>
              <button
                onClick={clearTranscript}
                className="bg-transparent border border-slate-200 px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-500 cursor-pointer hover:border-slate-300 hover:text-slate-700 transition-all"
              >
                Clear
              </button>
            </div>
            <div className={`min-h-[200px] max-h-[400px] overflow-y-auto px-5 py-5 bg-slate-50 border border-slate-200 rounded-xl text-base leading-relaxed text-slate-800 ${!hasText ? 'flex items-center justify-center text-slate-400 italic' : ''}`}>
              {!hasText ? (
                <p>Start recording to see your transcript...</p>
              ) : (
                <>
                  {committedText && <span className="text-slate-800">{committedText} </span>}
                  {editableText && <span className="text-slate-800">{editableText} </span>}
                  {interimTranscript && <span className="text-slate-400 italic">{interimTranscript}</span>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
