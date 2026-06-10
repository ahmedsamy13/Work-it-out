import { useState, useEffect, memo } from "react";
import type { ActiveWorkoutSet } from "../types/workout.types";
import { useWorkoutStore } from "../store/workoutStore";

interface WorkoutSetRowProps {
  exerciseId: string;
  set: ActiveWorkoutSet;
}

// Extracted to prevent typing from causing the entire drawer to re-render.
// Uses local state for fast typing, syncs to Zustand on blur.
export const WorkoutSetRow = memo(function WorkoutSetRow({ exerciseId, set }: WorkoutSetRowProps) {
  const { updateSet, removeSet, toggleSetComplete } = useWorkoutStore();

  // Local state for buttery smooth typing
  const [localWeight, setLocalWeight] = useState(set.weight_kg);
  const [localReps, setLocalReps] = useState(set.reps);

  // Sync from props if external state changes (e.g. adding a new set copies previous)
  useEffect(() => {
    setLocalWeight(set.weight_kg);
    setLocalReps(set.reps);
  }, [set.weight_kg, set.reps]);

  const handleBlurWeight = () => {
    if (localWeight !== set.weight_kg) {
      updateSet(exerciseId, set.id, "weight_kg", localWeight);
    }
  };

  const handleBlurReps = () => {
    if (localReps !== set.reps) {
      updateSet(exerciseId, set.id, "reps", localReps);
    }
  };

  return (
    <div
      className={`grid grid-cols-[auto_1fr_1fr_auto_auto] gap-3 items-center py-2 px-3 rounded-xl transition-colors ${
        set.is_completed ? "bg-brand-DEFAULT/5" : "hover:bg-surface-hover"
      }`}
    >
      <div className="w-8 text-center text-text-muted font-bold text-sm">
        {set.set_number}
      </div>

      <input
        type="number"
        value={localWeight}
        onChange={(e) => setLocalWeight(e.target.value)}
        onBlur={handleBlurWeight}
        placeholder="kg"
        disabled={set.is_completed}
        className={`w-full bg-surface border border-border rounded-lg px-3 py-2 text-center text-text-primary focus:outline-none focus:border-brand-DEFAULT transition-colors disabled:opacity-50 ${
          set.is_completed ? "border-transparent bg-transparent" : ""
        }`}
      />

      <input
        type="number"
        value={localReps}
        onChange={(e) => setLocalReps(e.target.value)}
        onBlur={handleBlurReps}
        placeholder="reps"
        disabled={set.is_completed}
        className={`w-full bg-surface border border-border rounded-lg px-3 py-2 text-center text-text-primary focus:outline-none focus:border-brand-DEFAULT transition-colors disabled:opacity-50 ${
          set.is_completed ? "border-transparent bg-transparent" : ""
        }`}
      />

      <button
        onClick={() => toggleSetComplete(exerciseId, set.id)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
          set.is_completed
            ? "bg-brand-DEFAULT text-white shadow-md shadow-brand-DEFAULT/30"
            : "bg-surface border border-border text-transparent hover:border-brand-muted"
        }`}
        aria-label="Toggle Complete"
      >
        
      </button>

      <button
        onClick={() => removeSet(exerciseId, set.id)}
        disabled={set.is_completed}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:hover:text-text-muted disabled:hover:bg-transparent"
        title="Remove Set"
      >
        
      </button>
    </div>
  );
});
