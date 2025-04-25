import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  tipo: 'USUARIO' | 'CORRETOR' | 'ADMINISTRADOR';
  email: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuth = create<AuthState>((set: (state: Partial<AuthState>) => void) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
})); 