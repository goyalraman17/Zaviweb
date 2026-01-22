import { NextResponse } from 'next/server'

export async function GET() {
  // Check if Firebase is configured
  const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const firebaseAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

  const authEnabled = !!(firebaseApiKey && firebaseProjectId)

  return NextResponse.json({
    authEnabled,
    billingEnabled: false, // Set to true if you want to show usage tracking
    demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
    firebase: authEnabled ? {
      apiKey: firebaseApiKey,
      authDomain: firebaseAuthDomain,
      projectId: firebaseProjectId,
    } : {}
  })
}
