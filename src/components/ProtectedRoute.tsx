'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login'); 
    } else if (!isLoading && user && !user.hasAccess) {
      router.push('/request-access/start');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div>Loading...</div>;
  return <>{children}</>;
}
