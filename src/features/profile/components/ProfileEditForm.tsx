import { useState } from "react";
import type { UserProfile, ProfileUpdatePayload } from "../types/profile.types";
import { useUpdateProfile } from "../hooks/useProfile";
import toast from "react-hot-toast";

interface ProfileEditFormProps {
  profile: UserProfile;
  onClose: () => void;
}

export function ProfileEditForm({ profile, onClose }: ProfileEditFormProps) {
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();

  const [fullName, setFullName] = useState(profile.full_name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">(
    profile.weight_unit,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ProfileUpdatePayload = {
      full_name: fullName.trim() === "" ? null : fullName,
      bio: bio.trim() === "" ? null : bio,
      avatar_url: avatarUrl.trim() === "" ? null : avatarUrl,
      weight_unit: weightUnit,
    };

    updateProfile(payload, {
      onSuccess: () => {
        onClose();
        toast.success("Profile updated successfully!");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border p-6 sm:p-8 rounded-3xl shadow-lg animate-fade-in space-y-6 relative"
    >
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <h2 className="text-2xl font-bold text-text-primary">Edit Profile</h2>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
        >
          
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
          Failed to save: {error.message}
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Ahmed SaMy"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand-DEFAULT transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            Avatar URL
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand-DEFAULT transition-colors"
          />
          <p className="text-xs text-text-secondary mt-1 ml-1">
            Paste a direct link to an image.
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-2">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short blurb about your fitness journey..."
            rows={3}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand-DEFAULT transition-colors resize-none"
          />
        </div>
      </div>

      {/* Preferences Settings (grouped here for convenience) */}
      <div className="pt-6 border-t border-border/50">
        <h3 className="text-lg font-bold text-text-primary mb-4">
          Preferences
        </h3>

        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-wider mb-3">
            Weight Unit
          </label>
          <div className="flex items-center gap-4 bg-surface-hover p-1 rounded-xl w-fit border border-border">
            <button
              type="button"
              onClick={() => setWeightUnit("kg")}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                weightUnit === "kg"
                  ? "bg-surface shadow-sm text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Kilograms (kg)
            </button>
            <button
              type="button"
              onClick={() => setWeightUnit("lbs")}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                weightUnit === "lbs"
                  ? "bg-surface shadow-sm text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Pounds (lbs)
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 bg-surface-hover text-text-primary font-bold rounded-xl hover:bg-surface-raised transition-colors"
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-3 bg-brand-DEFAULT text-white rounded-xl font-bold shadow-lg shadow-brand-DEFAULT/20 hover:shadow-brand-DEFAULT/40 transition-all disabled:opacity-70 disabled:hover:shadow-brand-DEFAULT/20"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
