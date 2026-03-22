import { initializeApp, getApps, getApp, cert, type App, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';

const AUTH_APP_NAME = 'zaviweb-auth';
const DB_APP_NAME = 'zaviweb-db';

function getServiceAccount() {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. ' +
      'Set it to the JSON string of your Firebase service account key.'
    );
  }

  try {
    return JSON.parse(serviceAccountKey) as ServiceAccount & { project_id?: string };
  } catch {
    const normalized = serviceAccountKey.replace(
      /"private_key":"([\s\S]*?)","client_email":/,
      (_, privateKey) => `"private_key":"${privateKey.replace(/\n/g, '\\n')}","client_email":`
    );

    return JSON.parse(normalized.replace(/\\n$/, '')) as ServiceAccount & { project_id?: string };
  }
}

function getOrInitApp(name: string, projectId: string, serviceAccount: ServiceAccount): App {
  const existing = getApps().find((app) => app.name === name);
  if (existing) {
    return existing;
  }

  return initializeApp(
    {
      credential: cert(serviceAccount),
      projectId,
    },
    name
  );
}

function initFirebaseAdmin() {
  const serviceAccount = getServiceAccount();
  const authProjectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    serviceAccount.projectId ||
    serviceAccount.project_id;
  const firestoreProjectId =
    serviceAccount.projectId ||
    serviceAccount.project_id ||
    authProjectId;

  if (!authProjectId || !firestoreProjectId) {
    throw new Error('Unable to determine Firebase Auth or Firestore project IDs.');
  }

  const authApp = getOrInitApp(AUTH_APP_NAME, authProjectId, serviceAccount);
  const dbApp = getOrInitApp(DB_APP_NAME, firestoreProjectId, serviceAccount);

  return {
    db: getFirestore(dbApp),
    auth: getAuth(authApp),
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
