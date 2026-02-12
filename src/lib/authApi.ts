import { apiFetch } from './api';
import { SignupFormData, LoginFormData, AuthResponse, RoleRequestData, RoleRequestResponse } from '../types/auth';

export const authApi = {
  register: async (data: SignupFormData): Promise<string> => {
    return apiFetch<string>('/auth/register', {
      method: 'POST',
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
      },
    });
  },

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      data,
    });
  },

  verifyEmail: async (token: string): Promise<string> => {
    return apiFetch<string>(`/auth/verify?token=${token}`, {
      method: 'GET',
    });
  },

  resendVerification: async (email: string): Promise<string> => {
    return apiFetch<string>(`/auth/resend-verification?email=${encodeURIComponent(email)}`, {
      method: 'POST',
    });
  },

  forgotPassword: async (email: string): Promise<string> => {
    return apiFetch<string>('/auth/forgot-password', {
      method: 'POST',
      data: { email },
    });
  },

  resetPassword: async (token: string, newPassword: string): Promise<string> => {
    return apiFetch<string>('/auth/reset-password', {
      method: 'POST',
      data: { token, newPassword },
    });
  },

  requestRole: async (data: RoleRequestData): Promise<RoleRequestResponse> => {
    return apiFetch<RoleRequestResponse>('/users/request/role', {
      method: 'POST',
      data,
    });
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    return apiFetch<AuthResponse['user']>('/auth/me', {
      method: 'GET',
    });
  },

  getAllAccessRequests: async (page = 0, size = 20, sort = 'requestedAt,desc'): Promise<{ content: RoleRequestResponse[]; totalPages: number; totalElements: number; currentPage: number }> => {
    return apiFetch<{ content: RoleRequestResponse[]; totalPages: number; totalElements: number; currentPage: number }>(`/access-requests?page=${page}&size=${size}&sort=${sort}`, {
      method: 'GET',
    });
  },

  getPendingAccessRequests: async (): Promise<RoleRequestResponse[]> => {
    return apiFetch<RoleRequestResponse[]>('/access-requests/pending', {
      method: 'GET',
    });
  },

  approveAccessRequest: async (requestId: string): Promise<RoleRequestResponse> => {
    return apiFetch<RoleRequestResponse>(`/access-requests/${requestId}/approve`, {
      method: 'POST',
    });
  },

  rejectAccessRequest: async (requestId: string): Promise<RoleRequestResponse> => {
    return apiFetch<RoleRequestResponse>(`/access-requests/${requestId}/reject`, {
      method: 'POST',
    });
  },

  // Admin endpoint to promote user to ME_OFFICER (for testing)
  promoteToME: async (email: string): Promise<string> => {
    return apiFetch<string>('/admin/promote-me', {
      method: 'POST',
      data: { email },
    });
  },
};