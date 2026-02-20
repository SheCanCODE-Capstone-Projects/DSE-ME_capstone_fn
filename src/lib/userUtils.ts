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

/**
 * Gets a time-based greeting (Good morning, Good afternoon, Good evening).
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Gets personalized greeting with user's first name or display name.
 */
export function getPersonalizedGreeting(user: UserLike | null | undefined): string {
  const timeGreeting = getTimeBasedGreeting();
  if (!user) return timeGreeting;
  
  const firstName = (user.firstName || '').trim();
  if (firstName) {
    return `${timeGreeting}, ${firstName}!`;
  }
  
  const displayName = getDisplayName(user);
  if (displayName && displayName !== user.email) {
    return `${timeGreeting}, ${displayName}!`;
  }
  
  return `${timeGreeting}!`;
}
