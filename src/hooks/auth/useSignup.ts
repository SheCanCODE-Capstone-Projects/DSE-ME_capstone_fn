import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { SignupFormData, AuthResponse } from '@/types/auth';

export function useSignup() {
  return useMutation<AuthResponse, Error, SignupFormData>({
    mutationFn: (data: SignupFormData) => apiFetch<AuthResponse>('auth/register', {
      method: 'POST',
      data: {
        email: data.email,
        password: data.password,
      },
    }),
  });
}
