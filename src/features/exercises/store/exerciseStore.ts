// ─── Exercise Store (Zustand) ──────────────────────────────────────

import { create } from "zustand";
import type { Exercise, ExerciseFilters } from "../types";

interface ExerciseState {
  exercises: Exercise[];
  selectedExercise: Exercise | null;
  filters: ExerciseFilters;
  isLoading: boolean;

  // Actions
  setExercises: (exercises: Exercise[]) => void;
  selectExercise: (exercise: Exercise | null) => void;
  setFilters: (filters: Partial<ExerciseFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: ExerciseFilters = {
  search: "",
  muscleGroup: null,
  equipment: null,
  difficulty: null,
};

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  selectedExercise: null,
  filters: defaultFilters,
  isLoading: false,

  setExercises: (exercises) => set({ exercises }),
  selectExercise: (exercise) => set({ selectedExercise: exercise }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
