import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/authApi';
import { AuthResponse } from '@/types/auth';

export function useCurrentUser(token?: string) {
  return useQuery<AuthResponse['user'], Error>({
    queryKey: ['currentUser', token],
    queryFn: authApi.getCurrentUser,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}