// ─── Analytics Domain Types ────────────────────────────────────────

import type { ID, Timestamp } from "@/shared/types";
import type { MuscleGroup } from "@/shared/constants";

export interface ProgressDataPoint {
  date: Timestamp;
  value: number;
  label?: string;
}

export interface PersonalRecord {
  id: ID;
  exerciseId: ID;
  exerciseName: string;
  weight: number;
  reps: number;
  achievedAt: Timestamp;
}

export interface WeeklyOverview {
  weekStart: Timestamp;
  totalWorkouts: number;
  totalVolume: number;
  totalDurationMinutes: number;
  muscleGroupsWorked: MuscleGroup[];
}

export interface DashboardSummary {
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  totalVolume: number;
  thisWeek: WeeklyOverview;
  personalRecords: PersonalRecord[];
}

export type ChartTimeRange = "1w" | "1m" | "3m" | "6m" | "1y" | "all";
