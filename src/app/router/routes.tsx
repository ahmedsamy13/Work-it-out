import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { MainLayout, AuthLayout, ProtectedRoute } from "@/shared/layouts";


// ─── Pages ─────────────────────────────────────────────────────────
import { HomePage } from "@/pages/home";
import { ExerciseListPage, ExerciseDetailPage } from "@/pages/exercises";
import { WorkoutLogPage, WorkoutHistoryPage } from "@/pages/workouts";
import { DashboardPage } from "@/pages/dashboard";
import { LoginPage, RegisterPage } from "@/pages/auth";
import { ProfilePage, SettingsPage } from "@/pages/profile";

export const router = createBrowserRouter([
  // ── Auth Routes (public) ───────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
    ],
  },

  // ── App Routes (protected) ────────────────────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.HOME, element: <HomePage /> },
          { path: ROUTES.EXERCISES, element: <ExerciseListPage /> },
          { path: ROUTES.EXERCISE_DETAIL, element: <ExerciseDetailPage /> },
          { path: ROUTES.WORKOUT_LOG, element: <WorkoutLogPage /> },
          { path: ROUTES.WORKOUT_HISTORY, element: <WorkoutHistoryPage /> },
          { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
          { path: ROUTES.PROFILE, element: <ProfilePage /> },
          { path: ROUTES.SETTINGS, element: <SettingsPage /> },
        ],
      },
    ],
  },
]);
