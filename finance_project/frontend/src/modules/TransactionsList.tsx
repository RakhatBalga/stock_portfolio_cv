import React, { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import type { Transaction } from "../types";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface TransactionsListProps {
  refreshSignal: number;
  onUpdate: () => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  refreshSignal,
  onUpdate,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    ticker: "",
    price: "",
    amount: "",
  });

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await api.get<Transaction[]>("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
  }, [fetchTransactions, refreshSignal]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (t: Transaction) => {
    setEditId(t._id);
    setEditForm({
      ticker: t.ticker,
      price: String(t.price),
      amount: String(t.amount),
    });
  };

  const handleSave = async () => {
    if (!editId) return;
    try {
      await api.put(`/transactions/${editId}`, {
        ticker: editForm.ticker,
        price: parseFloat(editForm.price),
        amount: parseFloat(editForm.amount),
      });
      setEditId(null);
      fetchTransactions();
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("Error updating transaction");
    }
  };

  if (transactions.length === 0) return null;

  return (
    <div className="glass-panel overflow-hidden mx-4 lg:mx-0 mb-8 sm:mb-12">
      <div className="px-5 py-5 border-b border-slate-700/50 bg-slate-900/30">
        <h3 className="text-white font-bold tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          Transaction History
        </h3>
        <p className="text-slate-500 text-xs mt-1 drop-shadow-sm ml-4">
          Edit or remove individual trades
        </p>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead>
            <tr className="text-slate-400 text-[11px] sm:text-xs uppercase tracking-widest bg-slate-900/40 border-b border-slate-700/50">
              <th className="py-4 px-4 sm:px-5 font-semibold">Date</th>
              <th className="py-4 px-4 sm:px-5 font-semibold">Ticker</th>
              <th className="py-4 px-4 sm:px-5 font-semibold">Price</th>
              <th className="py-4 px-4 sm:px-5 font-semibold">Qty</th>
              <th className="py-4 px-4 sm:px-5 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => {
              const date = new Date(t.timestamp).toLocaleDateString();
              const isEditing = editId === t._id;

              if (isEditing) {
                return (
                  <tr
                    key={t._id}
                    className="border-b border-slate-800/40 bg-slate-800/20"
                  >
                    <td className="py-3 px-5 text-slate-400">{date}</td>
                    <td className="py-3 px-5">
                      <input
                        value={editForm.ticker}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            ticker: e.target.value.toUpperCase(),
                          })
                        }
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-20 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
                      />
                    </td>
                    <td className="py-3 px-5">
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-20 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
                      />
                    </td>
                    <td className="py-3 px-5">
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) =>
                          setEditForm({ ...editForm, amount: e.target.value })
                        }
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-16 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
                      />
                    </td>
                    <td className="py-3 px-5 text-right space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        <Check size={15} />
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X size={15} />
                      </button>
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={t._id}
                  className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="py-3 px-4 sm:px-5 text-slate-400 text-xs sm:text-sm">
                    {date}
                  </td>
                  <td className="py-3 px-4 sm:px-5">
                    <span className="font-semibold text-white bg-slate-800/80 px-2 py-1 rounded text-xs sm:text-sm shadow-sm border border-slate-700/30">
                      {t.ticker}
                    </span>
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-slate-300 font-mono text-sm">
                    ${t.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-slate-300 font-mono text-sm">
                    {t.amount}
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-all transform sm:translate-x-2 group-hover:translate-x-0">
                    <button
                      onClick={() => startEdit(t)}
                      className="text-cyan-600 hover:text-cyan-400 p-1.5 sm:p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="text-rose-600 hover:text-rose-400 p-1.5 sm:p-2 hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
