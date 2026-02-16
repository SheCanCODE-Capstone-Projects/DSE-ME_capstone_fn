
export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}


export interface AuthResponse {
  token: string; 
  user?: {
    id: string;
    email: string;
    role?: 'FACILITATOR' | 'ME_OFFICER' | 'UNASSIGNED' |  'DONOR' | 'ADMIN' |null;
    status?: 'pending' | 'approved' | 'rejected';
    hasAccess?: boolean; 
  };
  message?: string;
}
