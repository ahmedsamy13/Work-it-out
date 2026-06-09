import { useQuery } from "@tanstack/react-query";
import { workoutApi } from "../api/workoutApi";

/**
 * Fetch and cache workout history with pagination.
 */
export function useWorkoutHistory(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["workouts", page, limit],
    queryFn: () => workoutApi.getAll(page, limit),
  });
}
