import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { LoginFormData, AuthResponse } from '@/types/auth';

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginFormData>({
    mutationFn: (data: LoginFormData) => apiFetch<AuthResponse>('auth/login', {
      method: 'POST',
      data,
    }),
  });
}