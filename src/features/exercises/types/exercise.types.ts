// ─── Exercise Domain Types ─────────────────────────────────────────

import type { ID } from "@/shared/types";

export interface Exercise {
  id: ID;
  name: string;
  target_muscle: string;
  exercise_type: string;
  equipment_required: string | null;
  image_url?: string;
  description?: string;
  created_at: string;
}

export interface ExerciseFilters {
  search: string;
  target_muscle: string;
  equipment_required: string;
}

export type ExerciseSortField = "name" | "created_at";
