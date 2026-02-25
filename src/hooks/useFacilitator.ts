import { useQuery } from '@tanstack/react-query';
import { facilitatorApi } from '@/lib/facilitatorApi';

export function useFacilitatorCohorts() {
  return useQuery({
    queryKey: ['facilitator', 'cohorts'],
    queryFn: () => facilitatorApi.getCohorts(),
  });
}

export function useFacilitatorProfile() {
  return useQuery({
    queryKey: ['facilitator', 'profile'],
    queryFn: () => facilitatorApi.getProfile(),
  });
}
