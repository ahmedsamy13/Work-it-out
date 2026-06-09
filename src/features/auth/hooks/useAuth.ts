import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import type { LoginCredentials, RegisterCredentials } from "../types";

/**
 * Auth hook providing login, register, logout, and current user state.
 */
export function useAuth() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);
  const logoutAction = useAuthStore((s) => s.logout);
  const setLoading = useAuthStore((s) => s.setLoading);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setUser(data.user);
      navigate(ROUTES.DASHBOARD);
    },
    onSettled: () => setLoading(false),
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      authApi.register(credentials),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setUser(data.user);
      navigate(ROUTES.DASHBOARD);
    },
    onSettled: () => setLoading(false),
  });

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      logoutAction();
      navigate(ROUTES.LOGIN);
    }
  };

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
