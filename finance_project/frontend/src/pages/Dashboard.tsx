import React, { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import type { PortfolioData } from "../types";
import { Loader } from "../components/Loader";
import { PortfolioChart } from "../components/PortfolioChart";
import { HoldingsTable } from "../modules/HoldingsTable";
import { PortfolioSummary } from "../modules/PortfolioSummary";
import { TransactionForm } from "../modules/TransactionForm";
import { TransactionsList } from "../modules/TransactionsList";

const Dashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshSignal, setRefreshSignal] = useState(0);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<PortfolioData>("/portfolio/status");
      setPortfolio(res.data);
    } catch (err) {
      const error = err as { response?: { status?: number } };
      if (error.response?.status === 404) {
        setPortfolio(null);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, refreshSignal]);

  const handleUpdate = () => setRefreshSignal((prev) => prev + 1);

  const handleDeleteTicker = async (ticker: string) => {
    if (!window.confirm(`Delete all transactions for ${ticker}?`)) return;
    try {
      await api.delete(`/transactions/ticker/${ticker}`);
      handleUpdate();
    } catch (err) {
      console.error(err);
      alert(`Error deleting transactions for ${ticker}.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden flex flex-col items-center">
      {/* Background gradients for depth */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-6xl px-4 sm:px-6 py-6 md:py-12 relative z-10 animate-slide-up">
        <header className="mb-8 md:mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent inline-block drop-shadow-sm">
              PORTFOLIO
            </h1>
            <p className="text-slate-400 mt-2 font-medium tracking-wide text-sm sm:text-base">
              Real-time asset monitoring & analytics
            </p>
          </div>
        </header>

        <TransactionForm onTransactionAdded={handleUpdate} />

        {loading && !portfolio ? (
          <Loader />
        ) : portfolio ? (
          <>
            <PortfolioSummary portfolio={portfolio} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <HoldingsTable
                  holdings={portfolio.holdings}
                  onDelete={handleDeleteTicker}
                />
              </div>
              <div className="lg:col-span-1">
                <PortfolioChart holdings={portfolio.holdings} />
              </div>
            </div>
            <TransactionsList
              refreshSignal={refreshSignal}
              onUpdate={handleUpdate}
            />
          </>
        ) : (
          <div className="text-center py-20 glass-panel rounded-3xl animate-float mx-4 sm:mx-0">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 mb-6 shadow-inner">
              <span className="text-3xl">📭</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No assets found
            </h3>
            <p className="text-slate-400 font-medium max-w-sm mx-auto text-sm sm:text-base px-4">
              Your portfolio is currently empty. Use the form above to add your
              first stock tracking record.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
