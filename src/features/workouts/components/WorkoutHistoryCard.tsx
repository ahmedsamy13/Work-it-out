import { useMemo, memo } from "react";
import type { WorkoutHistoryWithSets } from "../types/workout.types";
import { Clock } from "lucide-react";

interface WorkoutHistoryCardProps {
  workout: WorkoutHistoryWithSets;
}

export const WorkoutHistoryCard = memo(function WorkoutHistoryCard({ workout }: WorkoutHistoryCardProps) {
  // Extract complex calculations from render cycle into useMemo
  const stats = useMemo(() => {
    let totalVolume = 0;
    let totalSets = 0;
    const exercisesMap = new Map<string, number>();

    // Defensive programming: handle empty arrays safely
    const sets = workout.workout_sets || [];
    
    sets.forEach((set) => {
      totalSets++;
      const w = set.weight_kg ?? 0;
      const r = set.reps ?? 0;
      totalVolume += w * r;

      if (set.exercises?.name) {
        exercisesMap.set(
          set.exercises.name,
          (exercisesMap.get(set.exercises.name) ?? 0) + 1
        );
      }
    });

    const durationMinutes = workout.ended_at
      ? Math.floor(
          (new Date(workout.ended_at).getTime() - new Date(workout.started_at).getTime()) / 60000
        )
      : null;

    const formattedDate = new Date(workout.started_at).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    return {
      totalVolume,
      totalSets,
      exercisesList: Array.from(exercisesMap.entries()),
      durationMinutes,
      formattedDate,
    };
  }, [workout]);

  return (
    <div className="bg-surface border border-border rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4 border-b border-border/50 pb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            {workout.name || "Workout Session"}
          </h2>
          <p className="text-sm text-text-secondary mt-0.5 flex items-center gap-2">
            <span> {stats.formattedDate}</span>
            {stats.durationMinutes !== null && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {stats.durationMinutes} min</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-bg-subtle rounded-xl p-3">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">
            Volume
          </p>
          <p className="text-lg font-bold text-text-primary">
            {stats.totalVolume.toLocaleString()}{" "}
            <span className="text-sm text-text-secondary font-normal">kg</span>
          </p>
        </div>
        <div className="bg-bg-subtle rounded-xl p-3">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">
            Sets
          </p>
          <p className="text-lg font-bold text-text-primary">{stats.totalSets}</p>
        </div>
      </div>

      <div className="space-y-1.5 mt-4">
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
          Exercises
        </p>
        {stats.exercisesList.map(([name, count]) => (
          <div key={name} className="flex items-center justify-between text-sm">
            <span className="text-text-primary font-medium">{name}</span>
            <span className="text-text-secondary bg-surface-hover px-2 py-0.5 rounded text-xs font-semibold">
              {count} sets
            </span>
          </div>
        ))}
        {stats.exercisesList.length === 0 && (
          <p className="text-sm text-text-secondary italic">No sets recorded.</p>
        )}
      </div>
    </div>
  );
});
