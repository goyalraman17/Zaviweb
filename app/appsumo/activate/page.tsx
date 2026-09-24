'use client';

import { FormEvent, useEffect, useState } from 'react';
import Script from 'next/script';

declare global { interface Window { firebase?: any } }

export default function AppSumoActivate() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createAccount, setCreateAccount] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { setCode(new URLSearchParams(window.location.search).get('code') || ''); }, []);

  async function activate(event?: FormEvent, withGoogle = false) {
    event?.preventDefault();
    if (!code || busy) return;
    setBusy(true);
    setMessage('Connecting your AppSumo purchase...');
    try {
      const configResponse = await fetch('/api/config');
      if (!configResponse.ok) throw new Error('Zavi sign-in is unavailable. Please try again later.');
      const config = await configResponse.json();
      if (!config.authEnabled || !window.firebase) throw new Error('Zavi sign-in is unavailable. Please try again later.');
      if (!window.firebase.apps.length) window.firebase.initializeApp(config.firebase);
      const auth = window.firebase.auth();
      const credential = withGoogle
        ? await auth.signInWithPopup(new window.firebase.auth.GoogleAuthProvider())
        : createAccount
          ? await auth.createUserWithEmailAndPassword(email.trim(), password)
          : await auth.signInWithEmailAndPassword(email.trim(), password);
      const response = await fetch('/api/appsumo/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, firebase_id_token: await credential.user.getIdToken() }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Activation failed.');
      window.history.replaceState({}, '', '/appsumo/activate');
      setCode('');
      setMessage('Your Zavi Pro lifetime plan is active. Open the Zavi app and sign in with this account.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Activation failed.');
    } finally {
      setBusy(false);
    }
  }

  return <main className="min-h-screen bg-slate-950 px-4 py-20 text-white">
    <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js" strategy="afterInteractive" />
    <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js" strategy="afterInteractive" />
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-xl">
      <h1 className="text-3xl font-semibold">Activate your Zavi plan</h1>
      <p className="mt-3 text-slate-300">Sign in to the Zavi account you use in the app. Your AppSumo purchase will be added to that account.</p>
      {code ? <form onSubmit={activate} className="mt-8 space-y-4">
        <label className="block text-sm">Email<input className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-3" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
        <label className="block text-sm">Password<input className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-3" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} /></label>
        <button className="w-full rounded-lg bg-violet-600 p-3 font-semibold disabled:opacity-60" type="submit" disabled={busy}>{busy ? 'Activating...' : createAccount ? 'Create account and activate' : 'Sign in and activate'}</button>
        <button className="w-full rounded-lg border border-slate-600 p-3 font-semibold disabled:opacity-60" type="button" disabled={busy} onClick={() => activate(undefined, true)}>Continue with Google</button>
        <button className="w-full text-sm text-violet-300" type="button" onClick={() => setCreateAccount(!createAccount)}>{createAccount ? 'Already have a Zavi account? Sign in' : 'New to Zavi? Create an account'}</button>
      </form> : <p className="mt-6 text-slate-300">Start activation from your AppSumo purchase page.</p>}
      {message && <p className="mt-6 rounded-lg bg-slate-800 p-4" role="status">{message}</p>}
    </div>
  </main>;
}
