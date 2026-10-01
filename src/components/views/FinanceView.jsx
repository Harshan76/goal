import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Wallet, Plus, Trash2, TrendingDown, DollarSign, PiggyBank, PieChart } from 'lucide-react';

export function FinanceView() {
  const { currentDay, financeData, addExpense, deleteExpense, toggleHabit, currentDayData } = useWinterArc();

  const [newAmount, setNewAmount] = useState('');
  const [newCat, setNewCat] = useState('Food');
  const [newDesc, setNewDesc] = useState('');

  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Education', 'Health', 'Other'];

  const handleAddExp = (e) => {
    e.preventDefault();
    if (!newAmount || Number(newAmount) <= 0) return;
    addExpense({
      amount: Number(newAmount),
      category: newCat,
      description: newDesc.trim() || 'Daily expense',
    });
    setNewAmount('');
    setNewDesc('');
    if (!currentDayData.habits.track_spending) {
      toggleHabit(currentDay, 'track_spending');
    }
  };

  const totalSpent = financeData.expenses.reduce((acc, e) => acc + e.amount, 0);
  const remainingBudget = Math.max(0, financeData.monthlyBudget - totalSpent);

  // Category breakdown calculation
  const categoryTotals = {};
  financeData.expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              FINANCIAL SOVEREIGNTY & DISCIPLINE
            </span>
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
            FINANCIAL DISCIPLINE TRACKER
          </h1>
          <p className="text-slate-400 text-sm">
            Zero financial leakage. 100% private and stored locally on your device.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3 border-t border-white/5">
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Monthly Budget</span>
            <div className="text-2xl font-display font-black text-white">
              {financeData.currency}{financeData.monthlyBudget.toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Total Logged Spent</span>
            <div className="text-2xl font-display font-black text-rose-400">
              {financeData.currency}{totalSpent.toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Remaining Buffer</span>
            <div className="text-2xl font-display font-black text-emerald-400">
              {financeData.currency}{remainingBudget.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* 2. LOG NEW EXPENSE FORM */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          LOG DAILY EXPENSE (DAY {currentDay})
        </h3>

        <form onSubmit={handleAddExp} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="number"
            step="1"
            required
            placeholder={`Amount (${financeData.currency})`}
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />

          <select
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className="bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs font-mono text-white"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#0f1219]">{c}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Description (e.g. Groceries, Books, Transport)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />

          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-display font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" /> Save Expense
          </button>
        </form>
      </div>

      {/* 3. EXPENSES LIST & CATEGORY BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Transactions List */}
        <div className="lg:col-span-8 arc-card rounded-3xl p-6 space-y-4">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
            RECORDED EXPENSE TRANSACTIONS ({financeData.expenses.length})
          </h3>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
            {financeData.expenses.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    {financeData.currency}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{exp.description}</div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {exp.category} • {exp.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white text-sm">
                    -{financeData.currency}{exp.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown Breakdown */}
        <div className="lg:col-span-4 arc-card rounded-3xl p-6 space-y-4">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            SPENDING BY CATEGORY
          </h3>

          <div className="space-y-3">
            {Object.entries(categoryTotals).map(([cat, amt]) => {
              const pct = totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{cat}</span>
                    <span className="text-white font-bold">{financeData.currency}{amt} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
