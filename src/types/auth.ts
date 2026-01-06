
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
  user: {
    id: string;
    email: string;
    role: string;
    hasAccess: boolean; 
  };
}
