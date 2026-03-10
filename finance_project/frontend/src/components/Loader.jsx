const Loader = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin"></div>
      </div>
      <span className="ml-4 text-slate-400 text-sm font-medium tracking-wide">
        Loading portfolio...
      </span>
    </div>
  );
};

export default Loader;
