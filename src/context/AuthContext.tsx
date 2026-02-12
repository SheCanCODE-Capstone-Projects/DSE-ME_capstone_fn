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
  login: (token: string, userData?: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const login = (newToken: string, userData?: any) => {
    setToken(newToken);
    setUser(userData || null);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isLoading: false
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