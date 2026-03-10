import { useState, useEffect } from "react";
import api from "../api/axios";

const TransactionsList = ({ onUpdate }) => {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    ticker: "",
    price: "",
    amount: "",
  });

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const startEdit = (t) => {
    setEditingId(t._id);
    setEditForm({ ticker: t.ticker, price: t.price, amount: t.amount });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ ticker: "", price: "", amount: "" });
  };

  const saveEdit = async (id) => {
    try {
      await api.put(`/transactions/${id}`, {
        ticker: editForm.ticker,
        price: parseFloat(editForm.price),
        amount: parseFloat(editForm.amount),
      });
      setEditingId(null);
      fetchTransactions();
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("Error updating transaction!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
      onUpdate();
    } catch (err) {
      alert("Error deleting!");
    }
  };

  if (transactions.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-slate-300 mb-4">
        All Transactions
      </h2>
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700 text-slate-500 text-xs uppercase tracking-widest">
              <th className="py-3 px-4">Ticker</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
              >
                {editingId === t._id ? (
                  <>
                    <td className="py-3 px-4">
                      <input
                        className="bg-slate-800 rounded-lg px-3 py-1.5 text-white w-24 text-sm"
                        value={editForm.ticker}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            ticker: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        className="bg-slate-800 rounded-lg px-3 py-1.5 text-white w-24 text-sm"
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        className="bg-slate-800 rounded-lg px-3 py-1.5 text-white w-20 text-sm"
                        type="number"
                        value={editForm.amount}
                        onChange={(e) =>
                          setEditForm({ ...editForm, amount: e.target.value })
                        }
                      />
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-sm">
                      {new Date(t.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => saveEdit(t._id)}
                        className="text-emerald-400 hover:bg-emerald-900/30 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition-all"
                      >
                        ✓ Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-slate-400 hover:bg-slate-700/50 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition-all"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4 font-bold text-white">
                      {t.ticker}
                    </td>
                    <td className="py-3 px-4 text-slate-300">${t.price}</td>
                    <td className="py-3 px-4 text-slate-300">{t.amount}</td>
                    <td className="py-3 px-4 text-slate-500 text-sm">
                      {new Date(t.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => startEdit(t)}
                        className="text-cyan-400 hover:bg-cyan-900/30 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition-all"
                      >
                        ✎ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-400 hover:bg-red-900/30 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition-all"
                      >
                        ✕ Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
