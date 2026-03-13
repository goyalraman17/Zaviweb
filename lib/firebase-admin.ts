import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';

function initFirebaseAdmin() {
  if (getApps().length > 0) {
    return {
      db: getFirestore(),
      auth: getAuth(),
    };
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. ' +
      'Set it to the JSON string of your Firebase service account key.'
    );
  }

  let serviceAccount: ServiceAccount;

  try {
    serviceAccount = JSON.parse(serviceAccountKey);
  } catch {
    // Some env loaders materialize the embedded private key with literal newlines,
    // which breaks JSON.parse for the full service account payload.
    const normalized = serviceAccountKey.replace(
      /"private_key":"([\s\S]*?)","client_email":/,
      (_, privateKey) => `"private_key":"${privateKey.replace(/\n/g, '\\n')}","client_email":`
    );
    serviceAccount = JSON.parse(normalized);
  }

  initializeApp({
    credential: cert(serviceAccount),
  });

  return {
    db: getFirestore(),
    auth: getAuth(),
  };
}

let cachedAdmin: { db: Firestore; auth: Auth } | null = null;

function getFirebaseAdmin() {
  if (!cachedAdmin) {
    cachedAdmin = initFirebaseAdmin();
  }

  return cachedAdmin;
}

export function getAdminDb() {
  return getFirebaseAdmin().db;
}

export function getAdminAuth() {
  return getFirebaseAdmin().auth;
}
