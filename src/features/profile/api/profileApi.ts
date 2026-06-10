import { supabase } from "@/shared/lib/supabase";
import type { UserProfile, ProfileUpdatePayload } from "../types/profile.types";

export const profileApi = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // PGRST116: The result contains 0 rows (no profile found)
        throw new Error("Profile not found. Please run the SQL migration script.");
      }
      throw new Error(error.message);
    }
    
    return data;
  },

  updateProfile: async (userId: string, payload: ProfileUpdatePayload): Promise<UserProfile> => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
