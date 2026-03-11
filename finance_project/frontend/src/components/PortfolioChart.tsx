import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Holding } from "../types";

interface PortfolioChartProps {
  holdings?: Holding[];
}

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ holdings }) => {
  if (!holdings || holdings.length === 0) return null;

  const data = holdings
    .map((h) => ({ name: h.ticker, value: h.current_value ?? 0 }))
    .filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">
        Asset Allocation
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString()}`}
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "12px",
                color: "#f8fafc",
                fontSize: "13px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(val: string) => (
                <span className="text-slate-300 text-sm ml-1">{val}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
