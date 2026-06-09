// ─── Exercise Constants ──────────────────────────────────────────────

export const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
  "Cardio",
] as const;

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number];

export const EQUIPMENT_TYPES = [
  "Barbell",
  "Dumbbell",
  "Machine",
  "Cable",
  "None",
] as const;

export type EquipmentType = (typeof EQUIPMENT_TYPES)[number];

export const EXERCISE_TYPES = [
  "Weight & Reps",
  "Bodyweight",
  "Time",
  "Cardio",
] as const;

export type ExerciseType = (typeof EXERCISE_TYPES)[number];
