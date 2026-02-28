import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

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

const { db, auth } = initFirebaseAdmin();

export const adminDb = db;
export const adminAuth = auth;
