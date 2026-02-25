import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { Facilitator } from '@/types/facilitator';

export function useGetFacilitators() {
  return useQuery({
    queryKey: ['facilitators'],
    queryFn: async () => {
      return apiFetch<{ content: Facilitator[] }>('/facilitators');
    },
  });
}

export function useGetFacilitatorById(id: string) {
  return useQuery({
    queryKey: ['facilitator', id],
    queryFn: async () => {
      return apiFetch<Facilitator>(`/facilitators/${id}`);
    },
    enabled: !!id,
  });
}

export function useGetFacilitatorStats(facilitatorId: string) {
  return useQuery({
    queryKey: ['facilitator', facilitatorId, 'stats'],
    queryFn: async () => {
      return apiFetch<{
        totalParticipants: number;
        activeParticipants: number;
        completedParticipants: number;
        averageScore: number;
      }>(`/facilitators/${facilitatorId}/stats`);
    },
    enabled: !!facilitatorId,
  });
}
