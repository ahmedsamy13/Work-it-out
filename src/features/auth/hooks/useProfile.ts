import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import type { User } from "../types";

/**
 * Hook for reading and updating the current user's profile.
 */
export function useProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: (updates: Partial<Pick<User, "displayName" | "avatarUrl" | "preferences">>) =>
      authApi.updateProfile(updates),
    onSuccess: ({ data }) => {
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return {
    profile: profileQuery.data?.data ?? null,
    isLoading: profileQuery.isLoading,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
