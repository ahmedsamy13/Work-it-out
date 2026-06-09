// ─── useExercises Hook ─────────────────────────────────────────────

import { useQuery } from "@tanstack/react-query";
import { exerciseApi } from "../api/exerciseApi";

/**
 * Fetch and cache exercises with TanStack Query.
 */
export function useExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: () => exerciseApi.getAll(),
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
