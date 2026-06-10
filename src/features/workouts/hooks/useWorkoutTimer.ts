import { useState, useEffect } from "react";

export function useWorkoutTimer(startedAt: string | null) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startedAt) {
      setElapsedSeconds(0);
      return;
    }

    const start = new Date(startedAt).getTime();

    // Initial calculation
    const now = new Date().getTime();
    setElapsedSeconds(Math.floor((now - start) / 1000));

    // Update every second
    const intervalId = setInterval(() => {
      const current = new Date().getTime();
      setElapsedSeconds(Math.floor((current - start) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startedAt]);

  // Format as MM:SS (or HH:MM:SS if over an hour)
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return formatTime(elapsedSeconds);
}
