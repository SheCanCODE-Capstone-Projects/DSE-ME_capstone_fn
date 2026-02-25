import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface DonorStatistics {
  totalPartners: number;
  totalImpacted: number;
  avgEmploymentRate: number;
  budgetEfficiency: number;
}

export function useDonorStatistics() {
  return useQuery({
    queryKey: ['donor', 'statistics'],
    queryFn: () => apiFetch<DonorStatistics>('/donor/statistics'),
    refetchInterval: 30000,
  });
}
