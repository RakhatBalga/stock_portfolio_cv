import React from "react";
import type { PortfolioData } from "../types";
import { StatCard } from "../components/StatCard";
import { DollarSign, TrendingUp, PiggyBank } from "lucide-react";

interface PortfolioSummaryProps {
  portfolio: PortfolioData | null;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  portfolio,
}) => {
  if (!portfolio) return null;

  const isProfit = portfolio.total_profit_usd >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 mx-4 sm:mx-0">
      <StatCard
        title="Total Invested"
        value={`$${portfolio.total_invested.toLocaleString()}`}
        icon={<PiggyBank size={20} />}
      />
      <StatCard
        title="Current Value"
        value={`$${portfolio.current_value.toLocaleString()}`}
        icon={<DollarSign size={20} />}
      />
      <div className="sm:col-span-2 lg:col-span-1">
        <StatCard
          title="Total Profit"
          value={`${isProfit ? "+" : ""}$${portfolio.total_profit_usd.toLocaleString()}`}
          icon={<TrendingUp size={20} />}
          trend={isProfit ? "up" : "down"}
        />
      </div>
    </div>
  );
};
