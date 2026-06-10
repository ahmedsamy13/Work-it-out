import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string | ReactNode;
  iconBg: string;
  iconColor: string;
  suffix?: string;
}

export function StatCard({ title, value, icon, iconBg, iconColor, suffix }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-3xl p-4 lg:p-6 shadow-sm flex items-center gap-3 lg:gap-4 transition-transform hover:-translate-y-0.5 hover:shadow-md min-w-0">
      <div className={`w-12 h-12 lg:w-14 lg:h-14 shrink-0 ${iconBg} ${iconColor} rounded-2xl flex items-center justify-center text-xl lg:text-2xl`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-text-secondary text-xs lg:text-sm font-semibold uppercase tracking-wider truncate">
          {title}
        </p>
        <p className="text-2xl lg:text-3xl font-extrabold text-text-primary truncate">
          {value}
          {suffix && (
            <span className="text-lg text-text-secondary font-medium ml-1">
              {suffix}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
