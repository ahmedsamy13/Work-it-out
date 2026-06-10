import { useProfile } from "@/features/profile/hooks/useProfile";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Hand } from "lucide-react";

export function WelcomeHero() {
  const { data: profile } = useProfile();
  const authUser = useAuthStore((s) => s.user);

  // Time of day greeting
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 17) greeting = "Good afternoon";

  // Determine name
  let name = "";
  if (profile?.full_name) {
    name = profile.full_name.split(" ")[0]; // First name only
  } else if (authUser?.email) {
    name = authUser.email.split("@")[0];
  }

  return (
    <div className="space-y-1">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight flex items-center gap-2">
        {greeting}{name ? `, ${name}` : ""} 
        <span className="inline-block animate-waving-hand origin-bottom-right text-yellow-400">
          <Hand size={32} fill="currentColor" />
        </span>
      </h1>
      <p className="text-text-secondary text-lg">
        Ready to crush your goals today?
      </p>
    </div>
  );
}
