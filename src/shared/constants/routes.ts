// ─── Route Path Constants ───────────────────────────────────────────
// Single source of truth for all route paths in the application.
// Always reference these constants instead of hardcoding strings.

export const ROUTES = {
  HOME: "/",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // Exercises
  EXERCISES: "/exercises",
  EXERCISE_DETAIL: "/exercises/:exerciseId",

  // Workouts
  WORKOUT_LOG: "/workouts/new",
  WORKOUT_HISTORY: "/workouts",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Profile
  PROFILE: "/profile",
  SETTINGS: "/profile/settings",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
