
const StatCard = ({ title, value, isTrendUp }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
      <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{title}</span>
      <div className={`text-2xl font-bold mt-2 ${isTrendUp ? 'text-emerald-400' : 'text-slate-100'}`}>
        {value}
      </div>
    </div>
  );
};

export default StatCard;