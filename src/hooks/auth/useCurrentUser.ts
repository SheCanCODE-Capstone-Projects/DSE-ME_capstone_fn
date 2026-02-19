import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/authApi';
import { UserProfile } from '@/types/auth';

export function useCurrentUser(token?: string) {
  return useQuery<UserProfile, Error>({
    queryKey: ['currentUser', token],
    queryFn: authApi.getCurrentUser,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}