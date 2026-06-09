// ─── Exercise API Module ───────────────────────────────────────────

import { supabase } from "@/shared/lib";
import type { Exercise } from "../types";

export const exerciseApi = {
  /**
   * Fetch paginated exercises with optional filters.
   */
  getAll: async (): Promise<Exercise[]> => {
    const { data, error } = await supabase.from("exercises").select("*");
    if (error) throw error;
    return data;
  },

  /**
   * Fetch a single exercise by ID.
   */
  getById: async (id: string): Promise<Exercise> => {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Search exercises by name .
   */
  search: async (query: string): Promise<Exercise[]> => {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .ilike("name", `%${query}%`);

    if (error) throw error;
    return data;
  },
};
