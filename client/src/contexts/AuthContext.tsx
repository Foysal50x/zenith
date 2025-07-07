import React, { createContext, useContext } from 'react';
import { useAuth as useAuthQuery } from '../hooks/useAuth';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  updateProfile: (data: { name?: string; email?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  } = useAuthQuery();

  const value = {
    user,
    loading: isLoading,
    login: (email: string, password: string) => login({ email, password }),
    register: (email: string, password: string, name: string) => register({ email, password, name }),
    logout: () => logout(),
    updateProfile: (data: { name?: string; email?: string }) => updateProfile(data),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 