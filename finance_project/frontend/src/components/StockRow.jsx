const StockRow = ({
  ticker,
  avg_price,
  current_price,
  profit_usd,
  profit_percent,
  onDelete,
}) => {
  const isPositive = profit_usd >= 0;

  return (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
      <td className="py-4 px-4">
        <span className="font-bold text-white text-lg">{ticker}</span>
      </td>
      <td className="py-4 px-4 text-slate-400">${avg_price}</td>
      <td className="py-4 px-4 text-slate-200 font-medium">${current_price}</td>
      <td
        className={`py-4 px-4 font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}
      >
        {isPositive ? "+" : ""}${profit_usd}
      </td>
      <td
        className={`py-4 px-4 font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}
      >
        {isPositive ? "▲" : "▼"} {profit_percent}
      </td>
      <td className="py-4 px-4">
        <button
          onClick={() => onDelete(ticker)}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/30 px-3 py-1.5 rounded-lg transition-all text-sm font-medium cursor-pointer"
        >
          ✕ Delete
        </button>
      </td>
    </tr>
  );
};

export default StockRow;
