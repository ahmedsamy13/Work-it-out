import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { useAnalytics } from "@/features/dashboard/hooks/useAnalytics";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { VolumeChart } from "@/features/dashboard/components/VolumeChart";
import { MuscleChart } from "@/features/dashboard/components/MuscleChart";
import { Activity, Scale } from "lucide-react";

export function DashboardPage() {
  const { analytics, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-28 bg-surface border border-border rounded-3xl" />
          <div className="h-28 bg-surface border border-border rounded-3xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-surface border border-border rounded-3xl" />
          <div className="h-80 bg-surface border border-border rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-medium">Failed to load analytics.</p>
        <p className="text-text-secondary text-sm">{error.message}</p>
      </div>
    );
  }

  const { totalWorkouts, totalVolume, volumeData, muscleData } = analytics;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Dashboard
          </h1>
          <p className="text-text-secondary">Your fitness analytics.</p>
        </div>
        <Link
          to={ROUTES.WORKOUT_LOG}
          className="px-4 py-2 bg-brand-DEFAULT text-white font-bold rounded-xl shadow-lg hover:shadow-brand-DEFAULT/30 hover:-translate-y-0.5 transition-all"
        >
          + New Workout
        </Link>
      </div>

      {totalWorkouts === 0 ? (
        <div className="bg-surface border border-border rounded-3xl p-10 text-center space-y-4 shadow-sm">
          <span className="text-5xl"></span>
          <h3 className="text-xl font-bold text-text-primary">No Data Yet</h3>
          <p className="text-text-secondary max-w-sm mx-auto">
            Log some workouts to see your beautiful progress charts here!
          </p>
        </div>
      ) : (
        <>
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard 
              title="Total Workouts" 
              value={totalWorkouts} 
              icon={<Activity size={24} />} 
              iconBg="bg-brand-muted/20" 
              iconColor="text-brand-DEFAULT" 
            />
            <StatCard 
              title="Total Volume" 
              value={totalVolume.toLocaleString()} 
              suffix="kg"
              icon={<Scale size={24} />} 
              iconBg="bg-purple-500/20" 
              iconColor="text-purple-500" 
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VolumeChart data={volumeData} />
            <MuscleChart data={muscleData} />
          </div>
        </>
      )}
    </div>
  );
}
