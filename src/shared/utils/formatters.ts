// ─── Formatters ────────────────────────────────────────────────────
// Pure utility functions for formatting display values.

/**
 * Format a date string or Date object into a human-readable format.
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

/**
 * Format weight with unit (kg or lbs).
 */
export function formatWeight(value: number, unit: "kg" | "lbs" = "kg"): string {
  return `${value}${unit}`;
}

/**
 * Format duration in seconds to a mm:ss display string.
 */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
