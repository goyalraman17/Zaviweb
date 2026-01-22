import { NextResponse } from 'next/server'

export async function GET() {
  // Return demo configuration
  // In production, you would read this from environment variables
  return NextResponse.json({
    authEnabled: false,
    billingEnabled: false,
    firebase: {
      // Firebase config would go here if auth was enabled
      // For demo purposes, auth is disabled
    }
  })
}
