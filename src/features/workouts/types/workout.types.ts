// ─── Workout Domain Types ──────────────────────────────────────────

import type { ID, Timestamp } from "@/shared/types";

export interface WorkoutSet {
  id: ID;
  exerciseId: ID;
  setNumber: number;
  reps: number;
  weight: number;
  weightUnit: "kg" | "lbs";
  rpe?: number; // Rate of Perceived Exertion (1-10)
  isWarmup: boolean;
  completedAt?: Timestamp;
}

export interface WorkoutExercise {
  id: ID;
  exerciseId: ID;
  exerciseName: string;
  sets: WorkoutSet[];
  notes?: string;
  restSeconds: number;
}

export interface Workout {
  id: ID;
  userId: ID;
  name: string;
  startedAt: Timestamp;
  completedAt?: Timestamp;
  exercises: WorkoutExercise[];
  notes?: string;
  durationSeconds?: number;
  totalVolume?: number; // sum of (weight × reps) across all sets
}

export interface WorkoutTemplate {
  id: ID;
  name: string;
  exercises: Omit<WorkoutExercise, "id" | "sets">[];
}

export type WorkoutStatus = "in-progress" | "completed" | "cancelled";
