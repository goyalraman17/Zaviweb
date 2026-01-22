const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { WebSocketServer } = require('ws')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Simple in-memory storage for demo purposes
const sessions = new Map()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // Create WebSocket server
  const wss = new WebSocketServer({ noServer: true })

  // Handle WebSocket upgrade
  server.on('upgrade', (request, socket, head) => {
    const { pathname } = parse(request.url)

    if (pathname === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request)
      })
    } else {
      socket.destroy()
    }
  })

  // WebSocket connection handler
  wss.on('connection', (ws, request) => {
    console.log('WebSocket client connected')

    const sessionId = Math.random().toString(36).substring(7)
    sessions.set(sessionId, {
      ws,
      isRecording: false,
      language: 'en-US',
      interim: true
    })

    // Send initial connection confirmation
    ws.send(JSON.stringify({
      type: 'event',
      eventType: 'CONNECTED',
      details: 'Connected to voice gateway'
    }))

    ws.on('message', async (data) => {
      try {
        // Check if it's JSON (control message) or binary (audio data)
        if (data instanceof Buffer && data.length > 100) {
          // This is binary audio data - in a real implementation,
          // you would send this to a speech recognition service
          // For now, we'll just acknowledge receipt

          // Simulate processing delay
          const session = sessions.get(sessionId)
          if (session && session.isRecording) {
            // Send interim result (simulated)
            // In production, this would come from your speech recognition service
            // For demo purposes, we're just showing how the protocol works
          }
        } else {
          // This is a JSON control message
          const message = JSON.parse(data.toString())
          const session = sessions.get(sessionId)

          switch (message.type) {
            case 'start':
              console.log('Recording started:', message)
              session.isRecording = true
              session.language = message.language || 'en-US'
              session.interim = message.interim !== false
              session.targetLanguage = message.targetLanguage

              // Send acknowledgment
              ws.send(JSON.stringify({
                type: 'event',
                eventType: 'RECORDING_STARTED',
                details: `Recording in ${session.language}`
              }))

              // Send a demo transcript after a moment
              setTimeout(() => {
                if (session.isRecording) {
                  ws.send(JSON.stringify({
                    type: 'transcript',
                    text: 'This is a demo transcript. Connect a real speech recognition service to see actual transcriptions.',
                    isFinal: true,
                    confidence: 0.95
                  }))
                }
              }, 2000)
              break

            case 'stop':
              console.log('Recording stopped')
              session.isRecording = false

              ws.send(JSON.stringify({
                type: 'event',
                eventType: 'RECORDING_STOPPED',
                details: 'Recording session ended'
              }))
              break

            default:
              console.log('Unknown message type:', message.type)
          }
        }
      } catch (error) {
        console.error('Error processing message:', error)
        ws.send(JSON.stringify({
          type: 'error',
          code: 'PROCESSING_ERROR',
          message: error.message
        }))
      }
    })

    ws.on('close', () => {
      console.log('WebSocket client disconnected')
      sessions.delete(sessionId)
    })

    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
      sessions.delete(sessionId)
    })
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> WebSocket server ready on ws://${hostname}:${port}/ws`)
  })
})
