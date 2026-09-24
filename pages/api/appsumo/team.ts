import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { activeSubscription } from '@/lib/appsumo';
import { normalizeTeamMembers, priorSubscription, revokedSubscription } from '@/lib/appsumo-team';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const rawToken = req.method === 'GET'
    ? req.headers.authorization?.replace(/^Bearer /i, '')
    : req.body?.firebase_id_token;
  if (typeof rawToken !== 'string') return res.status(401).json({ error: 'Sign in first.' });

  let actor;
  try {
    actor = await getAdminAuth().verifyIdToken(rawToken);
  } catch {
    return res.status(401).json({ error: 'Please sign in again.' });
  }
  const db = getAdminDb();
  const actorRef = db.collection('users').doc(actor.uid);

  try {
    if (req.method === 'GET') {
      const [owner, team] = await Promise.all([
        actorRef.get(), db.collection('appsumo_teams').doc(actor.uid).get(),
      ]);
      const data = owner.data();
      if (data?.subscription_source !== 'appsumo' || data?.subscription_status !== 'active' || data?.appsumo_license_status !== 'active') {
        return res.status(403).json({ error: 'Only an active AppSumo license owner can manage a team.' });
      }
      return res.status(200).json({
        owner_uid: actor.uid,
        tier: data.appsumo_tier,
        seat_limit: data.team_seat_limit,
        members: normalizeTeamMembers(team.data()?.members).map(({ email, uid }) => ({ email, active: !!uid })),
      });
    }

    const action = req.body?.action;
    if (action === 'claim') {
      const ownerUid = req.body?.owner_uid;
      if (typeof ownerUid !== 'string' || !ownerUid || ownerUid === actor.uid) {
        return res.status(400).json({ error: 'Invalid team invitation.' });
      }
      if (!actor.email || !actor.email_verified) {
        return res.status(403).json({ error: 'Verify your email address before joining the team.' });
      }
      const email = actor.email.toLowerCase().trim();
      const ownerRef = db.collection('users').doc(ownerUid);
      const teamRef = db.collection('appsumo_teams').doc(ownerUid);
      await db.runTransaction(async (tx) => {
        const [owner, team, member] = await Promise.all([tx.get(ownerRef), tx.get(teamRef), tx.get(actorRef)]);
        const ownerData = owner.data();
        if (ownerData?.subscription_source !== 'appsumo' || ownerData.subscription_status !== 'active' || ownerData.appsumo_license_status !== 'active') {
          throw new Error('This team license is not active.');
        }
        const members = normalizeTeamMembers(team.data()?.members);
        const index = members.findIndex((entry) => entry.email === email);
        if (index < 0 || index >= Number(ownerData.team_seat_limit || 0) - 1) {
          throw new Error('Your email is not on this team invitation.');
        }
        if (members[index].uid && members[index].uid !== actor.uid) throw new Error('This seat is already claimed.');
        if (members.some((entry, memberIndex) => memberIndex !== index && entry.uid === actor.uid)) {
          throw new Error('This account already uses a seat on this team.');
        }
        const existing = member.data();
        if (existing?.subscription_source === 'appsumo') throw new Error('This account owns another AppSumo license.');
        if (existing?.subscription_source === 'appsumo_team' && existing.appsumo_team_owner_uid !== ownerUid) {
          throw new Error('This account already belongs to another AppSumo team.');
        }
        members[index].uid = actor.uid;
        const tier = Number(ownerData.appsumo_tier);
        tx.set(teamRef, { members, updated_at: new Date() }, { merge: true });
        tx.set(actorRef, {
          ...activeSubscription(ownerData.appsumo_license_key, tier),
          subscription_source: 'appsumo_team',
          appsumo_team_owner_uid: ownerUid,
          appsumo_previous_subscription: priorSubscription(existing),
          ...(member.exists ? {} : { created_at: new Date() }),
        }, { merge: true });
      });
      return res.status(200).json({ success: true });
    }

    if (action !== 'add' && action !== 'remove') return res.status(400).json({ error: 'Invalid team action.' });
    const email = typeof req.body?.email === 'string' ? req.body.email.toLowerCase().trim() : '';
    if (!emailPattern.test(email) || email.length > 254) return res.status(400).json({ error: 'Enter a valid email address.' });
    const teamRef = db.collection('appsumo_teams').doc(actor.uid);
    await db.runTransaction(async (tx) => {
      const [owner, team] = await Promise.all([tx.get(actorRef), tx.get(teamRef)]);
      const ownerData = owner.data();
      if (ownerData?.subscription_source !== 'appsumo' || ownerData.subscription_status !== 'active' || ownerData.appsumo_license_status !== 'active') {
        throw new Error('Only an active AppSumo license owner can manage a team.');
      }
      if (email === actor.email?.toLowerCase().trim()) throw new Error('Your own account already uses the first seat.');
      const members = normalizeTeamMembers(team.data()?.members);
      const index = members.findIndex((entry) => entry.email === email);
      if (action === 'add') {
        if (index >= 0) return;
        if (members.length >= Number(ownerData.team_seat_limit || 0) - 1) throw new Error('All team seats are in use.');
        members.push({ email, uid: null, added_at: new Date() });
      } else {
        if (index < 0) return;
        const removed = members.splice(index, 1)[0];
        if (removed.uid) {
          const memberRef = db.collection('users').doc(removed.uid);
          const member = await tx.get(memberRef);
          if (member.data()?.subscription_source === 'appsumo_team' && member.data()?.appsumo_team_owner_uid === actor.uid) {
            tx.set(memberRef, revokedSubscription(member.data()), { merge: true });
          }
        }
      }
      tx.set(teamRef, { owner_uid: actor.uid, members, updated_at: new Date() }, { merge: true });
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('AppSumo team action failed:', error);
    return res.status(409).json({ error: error instanceof Error ? error.message : 'Could not update team.' });
  }
}
