import { useWorkoutStore } from "../store/workoutStore";

/**
 * Access and control the currently active workout session.
 */
export function useActiveWorkout() {
  const activeWorkout = useWorkoutStore((s) => s.activeWorkout);
  const startWorkout = useWorkoutStore((s) => s.startWorkout);
  const cancelWorkout = useWorkoutStore((s) => s.cancelWorkout);
  const completeWorkout = useWorkoutStore((s) => s.completeWorkout);
  const addExercise = useWorkoutStore((s) => s.addExercise);
  const addSet = useWorkoutStore((s) => s.addSet);

  const isActive = activeWorkout !== null;

  return {
    activeWorkout,
    isActive,
    startWorkout,
    cancelWorkout,
    completeWorkout,
    addExercise,
    addSet,
  };
}
