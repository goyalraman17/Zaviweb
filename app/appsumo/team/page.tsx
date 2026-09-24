'use client';

import { FormEvent, useEffect, useState } from 'react';
import Script from 'next/script';

declare global { interface Window { firebase?: any } }

type Member = { email: string; active: boolean };
type Team = { owner_uid: string; tier: number; seat_limit: number; members: Member[] };

export default function AppSumoTeamPage() {
  const [scriptsReady, setScriptsReady] = useState(false);
  const [auth, setAuth] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [ownerUid, setOwnerUid] = useState('');
  const [ownerResolved, setOwnerResolved] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setOwnerUid(new URLSearchParams(window.location.search).get('owner') || '');
    setOwnerResolved(true);
  }, []);
  useEffect(() => {
    if (!scriptsReady || !window.firebase?.auth) return;
    let unsubscribe: (() => void) | undefined;
    fetch('/api/config').then((response) => response.json()).then((config) => {
      if (!config.authEnabled) throw new Error('Zavi sign-in is unavailable.');
      if (!window.firebase.apps.length) window.firebase.initializeApp(config.firebase);
      const nextAuth = window.firebase.auth();
      setAuth(nextAuth);
      unsubscribe = nextAuth.onAuthStateChanged((nextUser: any) => setUser(nextUser));
    }).catch((error) => setMessage(error instanceof Error ? error.message : 'Could not load sign-in.'));
    return () => unsubscribe?.();
  }, [scriptsReady]);

  useEffect(() => {
    if (!user || !auth || !ownerResolved) return;
    let cancelled = false;
    (async () => {
      setBusy(true);
      try {
        if (ownerUid) {
          const response = await fetch('/api/appsumo/team', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'claim', owner_uid: ownerUid, firebase_id_token: await user.getIdToken() }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || 'Could not join the team.');
          if (!cancelled) setMessage('Your Zavi team plan is active. Sign in to the Zavi app with this account.');
        } else {
          const response = await fetch('/api/appsumo/team', { headers: { Authorization: `Bearer ${await user.getIdToken()}` } });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || 'Could not load your team.');
          if (!cancelled) setTeam(data);
        }
      } catch (error) {
        if (!cancelled) setMessage(error instanceof Error ? error.message : 'Could not load your team.');
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user, auth, ownerUid, ownerResolved, retryCount]);

  async function signIn(event?: FormEvent, google = false) {
    event?.preventDefault();
    if (!auth || busy) return;
    setBusy(true);
    setMessage('');
    try {
      if (google) await auth.signInWithPopup(new window.firebase.auth.GoogleAuthProvider());
      else if (newAccount) {
        const credential = await auth.createUserWithEmailAndPassword(email.trim(), password);
        await credential.user.sendEmailVerification();
        await auth.signOut();
        setMessage('Check your email and verify your address, then return here and sign in.');
      } else await auth.signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sign-in failed.');
    } finally { setBusy(false); }
  }

  async function changeMember(action: 'add' | 'remove', targetEmail: string) {
    if (!user || busy) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/appsumo/team', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, email: targetEmail, firebase_id_token: await user.getIdToken() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not update your team.');
      const refreshed = await fetch('/api/appsumo/team', { headers: { Authorization: `Bearer ${await user.getIdToken()}` } });
      if (!refreshed.ok) throw new Error('Team updated, but the list could not be refreshed.');
      setTeam(await refreshed.json());
      setMemberEmail('');
      setMessage(action === 'add' ? `Seat reserved for ${targetEmail}. Share the team link with them.` : `${targetEmail} was removed.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not update your team.');
    } finally { setBusy(false); }
  }

  const inviteUrl = team ? `${typeof window === 'undefined' ? '' : window.location.origin}/appsumo/team?owner=${encodeURIComponent(team.owner_uid)}` : '';

  return <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
    <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js" strategy="afterInteractive" />
    <Script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js" strategy="afterInteractive" onReady={() => setScriptsReady(true)} />
    <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-xl">
      <h1 className="text-3xl font-semibold">{ownerUid ? 'Join a Zavi team' : 'Manage your Zavi team'}</h1>
      <p className="mt-3 text-slate-300">{ownerUid ? 'Sign in with the email your team owner invited.' : 'Reserve seats by email, then share your team link. Members must verify their email before joining.'}</p>
      {!user && <form onSubmit={signIn} className="mt-8 space-y-4">
        <label className="block text-sm">Email<input className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-3" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label className="block text-sm">Password<input className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 p-3" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} /></label>
        <button className="w-full rounded-lg bg-violet-600 p-3 font-semibold disabled:opacity-60" disabled={busy || !auth}>{newAccount ? 'Create account' : 'Sign in'}</button>
        <button type="button" className="w-full rounded-lg border border-slate-600 p-3" disabled={busy || !auth} onClick={() => signIn(undefined, true)}>Continue with Google</button>
        <button type="button" className="w-full text-sm text-violet-300" onClick={() => setNewAccount(!newAccount)}>{newAccount ? 'Already have an account? Sign in' : 'New to Zavi? Create an account'}</button>
      </form>}
      {user && <p className="mt-6 text-sm text-slate-300">Signed in as {user.email} <button className="ml-2 text-violet-300" onClick={() => auth.signOut()}>Sign out</button></p>}
      {ownerUid && user && !user.emailVerified && <button className="mt-4 rounded-lg border border-slate-600 p-3" onClick={async () => { await user.reload(); await user.getIdToken(true); setRetryCount((count) => count + 1); }}>I verified my email — retry</button>}
      {team && <section className="mt-8 space-y-5">
        <p className="font-semibold">AppSumo Tier {team.tier} · {team.members.length + 1} of {team.seat_limit} seats reserved</p>
        <p className="text-sm text-slate-300">Your account uses the first seat. Cloud words are shared by everyone on this team.</p>
        <form onSubmit={(event) => { event.preventDefault(); changeMember('add', memberEmail); }} className="flex gap-2">
          <input className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-800 p-3" type="email" aria-label="Member email" placeholder="teammate@example.com" value={memberEmail} onChange={(event) => setMemberEmail(event.target.value)} required />
          <button className="rounded-lg bg-violet-600 px-4 font-semibold disabled:opacity-60" disabled={busy || team.members.length + 1 >= team.seat_limit}>Add</button>
        </form>
        <div className="rounded-lg bg-slate-800 p-4 text-sm">
          <p className="font-semibold">Team link</p>
          <p className="mt-2 break-all text-slate-300">{inviteUrl}</p>
          <button className="mt-2 text-violet-300" onClick={() => navigator.clipboard.writeText(inviteUrl)}>Copy link</button>
        </div>
        <ul className="space-y-2">{team.members.map((member) => <li key={member.email} className="flex items-center justify-between gap-4 rounded-lg border border-slate-700 p-3"><span className="min-w-0 break-all">{member.email} <span className="text-xs text-slate-400">{member.active ? 'Active' : 'Awaiting sign-in'}</span></span><button className="text-rose-300 disabled:opacity-50" disabled={busy} onClick={() => changeMember('remove', member.email)}>Remove</button></li>)}</ul>
      </section>}
      {message && <p className="mt-6 rounded-lg bg-slate-800 p-4" role="status">{message}</p>}
    </div>
  </main>;
}
