import { useMutation } from '@tanstack/react-query';
import { mockLogin } from '@/lib/mockApi';
import { LoginFormData, AuthResponse } from '@/types/auth';

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      const result = await mockLogin(data.email, data.password);
      return result as AuthResponse;
    },
  });
}