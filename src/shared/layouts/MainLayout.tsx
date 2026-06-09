import { Outlet, NavLink } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { useState } from "react";
import heroImg from "@/assets/hero.png";
import { useAuth } from "@/features/auth";
import { Modal, Button } from "@/shared/ui";

/**
 * MainLayout — The primary layout shell for authenticated pages.
 * Renders a collapsible sidebar, top header, and page content via <Outlet />.
 */
export function MainLayout() {
  const { logout } = useAuth();
  const [openSideBar, setOpenSideBar] = useState<boolean>(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const navItems = [
    { to: ROUTES.HOME, label: "Home", icon: "🏠" },
    { to: ROUTES.EXERCISES, label: "Exercises", icon: "💪" },
    { to: ROUTES.WORKOUT_LOG, label: "New Workout", icon: "🏋️" },
    { to: ROUTES.WORKOUT_HISTORY, label: "History", icon: "📋" },
    { to: ROUTES.DASHBOARD, label: "Dashboard", icon: "📊" },
    { to: ROUTES.PROFILE, label: "Profile", icon: "👤" },
  ];

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  return (
    <div className="flex h-screen bg-bg-base text-text-primary">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        className={`${
          openSideBar ? "w-64" : "w-20"
        } flex-col border-r border-border bg-bg-subtle/50 flex transition-all duration-300 relative`}
      >
        {/* Toggle Button (Absolute positioning for better handling) */}
        <button
          onClick={() => setOpenSideBar((prev) => !prev)}
          className="absolute -right-3 top-6 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-border bg-surface-raised text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary shadow-sm"
          aria-label={openSideBar ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {openSideBar ? "◀" : "▶"}
        </button>

        <div
          className={`flex h-16 items-center ${
            openSideBar ? "gap-2 px-6" : "justify-center"
          } border-b border-border`}
        >
          <span
            className="text-xl font-bold flex items-center justify-center"
            style={{
              background:
                "linear-gradient(to right, var(--color-text-brand), var(--color-brand-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {openSideBar ? (
              "Work It Out"
            ) : (
              <img
                src={heroImg}
                alt="logo"
                className="h-8 w-8 object-contain"
              />
            )}
          </span>
        </div>

        <div className="flex h-full flex-col justify-between p-2">
          <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center ${
                    openSideBar ? "gap-3 px-3" : "justify-center"
                  } rounded-lg py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-brand-muted text-text-brand"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                  }`
                }
                title={!openSideBar ? item.label : undefined}
              >
                <span className="text-lg">{item.icon}</span>
                {openSideBar && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-2 pb-4 pt-2 border-t border-border mt-2">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className={`flex w-full items-center ${
                openSideBar ? "gap-3 px-3" : "justify-center"
              } cursor-pointer rounded-lg py-2.5 text-sm font-medium text-status-danger-text transition-colors duration-200 hover:bg-status-danger-solid/10`}
              title={!openSideBar ? "Logout" : undefined}
            >
              <span className="text-lg">🚪</span>
              {openSideBar && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <h1 className="text-lg font-semibold text-text-primary">
            Work It Out
          </h1>
          <div className="flex items-center gap-4">
            {/* Future: notification bell, user avatar dropdown */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* ── Logout Confirmation Modal ───────────────────── */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Logout"
        size="sm"
      >
        <p className="text-text-secondary mb-6 mt-2">
          Are you sure you want to log out of your account?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setIsLogoutModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogoutConfirm}>
            Logout
          </Button>
        </div>
      </Modal>
    </div>
  );
}
