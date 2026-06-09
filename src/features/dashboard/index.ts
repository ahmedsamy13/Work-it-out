// ─── Dashboard Feature: Public API ─────────────────────────────────

// Types
export type {
  ProgressDataPoint,
  PersonalRecord,
  WeeklyOverview,
  DashboardSummary,
  ChartTimeRange,
} from "./types";

// Store
export { useDashboardStore } from "./store/dashboardStore";

// Hooks
export { useAnalytics, useProgressData } from "./hooks";

// API
export { analyticsApi } from "./api/analyticsApi";

// Utils
export { calculateTrend } from "./utils/chartHelpers";
