export type TeamMember = { email: string; uid: string | null; added_at: Date };

export function priorSubscription(user: Record<string, any> | undefined) {
  if (user?.subscription_source === 'appsumo' || user?.subscription_source === 'appsumo_team') {
    return user.appsumo_previous_subscription || null;
  }
  if (user?.subscription_status !== 'active') return null;
  return {
    subscription_tier: user.subscription_tier || 'pro',
    subscription_billing_cycle: user.subscription_billing_cycle || null,
    subscription_source: user.subscription_source || null,
    subscription_status: user.subscription_status,
    subscription_expires_at: user.subscription_expires_at || null,
    payment_platform: user.payment_platform || null,
  };
}

export function revokedSubscription(user: Record<string, any> | undefined) {
  const previous = user?.appsumo_previous_subscription;
  const expiry = previous?.subscription_expires_at?.toDate?.() || previous?.subscription_expires_at;
  const restore = previous?.subscription_status === 'active' && expiry instanceof Date && expiry > new Date();
  return {
    ...(restore ? previous : {
      subscription_tier: 'free',
      subscription_billing_cycle: null,
      subscription_source: null,
      subscription_expires_at: null,
      subscription_status: 'inactive',
      payment_platform: null,
    }),
    appsumo_team_owner_uid: null,
    appsumo_license_status: 'deactivated',
    monthly_word_limit: 0,
    team_seat_limit: 0,
    device_limit: 0,
    updated_at: new Date(),
  };
}

export function normalizeTeamMembers(value: unknown): TeamMember[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => item && typeof item.email === 'string')
    .map((item) => ({ email: item.email.toLowerCase().trim(), uid: typeof item.uid === 'string' ? item.uid : null, added_at: item.added_at || new Date() }));
}
