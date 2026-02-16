import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/authApi';
import { SignupFormData } from '@/types/auth';

export function useSignup() {
  return useMutation<string, Error, SignupFormData>({
    mutationFn: authApi.register,
  });
}
