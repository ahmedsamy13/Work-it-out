import { NavLink } from "react-router-dom";
import { ROUTES } from "@/shared/constants";
import { Home, Dumbbell, History, LayoutDashboard, User } from "lucide-react";

export function BottomNav() {
  const navItems = [
    { to: ROUTES.HOME, label: "Home", icon: <Home size={24} /> },
    { to: ROUTES.EXERCISES, label: "Exercises", icon: <Dumbbell size={24} /> },
    { to: ROUTES.WORKOUT_HISTORY, label: "History", icon: <History size={24} /> },
    { to: ROUTES.DASHBOARD, label: "Dashboard", icon: <LayoutDashboard size={24} /> },
    { to: ROUTES.PROFILE, label: "Profile", icon: <User size={24} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-bg-base/90 backdrop-blur-xl border-t border-border z-40 lg:hidden pb-safe">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.WORKOUT_HISTORY}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                isActive
                  ? "text-brand-DEFAULT"
                  : "text-text-muted hover:text-text-primary"
              }`
            }
          >
            <span className="flex items-center justify-center h-6">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
