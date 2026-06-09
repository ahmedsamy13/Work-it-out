import type { Workout } from "../types";

/**
 * Calculate total volume (weight × reps) across all sets in a workout.
 */
export function calculateTotalVolume(workout: Workout): number {
  return workout.exercises.reduce((total, exercise) => {
    return (
      total +
      exercise.sets.reduce((setTotal, set) => {
        return setTotal + set.weight * set.reps;
      }, 0)
    );
  }, 0);
}

/**
 * Calculate workout duration in seconds.
 */
export function calculateDuration(workout: Workout): number | null {
  if (!workout.completedAt) return null;
  const start = new Date(workout.startedAt).getTime();
  const end = new Date(workout.completedAt).getTime();
  return Math.floor((end - start) / 1000);
}
