// Mock API for local development

export interface User {
  id: string;
  email: string;
  password: string;
  token: string;
  role?: 'facilitator' | 'me' | 'donor' | null;
  status: 'pending' | 'approved' | 'rejected';
  requestedRole?: 'facilitator' | 'me' | 'donor';
}

export interface AccessRequest {
  id: string;
  userId: string;
  userEmail: string;
  requestedRole: 'facilitator' | 'me' | 'donor';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const mockUsers = new Map<string, User>();
export const mockAccessRequests = new Map<string, AccessRequest>();

// Create default users
const meAdmin: User = {
  id: 'me_admin_1',
  email: 'admin@me.com',
  password: 'admin123',
  token: 'me_admin_token',
  role: 'me',
  status: 'approved'
};
mockUsers.set(meAdmin.email, meAdmin);

const facilitator: User = {
  id: 'facilitator_1',
  email: 'ngabirediane02@gmail.com',
  password: 'admin123',
  token: 'facilitator_token',
  role: 'facilitator',
  status: 'approved'
};
mockUsers.set(facilitator.email, facilitator);

const donor: User = {
  id: 'donor_1',
  email: 'deborahteta@gmail.com',
  password: 'admin123',
  token: 'donor_token',
  role: 'donor',
  status: 'approved'
};
mockUsers.set(donor.email, donor);

export async function mockRegister(email: string, password: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (mockUsers.has(email)) {
    throw new Error('User already exists');
  }
  
  const userId = `user_${Date.now()}`;
  const token = `mock_token_${Date.now()}`;
  const user: User = {
    id: userId,
    email,
    password,
    token,
    role: null,
    status: 'pending'
  };
  
  mockUsers.set(email, user);
  
  return { message: 'User registered successfully', token, user };
}

export async function mockLogin(email: string, password: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.get(email);
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }
  
  return { message: 'Login successful', token: user.token, user };
}

export async function mockRequestAccess(token: string, requestedRole: 'facilitator' | 'me' | 'donor') {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = Array.from(mockUsers.values()).find(u => u.token === token);
  if (!user) throw new Error('User not found');
  
  if (user.role) throw new Error('User already has a role');
  
  const requestId = `req_${Date.now()}`;
  const request: AccessRequest = {
    id: requestId,
    userId: user.id,
    userEmail: user.email,
    requestedRole,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  mockAccessRequests.set(requestId, request);
  user.requestedRole = requestedRole;
  
  return { message: 'Access request submitted', request };
}

export async function mockGetAccessRequests(token: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const user = Array.from(mockUsers.values()).find(u => u.token === token);
  if (!user || user.role !== 'me') throw new Error('Unauthorized');
  
  return Array.from(mockAccessRequests.values()).filter(r => r.status === 'pending');
}

export async function mockApproveRequest(token: string, requestId: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const meUser = Array.from(mockUsers.values()).find(u => u.token === token);
  if (!meUser || meUser.role !== 'me') throw new Error('Unauthorized');
  
  const request = mockAccessRequests.get(requestId);
  if (!request) throw new Error('Request not found');
  
  const user = Array.from(mockUsers.values()).find(u => u.id === request.userId);
  if (!user) throw new Error('User not found');
  
  request.status = 'approved';
  user.status = 'approved';
  user.role = request.requestedRole;
  
  return { message: 'Request approved', user };
}

export async function mockRejectRequest(token: string, requestId: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const meUser = Array.from(mockUsers.values()).find(u => u.token === token);
  if (!meUser || meUser.role !== 'me') throw new Error('Unauthorized');
  
  const request = mockAccessRequests.get(requestId);
  if (!request) throw new Error('Request not found');
  
  request.status = 'rejected';
  
  return { message: 'Request rejected' };
}

export async function mockGetUserProfile(token: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const user = Array.from(mockUsers.values()).find(u => u.token === token);
  if (!user) throw new Error('User not found');
  
  return { user };
}