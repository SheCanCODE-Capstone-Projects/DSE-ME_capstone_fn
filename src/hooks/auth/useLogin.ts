import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/authApi';
import { LoginFormData, AuthResponse } from '@/types/auth';

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginFormData>({
    mutationFn: authApi.login,
  });
}