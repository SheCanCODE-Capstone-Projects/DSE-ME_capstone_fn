import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface User {
  id: string;
  email: string;
  role: string;
  hasAccess: boolean;
}

export function useCurrentUser(token?: string) {
  return useQuery<User, Error>({
    queryKey: ['currentUser', token],
    queryFn: () => apiFetch<User>('auth/me', {
      method: 'GET',
      token
    }),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}
