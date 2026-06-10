import { WelcomeHero } from "@/features/home/components/WelcomeHero";
import { QuickActions } from "@/features/home/components/QuickActions";
import { WeeklyActivityRing } from "@/features/home/components/WeeklyActivityRing";
import { RecentActivityFeed } from "@/features/home/components/RecentActivityFeed";

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
      {/* 1. Personalized Greeting */}
      <section>
        <WelcomeHero />
      </section>

      {/* 2. Core Actions (Start Workout) */}
      <section>
        <QuickActions />
      </section>

      {/* 3. Weekly Summary */}
      <section>
        <WeeklyActivityRing />
      </section>

      {/* 4. Recent Feed */}
      <section>
        <RecentActivityFeed />
      </section>
    </div>
  );
}
