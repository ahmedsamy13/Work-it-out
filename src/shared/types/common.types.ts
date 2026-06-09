// ─── Shared Types: Common ───────────────────────────────────────────
// Cross-cutting types used throughout the application.

/** Branded ID type for type safety */
export type ID = string;

/** ISO 8601 timestamp string */
export type Timestamp = string;

/** Generic select/dropdown option */
export interface SelectOption<T = string> {
  label: string;
  value: T;
}

/** Sort direction */
export type SortDirection = "asc" | "desc";

/** Generic pagination params for API calls */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}

/** Loading state union for async operations */
export type AsyncStatus = "idle" | "loading" | "success" | "error";
