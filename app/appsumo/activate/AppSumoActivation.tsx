'use client';

import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
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

function Benefit({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-600">
        ✓
      </div>
      <p className="font-bold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-5 text-slate-500">{detail}</p>
    </div>
  );
}

export default function AppSumoActivation() {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code') || '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createAccount, setCreateAccount] = useState(true);
  const [busy, setBusy] = useState(false);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [activatedEmail, setActivatedEmail] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ActivationResult | null>(null);

  useEffect(() => {
    if (!firebaseReady) return;
    let unsubscribe: (() => void) | undefined;
    getFirebaseAuthClient()
      .then(({ auth }) => {
        unsubscribe = auth.onAuthStateChanged((user: any) => {
          setCurrentUserEmail(user?.email || '');
        });
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Sign-in is unavailable')
      );
    return () => unsubscribe?.();
  }, [firebaseReady]);

  async function claimLicense() {
    const session = await getVerifiedPaymentSession();
    const response = await fetch('/api/appsumo/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, firebase_id_token: session.idToken }),
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || 'Activation failed');
    setActivatedEmail(session.email);
    setResult(body as ActivationResult);
  }

  async function activateCurrentAccount() {
    if (!code || busy) return;
    setBusy(true);
    setError('');
    try {
      await claimLicense();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Activation failed');
    } finally {
      setBusy(false);
    }
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

  async function switchAccount() {
    const { auth } = await getFirebaseAuthClient();
    await auth.signOut();
    setCurrentUserEmail('');
    setError('');
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8fc] px-4 py-10 text-slate-950 md:py-16">
      <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js" />
      <Script
        src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"
        onLoad={() => setFirebaseReady(true)}
      />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(37,99,235,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-9 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/zavi-logo.png"
              alt="Zavi"
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg font-black tracking-tight">Zavi</span>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
            <span className="hidden sm:inline">AppSumo customer </span>
            activation
          </span>
        </header>

        {!code ? (
          <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 md:p-12">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
              ↗
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              Start from your AppSumo account
            </h1>
            <p className="mx-auto mt-3 max-w-md text-slate-600">
              Open your Zavi purchase in AppSumo Products and select Activate.
              AppSumo will securely return you here with your license.
            </p>
            <a
              href="https://appsumo.com/account/products/"
              className="mt-7 inline-flex rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-slate-800"
            >
              Open AppSumo Products
            </a>
          </section>
        ) : result ? (
          <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-2xl shadow-blue-200/40">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 px-7 py-10 text-center text-white md:px-12">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl font-black text-blue-600 shadow-lg">
                ✓
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">
                License connected
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">
                AppSumo Tier {result.tier} is ready
              </h1>
              <p className="mt-3 text-blue-50">
                Sign in to the Mac app as <strong>{activatedEmail}</strong> to
                receive these benefits.
              </p>
            </div>

            <div className="p-7 md:p-10">
              <div className="grid gap-4 sm:grid-cols-3">
                <Benefit
                  title={`${result.monthlyWordLimit.toLocaleString()} words`}
                  detail="Your allowance refreshes every calendar month."
                />
                <Benefit
                  title={
                    result.deviceLimit === 0
                      ? 'Unlimited devices'
                      : `${result.deviceLimit} devices`
                  }
                  detail="Use the same Zavi account on every included Mac."
                />
                <Benefit
                  title={
                    result.teamSeatLimit > 0
                      ? `${result.teamSeatLimit} team seats`
                      : 'Individual license'
                  }
                  detail={
                    result.teamSeatLimit > 0
                      ? 'Your team allocation is attached to this license.'
                      : 'Licensed for your personal Zavi account.'
                  }
                />
              </div>

              <div className="mt-7 rounded-2xl bg-slate-50 p-5">
                <p className="font-bold text-slate-900">Finish on your Mac</p>
                <ol className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                  <li>
                    <strong className="text-slate-900">Download</strong>
                    <br />
                    Install the latest Zavi app.
                  </li>
                  <li>
                    <strong className="text-slate-900">Sign in</strong>
                    <br />
                    Use {activatedEmail}.
                  </li>
                  <li>
                    <strong className="text-slate-900">Start speaking</strong>
                    <br />
                    Your tier loads automatically.
                  </li>
                </ol>
              </div>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/download/macos"
                  className="inline-flex w-full justify-center rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  Download Zavi for Mac
                </a>
                <a
                  href="https://appsumo.com/account/products/"
                  className="inline-flex w-full justify-center rounded-xl border border-slate-300 px-7 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                >
                  Manage on AppSumo
                </a>
              </div>
            </div>
          </section>
        ) : (
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="bg-gradient-to-br from-slate-950 to-slate-800 p-8 text-white md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
                Your purchase is waiting
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Connect one Zavi account to unlock your benefits.
              </h1>
              <p className="mt-4 leading-7 text-slate-300">
                Your license follows this account into the Mac app. Choose the
                account you intend to use on your devices.
              </p>
              <div className="mt-8 space-y-5">
                <div>
                  <p className="font-bold">Monthly word allowance</p>
                  <p className="text-sm text-slate-400">
                    Automatically applied from your purchased tier.
                  </p>
                </div>
                <div>
                  <p className="font-bold">Device access</p>
                  <p className="text-sm text-slate-400">
                    Every included Mac verifies against the same license.
                  </p>
                </div>
                <div>
                  <p className="font-bold">Cloud, local and BYOK modes</p>
                  <p className="text-sm text-slate-400">
                    Choose how Zavi processes your speech after activation.
                  </p>
                </div>
              </div>
            </section>

            <section className="p-8 md:p-10">
              <h2 className="text-2xl font-black tracking-tight">
                Activate your license
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                This takes less than a minute. Your AppSumo password is never
                shared with Zavi.
              </p>

              {currentUserEmail ? (
                <div className="mt-7">
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Currently signed in
                    </p>
                    <p className="mt-1 font-bold text-slate-950">
                      {currentUserEmail}
                    </p>
                  </div>
                  {error ? (
                    <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                      {error}
                    </p>
                  ) : null}
                  <button
                    onClick={activateCurrentAccount}
                    disabled={busy}
                    className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3.5 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {busy ? 'Activating…' : `Activate for ${currentUserEmail}`}
                  </button>
                  <button
                    onClick={switchAccount}
                    className="mt-3 w-full text-sm font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Use a different account
                  </button>
                </div>
              ) : (
                <div className="mt-7">
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
                      autoComplete="email"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />
                    <input
                      type="password"
                      minLength={6}
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Password"
                      autoComplete={
                        createAccount ? 'new-password' : 'current-password'
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />
                    {error ? (
                      <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                        {error}
                      </p>
                    ) : null}
                    <button
                      disabled={busy || !firebaseReady}
                      className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
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
                </div>
              )}

              <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                One AppSumo license can be linked to one Zavi account. You can
                still use that account on every device included in your tier.
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
