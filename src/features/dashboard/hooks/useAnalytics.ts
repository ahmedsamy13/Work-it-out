import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../api/analyticsApi";
import { useDashboardStore } from "../store/dashboardStore";

export function useAnalytics() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: analyticsApi.getSummary,
  });
}

export function useProgressData(exerciseId: string) {
  const timeRange = useDashboardStore((s) => s.timeRange);

  return useQuery({
    queryKey: ["progress", exerciseId, timeRange],
    queryFn: () => analyticsApi.getProgressData(exerciseId, timeRange),
    enabled: !!exerciseId,
  });
}
