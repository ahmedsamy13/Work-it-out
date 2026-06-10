import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { useWorkouts } from "@/features/workouts/hooks/useWorkouts";
import { WorkoutHistoryCard } from "@/features/workouts/components/WorkoutHistoryCard";
import type { WorkoutHistoryWithSets } from "@/features/workouts/types/workout.types";

export function RecentActivityFeed() {
  const { data: workouts, isLoading } = useWorkouts();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-40 bg-surface border border-border rounded-3xl" />
      </div>
    );
  }

  const typedWorkouts = workouts as WorkoutHistoryWithSets[] | undefined;
  
  if (!typedWorkouts || typedWorkouts.length === 0) {
    return null; // Don't show the section at all if they have no history
  }

  // Get the 2 most recent workouts
  const recentWorkouts = typedWorkouts.slice(0, 2);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-text-primary">Recent Activity</h2>
        <Link 
          to={ROUTES.WORKOUT_HISTORY}
          className="text-sm font-bold text-brand-DEFAULT hover:text-brand-secondary transition-colors"
        >
          View All →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recentWorkouts.map((workout) => (
          <WorkoutHistoryCard key={workout.id as string} workout={workout} />
        ))}
      </div>
    </div>
  );
}
