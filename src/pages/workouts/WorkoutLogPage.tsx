import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { useWorkoutStore } from "@/features/workouts/store/workoutStore";
import toast from "react-hot-toast";
import { Play, Dumbbell, History } from "lucide-react";

export function WorkoutLogPage() {
  const { status, startWorkout } = useWorkoutStore();

  const handleStartWorkout = () => {
    if (status !== "idle") {
      toast.error("A workout is already in progress!");
      return;
    }
    startWorkout();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          Workout Hub
        </h1>
        <p className="text-text-secondary text-lg">
          Start a new session or browse your templates.
        </p>
      </div>

      {/* Quick Start Card */}
      <div className="bg-surface border border-border p-6 sm:p-8 rounded-3xl shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-brand-muted/20 text-brand-DEFAULT rounded-full flex items-center justify-center mx-auto">
          <Play size={32} fill="currentColor" className="ml-1" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Quick Start</h2>
          <p className="text-text-secondary max-w-sm mx-auto">
            Start an empty workout right now and add exercises as you go.
          </p>
        </div>
        <button
          onClick={handleStartWorkout}
          className="w-full px-6 py-4 sm:w-auto sm:px-8 bg-gradient-to-r from-brand-DEFAULT to-brand-secondary text-white font-bold text-lg rounded-2xl shadow-lg shadow-brand-DEFAULT/20 hover:shadow-brand-DEFAULT/40 hover:-translate-y-0.5 active:scale-95 transition-all"
        >
          {status === "active" ? "Resume Workout" : "Start Empty Workout"}
        </button>
      </div>

      {/* Routines / Templates Section (Phase 2) */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-text-primary">My Routines</h2>
        <div className="bg-surface border border-border rounded-3xl p-8 text-center shadow-sm">
          <p className="text-text-secondary">
            Routine templates are coming soon! You will be able to save your favorite combinations here.
          </p>
        </div>
      </div>

      {/* Other Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to={ROUTES.EXERCISES}
          className="bg-surface-hover/50 border border-border p-6 rounded-3xl hover:border-brand-muted hover:shadow-brand-muted/10 transition-all group"
        >
          <span className="mb-3 block text-brand-DEFAULT"><Dumbbell size={24} /></span>
          <h3 className="font-bold text-text-primary text-lg mb-1 group-hover:text-brand-DEFAULT transition-colors">
            Browse Exercises
          </h3>
          <p className="text-sm text-text-secondary">
            Find the perfect movement and add it to your session.
          </p>
        </Link>

        <Link
          to={ROUTES.WORKOUT_HISTORY}
          className="bg-surface-hover/50 border border-border p-6 rounded-3xl hover:border-brand-muted hover:shadow-brand-muted/10 transition-all group"
        >
          <span className="mb-3 block text-brand-DEFAULT"><History size={24} /></span>
          <h3 className="font-bold text-text-primary text-lg mb-1 group-hover:text-brand-DEFAULT transition-colors">
            History
          </h3>
          <p className="text-sm text-text-secondary">
            Review your past workouts and see your progress.
          </p>
        </Link>
      </div>
    </div>
  );
}
