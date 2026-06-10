import { Link } from "react-router-dom";
import { useWorkouts } from "@/features/workouts/hooks/useWorkouts";
import { ROUTES } from "@/shared/constants";
import type { WorkoutHistoryWithSets } from "@/features/workouts/types/workout.types";
import { WorkoutHistoryCard } from "@/features/workouts/components/WorkoutHistoryCard";
import { History } from "lucide-react";

export function WorkoutHistoryPage() {
  const { data: workouts, isLoading, error } = useWorkouts();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-48 bg-surface-hover rounded-xl" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-surface border border-border rounded-3xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-medium">Failed to load history.</p>
        <p className="text-text-secondary text-sm">{error.message}</p>
      </div>
    );
  }

  const typedWorkouts = workouts as WorkoutHistoryWithSets[] | undefined;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
            History
          </h1>
          <p className="text-text-secondary">Your past workouts.</p>
        </div>
        <Link
          to={ROUTES.WORKOUT_LOG}
          className="px-4 py-2 bg-brand-muted/10 text-brand-DEFAULT font-bold rounded-xl hover:bg-brand-muted/20 transition-colors"
        >
          + New
        </Link>
      </div>

      {(!typedWorkouts || typedWorkouts.length === 0) ? (
        <div className="bg-surface border border-border rounded-3xl p-10 text-center space-y-4 shadow-sm flex flex-col items-center">
          <History size={64} className="text-border" />
          <h3 className="text-xl font-bold text-text-primary">No Workouts Yet</h3>
          <p className="text-text-secondary max-w-sm mx-auto">
            You haven't logged any workouts. Head over to the Hub to start your first session!
          </p>
          <Link
            to={ROUTES.WORKOUT_LOG}
            className="inline-block mt-2 px-6 py-3 bg-brand-DEFAULT text-white font-bold rounded-xl"
          >
            Start Workout
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {typedWorkouts.map((workout) => (
            <WorkoutHistoryCard key={workout.id as string} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}
