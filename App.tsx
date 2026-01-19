
import React, { useState } from 'react';
import { UserFinances, AnalysisResponse } from './types';
import InputSection from './components/InputSection';
import AnalysisDisplay from './components/AnalysisDisplay';
import { getRentAnalysis } from './services/geminiService';
import { Wallet, ShieldCheck, MapIcon } from 'lucide-react';

const App: React.FC = () => {
  const [finances, setFinances] = useState<UserFinances>({
    monthlyIncome: 0,
    monthlyDebt: 0,
    fixedExpenses: 0,
    savingsGoal: 0,
  });
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getRentAnalysis(finances);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-900 tracking-tight">Rentwise <span className="text-blue-600">Austin</span></h1>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none">Smart Affordability</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Affordability Rule</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Austin Neighborhoods</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Resources</a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Intro Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Rent with confidence in the <span className="text-blue-600">ATX</span> market.
          </h2>
          <p className="text-slate-600 text-lg">
            First-time renter? We help you calculate what you can actually afford without sacrificing your lifestyle or savings goals.
          </p>
        </section>

        {/* Core Content */}
        <div className="grid grid-cols-1 gap-12">
          <InputSection 
            finances={finances} 
            setFinances={setFinances} 
            onSubmit={handleCalculate} 
            loading={loading}
          />

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3">
              <ShieldCheck className="rotate-180" size={20} />
              {error}
            </div>
          )}

          {analysis && <AnalysisDisplay analysis={analysis} />}
        </div>

        {/* Feature Highlights */}
        {!analysis && !loading && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200">
            <div className="space-y-3 p-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Wallet size={24} />
              </div>
              <h4 className="font-bold text-slate-800">Conservative Planning</h4>
              <p className="text-sm text-slate-500">We prioritize your financial safety by using take-home pay, not gross income.</p>
            </div>
            <div className="space-y-3 p-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <MapIcon size={24} />
              </div>
              <h4 className="font-bold text-slate-800">Austin Local Insights</h4>
              <p className="text-sm text-slate-500">Neighborhood-level context specific to the unique ATX rental market trends.</p>
            </div>
            <div className="space-y-3 p-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold text-slate-800">Debt Protected</h4>
              <p className="text-sm text-slate-500">Calculations that account for your student loans, car payments, and existing debts.</p>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-xs">
            © 2024 Rentwise Austin. Not a financial institution.
          </div>
          <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-600">Privacy</a>
            <a href="#" className="hover:text-slate-600">Terms</a>
            <a href="#" className="hover:text-slate-600">Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
