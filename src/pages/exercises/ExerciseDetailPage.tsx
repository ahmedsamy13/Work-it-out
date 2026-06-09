import { useParams, Link } from "react-router-dom";
import { useExerciseById } from "@/features/exercises/hooks/useExercises";

export function ExerciseDetailPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const {
    data: exercise,
    isLoading,
    error,
  } = useExerciseById(exerciseId ?? "");

  if (isLoading) {
    return (
      <div className="space-y-6 bg-bg-subtle p-6 rounded-2xl animate-pulse">
        <div className="h-6 w-32 rounded bg-surface-hover" />
        <div className="h-64 rounded-xl bg-surface-hover" />
        <div className="h-8 w-1/2 rounded bg-surface-hover" />
        <div className="h-4 w-1/4 rounded bg-surface-hover" />
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">😕</span>
        <p className="text-lg font-medium text-text-primary">
          Exercise not found
        </p>
        <Link
          to="/exercises"
          className="mt-4 text-sm text-text-brand hover:underline"
        >
          ← Back to Exercise Library
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-subtle rounded-3xl w-full min-h-[80vh] flex flex-col overflow-hidden">
      {/* Hero image – full bleed */}
      {exercise.image_url && (
        <div className="relative h-[50vh] sm:h-[60vh]">
          <img
            src={exercise.image_url}
            alt={exercise.name}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-subtle via-black/20 to-black/40" />

          {/* Back link on top of image */}
          <Link
            to="/exercises"
            className="absolute top-5 left-5 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            ← Back to Exercises
          </Link>

          {/* Title on bottom of image */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
              {exercise.name}
            </h1>
          </div>
        </div>
      )}

      {/* Fallback header when no image */}
      {!exercise.image_url && (
        <div className="p-6 sm:p-8 pb-0 space-y-4">
          <Link
            to="/exercises"
            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-brand transition-colors"
          >
            ← Back to Exercises
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            {exercise.name}
          </h1>
        </div>
      )}

      {/* Content area */}
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        {/* Description */}
        {exercise.description && (
          <div className="bg-surface/50 rounded-2xl p-6 border border-border/50 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-DEFAULT">📝</span>
              <h2 className="text-lg font-bold text-text-primary">
                Instructions
              </h2>
            </div>
            <p className="text-text-secondary leading-relaxed text-[15px]">
              {exercise.description}
            </p>
          </div>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Target Muscle */}
          <div className="rounded-2xl border border-border/50 bg-surface/80 backdrop-blur-md p-6 space-y-2 shadow-sm transition-all hover:border-brand-muted hover:shadow-brand-muted/10 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2 text-text-brand">
              <span className="text-2xl">💪</span>
              <p className="text-[12px] uppercase tracking-widest font-bold">
                Target Muscle
              </p>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {exercise.target_muscle}
            </p>
          </div>

          {/* Exercise Type */}
          <div className="rounded-2xl border border-border/50 bg-surface/80 backdrop-blur-md p-6 space-y-2 shadow-sm transition-all hover:border-brand-muted hover:shadow-brand-muted/10 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2 text-text-brand">
              <span className="text-2xl">⚡</span>
              <p className="text-[12px] uppercase tracking-widest font-bold">
                Exercise Type
              </p>
            </div>
            <p className="text-2xl font-bold text-text-primary capitalize">
              {exercise.exercise_type}
            </p>
          </div>

          {/* Equipment */}
          <div className="rounded-2xl border border-border/50 bg-surface/80 backdrop-blur-md p-6 space-y-2 shadow-sm transition-all hover:border-brand-muted hover:shadow-brand-muted/10 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2 text-text-brand">
              <span className="text-2xl">🏋️</span>
              <p className="text-[12px] uppercase tracking-widest font-bold">
                Equipment
              </p>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {exercise.equipment_required ?? "None"}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 mt-auto">
          <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-brand-DEFAULT to-brand-secondary text-white text-lg font-bold rounded-2xl shadow-lg shadow-brand-DEFAULT/20 hover:shadow-brand-DEFAULT/40 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2">
            <span>Add to Workout</span>
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}
