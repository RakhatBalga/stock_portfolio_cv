import React from "react";
import type { Holding } from "../types";
import { StockRow } from "../components/StockRow";
import { BarChart3 } from "lucide-react";

interface HoldingsTableProps {
  holdings?: Holding[];
  onDelete: (ticker: string) => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  onDelete,
}) => {
  if (!holdings || holdings.length === 0) {
    return (
      <div className="glass-panel p-10 rounded-2xl text-center mb-8 mx-4 lg:mx-0">
        <BarChart3
          size={40}
          className="text-slate-600 mx-auto mb-4 drop-shadow-md"
        />
        <p className="text-slate-400 font-medium tracking-wide">
          No assets yet. Add your first stock above!
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel overflow-hidden mx-4 lg:mx-0">
      <div className="overflow-x-auto w-full custom-scrollbar">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="bg-slate-800/40 text-slate-400 text-[11px] sm:text-xs uppercase tracking-widest border-b border-slate-700/50">
              <th className="py-4 px-4 sm:px-6 font-semibold">Ticker</th>
              <th className="py-4 px-4 sm:px-6 font-semibold">Qty</th>
              <th className="py-4 px-4 sm:px-6 font-semibold">Avg Price</th>
              <th className="py-4 px-4 sm:px-6 font-semibold">Current</th>
              <th className="py-4 px-4 sm:px-6 font-semibold">Profit $</th>
              <th className="py-4 px-4 sm:px-6 font-semibold">Profit %</th>
              <th className="py-4 px-4 sm:px-6 font-semibold text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {holdings.map((stock) => (
              <StockRow key={stock.ticker} stock={stock} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
