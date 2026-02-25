'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getDisplayName } from '@/lib/userUtils';

const DEFAULT_SUBTITLE = 'Manage your personal preferences, account security, and notification triggers.';

export default function SettingsHeader({
  subtitle = DEFAULT_SUBTITLE,
}: {
  subtitle?: string;
}) {
  const { user } = useAuth();
  const displayName = getDisplayName(user);

  return (
    <header className="mb-10 space-y-1">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Settings{displayName ? ` for ${displayName}` : ''}
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl">
        {subtitle}
      </p>
    </header>
  );
}
