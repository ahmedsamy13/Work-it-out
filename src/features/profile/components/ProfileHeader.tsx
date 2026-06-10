import type { UserProfile } from "../types/profile.types";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Pencil } from "lucide-react";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
}

export function ProfileHeader({ profile, onEditClick }: ProfileHeaderProps) {
  const authUser = useAuthStore((s) => s.user);

  const getInitials = (name: string | null, email: string | undefined) => {
    if (name) return name.substring(0, 2).toUpperCase();
    if (email) return email.substring(0, 2).toUpperCase();
    return "US";
  };

  const displayName = profile.full_name || authUser?.email?.split("@")[0] || "User";

  return (
    <div className="bg-surface border border-border p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-DEFAULT/10 rounded-full blur-3xl group-hover:bg-brand-DEFAULT/20 transition-all duration-700 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        
        <div className="relative">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-surface shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-brand-DEFAULT to-purple-600 flex items-center justify-center text-3xl sm:text-4xl text-white font-extrabold shadow-lg border-4 border-surface">
              {getInitials(profile.full_name, authUser?.email)}
            </div>
          )}
          
          <button 
            onClick={onEditClick}
            className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-brand-DEFAULT hover:border-brand-muted transition-colors shadow-sm"
            title="Edit Profile"
          >
            <Pencil size={16} />
          </button>
        </div>

        <div className="flex-1 mt-2 sm:mt-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            {displayName}
          </h1>
          <p className="text-text-secondary text-lg mt-1">{authUser?.email}</p>
          
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
            <span className="px-3 py-1 bg-surface-hover rounded-full text-xs font-semibold text-text-muted uppercase tracking-wider">
              Member since {new Date(profile.created_at).getFullYear()}
            </span>
            <span className="px-3 py-1 bg-brand-muted/20 text-brand-DEFAULT rounded-full text-xs font-bold uppercase tracking-wider">
              {profile.weight_unit.toUpperCase()} Mode
            </span>
          </div>

          {profile.bio && (
            <p className="mt-6 text-text-primary italic border-l-2 border-brand-DEFAULT/30 pl-4 max-w-lg">
              "{profile.bio}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
