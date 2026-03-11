import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-cyan-500 animate-spin" />
        <div
          className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-b-blue-500 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>
    </div>
  );
};
