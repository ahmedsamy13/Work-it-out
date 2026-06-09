// ─── Exercises Feature: Public API ─────────────────────────────────
// All external imports should come through this barrel file.

// Types
export type { Exercise, ExerciseFilters, ExerciseSortField } from "./types";

// Hooks
export { useExercises, useExerciseById } from "./hooks";

// API
export { exerciseApi } from "./api/exerciseApi";

// Components
export { ExerciseCard, ExerciseGrid } from "./components";
