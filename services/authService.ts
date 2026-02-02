
import { AuthUser, UserRole } from '../types';

const STORAGE_KEY = 'fiyanix_auth_user';

export const authService = {
  getCurrentUser: (): AuthUser | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  login: async (email: string, password: string): Promise<AuthUser> => {
    // Simulating API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would be a Firebase/Backend call
    const user: AuthUser = {
      uid: crypto.randomUUID(),
      email,
      emailVerified: email.includes('verified'), // Simulation trick
      role: 'user',
      displayName: email.split('@')[0]
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  register: async (email: string, password: string): Promise<AuthUser> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: AuthUser = {
      uid: crypto.randomUUID(),
      email,
      emailVerified: false,
      role: 'user',
      displayName: email.split('@')[0]
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  verifyEmail: async (user: AuthUser): Promise<AuthUser> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const updatedUser = { ...user, emailVerified: true, role: 'pro' as UserRole };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
