'use client';

import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import {
  getFirebaseAuthClient,
  getVerifiedPaymentSession,
} from '@/lib/firebase-client-auth';

declare global {
  interface Window {
    firebase?: any;
  }
}

type ActivationResult = {
  tier: number;
  monthlyWordLimit: number;
  deviceLimit: number;
  teamSeatLimit: number;
};

export default function AppSumoActivation() {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code') || '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createAccount, setCreateAccount] = useState(true);
  const [busy, setBusy] = useState(false);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ActivationResult | null>(null);

  async function claimLicense() {
    const session = await getVerifiedPaymentSession();
    const response = await fetch('/api/appsumo/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, firebase_id_token: session.idToken }),
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || 'Activation failed');
    setResult(body as ActivationResult);
  }

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    if (!code || busy) return;
    setBusy(true);
    setError('');
    try {
      const { auth } = await getFirebaseAuthClient();
      if (createAccount)
        await auth.createUserWithEmailAndPassword(email.trim(), password);
      else await auth.signInWithEmailAndPassword(email.trim(), password);
      await claimLicense();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Activation failed');
    } finally {
      setBusy(false);
    }
  }

  async function submitGoogle() {
    if (!code || busy) return;
    setBusy(true);
    setError('');
    try {
      const { firebase, auth } = await getFirebaseAuthClient();
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      await claimLicense();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Activation failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-950">
      <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js" />
      <Script
        src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"
        onLoad={() => setFirebaseReady(true)}
      />
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 md:p-12">
        <div className="mb-8 text-center">
          <img
            src="/zavi-logo.png"
            alt="Zavi"
            className="mx-auto mb-5 h-16 w-16 object-contain"
          />
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            AppSumo activation
          </p>
          <h1 className="text-3xl font-black tracking-tight">
            Connect your Zavi account
          </h1>
          <p className="mt-3 text-slate-600">
            Use this same account when signing in to the Zavi Mac app.
          </p>
        </div>

        {!code ? (
          <div className="rounded-2xl bg-amber-50 p-5 text-sm text-amber-900">
            Open this page using the activation button in your AppSumo Products
            account.
          </div>
        ) : result ? (
          <div className="text-center">
            <div className="mb-5 text-5xl">✓</div>
            <h2 className="text-2xl font-bold">
              License Tier {result.tier} is active
            </h2>
            <p className="mt-3 text-slate-600">
              {result.monthlyWordLimit.toLocaleString()} words per month ·{' '}
              {result.deviceLimit === 0 ? 'Unlimited' : result.deviceLimit}{' '}
              devices
            </p>
            <a
              href="/download/macos"
              className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Download Zavi for Mac
            </a>
          </div>
        ) : (
          <>
            <button
              onClick={submitGoogle}
              disabled={busy || !firebaseReady}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 font-bold hover:bg-slate-50 disabled:opacity-50"
            >
              Continue with Google
            </button>
            <div className="my-5 flex items-center gap-3 text-xs font-semibold text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              OR
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-semibold">
              <button
                onClick={() => setCreateAccount(true)}
                className={`rounded-lg px-3 py-2 ${createAccount ? 'bg-white shadow-sm' : ''}`}
              >
                Create account
              </button>
              <button
                onClick={() => setCreateAccount(false)}
                className={`rounded-lg px-3 py-2 ${!createAccount ? 'bg-white shadow-sm' : ''}`}
              >
                Sign in
              </button>
            </div>
            <form onSubmit={submitEmail} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
              <input
                type="password"
                minLength={6}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
              {error ? (
                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}
              <button
                disabled={busy || !firebaseReady}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {!firebaseReady
                  ? 'Loading sign in…'
                  : busy
                    ? 'Activating…'
                    : createAccount
                      ? 'Create account and activate'
                      : 'Sign in and activate'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
