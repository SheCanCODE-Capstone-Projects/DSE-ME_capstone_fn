'use client';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';

export function SyncIndicator() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isActive = isFetching > 0 || isMutating > 0;

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-2 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #105ca3 0%, #9b9ea1 100%)' }}>
      <RefreshCw className={`h-4 w-4 ${isActive ? 'animate-spin' : ''}`} />
      <span className="text-sm font-medium">Loading...</span>
    </div>
  );
}
