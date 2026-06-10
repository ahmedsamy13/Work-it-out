import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workoutApi } from "../api/workoutApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { Workout, WorkoutSet } from "../types/workout.types";

export function useWorkouts() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["workouts", user?.id],
    queryFn: () => {
      if (!user) throw new Error("Not authenticated");
      return workoutApi.getWorkouts(user.id);
    },
    enabled: !!user,
  });
}

export function useSaveWorkout() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      startedAt: string;
      endedAt: string;
      exercises: {
        exercise_id: string;
        sets: {
          set_number: number;
          weight_kg: number | null;
          reps: number | null;
          is_completed: boolean;
        }[];
      }[];
    }) => {
      if (!user) throw new Error("Not authenticated");
      return workoutApi.saveWorkout(user.id, data.startedAt, data.endedAt, data.exercises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
}
