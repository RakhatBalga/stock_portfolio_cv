import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
}) => {
  const trendColor =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
        ? "text-rose-400"
        : "text-white";

  return (
    <div className="glass-panel hover:bg-slate-800/60 p-5 sm:p-6 rounded-2xl transition-all duration-300 group border border-slate-700/50 hover:border-cyan-500/30">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          {title}
        </h3>
        {icon && (
          <div className="text-slate-500 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">
            {icon}
          </div>
        )}
      </div>
      <p
        className={`text-2xl sm:text-3xl font-black tracking-tight ${trendColor}`}
      >
        {value}
      </p>
    </div>
  );
};
