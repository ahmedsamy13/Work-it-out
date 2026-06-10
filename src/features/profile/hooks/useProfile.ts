import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../api/profileApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { ProfileUpdatePayload } from "../types/profile.types";

export function useProfile() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => {
      if (!user) throw new Error("Not authenticated");
      return profileApi.getProfile(user.id);
    },
    enabled: !!user,
  });
}

export function useUpdateProfile() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileUpdatePayload) => {
      if (!user) throw new Error("Not authenticated");
      return profileApi.updateProfile(user.id, payload);
    },
    onSuccess: () => {
      // Invalidate the profile query so it refetches the fresh data
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}
