import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { Participant } from '@/types/participant';

export function useGetParticipants() {
  return useQuery({
    queryKey: ['participants'],
    queryFn: async () => {
      return apiFetch<{ content: Participant[] }>('/participants');
    },
  });
}

export function useGetParticipantById(id: string) {
  return useQuery({
    queryKey: ['participant', id],
    queryFn: async () => {
      return apiFetch<Participant>(`/participants/${id}`);
    },
    enabled: !!id,
  });
}

export function useGetParticipantsByFacilitator(facilitatorId: string) {
  return useQuery({
    queryKey: ['participants', 'facilitator', facilitatorId],
    queryFn: async () => {
      return apiFetch<{ content: Participant[] }>(`/facilitators/${facilitatorId}/participants`);
    },
    enabled: !!facilitatorId,
  });
}

export function useGetParticipantsByCohort(cohortId: string) {
  return useQuery({
    queryKey: ['participants', 'cohort', cohortId],
    queryFn: async () => {
      return apiFetch<{ content: Participant[] }>(`/cohorts/${cohortId}/participants`);
    },
    enabled: !!cohortId,
  });
}
