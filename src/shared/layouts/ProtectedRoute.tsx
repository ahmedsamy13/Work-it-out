// ─── Protected Route ────────────────────────────────────────────────
// Redirects unauthenticated users to the login page.

import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { useAuthStore } from "@/features/auth";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
