// ─── Workouts Feature: Public API ──────────────────────────────────

// Types
export type {
  Workout,
  WorkoutSet,
  WorkoutExercise,
  WorkoutTemplate,
  WorkoutStatus,
} from "./types";

// Store
export { useWorkoutStore } from "./store/workoutStore";

// Hooks
export { useActiveWorkout } from "./hooks";
export { useWorkoutHistory } from "./hooks";
export { useRestTimer } from "./hooks";

// API
export { workoutApi } from "./api/workoutApi";

// Utils
export { calculateTotalVolume, calculateDuration } from "./utils/workoutCalculations";
