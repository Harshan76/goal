import React from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Brain, Moon, Sun, Shield, Sparkles, Clock, CheckCircle2, Flame } from 'lucide-react';

export function DisciplineView() {
  const { currentDay, currentDayData, stats, updateDayMetrics, toggleHabit } = useWinterArc();

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            RADICAL FOCUS & INNER MASTERY
          </span>
        </div>
        <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
          DISCIPLINE & MENTAL ARCHITECTURE
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Discipline is the bridge between goals and reality. Master your sleep window, eliminate digital pollution, and enter flow state daily.
        </p>
      </div>

      {/* 2. SLEEP & WAKE PROTOCOL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="arc-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              SLEEP RECOVERY PROTOCOL (7–8 HOURS)
            </h3>
            <span className="text-xs font-mono text-indigo-400">{currentDayData.habits.sleep ? 'Met ✅' : 'Pending ⏳'}</span>
          </div>

          <p className="text-xs text-slate-400">
            High cognitive output during GATE and coding requires deep REM and slow-wave sleep. Target 7 to 8 hours without exception.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-xs font-mono text-slate-400">Hours Slept</label>
              <input
                type="number"
                step="0.1"
                value={currentDayData.metrics.sleepHours || 8}
                onChange={(e) => updateDayMetrics(currentDay, { sleepHours: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-sm font-bold text-white"
              />
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-end">
              <button
                onClick={() => toggleHabit(currentDay, 'sleep')}
                className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                  currentDayData.habits.sleep
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {currentDayData.habits.sleep ? 'Sleep Goal Hit ✅' : 'Mark 7-8h Sleep'}
              </button>
            </div>
          </div>
        </div>

        {/* Mind & Meditation */}
        <div className="arc-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              MINDFULNESS & IMPULSE CONTROL
            </h3>
            <span className="text-xs font-mono text-amber-400">{currentDayData.habits.meditation ? 'Done ✅' : 'Pending ⏳'}</span>
          </div>

          <p className="text-xs text-slate-400">
            10–15 minutes of silent box breathing or breath meditation to calm reactive stress and strengthen focus circuits.
          </p>

          <div className="pt-2">
            <button
              onClick={() => toggleHabit(currentDay, 'meditation')}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                currentDayData.habits.meditation
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {currentDayData.habits.meditation ? 'Meditation Session Checked ✅' : 'Complete 15m Meditation'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. DISCIPLINE HABITS CHECKLIST */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          DISCIPLINE PILLAR CHECKLIST FOR DAY {currentDay}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: 'clean_room', label: 'Keep Room & Workspace Clean (Zero Clutter)' },
            { id: 'wake_schedule', label: 'Wake Up on Planned Schedule (No Snooze)' },
            { id: 'no_late_scroll', label: 'No Late-Night Scrolling (1h Before Bed)' },
            { id: 'digital_detox', label: 'Digital Detox Period (2h Screen-Free Focus)' },
          ].map((item) => {
            const isChecked = !!currentDayData.habits[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleHabit(currentDay, item.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                  isChecked ? 'bg-cyan-950/30 border-cyan-500/40 text-white' : 'bg-zinc-900/50 border-white/5 text-slate-300 hover:bg-zinc-900'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                    isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold' : 'border-white/20 bg-zinc-800'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
