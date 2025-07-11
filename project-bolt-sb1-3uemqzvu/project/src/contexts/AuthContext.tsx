import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'trainer' | 'client';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'trainer' | 'client') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, userType: 'trainer' | 'client') => {
    // Simple demo authentication
    if (password === 'demo') {
      const mockUser: User = {
        id: '1',
        email,
        name: userType === 'trainer' ? 'Inspire Gym Trainer' : 'John Doe',
        role: userType,
      };
      setUser(mockUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}