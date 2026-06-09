// ─── Auth Domain Types ─────────────────────────────────────────────

import type { ID, Timestamp } from "@/shared/types";

export interface User {
  id: ID;
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: Timestamp;
  preferences: UserPreferences;
}

export interface UserPreferences {
  weightUnit: "kg" | "lbs";
  theme: "dark" | "light" | "system";
  restTimerDefault: number; // seconds
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
