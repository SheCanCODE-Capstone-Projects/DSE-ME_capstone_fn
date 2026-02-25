import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  hasAccess: boolean;
  organizationName?: string;
  organizationId?: string;
  locationName?: string;
  locationId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData?: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser(token || undefined);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // Invalid stored user data
        }
      }
    }
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if (currentUser && token) {
      const userData: User = {
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        role: currentUser.role || 'UNASSIGNED',
        hasAccess: !!currentUser.role && currentUser.role !== 'UNASSIGNED'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [currentUser, token]);

  const login = (newToken: string, userData?: User) => {
    setToken(newToken);
    setUser(userData || null);
    localStorage.setItem('token', newToken);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isLoading: isLoading || isLoadingUser
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