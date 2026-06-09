// ─── useExercises Hook ─────────────────────────────────────────────

import { useQuery } from "@tanstack/react-query";
import { exerciseApi } from "../api/exerciseApi";
import { useExerciseStore } from "../store/exerciseStore";
import type { ExerciseFilters } from "../types";

/**
 * Fetch and cache exercises with TanStack Query.
 * Reads filters from the Zustand store.
 */
export function useExercises(page = 1, limit = 20) {
  const filters = useExerciseStore((s) => s.filters);

  return useQuery({
    queryKey: ["exercises", page, limit, filters],
    queryFn: () => exerciseApi.getAll(page, limit, filters),
  });
}

/**
 * Fetch a single exercise by ID.
 */
export function useExerciseById(id: string) {
  return useQuery({
    queryKey: ["exercise", id],
    queryFn: () => exerciseApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Manage exercise filter state.
 */
export function useExerciseFilters() {
  const filters = useExerciseStore((s) => s.filters);
  const setFilters = useExerciseStore((s) => s.setFilters);
  const resetFilters = useExerciseStore((s) => s.resetFilters);

  const updateFilter = <K extends keyof ExerciseFilters>(
    key: K,
    value: ExerciseFilters[K]
  ) => {
    setFilters({ [key]: value });
  };

  return { filters, updateFilter, resetFilters };
}
