// ─── Workout Store (Zustand) ───────────────────────────────────────

import { create } from "zustand";
import type { Workout, WorkoutExercise, WorkoutSet } from "../types";

interface WorkoutState {
  /** The currently active workout being logged (null if none) */
  activeWorkout: Workout | null;
  /** Past completed workouts */
  workoutHistory: Workout[];
  /** Rest timer state */
  restTimer: { isRunning: boolean; remainingSeconds: number };

  // Actions
  startWorkout: (name: string) => void;
  cancelWorkout: () => void;
  completeWorkout: () => void;
  addExercise: (exercise: Omit<WorkoutExercise, "id" | "sets">) => void;
  addSet: (exerciseIndex: number, set: Omit<WorkoutSet, "id" | "setNumber">) => void;
  setWorkoutHistory: (workouts: Workout[]) => void;
  startRestTimer: (seconds: number) => void;
  tickRestTimer: () => void;
  stopRestTimer: () => void;
}

let nextId = 1;
const generateId = () => `temp-${nextId++}`;

export const useWorkoutStore = create<WorkoutState>((set) => ({
  activeWorkout: null,
  workoutHistory: [],
  restTimer: { isRunning: false, remainingSeconds: 0 },

  startWorkout: (name) =>
    set({
      activeWorkout: {
        id: generateId(),
        userId: "",
        name,
        startedAt: new Date().toISOString(),
        exercises: [],
      },
    }),

  cancelWorkout: () => set({ activeWorkout: null }),

  completeWorkout: () =>
    set((state) => {
      if (!state.activeWorkout) return state;
      const completed: Workout = {
        ...state.activeWorkout,
        completedAt: new Date().toISOString(),
      };
      return {
        activeWorkout: null,
        workoutHistory: [completed, ...state.workoutHistory],
      };
    }),

  addExercise: (exercise) =>
    set((state) => {
      if (!state.activeWorkout) return state;
      const newExercise: WorkoutExercise = {
        ...exercise,
        id: generateId(),
        sets: [],
      };
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: [...state.activeWorkout.exercises, newExercise],
        },
      };
    }),

  addSet: (exerciseIndex, setData) =>
    set((state) => {
      if (!state.activeWorkout) return state;
      const exercises = [...state.activeWorkout.exercises];
      const exercise = exercises[exerciseIndex];
      if (!exercise) return state;
      const newSet: WorkoutSet = {
        ...setData,
        id: generateId(),
        setNumber: exercise.sets.length + 1,
      };
      exercises[exerciseIndex] = {
        ...exercise,
        sets: [...exercise.sets, newSet],
      };
      return {
        activeWorkout: { ...state.activeWorkout, exercises },
      };
    }),

  setWorkoutHistory: (workouts) => set({ workoutHistory: workouts }),

  startRestTimer: (seconds) =>
    set({ restTimer: { isRunning: true, remainingSeconds: seconds } }),

  tickRestTimer: () =>
    set((state) => {
      const remaining = state.restTimer.remainingSeconds - 1;
      if (remaining <= 0) {
        return { restTimer: { isRunning: false, remainingSeconds: 0 } };
      }
      return { restTimer: { ...state.restTimer, remainingSeconds: remaining } };
    }),

  stopRestTimer: () =>
    set({ restTimer: { isRunning: false, remainingSeconds: 0 } }),
}));
