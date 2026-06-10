import type { ID } from "@/shared/types";
import type { Exercise } from "@/features/exercises/types";

// Types corresponding to the Supabase Database Schema

export interface Workout {
  id: ID;
  user_id: ID;
  name: string;
  started_at: string;
  ended_at: string | null;
  notes: string | null;
}

export interface WorkoutSet {
  id: ID;
  workout_id: ID;
  exercise_id: ID;
  set_number: number;
  weight_kg: number | null;
  reps: number | null;
  duration_seconds: number | null;
  is_completed: boolean;
}

// Full workout history nested type returned by Supabase
export interface WorkoutHistoryWithSets extends Workout {
  workout_sets: (WorkoutSet & {
    exercises: Exercise;
  })[];
}

// ─── Active Workout State Types ───────────────────────────────────────
// These are used for the Zustand store while a workout is actively running

export interface ActiveWorkoutSet {
  id: string; // Temporary UUID for frontend tracking
  set_number: number;
  weight_kg: number | string; // string allows empty input
  reps: number | string;
  is_completed: boolean;
}

export interface ActiveWorkoutExercise {
  exercise: Exercise;
  sets: ActiveWorkoutSet[];
}

export interface ActiveWorkoutState {
  status: "idle" | "active";
  startedAt: string | null;
  exercises: ActiveWorkoutExercise[];
}
