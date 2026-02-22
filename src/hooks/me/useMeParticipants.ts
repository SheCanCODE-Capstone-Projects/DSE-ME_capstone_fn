import { useQuery } from '@tanstack/react-query';
import { meApi } from '@/lib/meApi';

export function useGetMeParticipants(page = 0, size = 20, filters?: { cohortId?: string; batchId?: string; status?: string }) {
  return useQuery({
    queryKey: ['me', 'participants', page, size, filters],
    queryFn: () => meApi.getParticipants(page, size, filters),
  });
}

export function useGetMeParticipantStats() {
  return useQuery({
    queryKey: ['me', 'participants', 'stats'],
    queryFn: () => meApi.getParticipantStats(),
  });
}
