// ─── Exercise Grid Component ───────────────────────────────────────

import type { Exercise } from "@/features/exercises/types";
import { ExerciseCard } from "./ExerciseCard";

interface ExerciseGridProps {
  exercises: Exercise[];
  isLoading: boolean;
}

export function ExerciseGrid({ exercises, isLoading }: ExerciseGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-border bg-surface overflow-hidden"
          >
            <div className="h-44 bg-surface-hover" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 rounded bg-surface-hover" />
              <div className="h-3 w-1/3 rounded bg-surface-hover" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl mb-3">🔍</span>
        <p className="text-lg font-medium text-text-primary">No exercises found</p>
        <p className="text-sm text-text-secondary mt-1">
          Try a different filter or muscle group.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
