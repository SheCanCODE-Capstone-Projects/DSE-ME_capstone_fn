import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/authApi';
import { RoleRequestData, RoleRequestResponse } from '@/types/auth';

export function useRequestRole() {
  return useMutation<RoleRequestResponse, Error, RoleRequestData>({
    mutationFn: authApi.requestRole,
  });
}

export function useGetAllAccessRequests(page = 0, size = 20, sort = 'requestedAt,desc') {
  return useQuery({
    queryKey: ['accessRequests', page, size, sort],
    queryFn: () => authApi.getAllAccessRequests(page, size, sort),
  });
}

export function useGetPendingAccessRequests() {
  return useQuery<{ content: RoleRequestResponse[]; totalPages: number; totalElements: number; currentPage: number }>({
    queryKey: ['pendingAccessRequests'],
    queryFn: authApi.getPendingAccessRequests,
  });
}

export function useApproveAccessRequest() {
  return useMutation<RoleRequestResponse, Error, string>({
    mutationFn: authApi.approveAccessRequest,
  });
}

export function useRejectAccessRequest() {
  return useMutation<RoleRequestResponse, Error, string>({
    mutationFn: authApi.rejectAccessRequest,
  });
}