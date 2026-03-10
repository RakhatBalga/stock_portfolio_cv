import StatCard from "../components/StatCard";

const PortfolioSummary = ({ portfolio }) => {
  if (!portfolio) return null;

  const isProfit = portfolio.total_profit_usd >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <StatCard
        title="Total Invested"
        value={`$${portfolio.total_invested.toLocaleString()}`}
      />
      <StatCard
        title="Current Value"
        value={`$${portfolio.current_value.toLocaleString()}`}
      />
      <StatCard
        title="Total Profit"
        value={`${isProfit ? "+" : ""}$${portfolio.total_profit_usd.toLocaleString()}`}
        isTrendUp={isProfit}
      />
    </div>
  );
};

export default PortfolioSummary;
