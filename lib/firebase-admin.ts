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

  const serviceAccount: ServiceAccount = JSON.parse(serviceAccountKey);

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
