import { useMutation } from '@tanstack/react-query';
import { mockRegister } from '@/lib/mockApi';
import { SignupFormData, AuthResponse } from '@/types/auth';

export function useSignup() {
  return useMutation<AuthResponse, Error, SignupFormData>({
    mutationFn: async (data: SignupFormData) => {
      const result = await mockRegister(data.email, data.password);
      return result as AuthResponse;
    },
  });
}
