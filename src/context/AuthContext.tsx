import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers: Record<UserRole, User> = {
  student: {
    id: 'user-std',
    name: 'Rahul Sharma',
    email: 'student@ncc.demo',
    role: 'student',
    cadetId: '2024-CSE-042',
    rank: 'Senior Under Officer (SUO)',
    unit: '1st Bengal Battalion NCC',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  officer: {
    id: 'user-off',
    name: 'Capt. (Dr.) Rajesh Mukherjee',
    email: 'officer@ncc.demo',
    role: 'officer',
    rank: 'Captain / ANO',
    unit: '1st Bengal Battalion NCC',
    department: 'Department of Computer Science',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  admin: {
    id: 'user-adm',
    name: 'Prof. Alok Bannerjee',
    email: 'admin@ncc.demo',
    role: 'admin',
    rank: 'System Administrator & NCC Chair',
    unit: 'University Central NCC Board',
    department: 'University Administration',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  },
  guest: {
    id: 'guest',
    name: 'Guest Visitor',
    email: 'guest@university.edu',
    role: 'guest'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ncc_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const role = user?.role || 'guest';
  const isAuthenticated = !!user && user.role !== 'guest';

  const loginAs = (targetRole: UserRole) => {
    const targetUser = demoUsers[targetRole];
    setUser(targetUser);
    localStorage.setItem('ncc_auth_user', JSON.stringify(targetUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ncc_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAs, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
