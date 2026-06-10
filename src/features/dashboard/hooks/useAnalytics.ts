import { useMemo } from "react";
import { useWorkouts } from "@/features/workouts/hooks/useWorkouts";
import type { WorkoutHistoryWithSets } from "@/features/workouts/types/workout.types";

export function useAnalytics() {
  const { data: workouts, isLoading, error } = useWorkouts();

  const analytics = useMemo(() => {
    if (!workouts || workouts.length === 0) {
      return {
        totalWorkouts: 0,
        totalVolume: 0,
        volumeData: [],
        muscleData: [],
      };
    }

    const typedWorkouts = workouts as WorkoutHistoryWithSets[];

    let totalVolume = 0;
    const volumeByDate = new Map<string, number>();
    const muscleGroups = new Map<string, number>();

    // Sort workouts oldest to newest for charts
    const sortedWorkouts = [...typedWorkouts].sort(
      (a, b) => new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
    );

    sortedWorkouts.forEach((w) => {
      const dateStr = new Date(w.started_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      let workoutVolume = 0;

      w.workout_sets?.forEach((set) => {
        const weight = set.weight_kg ?? 0;
        const reps = set.reps ?? 0;
        const volume = weight * reps;
        workoutVolume += volume;
        totalVolume += volume;

        if (set.exercises?.target_muscle) {
          // Normalize casing (e.g., "chest" -> "Chest")
          const rawMuscle = set.exercises.target_muscle;
          const muscle = rawMuscle.charAt(0).toUpperCase() + rawMuscle.slice(1).toLowerCase();
          muscleGroups.set(muscle, (muscleGroups.get(muscle) ?? 0) + 1);
        }
      });

      // Add to volume over time
      volumeByDate.set(dateStr, (volumeByDate.get(dateStr) ?? 0) + workoutVolume);
    });

    // Format for Recharts
    let volumeData = Array.from(volumeByDate.entries()).map(([date, volume]) => ({
      name: date,
      volume,
    }));

    // Defensive programming: Recharts LineChart needs at least 2 points to draw a line.
    // If the user only has 1 day of data, duplicate it slightly in the past to draw a flat line or starting point.
    if (volumeData.length === 1) {
      volumeData = [
        { name: "Start", volume: 0 },
        ...volumeData,
      ];
    }

    const muscleData = Array.from(muscleGroups.entries()).map(([name, count]) => ({
      name,
      value: count,
    }));

    return {
      totalWorkouts: typedWorkouts.length,
      totalVolume,
      volumeData,
      muscleData,
    };
  }, [workouts]);

  return { analytics, isLoading, error };
}
