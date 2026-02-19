"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function useRouteProtection(requiredRole?: string | string[]) {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    if (!user?.role || user.role === 'UNASSIGNED') {
      router.push('/request-access/start');
      return;
    }

    if (requiredRole) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!roles.includes(user.role)) {
        router.push('/unauthorized');
      }
    }
  }, [user, token, requiredRole, router]);

  return { user, token, isAuthorized: !!token && !!user };
}
