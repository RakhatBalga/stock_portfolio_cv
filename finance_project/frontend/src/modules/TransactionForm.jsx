import { useState } from "react";
import api from "../api/axios";

const TransactionForm = ({ onTransactionAdded }) => {
  const [form, setForm] = useState({ ticker: "", price: "", amount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", {
        ...form,
        price: parseFloat(form.price),
        amount: form.amount ? parseInt(form.amount) : 1,
      });
      setForm({ ticker: "", price: "", amount: "" });
      onTransactionAdded(); // Вызываем обновление данных у родителя
    } catch (err) {
      alert("Error adding stock!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-3 mb-10 p-4 bg-slate-900/50 rounded-2xl border border-slate-800"
    >
      <input
        className="bg-slate-800 border-none rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 flex-1"
        placeholder="Ticker (e.g. NVDA)"
        value={form.ticker}
        onChange={(e) =>
          setForm({ ...form, ticker: e.target.value.toUpperCase() })
        }
        required
      />
      <input
        className="bg-slate-800 border-none rounded-xl px-4 py-2 text-white w-32"
        placeholder="Price"
        type="number"
        step="0.01"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <input
        className="bg-slate-800 border-none rounded-xl px-4 py-2 text-white w-24"
        placeholder="Qty (1)"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <button
        type="submit"
        className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/20"
      >
        Add Asset
      </button>
    </form>
  );
};

export default TransactionForm;
