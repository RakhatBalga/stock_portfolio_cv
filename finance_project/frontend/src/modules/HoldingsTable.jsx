import StockRow from "../components/StockRow";

const HoldingsTable = ({ holdings, onDelete }) => {
  if (!holdings || holdings.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p className="text-lg font-medium">No assets yet</p>
        <p className="text-sm mt-1">
          Add your first stock above to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-700 text-slate-500 text-xs uppercase tracking-widest">
            <th className="py-4 px-4">Ticker</th>
            <th className="py-4 px-4">Avg Price</th>
            <th className="py-4 px-4">Current</th>
            <th className="py-4 px-4">Profit $</th>
            <th className="py-4 px-4">Profit %</th>
            <th className="py-4 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock) => (
            <StockRow key={stock.ticker} {...stock} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
