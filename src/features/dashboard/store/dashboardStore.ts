import { create } from "zustand";
import type { ChartTimeRange } from "../types";

interface DashboardState {
  timeRange: ChartTimeRange;
  setTimeRange: (range: ChartTimeRange) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  timeRange: "1m",
  setTimeRange: (range) => set({ timeRange: range }),
}));
