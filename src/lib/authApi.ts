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
    const encodedToken = encodeURIComponent(token);
    try {
      const response = await apiFetch<string | { message?: string }>(`/auth/verify?token=${encodedToken}`, {
        method: 'GET',
      });
    
      if (typeof response === 'string') {
        return response;
      }
      return response?.message || 'Email verified successfully!';
    } catch (error) {
      console.error('Verification API error:', error);
      throw error;
    }
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
    return apiFetch<AuthResponse['user']>('/users/profile', {
      method: 'GET',
    });
  },

  getAllAccessRequests: async (page = 0, size = 20, sort = 'requestedAt,desc'): Promise<{ content: RoleRequestResponse[]; totalPages: number; totalElements: number; currentPage: number }> => {
    return apiFetch<{ content: RoleRequestResponse[]; totalPages: number; totalElements: number; currentPage: number }>(`/access-requests?page=${page}&size=${size}&sort=${sort}`, {
      method: 'GET',
    });
  },

  getPendingAccessRequests: async (page = 0, size = 20): Promise<{ content: RoleRequestResponse[]; totalPages: number; totalElements: number; currentPage: number }> => {
    return apiFetch<{ content: RoleRequestResponse[]; totalPages: number; totalElements: number; currentPage: number }>(`/access-requests/pending?page=${page}&size=${size}`, {
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
};