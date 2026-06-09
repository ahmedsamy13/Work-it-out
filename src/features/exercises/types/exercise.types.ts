// ─── Exercise Domain Types ─────────────────────────────────────────

import type { ID, Timestamp } from "@/shared/types";
import type { MuscleGroup, EquipmentType, DifficultyLevel } from "@/shared/constants";

export interface Exercise {
  id: ID;
  name: string;
  description: string;
  instructions: string[];
  muscleGroups: {
    primary: MuscleGroup[];
    secondary: MuscleGroup[];
  };
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  videoUrl?: string;
  imageUrl?: string;
  createdAt: Timestamp;
}

export interface ExerciseFilters {
  search: string;
  muscleGroup: MuscleGroup | null;
  equipment: EquipmentType | null;
  difficulty: DifficultyLevel | null;
}

export type ExerciseSortField = "name" | "difficulty" | "createdAt";
