// ─── Exercises Feature: Public API ─────────────────────────────────
// All external imports should come through this barrel file.

// Types
export type { Exercise, ExerciseFilters, ExerciseSortField } from "./types";

// Store
export { useExerciseStore } from "./store/exerciseStore";

// Hooks
export { useExercises, useExerciseById, useExerciseFilters } from "./hooks";
export { useExerciseSearch } from "./hooks";

// API
export { exerciseApi } from "./api/exerciseApi";

// Utils
export { formatMuscleGroupLabel } from "./utils/exerciseHelpers";
