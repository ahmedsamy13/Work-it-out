import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { useWorkoutStore } from "@/features/workouts/store/workoutStore";
import { Play, ClipboardList, BookOpen, ArrowRight } from "lucide-react";

export function QuickActions() {
  const navigate = useNavigate();
  const startWorkout = useWorkoutStore((s) => s.startWorkout);

  const handleStartWorkout = () => {
    startWorkout();
    // Navigate to the hub so the drawer opens in a predictable context,
    // though the drawer will pop up anywhere.
    navigate(ROUTES.HOME);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Primary Action */}
      <button
        onClick={handleStartWorkout}
        className="group relative overflow-hidden bg-brand-DEFAULT text-white p-6 rounded-3xl shadow-lg shadow-brand-DEFAULT/30 hover:shadow-brand-DEFAULT/50 hover:-translate-y-1 transition-all text-left flex flex-col justify-between min-h-[140px]"
      >
        <div className="absolute -right-6 -top-6 text-white opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Play size={120} strokeWidth={1.5} fill="currentColor" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold mb-1">Start Empty Workout</h3>
          <p className="text-white/80 text-sm font-medium">Log a new session from scratch.</p>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm self-end group-hover:bg-white/30 transition-colors">
          <ArrowRight size={20} />
        </div>
      </button>

      {/* Secondary Action: Routines (Phase 2 Placeholder) */}
      <Link
        to={ROUTES.WORKOUT_LOG}
        className="group bg-surface border border-border p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-muted hover:-translate-y-1 transition-all text-left flex flex-col justify-between min-h-[140px]"
      >
        <div>
          <div className="mb-2 text-brand-DEFAULT"><ClipboardList size={24} /></div>
          <h3 className="text-lg font-bold text-text-primary mb-1">My Routines</h3>
          <p className="text-text-secondary text-sm">Launch a pre-built template.</p>
        </div>
      </Link>

      {/* Tertiary Action: Exercises */}
      <Link
        to={ROUTES.EXERCISES}
        className="group bg-surface border border-border p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-muted hover:-translate-y-1 transition-all text-left flex flex-col justify-between min-h-[140px]"
      >
        <div>
          <div className="mb-2 text-brand-DEFAULT"><BookOpen size={24} /></div>
          <h3 className="text-lg font-bold text-text-primary mb-1">Browse Exercises</h3>
          <p className="text-text-secondary text-sm">Find instructions and form.</p>
        </div>
      </Link>
    </div>
  );
}
