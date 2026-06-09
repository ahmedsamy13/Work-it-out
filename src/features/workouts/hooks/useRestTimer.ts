import { useEffect, useRef } from "react";
import { useWorkoutStore } from "../store/workoutStore";

/**
 * Manages the rest timer between sets.
 * Automatically ticks every second when running.
 */
export function useRestTimer() {
  const restTimer = useWorkoutStore((s) => s.restTimer);
  const startRestTimer = useWorkoutStore((s) => s.startRestTimer);
  const tickRestTimer = useWorkoutStore((s) => s.tickRestTimer);
  const stopRestTimer = useWorkoutStore((s) => s.stopRestTimer);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (restTimer.isRunning) {
      intervalRef.current = setInterval(tickRestTimer, 1_000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [restTimer.isRunning, tickRestTimer]);

  return {
    isRunning: restTimer.isRunning,
    remainingSeconds: restTimer.remainingSeconds,
    start: startRestTimer,
    stop: stopRestTimer,
  };
}
