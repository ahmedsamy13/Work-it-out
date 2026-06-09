// ─── Exercise API Module ───────────────────────────────────────────

import { apiClient } from "@/shared/lib";
import type { ApiResponse, PaginatedResponse } from "@/shared/types";
import type { Exercise, ExerciseFilters } from "../types";

const BASE_PATH = "/exercises";

export const exerciseApi = {
  /**
   * Fetch paginated exercises with optional filters.
   */
  getAll: async (
    page = 1,
    limit = 20,
    filters?: Partial<ExerciseFilters>
  ): Promise<PaginatedResponse<Exercise>> => {
    const params = { page, limit, ...filters };
    const { data } = await apiClient.get<PaginatedResponse<Exercise>>(BASE_PATH, { params });
    return data;
  },

  /**
   * Fetch a single exercise by ID.
   */
  getById: async (id: string): Promise<ApiResponse<Exercise>> => {
    const { data } = await apiClient.get<ApiResponse<Exercise>>(`${BASE_PATH}/${id}`);
    return data;
  },

  /**
   * Search exercises by name or description.
   */
  search: async (query: string): Promise<ApiResponse<Exercise[]>> => {
    const { data } = await apiClient.get<ApiResponse<Exercise[]>>(`${BASE_PATH}/search`, {
      params: { q: query },
    });
    return data;
  },
};
