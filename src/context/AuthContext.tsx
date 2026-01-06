"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

interface User {
  id: string;
  email: string;
  role: string;
  hasAccess: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const { data: user, isLoading } = useCurrentUser(token || undefined);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user: user || null, 
      token, 
      login, 
      logout, 
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
