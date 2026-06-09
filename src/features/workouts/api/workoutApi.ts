// ─── Workout API Module ────────────────────────────────────────────

import { apiClient } from "@/shared/lib";
import type { ApiResponse, PaginatedResponse } from "@/shared/types";
import type { Workout } from "../types";

const BASE_PATH = "/workouts";

export const workoutApi = {
  getAll: async (page = 1, limit = 20): Promise<PaginatedResponse<Workout>> => {
    const { data } = await apiClient.get<PaginatedResponse<Workout>>(BASE_PATH, {
      params: { page, limit },
    });
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Workout>> => {
    const { data } = await apiClient.get<ApiResponse<Workout>>(`${BASE_PATH}/${id}`);
    return data;
  },

  create: async (workout: Omit<Workout, "id">): Promise<ApiResponse<Workout>> => {
    const { data } = await apiClient.post<ApiResponse<Workout>>(BASE_PATH, workout);
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`${BASE_PATH}/${id}`);
    return data;
  },
};
