import { create } from 'zustand';
import { User } from '@/lib/types';
import { login as apiLogin, logout as apiLogout } from '@/lib/api';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  login: async (username: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const response = await apiLogin(username, password);
      localStorage.setItem('token', response.token);
      set({
        user: response.user,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      set({
        error: '로그인에 실패했습니다.',
        loading: false
      });
      console.error('Login error:', error);
    }
  },
  logout: () => {
    apiLogout();
    set({
      user: null,
      isAuthenticated: false
    });
  }
})); 