import { useMemo } from "react";
import { useAnalytics } from "@/features/dashboard/hooks/useAnalytics";
import { useWorkouts } from "@/features/workouts/hooks/useWorkouts";
import { Check, Flame } from "lucide-react";

export function WeeklyActivityRing() {
  const { analytics, isLoading } = useAnalytics();
  const { data: workouts } = useWorkouts();

  const weeklyData = useMemo(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    const days = ["M", "T", "W", "T", "F", "S", "S"];
    
    return days.map((dayLabel, index) => {
      const dateForDay = new Date(startOfWeek);
      dateForDay.setDate(startOfWeek.getDate() + index);
      const dateStr = dateForDay.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      const hasWorkout = analytics?.volumeData.some(
        (d) => d.name === dateStr && d.volume > 0
      );

      const isToday = dateForDay.toDateString() === today.toDateString();
      const isPast = dateForDay.getTime() < today.getTime() && !isToday;

      return {
        label: dayLabel,
        hasWorkout,
        isToday,
        isPast,
      };
    });
  }, [analytics]);

  const workoutsThisWeek = useMemo(() => {
    if (!workouts || workouts.length === 0) return 0;
    
    const today = new Date();
    const currentDayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return workouts.filter((w) => {
      const wDate = new Date(w.started_at);
      return wDate >= startOfWeek && wDate < endOfWeek;
    }).length;
  }, [workouts]);

  if (isLoading) {
    return <div className="h-24 bg-surface border border-border rounded-3xl animate-pulse" />;
  }

  return (
    <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-lg font-bold text-text-primary">This Week</h2>
          <p className="text-sm text-text-secondary">
            {workoutsThisWeek} {workoutsThisWeek === 1 ? "workout" : "workouts"} completed
          </p>
        </div>
        {workoutsThisWeek > 0 && (
          <div className="text-brand-DEFAULT animate-bounce">
            <Flame fill="currentColor" size={24} />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center max-w-sm">
        {weeklyData.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1 sm:gap-2">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base rounded-full flex items-center justify-center font-bold transition-all ${
                day.hasWorkout
                  ? "bg-brand-DEFAULT text-white shadow-md shadow-brand-DEFAULT/30"
                  : day.isToday
                  ? "border-2 border-brand-DEFAULT text-brand-DEFAULT bg-brand-muted/10"
                  : day.isPast
                  ? "bg-surface-hover text-text-muted"
                  : "bg-bg-base text-text-muted/50 border border-border border-dashed"
              }`}
            >
              {day.hasWorkout ? <Check size={16} strokeWidth={4} /> : day.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
