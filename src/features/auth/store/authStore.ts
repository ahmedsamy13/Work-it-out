// ─── Auth Store ─────────────────────────────────────────────────────
// Zustand store for auth state. Supabase manages its own session in
// localStorage — this store just mirrors the current auth state for
// React components to consume.

import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  setUser: (user) =>
    set({ user, isAuthenticated: user !== null }),

  setLoading: (loading) => set({ isLoading: loading }),

  setInitialized: (initialized) => set({ isInitialized: initialized }),

  logout: () =>
    set({ user: null, isAuthenticated: false }),
}));
