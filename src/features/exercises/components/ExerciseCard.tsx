// ─── Exercise Card Component ───────────────────────────────────────

import type { Exercise } from "@/features/exercises/types";
import { Link } from "react-router-dom";

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Link
      to={`/exercises/${exercise.id}`}
      className="group block rounded-xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-brand-muted hover:shadow-lg hover:shadow-brand-muted/10 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {exercise.image_url ? (
          <img
            src={exercise.image_url}
            alt={exercise.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-subtle text-text-muted text-4xl">
            🏋️
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Equipment badge (bottom-right of image) */}
        {exercise.equipment_required && exercise.equipment_required !== "None" && (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {exercise.equipment_required}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-text-primary group-hover:text-text-brand transition-colors">
          {exercise.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-subtle px-2.5 py-0.5 text-[11px] font-medium text-text-brand">
            {exercise.target_muscle}
          </span>
          <span className="text-[11px] text-text-muted capitalize">
            {exercise.exercise_type}
          </span>
        </div>
      </div>
    </Link>
  );
}
