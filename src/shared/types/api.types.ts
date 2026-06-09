// ─── Shared Types: API ──────────────────────────────────────────────
// Generic types for API communication used across all features.

/** Standard API response wrapper */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

/** Paginated API response */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

/** Standard API error shape */
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
