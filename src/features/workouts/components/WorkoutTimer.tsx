import { memo } from "react";
import { useWorkoutTimer } from "../hooks/useWorkoutTimer";
import { useWorkoutStore } from "../store/workoutStore";

// Extracted into a separate component so that the every-second re-render
// of the timer does NOT cause the entire ActiveWorkoutDrawer to re-render.
export const WorkoutTimer = memo(function WorkoutTimer() {
  const startedAt = useWorkoutStore((s) => s.startedAt);
  const formattedTime = useWorkoutTimer(startedAt);

  return (
    <span className="text-text-secondary text-sm font-medium tabular-nums tracking-wider bg-surface-hover px-2 py-1 rounded-md">
      {formattedTime}
    </span>
  );
});
