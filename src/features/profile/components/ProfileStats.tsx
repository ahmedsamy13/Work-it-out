import { useAnalytics } from "@/features/dashboard/hooks/useAnalytics";
import { StatCard } from "@/features/dashboard/components/StatCard";
import type { UserProfile } from "../types/profile.types";
import { Activity, Scale, Calendar } from "lucide-react";

interface ProfileStatsProps {
  profile: UserProfile;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  const { analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
        <div className="h-28 bg-surface border border-border rounded-3xl" />
        <div className="h-28 bg-surface border border-border rounded-3xl" />
      </div>
    );
  }

  const joinDate = new Date(profile.created_at);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - joinDate.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary px-2">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Workouts"
          value={analytics?.totalWorkouts || 0}
          icon={<Activity size={24} />}
          iconBg="bg-brand-muted/20"
          iconColor="text-brand-DEFAULT"
        />
        <StatCard
          title="Total Volume"
          value={analytics?.totalVolume.toLocaleString() || 0}
          suffix={profile.weight_unit}
          icon={<Scale size={24} />}
          iconBg="bg-purple-500/20"
          iconColor="text-purple-500"
        />
        <StatCard
          title="Days Active"
          value={diffDays}
          icon={<Calendar size={24} />}
          iconBg="bg-green-500/20"
          iconColor="text-green-500"
        />
      </div>
    </div>
  );
}
