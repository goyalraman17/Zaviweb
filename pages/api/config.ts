import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const firebaseAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

  const authEnabled = !!(firebaseApiKey && firebaseProjectId);

  res.status(200).json({
    authEnabled,
    billingEnabled: false,
    demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
    firebase: authEnabled
      ? {
          apiKey: firebaseApiKey,
          authDomain: firebaseAuthDomain,
          projectId: firebaseProjectId,
        }
      : {},
  });
}
