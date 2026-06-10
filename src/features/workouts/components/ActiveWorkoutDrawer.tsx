import { useState } from "react";
import { Link } from "react-router-dom";
import { useWorkoutStore } from "../store/workoutStore";
import { useSaveWorkout } from "../hooks/useWorkouts";
import { ROUTES } from "@/shared/constants";
import { WorkoutTimer } from "./WorkoutTimer";
import { WorkoutSetRow } from "./WorkoutSetRow";
import toast from "react-hot-toast";
import { Dumbbell, Plus, X } from "lucide-react";

export function ActiveWorkoutDrawer() {
  const { status, startedAt, exercises, finishWorkout, cancelWorkout, removeExercise, addSet } =
    useWorkoutStore();
  const { mutate: saveWorkout, isPending } = useSaveWorkout();

  const [isExpanded, setIsExpanded] = useState(false);

  if (status === "idle") return null;

  const handleFinish = () => {
    if (exercises.length === 0) {
      toast.error("Please add at least one exercise to finish your workout.");
      return;
    }

    // Validation: Check that every set has valid weight and reps
    for (const ex of exercises) {
      for (const s of ex.sets) {
        if (s.weight_kg === "" || s.reps === "" || Number(s.reps) <= 0) {
          toast.error(`Please enter valid weight and reps for all sets in ${ex.exercise.name}.`);
          return;
        }
      }
    }

    const payload = {
      startedAt: startedAt as string,
      endedAt: new Date().toISOString(),
      exercises: exercises.map((ex) => ({
        exercise_id: ex.exercise.id as string,
        sets: ex.sets.map((s) => ({
          set_number: s.set_number,
          weight_kg: s.weight_kg === "" ? null : Number(s.weight_kg),
          reps: s.reps === "" ? null : Number(s.reps),
          is_completed: s.is_completed,
        })),
      })),
    };

    saveWorkout(payload, {
      onSuccess: () => {
        finishWorkout();
        setIsExpanded(false);
        toast.success("Workout saved! ");
      },
      onError: (err) => {
        toast.error("Failed to save workout: " + err.message);
      },
    });
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this workout? All progress will be lost.")) {
      cancelWorkout();
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (Mini State) */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 bg-brand-DEFAULT text-white px-5 py-3 rounded-2xl shadow-lg shadow-brand-DEFAULT/30 hover:-translate-y-1 transition-all z-40 flex items-center gap-3 border border-white/10 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-bold">Active Workout</span>
          <WorkoutTimer />
        </button>
      )}

      {/* Full Drawer State */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl animate-slide-up sm:p-4">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 bg-surface border-b border-border sm:rounded-t-3xl shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                Current Session
              </h2>
              <div className="text-sm text-text-secondary mt-1">
                Duration: <WorkoutTimer />
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
              title="Minimize"
            >
              ↓
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {exercises.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="flex justify-center text-border">
                  <Dumbbell size={64} />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Empty Workout</h3>
                <p className="text-text-secondary text-sm max-w-xs mx-auto">
                  You haven't added any exercises yet.
                </p>
                <Link
                  to={ROUTES.EXERCISES}
                  onClick={() => setIsExpanded(false)}
                  className="inline-block mt-4 px-6 py-2 bg-brand-DEFAULT/10 text-brand-DEFAULT font-bold rounded-xl hover:bg-brand-DEFAULT/20 transition-colors"
                >
                  Browse Exercises
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {exercises.map((ex) => (
                  <div key={ex.exercise.id} className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
                    {/* Exercise Header */}
                    <div className="px-4 py-3 bg-surface-hover/50 border-b border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-muted/20 text-brand-DEFAULT flex items-center justify-center font-bold text-xs uppercase">
                          {ex.exercise.target_muscle.substring(0, 2)}
                        </div>
                        <h3 className="font-bold text-text-primary">{ex.exercise.name}</h3>
                      </div>
                      <button
                        onClick={() => removeExercise(ex.exercise.id as string)}
                        className="text-text-muted hover:text-red-500 p-2 transition-colors"
                        title="Remove Exercise"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Sets List */}
                    <div className="p-2 space-y-1">
                      {/* Column Headers */}
                      <div className="grid grid-cols-[auto_1fr_1fr_auto_auto] gap-3 px-3 py-1 text-xs font-bold text-text-muted uppercase tracking-wider">
                        <div className="w-8 text-center">Set</div>
                        <div className="text-center">kg</div>
                        <div className="text-center">Reps</div>
                        <div className="w-8 text-center"></div>
                        <div className="w-8"></div>
                      </div>

                      {ex.sets.map((set) => (
                        <WorkoutSetRow key={set.id} exerciseId={ex.exercise.id as string} set={set} />
                      ))}
                    </div>

                    {/* Add Set Button */}
                    <div className="p-2 border-t border-border/50 bg-surface-hover/20">
                      <button
                        onClick={() => addSet(ex.exercise.id as string)}
                        className="w-full py-2 text-sm font-bold text-brand-DEFAULT hover:bg-brand-DEFAULT/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={16} />
                        <span>Add Set</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Exercise CTA */}
                <Link
                  to={ROUTES.EXERCISES}
                  onClick={() => setIsExpanded(false)}
                  className="w-full py-4 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-text-secondary font-bold hover:border-brand-muted hover:text-brand-DEFAULT hover:bg-brand-DEFAULT/5 transition-all"
                >
                  <Plus size={20} />
                  <span>Add Another Exercise</span>
                </Link>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 bg-surface border-t border-border sm:rounded-b-3xl flex gap-4 shadow-lg safe-area-bottom">
            <button
              onClick={handleCancel}
              className="px-6 py-4 bg-surface-hover text-red-500 font-bold rounded-xl hover:bg-red-500/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleFinish}
              disabled={isPending}
              className="flex-1 py-4 bg-gradient-to-r from-brand-DEFAULT to-brand-secondary text-white rounded-xl font-bold shadow-lg shadow-brand-DEFAULT/20 hover:shadow-brand-DEFAULT/40 transition-shadow disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isPending ? "Saving..." : "Finish Workout "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
