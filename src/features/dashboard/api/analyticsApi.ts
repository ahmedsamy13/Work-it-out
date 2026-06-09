import { apiClient } from "@/shared/lib";
import type { ApiResponse } from "@/shared/types";
import type { DashboardSummary, ProgressDataPoint, ChartTimeRange } from "../types";

const BASE_PATH = "/analytics";

export const analyticsApi = {
  getSummary: async (): Promise<ApiResponse<DashboardSummary>> => {
    const { data } = await apiClient.get<ApiResponse<DashboardSummary>>(
      `${BASE_PATH}/summary`
    );
    return data;
  },

  getProgressData: async (
    exerciseId: string,
    range: ChartTimeRange
  ): Promise<ApiResponse<ProgressDataPoint[]>> => {
    const { data } = await apiClient.get<ApiResponse<ProgressDataPoint[]>>(
      `${BASE_PATH}/progress/${exerciseId}`,
      { params: { range } }
    );
    return data;
  },

  getVolumeData: async (
    range: ChartTimeRange
  ): Promise<ApiResponse<ProgressDataPoint[]>> => {
    const { data } = await apiClient.get<ApiResponse<ProgressDataPoint[]>>(
      `${BASE_PATH}/volume`,
      { params: { range } }
    );
    return data;
  },
};
