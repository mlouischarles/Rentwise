
import React from 'react';
import { UserFinances } from '../types';

interface InputSectionProps {
  finances: UserFinances;
  setFinances: React.Dispatch<React.SetStateAction<UserFinances>>;
  onSubmit: () => void;
  loading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ finances, setFinances, onSubmit, loading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinances(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border border-slate-100">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Your Financial Profile</h2>
        <p className="text-slate-500 text-sm">Enter your monthly figures to see what you can afford in Austin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Monthly Take-Home Pay</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400">$</span>
            <input
              type="number"
              name="monthlyIncome"
              value={finances.monthlyIncome || ''}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. 4000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Monthly Debt (Loans/Cards)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400">$</span>
            <input
              type="number"
              name="monthlyDebt"
              value={finances.monthlyDebt || ''}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. 300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Other Fixed Expenses</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400">$</span>
            <input
              type="number"
              name="fixedExpenses"
              value={finances.fixedExpenses || ''}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Groceries, phone, etc."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Monthly Savings Goal</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400">$</span>
            <input
              type="number"
              name="savingsGoal"
              value={finances.savingsGoal || ''}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. 500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || !finances.monthlyIncome}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <span>Calculate Affordability</span>
        )}
      </button>
    </div>
  );
};

export default InputSection;
