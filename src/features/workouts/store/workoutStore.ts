import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Exercise } from "@/features/exercises/types";
import type {
  ActiveWorkoutState,
  ActiveWorkoutExercise,
  ActiveWorkoutSet,
} from "../types/workout.types";

interface WorkoutStore extends ActiveWorkoutState {
  startWorkout: () => void;
  finishWorkout: () => void;
  cancelWorkout: () => void;

  addExercise: (exercise: Exercise) => void;
  removeExercise: (exerciseId: string) => void;

  addSet: (exerciseId: string) => void;
  removeSet: (exerciseId: string, setId: string) => void;
  updateSet: (
    exerciseId: string,
    setId: string,
    field: keyof ActiveWorkoutSet,
    value: string | number | boolean
  ) => void;
  toggleSetComplete: (exerciseId: string, setId: string) => void;
}

const initialState: ActiveWorkoutState = {
  status: "idle",
  startedAt: null,
  exercises: [],
};

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      startWorkout: () => {
        if (get().status === "active") return; // Already active
        set({
          status: "active",
          startedAt: new Date().toISOString(),
          exercises: [],
        });
      },

      finishWorkout: () => {
        set(initialState);
      },

      cancelWorkout: () => {
        set(initialState);
      },

      addExercise: (exercise) => {
        const { status, exercises } = get();

        const isNewWorkout = status === "idle";
        const startedAt = isNewWorkout ? new Date().toISOString() : get().startedAt;

        const exists = exercises.some((e) => e.exercise.id === exercise.id);
        if (exists) return;

        const initialSet: ActiveWorkoutSet = {
          id: crypto.randomUUID(),
          set_number: 1,
          weight_kg: "",
          reps: "",
          is_completed: false,
        };

        const newExercise: ActiveWorkoutExercise = {
          exercise,
          sets: [initialSet],
        };

        set({
          status: "active",
          startedAt,
          exercises: [...exercises, newExercise],
        });
      },

      removeExercise: (exerciseId) => {
        set((state) => ({
          exercises: state.exercises.filter((e) => e.exercise.id !== exerciseId),
        }));
      },

      addSet: (exerciseId) => {
        set((state) => ({
          exercises: state.exercises.map((ex) => {
            if (ex.exercise.id === exerciseId) {
              const lastSet = ex.sets[ex.sets.length - 1];
              const newSet: ActiveWorkoutSet = {
                id: crypto.randomUUID(),
                set_number: ex.sets.length + 1,
                // Carry over weight/reps from previous set for convenience
                weight_kg: lastSet ? lastSet.weight_kg : "",
                reps: lastSet ? lastSet.reps : "",
                is_completed: false,
              };
              return { ...ex, sets: [...ex.sets, newSet] };
            }
            return ex;
          }),
        }));
      },

      removeSet: (exerciseId, setId) => {
        set((state) => ({
          exercises: state.exercises.map((ex) => {
            if (ex.exercise.id === exerciseId) {
              const filteredSets = ex.sets.filter((s) => s.id !== setId);
              const renumberedSets = filteredSets.map((s, idx) => ({
                ...s,
                set_number: idx + 1,
              }));
              return { ...ex, sets: renumberedSets };
            }
            return ex;
          }),
        }));
      },

      updateSet: (exerciseId, setId, field, value) => {
        set((state) => ({
          exercises: state.exercises.map((ex) => {
            if (ex.exercise.id === exerciseId) {
              return {
                ...ex,
                sets: ex.sets.map((s) =>
                  s.id === setId ? { ...s, [field]: value } : s
                ),
              };
            }
            return ex;
          }),
        }));
      },

      toggleSetComplete: (exerciseId, setId) => {
        set((state) => ({
          exercises: state.exercises.map((ex) => {
            if (ex.exercise.id === exerciseId) {
              return {
                ...ex,
                sets: ex.sets.map((s) =>
                  s.id === setId ? { ...s, is_completed: !s.is_completed } : s
                ),
              };
            }
            return ex;
          }),
        }));
      },
    }),
    {
      name: "workout-storage", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        status: state.status,
        startedAt: state.startedAt,
        exercises: state.exercises,
      }),
    }
  )
);
