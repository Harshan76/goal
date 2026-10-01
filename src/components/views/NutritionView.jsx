import React from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Apple, Droplets, CheckCircle, Flame, Sparkles, Check } from 'lucide-react';

export function NutritionView() {
  const { currentDay, currentDayData, stats, updateNutrition, toggleHabit } = useWinterArc();
  const nut = currentDayData.nutrition || {};

  const nutritionHabits = [
    { key: 'noJunk', habitId: 'no_junk', label: 'No Junk Food or Processed Snacks', desc: 'Zero chips, fried fast food, or ultra-processed snacks.' },
    { key: 'noSugaryDrinks', habitId: null, label: 'No Unnecessary Sugary Drinks', desc: 'Zero sodas, high-sugar energy drinks, or sweetened beverages.' },
    { key: 'waterGoal', habitId: 'water', label: '4 Liters Pure Hydration', desc: 'Optimal water intake throughout morning and training.' },
    { key: 'proteinGoal', habitId: null, label: 'Hit Daily Protein Goal (e.g. 140–160g)', desc: 'Adequate protein for muscular recovery and satiety.' },
    { key: 'fruitsVeggies', habitId: null, label: 'Eat Fresh Fruits & Green Vegetables', desc: 'Micronutrient baseline and natural digestive fiber.' },
    { key: 'homeCooked', habitId: null, label: 'Wholesome Home-Cooked Meals', desc: 'Control your ingredients, clean oils, and wholesome portions.' },
  ];

  const handleToggleNut = (key, habitId) => {
    const nextVal = !nut[key];
    updateNutrition(currentDay, { [key]: nextVal });
    if (habitId) {
      if (nextVal !== !!currentDayData.habits[habitId]) {
        toggleHabit(currentDay, habitId);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                FUEL & CLEAN NUTRITION
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              CLEAN FUEL PROTOCOL
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Food is performance fuel, not entertainment. Eliminate empty junk, stay hydrated, and feed your physical transformation.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Clean Fuel Streak</span>
            <div className="flex items-center gap-1.5 justify-end mt-0.5">
              <Flame className="w-5 h-5 text-emerald-400 fill-emerald-500/30" />
              <span className="text-xl font-display font-black text-emerald-400">{stats.noJunkDays} Days Clean</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DAILY 6-POINT NUTRITION MATRIX */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
            <Apple className="w-4 h-4 text-emerald-400" />
            DAY {currentDay} CLEAN EATING CHECKLIST
          </h3>
          <span className="text-xs font-mono text-emerald-400">
            {Object.values(nut).filter(Boolean).length} / 6 Checked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {nutritionHabits.map((item) => {
            const isChecked = !!nut[item.key] || (item.habitId && !!currentDayData.habits[item.habitId]);
            return (
              <div
                key={item.key}
                onClick={() => handleToggleNut(item.key, item.habitId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-emerald-950/25 border-emerald-500/40 text-white shadow-[0_0_15px_-3px_rgba(16,185,129,0.1)]'
                    : 'bg-zinc-900/50 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors flex-shrink-0 mt-0.5 ${
                      isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold' : 'border-white/20 bg-zinc-800'
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {item.label}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. USER NUTRITION TARGETS (LOCAL & NON-PRESCRIPTIVE) */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          CUSTOM DAILY NUTRITION TARGETS (OPTIONAL)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
            <label className="text-xs font-mono text-slate-400">Target Calories (kcal)</label>
            <input
              type="number"
              value={nut.calories || 2200}
              onChange={(e) => updateNutrition(currentDay, { calories: Number(e.target.value) })}
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2 text-sm font-bold text-white"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
            <label className="text-xs font-mono text-slate-400">Target Protein (grams)</label>
            <input
              type="number"
              value={nut.proteinGrams || 140}
              onChange={(e) => updateNutrition(currentDay, { proteinGrams: Number(e.target.value) })}
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2 text-sm font-bold text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
