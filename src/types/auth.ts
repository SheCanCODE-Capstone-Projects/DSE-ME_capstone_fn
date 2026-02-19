
export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}


export interface AuthResponse {
  token: string; 
  role?: 'FACILITATOR' | 'ME_OFFICER' | 'UNASSIGNED' | 'DONOR' | 'ADMIN' | null;
  redirectTo?: string;
  message?: string;
  user?: {
    id: string;
    email: string;
    role?: 'FACILITATOR' | 'ME_OFFICER' | 'UNASSIGNED' |  'DONOR' | 'ADMIN' |null;
    status?: 'pending' | 'approved' | 'rejected';
    hasAccess?: boolean; 
  };
}

export interface RoleRequestData {
  requestedRole: 'FACILITATOR' | 'ME_OFFICER' | 'DONOR' | 'ADMIN';
  reason?: string;
}

export interface RoleRequestResponse {
  id: string;
  userId?: string;
  userEmail?: string;
  requestedRole: 'FACILITATOR' | 'ME_OFFICER' | 'DONOR' | 'ADMIN';
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  requestedAt?: string;
  reviewedAt?: string;
  adminComment?: string;
}
