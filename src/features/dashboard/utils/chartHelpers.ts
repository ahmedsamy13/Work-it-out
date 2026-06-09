import type { ProgressDataPoint } from "../types";

/**
 * Calculate the percentage change between first and last data points.
 */
export function calculateTrend(data: ProgressDataPoint[]): number | null {
  if (data.length < 2) return null;
  const first = data[0]!.value;
  const last = data[data.length - 1]!.value;
  if (first === 0) return null;
  return ((last - first) / first) * 100;
}
