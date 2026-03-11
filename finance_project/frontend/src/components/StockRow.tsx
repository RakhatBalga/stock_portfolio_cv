import React from "react";
import type { Holding } from "../types";
import { Trash2 } from "lucide-react";

interface StockRowProps {
  stock: Holding;
  onDelete: (ticker: string) => void;
}

export const StockRow: React.FC<StockRowProps> = ({ stock, onDelete }) => {
  const isProfit = stock.profit_usd >= 0;

  return (
    <tr className="hover:bg-slate-800/40 transition-colors group">
      <td className="py-4 px-4 sm:px-6">
        <span className="font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-slate-700/50 shadow-sm">
          {stock.ticker}
        </span>
      </td>
      <td className="py-4 px-4 sm:px-6 text-slate-300 font-mono text-sm">
        {stock.total_amount}
      </td>
      <td className="py-4 px-4 sm:px-6 text-slate-300 font-mono text-sm">
        ${stock.avg_price.toFixed(2)}
      </td>
      <td className="py-4 px-4 sm:px-6 text-slate-300 font-mono text-sm">
        ${stock.current_price.toFixed(2)}
      </td>
      <td className="py-4 px-4 sm:px-6 font-mono text-sm">
        <span
          className={`font-semibold ${isProfit ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" : "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]"}`}
        >
          {isProfit ? "+" : ""}${Math.abs(stock.profit_usd).toFixed(2)}
        </span>
      </td>
      <td className="py-4 px-4 sm:px-6 font-mono text-sm">
        <span
          className={`px-2 py-1 rounded-md border text-xs sm:text-sm ${isProfit ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}
        >
          {stock.profit_percent}
        </span>
      </td>
      <td className="py-4 px-4 sm:px-6 text-right">
        <button
          onClick={() => onDelete(stock.ticker)}
          className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 transform active:scale-95"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};
