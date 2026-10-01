import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Calendar, Flame, CheckCircle, AlertCircle, XCircle, ChevronRight, Shield, Award } from 'lucide-react';

export function CalendarMatrixView({ setCurrentView }) {
  const { preferences, updatePreferences, currentDay, days, stats, monthPhases } = useWinterArc();
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('ALL'); // 'ALL' | 1 | 2 | 3

  const handleSelectDay = (dayNum) => {
    updatePreferences({ currentDay: dayNum });
    setCurrentView('tracker');
  };

  const getMonthDays = (monthNum) => {
    const start = (monthNum - 1) * 30;
    const end = monthNum * 30;
    return days.slice(start, end);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HEADER BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                90-DAY MATRIX
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              TRANSFORMATION CALENDAR
            </h1>
            <p className="text-slate-400 text-sm">
              Click on any day tile to inspect habits, edit logs, or mark completion.
            </p>
          </div>

          {/* Month Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10">
            <button
              onClick={() => setSelectedMonthFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedMonthFilter === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All 90 Days
            </button>
            {[1, 2, 3].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonthFilter(m)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedMonthFilter === m
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Month {m}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> 🟢 Completed (100% / Done)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 🟡 Partial (50–99%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> 🔴 Missed (&lt;50%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" /> ⚪ Untracked
          </span>
        </div>
      </div>

      {/* 2. THREE MONTH CALENDAR SECTIONS */}
      {monthPhases.map((phase) => {
        if (selectedMonthFilter !== 'ALL' && selectedMonthFilter !== phase.month) {
          return null;
        }

        const monthDays = getMonthDays(phase.month);
        const mStats = stats.monthStats[phase.month];
        const monthPct = mStats.possibleHabits > 0 ? Math.round((mStats.totalHabits / mStats.possibleHabits) * 100) : 0;

        return (
          <div key={phase.month} className="arc-card rounded-3xl p-6 space-y-4">
            {/* Month Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display font-black text-xl text-white">
                    {phase.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                    {phase.subtitle}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{phase.tagline}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-right">
                  <span className="text-slate-400">Month Score: </span>
                  <strong className="text-cyan-400 font-bold">{monthPct}%</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-400">Days Conquered: </span>
                  <strong className="text-emerald-400 font-bold">{mStats.completedDays}/30</strong>
                </div>
              </div>
            </div>

            {/* 30 Days Grid (6 cols on lg, 5 on md, 3 on sm) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {monthDays.map((day) => {
                const isCurrent = day.dayNumber === currentDay;
                const score = stats.dailyScores[day.dayNumber - 1];
                const habitsDone = score?.habitsChecked || 0;
                const habitsTotal = score?.totalEnabledCount || 1;
                const pct = score?.pct || 0;

                // Color code determination
                let statusBadge = { color: 'text-slate-500', dot: 'bg-zinc-600', emoji: '⚪', label: 'Untracked' };
                if (day.status === 'completed' || score?.isPerfect) {
                  statusBadge = { color: 'text-emerald-400', dot: 'bg-emerald-400', emoji: '🟢', label: 'Done' };
                } else if (day.status === 'partial' || pct >= 50) {
                  statusBadge = { color: 'text-amber-400', dot: 'bg-amber-400', emoji: '🟡', label: 'Partial' };
                } else if (day.status === 'missed' || (pct > 0 && pct < 50)) {
                  statusBadge = { color: 'text-rose-400', dot: 'bg-rose-400', emoji: '🔴', label: 'Missed' };
                }

                return (
                  <div
                    key={day.dayNumber}
                    onClick={() => handleSelectDay(day.dayNumber)}
                    className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isCurrent
                        ? 'bg-cyan-950/30 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                        : 'bg-zinc-900/50 border-white/5 hover:border-white/20 hover:bg-zinc-900/90'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-sm text-white">
                        Day {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
                      </span>
                      <span className="text-xs">{statusBadge.emoji}</span>
                    </div>

                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-xs font-mono font-bold text-slate-200">
                        {habitsDone}/{habitsTotal}
                      </span>
                      <span className={`text-[11px] font-mono font-bold ${statusBadge.color}`}>
                        {pct}%
                      </span>
                    </div>

                    {/* Progress Bar inside tile */}
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          pct === 100
                            ? 'bg-emerald-400'
                            : pct >= 50
                            ? 'bg-amber-400'
                            : pct > 0
                            ? 'bg-rose-400'
                            : 'bg-transparent'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Hover hint */}
                    <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{day.date.slice(5)}</span>
                      <span className="group-hover:text-cyan-400 flex items-center">
                        Edit <ChevronRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
