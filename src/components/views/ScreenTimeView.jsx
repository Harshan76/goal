import React from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Smartphone, CheckCircle, AlertTriangle, Clock, TrendingDown, Sparkles } from 'lucide-react';

export function ScreenTimeView() {
  const { currentDay, currentDayData, days, stats, updateDayMetrics, toggleHabit, preferences } = useWinterArc();

  const totalMinutes = currentDayData.metrics.screenTimeMinutes || 340;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const targetMinutes = (preferences.targets.screenTimeHours || 8) * 60;
  const isUnderLimit = totalMinutes <= targetMinutes;

  const handleUpdateScreenTime = (newMinutes) => {
    const val = Math.max(0, Math.min(1440, Number(newMinutes)));
    updateDayMetrics(currentDay, { screenTimeMinutes: val });
    if (val <= targetMinutes && !currentDayData.habits.screen_time) {
      toggleHabit(currentDay, 'screen_time');
    }
  };

  // Past 7 Days screen time for chart
  const recentDays = days.slice(Math.max(0, currentDay - 7), currentDay);

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                DIGITAL SOBRIETY & DOPAMINE DETOX
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              SCREEN TIME MONITOR
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Daily Target: <strong className="text-amber-300 font-mono">&lt; {preferences.targets.screenTimeHours || 8} HOURS / DAY</strong>. Stop trading your ambition for endless algorithmic feeds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase">90-Day Avg Screen</span>
            <div className="text-2xl font-display font-black text-amber-400 mt-0.5">
              {stats.avgScreenTimeHours}h / day
            </div>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S SCREEN TIME STATUS CARD */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">Today's Total Screen Time</span>
            <div className="text-4xl lg:text-5xl font-display font-black text-white font-mono">
              {hours}h {mins < 10 ? `0${mins}` : mins}m
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-2 ${
            isUnderLimit
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          }`}>
            {isUnderLimit ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            <div>
              <div className="text-xs font-bold font-mono uppercase">
                {isUnderLimit ? '✅ Goal Achieved' : '⚠️ Limit Exceeded'}
              </div>
              <div className="text-[10px] opacity-80 font-mono">Target: &lt; 8h 00m</div>
            </div>
          </div>
        </div>

        {/* Manual Time Slider & Direct Inputs */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>Adjust Screen Time for Day {currentDay}</span>
            <span>{totalMinutes} Minutes ({((totalMinutes / 60).toFixed(1))}h)</span>
          </div>

          <input
            type="range"
            min="0"
            max="720"
            step="10"
            value={totalMinutes}
            onChange={(e) => handleUpdateScreenTime(e.target.value)}
            className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[180, 240, 300, 360, 420, 480, 540].map((minsVal) => (
              <button
                key={minsVal}
                onClick={() => handleUpdateScreenTime(minsVal)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-amber-400/40 text-xs font-mono text-slate-300 transition-colors"
              >
                {minsVal / 60}h 00m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. RECENT 7-DAY SCREEN TIME GRAPH */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          RECENT 7-DAY SCREEN TIME TREND (HOURS)
        </h3>

        <div className="grid grid-cols-7 gap-2 pt-4 items-end h-44 border-b border-white/10 pb-4">
          {recentDays.map((d) => {
            const dayMins = d.metrics.screenTimeMinutes || 340;
            const dayH = Number((dayMins / 60).toFixed(1));
            const heightPct = Math.min(100, Math.round((dayMins / 600) * 100));
            const isUnder = dayMins <= targetMinutes;

            return (
              <div key={d.dayNumber} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-300 font-bold">{dayH}h</span>
                <div className="w-full max-w-[36px] bg-zinc-800 rounded-t-xl overflow-hidden flex flex-col justify-end" style={{ height: '75%' }}>
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isUnder ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-gradient-to-t from-rose-600 to-amber-500'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400">D{d.dayNumber}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
