import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import type {
  CreateFacilitatorParticipantDTO,
  FacilitatorParticipantDetail,
  FacilitatorParticipantResponse,
  FacilitatorParticipantsListParams,
  FacilitatorParticipantsListResponse,
  FacilitatorParticipantStatistics,
  UpdateFacilitatorParticipantDTO,
} from '@/types/facilitatorParticipants';

function buildQueryString(params: Record<string, string | number | boolean | undefined | null>) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    searchParams.set(key, String(value));
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

export function useFacilitatorParticipantsList(params: FacilitatorParticipantsListParams) {
  return useQuery({
    queryKey: ['facilitator', 'participants', 'list', params],
    queryFn: async () => {
      const qs = buildQueryString({
        page: params.page ?? 0,
        size: params.size ?? 10,
        search: params.search,
        sortBy: params.sortBy ?? 'firstName',
        sortDirection: params.sortDirection ?? 'ASC',
        enrollmentStatusFilter: params.enrollmentStatusFilter,
        genderFilter: params.genderFilter,
      });
      return apiFetch<FacilitatorParticipantsListResponse>(`/facilitator/participants/list${qs}`);
    },
  });
}

export function useFacilitatorParticipantStatistics() {
  return useQuery({
    queryKey: ['facilitator', 'participants', 'statistics'],
    queryFn: async () => {
      return apiFetch<FacilitatorParticipantStatistics>('/facilitator/participants/statistics');
    },
  });
}

export function useFacilitatorParticipantById(participantId: string | null) {
  return useQuery({
    queryKey: ['facilitator', 'participants', 'byId', participantId],
    queryFn: async () => {
      if (!participantId) throw new Error('participantId is required');
      return apiFetch<FacilitatorParticipantResponse>(`/facilitator/participants/${participantId}`);
    },
    enabled: !!participantId,
  });
}

export function useFacilitatorParticipantDetail(participantId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: ['facilitator', 'participants', 'detail', participantId],
    queryFn: async () => {
      if (!participantId) throw new Error('participantId is required');
      return apiFetch<FacilitatorParticipantDetail>(`/facilitator/participants/${participantId}/detail`);
    },
    enabled: enabled && !!participantId,
  });
}

export function useCreateFacilitatorParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateFacilitatorParticipantDTO) => {
      return apiFetch<FacilitatorParticipantResponse>('/facilitator/participants', {
        method: 'POST',
        data: dto,
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['facilitator', 'participants', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['facilitator', 'participants', 'statistics'] }),
      ]);
    },
  });
}

export function useUpdateFacilitatorParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      participantId,
      dto,
    }: {
      participantId: string;
      dto: UpdateFacilitatorParticipantDTO;
    }) => {
      return apiFetch<FacilitatorParticipantResponse>(`/facilitator/participants/${participantId}`, {
        method: 'PUT',
        data: dto,
      });
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['facilitator', 'participants', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['facilitator', 'participants', 'statistics'] }),
        queryClient.invalidateQueries({ queryKey: ['facilitator', 'participants', 'byId', variables.participantId] }),
        queryClient.invalidateQueries({ queryKey: ['facilitator', 'participants', 'detail', variables.participantId] }),
      ]);
    },
  });
}
