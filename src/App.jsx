import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  RotateCcw,
  Flame,
  Trophy,
  Check,
  CheckCircle2,
  ChevronDown,
  ArrowUp,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

const GOALS = [
  { id: 'water', label: '4L Water', icon: '💧', header: '💧 4L Water' },
  { id: 'sleep', label: '7–8h Sleep', icon: '😴', header: '😴 7–8h Sleep' },
  { id: 'gym', label: '2h Gym', icon: '🏋️', header: '🏋️ 2h Gym' },
  { id: 'gate', label: '2h GATE', icon: '📚', header: '📚 2h GATE' },
  { id: 'skills', label: '2h Skills', icon: '💻', header: '💻 2h Skills' },
  { id: 'noJunk', label: 'No Junk', icon: '🚫', header: '🚫 No Junk' },
  { id: 'screen', label: '<8h Screen', icon: '📱', header: '📱 <8h Screen' },
  { id: 'steps', label: '10K Steps', icon: '🚶', header: '🚶 10K Steps' },
];

const MONTHS_CONFIG = [
  {
    month: 1,
    title: 'MONTH 1 — FOUNDATION',
    subtitle: 'Days 1 to 30',
    startDay: 1,
    endDay: 30,
    accent: 'cyan',
  },
  {
    month: 2,
    title: 'MONTH 2 — DISCIPLINE',
    subtitle: 'Days 31 to 60',
    startDay: 31,
    endDay: 60,
    accent: 'amber',
  },
  {
    month: 3,
    title: 'MONTH 3 — TRANSFORMATION',
    subtitle: 'Days 61 to 90',
    startDay: 61,
    endDay: 90,
    accent: 'emerald',
  },
];

const STORAGE_KEY_CHECKS = 'winter_arc_tracker_checks_v3';
const STORAGE_KEY_DATE = 'winter_arc_tracker_start_date_v3';

export default function App() {
  // Start date state (default: October 1, 2026)
  const [startDate, setStartDate] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATE);
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return '2026-10-01';
  });

  // Checks state: { [day: number]: { [goalId: string]: boolean } }
  const [checks, setChecks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  const [filterMonth, setFilterMonth] = useState('ALL'); // 'ALL' | 1 | 2 | 3
  const [showResetModal, setShowResetModal] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKS, JSON.stringify(checks));
    } catch (e) {
      console.error(e);
    }
  }, [checks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATE, startDate);
    } catch (e) {
      console.error(e);
    }
  }, [startDate]);

  // Generate 90 days array with dates and scores
  const daysData = useMemo(() => {
    const list = [];
    const baseDate = new Date(startDate);
    const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let dayNum = 1; dayNum <= 90; dayNum++) {
      const currentD = new Date(baseDate);
      currentD.setDate(baseDate.getDate() + (dayNum - 1));

      const monthName = monthsNames[currentD.getMonth()];
      const dayOfMonth = currentD.getDate();
      const dateFormatted = `${monthName} ${dayOfMonth}`;

      const dayChecks = checks[dayNum] || {};
      let completedCount = 0;
      GOALS.forEach((g) => {
        if (dayChecks[g.id]) completedCount++;
      });

      const percentage = Math.round((completedCount / 8) * 100);
      const isPerfect = completedCount === 8;

      let scoreColor = 'text-slate-500';
      let scoreBadge = 'border-slate-800 bg-slate-900/50 text-slate-400';
      let dotColor = 'bg-slate-600';
      let emoji = '⚪';

      if (completedCount >= 7) {
        scoreColor = 'text-emerald-400 font-bold';
        scoreBadge = 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300';
        dotColor = 'bg-emerald-400';
        emoji = '🟢';
      } else if (completedCount >= 4) {
        scoreColor = 'text-amber-400 font-bold';
        scoreBadge = 'border-amber-500/30 bg-amber-950/40 text-amber-300';
        dotColor = 'bg-amber-400';
        emoji = '🟡';
      } else if (completedCount > 0) {
        scoreColor = 'text-rose-400 font-bold';
        scoreBadge = 'border-rose-500/30 bg-rose-950/40 text-rose-300';
        dotColor = 'bg-rose-400';
        emoji = '🔴';
      }

      list.push({
        dayNumber: dayNum,
        dateString: dateFormatted,
        fullDateStr: currentD.toDateString(),
        checks: dayChecks,
        completedCount,
        percentage,
        isPerfect,
        scoreColor,
        scoreBadge,
        dotColor,
        emoji,
      });
    }
    return list;
  }, [startDate, checks]);

  // Toggle single goal checkbox
  const toggleGoal = (dayNum, goalId) => {
    setChecks((prev) => {
      const currentDayChecks = prev[dayNum] || {};
      const newVal = !currentDayChecks[goalId];
      return {
        ...prev,
        [dayNum]: {
          ...currentDayChecks,
          [goalId]: newVal,
        },
      };
    });
  };

  // Toggle all 8 goals for a day (Quick helper)
  const toggleAllForDay = (dayNum) => {
    setChecks((prev) => {
      const currentDayChecks = prev[dayNum] || {};
      const allDone = GOALS.every((g) => currentDayChecks[g.id]);
      const nextDayChecks = {};
      GOALS.forEach((g) => {
        nextDayChecks[g.id] = !allDone;
      });
      return {
        ...prev,
        [dayNum]: nextDayChecks,
      };
    });
  };

  // Monthly statistics calculations
  const monthlyStats = useMemo(() => {
    const res = {};
    MONTHS_CONFIG.forEach((m) => {
      const mDays = daysData.slice(m.startDay - 1, m.endDay);
      let totalCompleted = 0;
      let perfectDays = 0;

      mDays.forEach((d) => {
        totalCompleted += d.completedCount;
        if (d.isPerfect) perfectDays++;
      });

      const totalPossible = 240; // 30 days * 8 goals
      const avgPct = totalPossible > 0 ? ((totalCompleted / totalPossible) * 100).toFixed(1) : '0.0';

      res[m.month] = {
        totalCompleted,
        totalPossible,
        avgDailyPct: avgPct,
        perfectDays,
        days: mDays,
      };
    });
    return res;
  }, [daysData]);

  // Overall 90-Day calculations & Streaks
  const overallStats = useMemo(() => {
    let totalCompleted = 0;
    let perfectDays = 0;

    daysData.forEach((d) => {
      totalCompleted += d.completedCount;
      if (d.isPerfect) perfectDays++;
    });

    const totalPossible = 720; // 90 * 8
    const overallPct = totalPossible > 0 ? ((totalCompleted / totalPossible) * 100).toFixed(1) : '0.0';

    // Streak calculation: consecutive days where all 8 goals are completed
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < daysData.length; i++) {
      if (daysData[i].isPerfect) {
        tempStreak++;
        if (tempStreak > bestStreak) bestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }
    currentStreak = tempStreak;

    return {
      totalCompleted,
      totalPossible,
      overallPct,
      perfectDays,
      currentStreak,
      bestStreak,
    };
  }, [daysData]);

  // Reset all
  const handleReset = () => {
    setChecks({});
    setShowResetModal(false);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. CLEAN HEADER SECTION */}
      <header className="border-b border-white/10 bg-[#0C0E14]/90 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-black tracking-tight text-white uppercase">
              WINTER ARC — 90 DAY GOAL TRACKER
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide mt-0.5">
              90 Days • Discipline • Consistency • Growth
            </p>
          </div>

          {/* Quick Controls: Start Date & Month Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Start Date Picker */}
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-white/10 rounded-xl px-3 py-1.5 shadow-sm">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <label className="text-xs text-slate-400 font-mono font-medium">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-xs text-white font-mono font-bold focus:outline-none cursor-pointer"
              />
            </div>

            {/* Month Filter Buttons */}
            <div className="flex items-center gap-1 bg-zinc-900/90 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setFilterMonth('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterMonth === 'ALL'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All 90 Days
              </button>
              {[1, 2, 3].map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMonth(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterMonth === m
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Month {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. TOP STREAK & LIVE METRICS BAR */}
      <div className="bg-[#0C0E14] border-b border-white/5 py-3 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-500/30 animate-pulse" />
              <span className="text-slate-300">
                Current Streak:{' '}
                <strong className="text-orange-400 font-bold font-display text-sm">
                  {overallStats.currentStreak} DAYS
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">
                Best Streak:{' '}
                <strong className="text-amber-400 font-bold font-display text-sm">
                  {overallStats.bestStreak} Days
                </strong>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">
                Perfect Days:{' '}
                <strong className="text-emerald-400 font-bold font-display text-sm">
                  {overallStats.perfectDays} / 90
                </strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              Total Goals Completed:{' '}
              <strong className="text-white font-bold font-display text-sm">
                {overallStats.totalCompleted} / 720
              </strong>{' '}
              ({overallStats.overallPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* 3. MAIN 90-DAY TRACKER TABLE CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
        
        {MONTHS_CONFIG.map((mConfig) => {
          if (filterMonth !== 'ALL' && filterMonth !== mConfig.month) {
            return null;
          }

          const mStats = monthlyStats[mConfig.month];
          const mDays = mStats.days;

          return (
            <div
              key={mConfig.month}
              className="rounded-2xl border border-white/10 bg-[#0F1117] shadow-2xl overflow-hidden"
            >
              {/* Month Header Banner */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#141822] via-[#0F1117] to-[#141822] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-display font-black text-sm">
                    M{mConfig.month}
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-black text-white uppercase tracking-wide">
                      {mConfig.title}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">
                      {mConfig.subtitle} • {mDays[0]?.dateString} → {mDays[mDays.length - 1]?.dateString}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-400">
                    Completed:{' '}
                    <strong className="text-emerald-400 font-bold">
                      {mStats.totalCompleted} / {mStats.totalPossible}
                    </strong>
                  </span>
                  <span className="text-slate-400">
                    Avg:{' '}
                    <strong className="text-white font-bold">
                      {mStats.avgDailyPct}%
                    </strong>
                  </span>
                  <span className="text-slate-400">
                    Perfect:{' '}
                    <strong className="text-emerald-400 font-bold">
                      {mStats.perfectDays} / 30
                    </strong>
                  </span>
                </div>
              </div>

              {/* Table Wrapper (Horizontally Scrollable on Mobile with Sticky Day & Date Columns) */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#12151E] text-xs font-mono text-slate-300 uppercase tracking-wider select-none">
                      {/* Sticky Day Column */}
                      <th className="py-3 px-3.5 sticky left-0 z-20 bg-[#12151E] border-r border-white/5 w-16 text-center">
                        Day
                      </th>
                      {/* Sticky Date Column */}
                      <th className="py-3 px-3.5 sticky left-16 z-20 bg-[#12151E] border-r border-white/10 w-24 text-center">
                        Date
                      </th>

                      {/* 8 Core Goals Columns */}
                      {GOALS.map((g) => (
                        <th
                          key={g.id}
                          className="py-3 px-3 text-center border-r border-white/5 font-semibold text-slate-200"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{g.header}</span>
                          </div>
                        </th>
                      ))}

                      {/* Daily Score Column */}
                      <th className="py-3 px-4 text-center w-32 font-bold text-white">
                        Daily Score
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5 text-sm">
                    {mDays.map((day) => {
                      return (
                        <tr
                          key={day.dayNumber}
                          className={`hover:bg-white/[0.02] transition-colors ${
                            day.isPerfect ? 'bg-emerald-950/10' : ''
                          }`}
                        >
                          {/* Sticky Day Cell */}
                          <td className="py-2.5 px-3.5 sticky left-0 z-10 bg-[#0F1117] border-r border-white/5 text-center font-display font-extrabold text-white text-xs">
                            Day {day.dayNumber}
                          </td>

                          {/* Sticky Date Cell */}
                          <td className="py-2.5 px-3.5 sticky left-16 z-10 bg-[#0F1117] border-r border-white/10 text-center font-mono text-xs text-slate-300 whitespace-nowrap">
                            {day.dateString}
                          </td>

                          {/* 8 Checkbox Cells */}
                          {GOALS.map((g) => {
                            const isChecked = !!day.checks[g.id];
                            return (
                              <td
                                key={g.id}
                                className="py-2 px-3 text-center border-r border-white/5"
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleGoal(day.dayNumber, g.id)}
                                  title={`${g.label} for Day ${day.dayNumber}`}
                                  className={`w-8 h-8 rounded-lg border transition-all duration-150 inline-flex items-center justify-center ${
                                    isChecked
                                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30 scale-105'
                                      : 'bg-zinc-800/80 border-white/15 hover:border-emerald-500/50 hover:bg-zinc-800 text-transparent'
                                  }`}
                                >
                                  <Check
                                    className={`w-4 h-4 stroke-[3] transition-transform duration-150 ${
                                      isChecked ? 'scale-100' : 'scale-0'
                                    }`}
                                  />
                                </button>
                              </td>
                            );
                          })}

                          {/* Daily Score Cell */}
                          <td className="py-2 px-4 text-center whitespace-nowrap">
                            <div className="inline-flex items-center justify-center gap-1.5">
                              <span className="text-xs">{day.emoji}</span>
                              <span className={`font-mono text-xs font-bold ${day.scoreColor}`}>
                                {day.completedCount}/8
                              </span>
                              <span className="text-[11px] font-mono text-slate-400">
                                ({day.percentage}%)
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Monthly Summary Footer */}
              <div className="p-4 sm:p-5 bg-[#12151E] border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
                      {mConfig.title} SUMMARY
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Month {mConfig.month} totals across all 30 days
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center font-mono">
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase block">Total Completed</span>
                      <strong className="text-emerald-400 text-sm sm:text-base font-bold">
                        {mStats.totalCompleted} / 240
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase block">Avg Daily Score</span>
                      <strong className="text-white text-sm sm:text-base font-bold">
                        {mStats.avgDailyPct}%
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase block">Perfect Days</span>
                      <strong className="text-emerald-400 text-sm sm:text-base font-bold">
                        {mStats.perfectDays} / 30
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 4. GRAND 90-DAY RESULT SUMMARY CARD (VERY BOTTOM) */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#101924] via-[#0C1017] to-[#080B10] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono uppercase font-bold tracking-widest">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                FINAL 90-DAY TRANSFORMATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                🏆 90 DAY RESULT
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Overall Success Rate</span>
                <span className="text-2xl font-display font-black text-emerald-400">
                  {overallStats.overallPct}%
                </span>
              </div>
            </div>
          </div>

          {/* 6 Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 font-mono">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Total Possible</span>
              <div className="text-lg font-bold text-white">720 Goals</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Completed</span>
              <div className="text-lg font-bold text-emerald-400">
                {overallStats.totalCompleted} / 720
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Overall Completion</span>
              <div className="text-lg font-bold text-white">{overallStats.overallPct}%</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Perfect Days</span>
              <div className="text-lg font-bold text-emerald-400">
                {overallStats.perfectDays} / 90
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Current Streak</span>
              <div className="text-lg font-bold text-orange-400">
                {overallStats.currentStreak} Days
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Best Streak</span>
              <div className="text-lg font-bold text-amber-400">
                {overallStats.bestStreak} Days
              </div>
            </div>
          </div>
        </div>

        {/* 5. RESET TRACKER BUTTON (AT THE VERY BOTTOM) */}
        <div className="pt-4 pb-8 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 text-xs font-mono font-bold transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Tracker
          </button>
        </div>
      </main>

      {/* 6. RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F1219] border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-display font-black text-lg text-white">Reset 90-Day Tracker?</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Are you sure you want to reset all 90 days? This cannot be undone. All checked habits and streaks will be cleared.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 font-mono">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-400 transition-colors shadow-lg shadow-rose-500/20"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
