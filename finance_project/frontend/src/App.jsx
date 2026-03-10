import { useState, useEffect } from "react";
import api from "./api/axios";
import Loader from "./components/Loader";
import TransactionForm from "./modules/TransactionForm";
import PortfolioSummary from "./modules/PortfolioSummary";
import HoldingsTable from "./modules/HoldingsTable";
import TransactionsList from "./modules/TransactionsList";

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/portfolio/status");
      setPortfolio(res.data);
    } catch (err) {
      console.error(err);
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticker) => {
    if (!confirm(`Delete all ${ticker} transactions?`)) return;
    try {
      await api.delete(`/transactions/ticker/${ticker}`);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Error deleting stock!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          MY PORTFOLIO
        </h1>

        <TransactionForm onTransactionAdded={loadData} />

        {loading ? (
          <Loader />
        ) : (
          <>
            <PortfolioSummary portfolio={portfolio} />
            <HoldingsTable
              holdings={portfolio?.holdings}
              onDelete={handleDelete}
            />
            <TransactionsList onUpdate={loadData} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
