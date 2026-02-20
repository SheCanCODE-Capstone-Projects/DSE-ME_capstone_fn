interface UserLike {
  firstName?: string;
  lastName?: string;
  email?: string;
}

/**
 * Derives display initials (2 chars) from user's firstName, lastName, or email.
 */
export function getUserInitials(user: UserLike | null | undefined): string {
  if (!user) return '??';
  const first = (user.firstName || '').trim();
  const last = (user.lastName || '').trim();
  if (first && last) return (first[0] + last[0]).toUpperCase();
  if (first) return first.slice(0, 2).toUpperCase();
  const email = (user.email || '').trim();
  if (email) {
    const local = email.split('@')[0] || '';
    return local.slice(0, 2).toUpperCase() || '??';
  }
  return '??';
}

/**
 * Gets display name: firstName, or "firstName lastName", or email.
 */
export function getDisplayName(user: UserLike | null | undefined): string {
  if (!user) return '';
  const parts = [(user.firstName || '').trim(), (user.lastName || '').trim()].filter(Boolean);
  if (parts.length) return parts.join(' ');
  return (user.email || '').trim() || '';
}
