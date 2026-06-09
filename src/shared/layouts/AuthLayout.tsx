import { Outlet } from "react-router-dom";

/**
 * AuthLayout — Centered card layout for login and registration pages.
 */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-base px-4 py-12">
      <div className="w-full max-w-md">
        {/* ── Brand header ────────────────────────────────── */}
        <div className="mb-8 text-center">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              background:
                "linear-gradient(to right, var(--color-text-brand), var(--color-brand-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Work It Out
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Your personal gym companion
          </p>
        </div>

        {/* ── Card container ──────────────────────────────── */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-lg">
          {/* Gradient accent bar */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(to right, var(--color-brand-DEFAULT), var(--color-brand-secondary))",
            }}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
