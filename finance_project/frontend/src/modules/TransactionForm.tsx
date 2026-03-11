import React, { useState } from "react";
import api from "../api/axios";
import { Plus } from "lucide-react";

interface TransactionFormProps {
  onTransactionAdded: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onTransactionAdded,
}) => {
  const [form, setForm] = useState({ ticker: "", price: "", amount: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/transactions", {
        ticker: form.ticker,
        price: parseFloat(form.price),
        amount: form.amount ? parseInt(form.amount, 10) : 1,
      });
      setForm({ ticker: "", price: "", amount: "" });
      onTransactionAdded();
    } catch (err) {
      const error = err as {
        response?: { data?: { detail?: string } };
        message?: string;
      };
      console.error("Backend error:", error.response?.data || error);
      alert(
        `Error adding stock: ${error.response?.data?.detail || error.message || "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 p-4 sm:p-5 glass-panel rounded-2xl"
    >
      <input
        className="bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 flex-1 min-w-[120px] transition-all"
        placeholder="Ticker (e.g. NVDA)"
        value={form.ticker}
        onChange={(e) =>
          setForm({ ...form, ticker: e.target.value.toUpperCase() })
        }
        required
      />
      <div className="flex flex-row gap-3 sm:gap-4 flex-1 sm:flex-none">
        <input
          className="bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 w-full sm:w-32 transition-all"
          placeholder="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          className="bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 sm:py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 w-full sm:w-24 transition-all"
          placeholder="Qty"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 sm:py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/30 flex items-center justify-center gap-2 transform active:scale-95"
      >
        <Plus size={18} />
        {loading ? "Adding..." : "Add Asset"}
      </button>
    </form>
  );
};
