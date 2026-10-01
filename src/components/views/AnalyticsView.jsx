import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { ProgressRing } from '../common/ProgressRing';
import { BarChart3, TrendingUp, Calendar, Zap, BookOpen, Code, Dumbbell, Smartphone, Moon, Footprints, Droplets } from 'lucide-react';

export function AnalyticsView() {
  const { currentDay, days, stats } = useWinterArc();
  const [timeRange, setTimeRange] = useState('30'); // '7' | '30' | '90'

  const rangeDaysCount = Number(timeRange);
  const chartDays = days.slice(Math.max(0, currentDay - rangeDaysCount), currentDay);

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                DATA-DRIVEN PERFORMANCE INTEL
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              ANALYTICS & METRIC HORIZONS
            </h1>
            <p className="text-slate-400 text-sm">
              Visual telemetry of your habits, hours, and transformation velocity.
            </p>
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10">
            {['7', '30', '90'].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  timeRange === r
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === '90' ? 'All 90 Days' : `Last ${r} Days`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. THREE CORE METRIC GAUGES ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="arc-card rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-400">90-Day Arc Completion</span>
          <ProgressRing progress={stats.overallProgressPct} size={110} strokeWidth={9} />
          <span className="text-xs text-slate-400 font-mono">{stats.completedDaysCount} of 90 Days Finished</span>
        </div>

        <div className="arc-card rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-400">GATE Syllabus Coverage</span>
          <ProgressRing progress={stats.gateProgress.pct} size={110} strokeWidth={9} />
          <span className="text-xs text-slate-400 font-mono">{stats.gateProgress.completedTopics} of {stats.gateProgress.totalTopics} Topics</span>
        </div>

        <div className="arc-card rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-400">Daily Habit Consistency</span>
          <ProgressRing progress={stats.todayScore.pct} size={110} strokeWidth={9} />
          <span className="text-xs text-slate-400 font-mono">Today: {stats.todayScore.habitsChecked} / {stats.todayScore.totalEnabledCount} Checked</span>
        </div>
      </div>

      {/* 3. DAILY HABIT COMPLETION HEATMAP / BAR TIMELINE */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            DAILY HABIT COMPLETION TIMELINE ({chartDays.length} DAYS)
          </h3>
          <span className="text-xs font-mono text-cyan-400">0% → 100% Score</span>
        </div>

        {/* Bar Chart Grid */}
        <div className="h-48 flex items-end gap-1.5 pt-4 border-b border-white/10 pb-2 overflow-x-auto scrollbar-thin">
          {chartDays.map((d) => {
            const s = stats.dailyScores[d.dayNumber - 1];
            const pct = s?.pct || 0;
            return (
              <div key={d.dayNumber} className="flex-1 min-w-[12px] max-w-[28px] flex flex-col items-center gap-1.5 h-full justify-end group">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    pct === 100
                      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]'
                      : pct >= 70
                      ? 'bg-cyan-400'
                      : pct >= 40
                      ? 'bg-amber-400'
                      : pct > 0
                      ? 'bg-rose-400'
                      : 'bg-zinc-800'
                  }`}
                  style={{ height: `${Math.max(4, pct)}%` }}
                  title={`Day ${d.dayNumber}: ${pct}% (${s?.habitsChecked || 0} habits)`}
                />
                <span className="text-[8px] font-mono text-slate-500">D{d.dayNumber}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. GATE VS SKILL VS WORKOUT HOURS COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" /> GATE War Room
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">{stats.totalGateHours}h</span>
          </div>
          <div className="text-2xl font-display font-black text-white">
            {(stats.totalGateHours / Math.max(1, currentDay)).toFixed(1)}h <span className="text-xs font-normal text-slate-400">/ day avg</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-purple-400" /> Skill Crafting
            </span>
            <span className="text-xs font-mono font-bold text-purple-400">{stats.totalSkillHours}h</span>
          </div>
          <div className="text-2xl font-display font-black text-white">
            {(stats.totalSkillHours / Math.max(1, currentDay)).toFixed(1)}h <span className="text-xs font-normal text-slate-400">/ day avg</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-blue-400" /> Fitness Training
            </span>
            <span className="text-xs font-mono font-bold text-blue-400">{stats.totalWorkoutHours}h</span>
          </div>
          <div className="text-2xl font-display font-black text-white">
            {stats.totalWorkouts} <span className="text-xs font-normal text-slate-400">Sessions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
