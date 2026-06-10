import { useState } from "react";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileEditForm } from "@/features/profile/components/ProfileEditForm";
import { ProfileStats } from "@/features/profile/components/ProfileStats";
import { useAuth } from "@/features/auth";
import { LogOut } from "lucide-react";

export function ProfilePage() {
  const { data: profile, isLoading, error } = useProfile();
  const { logout } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="h-64 bg-surface border border-border rounded-3xl" />
        <div className="h-40 bg-surface border border-border rounded-3xl" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 bg-surface border border-border rounded-3xl mt-10">
        <div className="text-5xl mb-4">️</div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Profile Setup Required</h2>
        <p className="text-text-secondary max-w-md mx-auto mb-6">
          Your profile record could not be found. If you are an existing user, please ensure you have run the Supabase migration script.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Dynamic Header vs Edit Form */}
      {isEditMode ? (
        <ProfileEditForm profile={profile} onClose={() => setIsEditMode(false)} />
      ) : (
        <ProfileHeader profile={profile} onEditClick={() => setIsEditMode(true)} />
      )}

      {/* Quick Stats Section */}
      <div className={isEditMode ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
        <ProfileStats profile={profile} />
      </div>

      {/* Mobile Logout Button (Hidden on Desktop) */}
      <div className="pt-8 sm:hidden">
        <button
          onClick={logout}
          className="w-full sm:w-auto px-6 py-3 bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}
