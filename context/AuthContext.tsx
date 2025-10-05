import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (username: string) => void;
  logout: () => void;
  signup: (username: string) => boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    }
  }, []);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  const login = (username: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: User) => u.username === username);
    if (userExists) {
        const user = { username };
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        closeAuthModal();
    } else {
        alert('User not found. Please sign up.');
    }
  };

  const signup = (username: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: User) => u.username === username);
    if (userExists) {
      alert('Username is already taken.');
      return false;
    }
    const newUser = { username };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    closeAuthModal();
    return true;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
