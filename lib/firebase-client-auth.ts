'use client';

type FirebaseConfig = {
  apiKey: string;
  authDomain?: string;
  projectId: string;
};

type ConfigResponse = {
  authEnabled: boolean;
  firebase?: FirebaseConfig;
};

declare global {
  interface Window {
    firebase?: any;
  }
}

let initPromise: Promise<any> | null = null;

async function getFirebaseCompat() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase auth is only available in the browser.');
  }

  if (!window.firebase) {
    throw new Error('Sign-in is still loading. Please wait a moment and try again.');
  }

  if (!initPromise) {
    initPromise = (async () => {
      const response = await fetch('/api/config');
      const config = (await response.json()) as ConfigResponse;

      if (!config.authEnabled || !config.firebase?.apiKey || !config.firebase.projectId) {
        throw new Error('Website sign-in is not configured right now.');
      }

      if (!window.firebase.apps?.length) {
        window.firebase.initializeApp(config.firebase);
      }

      return window.firebase;
    })();
  }

  return initPromise;
}

async function waitForCurrentUser(auth: any) {
  if (auth.currentUser) {
    return auth.currentUser;
  }

  return new Promise<any | null>((resolve) => {
    let settled = false;
    let unsubscribe: (() => void) | undefined;

    const finish = (user: any | null) => {
      if (settled) {
        return;
      }

      settled = true;
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
      resolve(user);
    };

    unsubscribe = auth.onAuthStateChanged((user: any) => finish(user || null));
    setTimeout(() => finish(auth.currentUser || null), 1500);
  });
}

export async function getVerifiedPaymentSession(expectedEmail?: string) {
  const firebase = await getFirebaseCompat();
  const auth = firebase.auth();
  const user = await waitForCurrentUser(auth);

  if (!user) {
    throw new Error('Please sign in to your Zavi account in this browser before checkout.');
  }

  const signedInEmail = user.email?.toLowerCase().trim();
  const normalizedExpected = expectedEmail?.toLowerCase().trim();

  if (!signedInEmail) {
    throw new Error('Your signed-in Zavi account is missing an email address.');
  }

  if (normalizedExpected && signedInEmail !== normalizedExpected) {
    throw new Error(`You are signed in as ${signedInEmail}. Please use that email for checkout.`);
  }

  return {
    uid: user.uid as string,
    email: signedInEmail,
    idToken: await user.getIdToken(),
  };
}

export async function getOptionalPaymentSession(expectedEmail?: string) {
  try {
    return await getVerifiedPaymentSession(expectedEmail);
  } catch {
    return null;
  }
}
