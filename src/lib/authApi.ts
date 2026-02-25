import { apiFetch } from './api';
import { SignupFormData, LoginFormData, AuthResponse, RoleRequestData, RoleRequestResponse, UserProfile, Partner, Center } from '../types/auth';

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

  getCurrentUser: async (): Promise<UserProfile> => {
    return apiFetch<UserProfile>('/users/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (data: { firstName: string; lastName?: string }): Promise<UserProfile> => {
    return apiFetch<UserProfile>('/users/profile', {
      method: 'PATCH',
      data,
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
    if (!requestId || requestId.trim() === '') {
      throw new Error('Invalid request ID');
    }
    return apiFetch<RoleRequestResponse>(`/access-requests/${requestId}/approve`, {
      method: 'POST',
    });
  },

  rejectAccessRequest: async (requestId: string): Promise<RoleRequestResponse> => {
    if (!requestId || requestId.trim() === '') {
      throw new Error('Invalid request ID');
    }
    return apiFetch<RoleRequestResponse>(`/access-requests/${requestId}/reject`, {
      method: 'POST',
    });
  },

  getPartners: async (): Promise<Partner[]> => {
    return apiFetch<Partner[]>('/organizations/partners', {
      method: 'GET',
    });
  },

  getCenters: async (): Promise<Center[]> => {
    return apiFetch<Center[]>('/organizations/centers', {
      method: 'GET',
    });
  },

  getCentersByPartner: async (partnerId: string): Promise<Center[]> => {
    return apiFetch<Center[]>(`/organizations/partners/${partnerId}/centers`, {
      method: 'GET',
    });
  },

  createPartner: async (params: {
    name: string;
    email: string;
    phone: string;
    province?: string;
    country?: string;
    contactPerson?: string;
  }): Promise<Partner> => {
    return apiFetch<Partner>('/organizations/partners', {
      method: 'POST',
      data: {
        name: params.name,
        email: params.email,
        phone: params.phone,
        country: params.country ?? 'Rwanda',
        region: params.province ?? '',
        contactPerson: params.contactPerson ?? params.name,
      },
    });
  },

  createCenter: async (
    partnerId: string,
    params: {
      centerName: string;
      location: string;
      country?: string;
      region?: string;
    }
  ): Promise<Center> => {
    return apiFetch<Center>(`/organizations/partners/${partnerId}/centers`, {
      method: 'POST',
      data: {
        centerName: params.centerName,
        location: params.location,
        country: params.country,
        region: params.region,
      },
    });
  },
};