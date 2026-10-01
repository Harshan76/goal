import React from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { ProgressRing } from '../common/ProgressRing';
import { HabitItem } from '../common/HabitItem';
import { DEFAULT_HABITS, MOTIVATIONAL_QUOTES } from '../../data/initialData';
import {
  Flame,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Dumbbell,
  BookOpen,
  Code,
  Smartphone,
  Droplets,
  Moon,
  ChevronRight,
  ShieldCheck,
  Target,
  Sparkles,
  Zap,
  ArrowUpRight,
  Activity,
} from 'lucide-react';

export function DashboardView({ setCurrentView }) {
  const { preferences, currentDay, currentDayData, stats, monthPhases, toggleHabit, goalsData } = useWinterArc();

  // Pick quote based on day
  const dailyQuote = MOTIVATIONAL_QUOTES[(currentDay - 1) % MOTIVATIONAL_QUOTES.length];

  // Month & phase calculation
  const currentPhaseIndex = currentDay <= 30 ? 0 : currentDay <= 60 ? 1 : 2;
  const currentPhase = monthPhases[currentPhaseIndex];

  // Enabled habits
  const enabledHabits = DEFAULT_HABITS.filter((h) => preferences.enabledHabitIds.includes(h.id));
  const coreHabits = enabledHabits.filter((h) => h.isCore);
  const optionalHabits = enabledHabits.filter((h) => !h.isCore);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. HERO HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1420] via-[#0B0E14] to-[#07090D] p-6 lg:p-8 shadow-2xl">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              {currentPhase.title}
            </div>

            <h1 className="text-3xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
              WINTER ARC 90
            </h1>
            <p className="text-slate-400 text-sm lg:text-base font-medium tracking-wide">
              90 DAYS • DISCIPLINE • GROWTH • TRANSFORMATION
            </p>

            {/* Daily Quote Box */}
            <div className="pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <span className="text-cyan-400 text-lg font-serif">“</span>
                <p className="text-xs lg:text-sm text-slate-300 italic font-medium leading-relaxed">
                  {dailyQuote}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Hero Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col justify-center">
              <span className="text-[11px] text-slate-400 font-mono uppercase">Current Day</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-display font-extrabold text-white">Day {currentDay}</span>
                <span className="text-xs text-slate-400 font-mono">/ 90</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col justify-center">
              <span className="text-[11px] text-slate-400 font-mono uppercase">Streak</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Flame className="w-5 h-5 text-orange-400 fill-orange-500/30" />
                <span className="text-2xl font-display font-extrabold text-orange-400">{stats.currentStreak} Days</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col justify-center">
              <span className="text-[11px] text-slate-400 font-mono uppercase">90-Day Done</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-display font-extrabold text-cyan-400">{stats.overallProgressPct}%</span>
                <span className="text-xs text-slate-400 font-mono">({stats.completedDaysCount}d)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN PROGRESS CARDS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Grand 90-Day Circular Progress Gauge */}
        <div className="lg:col-span-5 arc-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">Macro Horizon</span>
              <h3 className="text-lg font-display font-extrabold text-white">90 DAY PROGRESS</h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
              Day {currentDay} / 90
            </span>
          </div>

          <div className="py-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            <ProgressRing
              progress={stats.overallProgressPct}
              size={150}
              strokeWidth={12}
              label="Completed"
              subLabel={`${stats.completedDaysCount} of 90 Days`}
            />

            <div className="space-y-3 w-full sm:w-auto">
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Today's Score</span>
                <div className="text-lg font-bold text-white flex items-center justify-between gap-4">
                  <span>{stats.todayScore.habitsChecked} / {stats.todayScore.totalEnabledCount} Habits</span>
                  <span className="text-cyan-400 text-sm font-mono font-bold">{stats.todayScore.pct}%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Best Streak Record</span>
                <div className="text-lg font-bold text-orange-400 flex items-center gap-2">
                  <Flame className="w-4 h-4 fill-orange-500/20" />
                  <span>{stats.longestStreak} Consecutive Days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Total Habits Logged: <strong className="text-white font-mono">{stats.totalCompletedHabitsAllDays}</strong></span>
            <span>Perfect Days: <strong className="text-cyan-400 font-mono">{stats.perfectDaysCount}</strong></span>
          </div>
        </div>

        {/* Right: 3-Month Phase Progress Breakdown */}
        <div className="lg:col-span-7 arc-card rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">Phase Breakdown</span>
              <h3 className="text-lg font-display font-extrabold text-white">3-MONTH TRANSFORMATION ARC</h3>
            </div>
            <button
              onClick={() => setCurrentView('arc')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
            >
              View Full Arc <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 py-4">
            {monthPhases.map((phase) => {
              const mStats = stats.monthStats[phase.month];
              const phasePct = mStats.possibleHabits > 0 ? Math.round((mStats.totalHabits / mStats.possibleHabits) * 100) : 0;
              const isCurrent = currentPhase.month === phase.month;

              return (
                <div
                  key={phase.month}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-cyan-950/20 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                      : 'bg-zinc-900/40 border-white/5 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {phase.subtitle}
                    </span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                  <h4 className="font-display font-bold text-sm text-white mt-1">
                    Month {phase.month} — {phase.title.split('—')[1]}
                  </h4>

                  {/* Progress bar */}
                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Completion</span>
                      <span className="text-white font-bold">{phasePct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${phasePct}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{mStats.completedDays}/30 Days</span>
                    <span>{mStats.gateHours}h GATE</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span>Current Stage: <strong className="text-cyan-300 font-medium">{currentPhase.tagline}</strong></span>
          </div>
        </div>
      </div>

      {/* 3. TODAY'S HABITS CHECKLIST SNAPSHOT */}
      <div className="arc-card rounded-3xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-display font-black text-white">
                  TODAY'S BATTLEFIELD — DAY {currentDay}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {currentDayData.date}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Click any habit to toggle completion. Every action recalculates your streak and transformation score live.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-lg font-bold font-mono text-white">
                {stats.todayScore.habitsChecked} / {stats.todayScore.totalEnabledCount} Done
              </div>
              <div className="text-[11px] font-mono text-cyan-400 font-semibold">
                {stats.todayScore.pct}% Completed
              </div>
            </div>
            <button
              onClick={() => setCurrentView('today')}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-display font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
            >
              Full Today View <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Core 8 Habits Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Core Daily Non-Negotiables
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {coreHabits.filter((h) => currentDayData.habits[h.id]).length} / {coreHabits.length} Complete
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {coreHabits.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                checked={!!currentDayData.habits[habit.id]}
                onToggle={() => toggleHabit(currentDay, habit.id)}
                compact
              />
            ))}
          </div>
        </div>

        {/* Optional Habits Snapshot */}
        {optionalHabits.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
                Additional Winter Arc Growth Habits
              </span>
              <button
                onClick={() => setCurrentView('tracker')}
                className="text-[11px] text-cyan-400 hover:underline font-mono"
              >
                View all in Daily Tracker →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {optionalHabits.slice(0, 4).map((habit) => (
                <HabitItem
                  key={habit.id}
                  habit={habit}
                  checked={!!currentDayData.habits[habit.id]}
                  onToggle={() => toggleHabit(currentDay, habit.id)}
                  compact
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. PILLARS QUICK STATS & TOP GOALS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Key Metric Cards Grid (Fitness, GATE, Skills, Screen Time, Steps, Water) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-extrabold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              PILLAR PERFORMANCE PULSE
            </h3>
            <span className="text-xs font-mono text-slate-400">90-Day Cumulative</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* GATE Card */}
            <div
              onClick={() => setCurrentView('gate')}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <BookOpen className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-slate-400">2h/day</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-display font-black text-white">{stats.totalGateHours}h</span>
                <p className="text-[11px] text-slate-400 font-medium">GATE War Room</p>
                <div className="text-[10px] text-cyan-400 font-mono mt-1">
                  {stats.gateProgress.completedTopics}/{stats.gateProgress.totalTopics} Topics Done
                </div>
              </div>
            </div>

            {/* Gym / Fitness Card */}
            <div
              onClick={() => setCurrentView('fitness')}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <Dumbbell className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-slate-400">{stats.totalWorkouts} sessions</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-display font-black text-white">{stats.totalWorkoutHours}h</span>
                <p className="text-[11px] text-slate-400 font-medium">Fitness Training</p>
                <div className="text-[10px] text-blue-400 font-mono mt-1">
                  {currentDayData.metrics.workoutType || 'Push'} Today
                </div>
              </div>
            </div>

            {/* Skill Development Card */}
            <div
              onClick={() => setCurrentView('skills')}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/30 hover:bg-zinc-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <Code className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-slate-400">2h/day</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-display font-black text-white">{stats.totalSkillHours}h</span>
                <p className="text-[11px] text-slate-400 font-medium">Skill Craft & DSA</p>
                <div className="text-[10px] text-purple-400 font-mono mt-1">
                  DSA & Full-Stack
                </div>
              </div>
            </div>

            {/* Steps Card */}
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-mono text-slate-400">10K target</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-display font-black text-white">
                  {(stats.totalSteps / 1000).toFixed(0)}k
                </span>
                <p className="text-[11px] text-slate-400 font-medium">Total Steps Logged</p>
                <div className="text-[10px] text-emerald-400 font-mono mt-1">
                  {currentDayData.metrics.steps?.toLocaleString() || '10,000'} today
                </div>
              </div>
            </div>

            {/* Screen Time Card */}
            <div
              onClick={() => setCurrentView('screentime')}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <Smartphone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-slate-400">&lt;8h Goal</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-display font-black text-white">{stats.avgScreenTimeHours}h</span>
                <p className="text-[11px] text-slate-400 font-medium">Avg Daily Screen</p>
                <div className="text-[10px] text-amber-400 font-mono mt-1">
                  {stats.screenUnderTargetDays} Days Under Limit
                </div>
              </div>
            </div>

            {/* Water Card */}
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
              <div className="flex items-center justify-between">
                <Droplets className="w-4 h-4 text-sky-400" />
                <span className="text-[10px] font-mono text-slate-400">4L Target</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-display font-black text-white">{stats.totalWaterLiters}L</span>
                <p className="text-[11px] text-slate-400 font-medium">Pure Hydration</p>
                <div className="text-[10px] text-sky-400 font-mono mt-1">
                  {currentDayData.metrics.waterLiters || 4}L Logged Today
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Master Goals Snapshot */}
        <div className="lg:col-span-5 arc-card rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <h3 className="font-display font-extrabold text-white">TOP 90-DAY GOALS</h3>
            </div>
            <button
              onClick={() => setCurrentView('goals')}
              className="text-xs text-cyan-400 hover:underline font-mono"
            >
              Manage ({goalsData.masterGoals.length}) →
            </button>
          </div>

          <div className="space-y-3 py-2 flex-1">
            {goalsData.masterGoals.slice(0, 4).map((goal) => (
              <div key={goal.id} className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-cyan-300 font-semibold uppercase">
                    {goal.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">{goal.progress}%</span>
                </div>
                <div className="text-xs font-medium text-slate-200 line-clamp-1">{goal.title}</div>
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5">
            <button
              onClick={() => setCurrentView('goals')}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold font-mono tracking-wider uppercase transition-colors"
            >
              Configure Master Vision Goals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
