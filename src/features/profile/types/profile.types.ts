export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  weight_unit: "kg" | "lbs";
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdatePayload {
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  weight_unit?: "kg" | "lbs";
}
