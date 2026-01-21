export const mockUsers = new Map<string, { email: string; password: string; token: string }>();

export async function mockRegister(email: string, password: string) {
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  if (mockUsers.has(email)) {
    throw new Error('User already exists');
  }
  
  const token = `mock_token_${Date.now()}`;
  mockUsers.set(email, { email, password, token });
  
  return { message: 'User registered successfully', token };
}

export async function mockLogin(email: string, password: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.get(email);
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }
  
  return { message: 'Login successful', token: user.token };
}
