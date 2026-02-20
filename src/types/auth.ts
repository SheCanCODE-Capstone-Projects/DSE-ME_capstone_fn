
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
  userId: string;
  role: 'FACILITATOR' | 'ME_OFFICER' | 'UNASSIGNED' | 'DONOR';
  redirectTo?: string;
  message?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'FACILITATOR' | 'ME_OFFICER' | 'UNASSIGNED' | 'DONOR';
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: string;
  status?: 'pending' | 'approved' | 'rejected';
  hasAccess?: boolean;
}

export interface RoleRequestData {
  requestedRole: 'FACILITATOR' | 'ME_OFFICER' | 'DONOR';
  reason: string;
  organizationPartnerId: string;
  locationCenterId: string;
}

export interface RoleRequestResponse {
  id: string;
  userId?: string;
  userEmail?: string;
  requesterEmail?: string;
  requesterName?: string;
  requestedRole: 'FACILITATOR' | 'ME_OFFICER' | 'DONOR';
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  organizationPartnerId?: string;
  locationCenterId?: string;
  organizationName?: string;
  locationName?: string;
  requestedAt?: string;
  reviewedAt?: string;
  adminComment?: string;
}

export interface Partner {
  partnerId: string;
  partnerName: string;
  country: string;
  region: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface Center {
  centerId: string;
  partnerId: string;
  centerName: string;
  location: string;
  country: string;
  region: string;
}
