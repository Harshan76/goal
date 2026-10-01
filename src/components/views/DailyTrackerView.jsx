import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { HabitItem } from '../common/HabitItem';
import { ProgressRing } from '../common/ProgressRing';
import { DEFAULT_HABITS, HABIT_CATEGORIES } from '../../data/initialData';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  SlidersHorizontal,
  Flame,
  Dumbbell,
  BookOpen,
  Code,
  Droplets,
  Moon,
  Smartphone,
  Footprints,
  PenTool,
  Save,
  Check,
} from 'lucide-react';

export function DailyTrackerView() {
  const {
    preferences,
    updatePreferences,
    currentDay,
    days,
    currentDayData,
    stats,
    toggleHabit,
    setDayStatus,
    updateDayMetrics,
    updateDayNotes,
    monthPhases,
  } = useWinterArc();

  const [filterCategory, setFilterCategory] = useState('ALL');
  const [showHabitManager, setShowHabitManager] = useState(false);

  // Selected day object
  const selectedDay = currentDayData;
  const dayIndex = currentDay - 1;
  const dayScore = stats.dailyScores[dayIndex] || { habitsChecked: 0, totalEnabledCount: 1, pct: 0 };

  const currentPhaseIndex = currentDay <= 30 ? 0 : currentDay <= 60 ? 1 : 2;
  const currentPhase = monthPhases[currentPhaseIndex];

  // Habits filtering
  const allHabits = DEFAULT_HABITS;
  const enabledHabits = allHabits.filter((h) => preferences.enabledHabitIds.includes(h.id));
  const displayedHabits = enabledHabits.filter((h) => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'CORE') return h.isCore;
    return h.category === filterCategory;
  });

  const categories = ['ALL', 'CORE', ...Object.values(HABIT_CATEGORIES)];

  const handleToggleHabitEnable = (habitId) => {
    const isCurrentlyEnabled = preferences.enabledHabitIds.includes(habitId);
    let next;
    if (isCurrentlyEnabled) {
      if (preferences.enabledHabitIds.length <= 1) return; // Keep at least 1
      next = preferences.enabledHabitIds.filter((id) => id !== habitId);
    } else {
      next = [...preferences.enabledHabitIds, habitId];
    }
    updatePreferences({ enabledHabitIds: next });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. TOP DAY SELECTOR CAROUSEL & ACTIONS */}
      <div className="arc-card rounded-3xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-display font-black text-white">
                  DAY {currentDay} OF 90
                </h2>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                  {selectedDay.date}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentPhase.title} • {currentPhase.subtitle}
              </p>
            </div>
          </div>

          {/* Day Status Selector & Habit Manager Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mark Status */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 px-2 uppercase font-bold">Status:</span>
              <button
                onClick={() => setDayStatus(currentDay, 'completed')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  selectedDay.status === 'completed'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" /> Done
              </button>
              <button
                onClick={() => setDayStatus(currentDay, 'partial')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  selectedDay.status === 'partial'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" /> Partial
              </button>
              <button
                onClick={() => setDayStatus(currentDay, 'missed')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  selectedDay.status === 'missed'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" /> Missed
              </button>
            </div>

            {/* Habit Customizer Toggle */}
            <button
              onClick={() => setShowHabitManager(!showHabitManager)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                showHabitManager
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Customize Habits ({enabledHabits.length}/{allHabits.length})
            </button>
          </div>
        </div>

        {/* Horizontal Mini Day Selector Slider (90 Days) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Jump to Any Day (Days 1 → 90)</span>
            <span>Selected: Day {currentDay}</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {days.map((d) => {
              const isSelected = d.dayNumber === currentDay;
              const s = stats.dailyScores[d.dayNumber - 1];
              const isCompleted = d.status === 'completed' || s?.isPerfect;
              const isPartial = d.status === 'partial' || (s?.pct > 0 && s?.pct < 100);
              const isMissed = d.status === 'missed';

              return (
                <button
                  key={d.dayNumber}
                  onClick={() => updatePreferences({ currentDay: d.dayNumber })}
                  className={`flex-shrink-0 w-12 h-14 rounded-2xl flex flex-col items-center justify-center p-1 border transition-all ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-300 text-slate-950 font-bold scale-105 shadow-lg shadow-cyan-500/30'
                      : isCompleted
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : isPartial
                      ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                      : isMissed
                      ? 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                      : 'bg-zinc-900/50 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] font-mono leading-none">D{d.dayNumber}</span>
                  <div className="mt-1 text-xs font-extrabold leading-none">
                    {s?.pct > 0 ? `${s.pct}%` : '—'}
                  </div>
                  <div className="mt-1">
                    {isCompleted ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    ) : isPartial ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    ) : isMissed ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 inline-block" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. OPTIONAL HABIT MANAGER DRAWER */}
      {showHabitManager && (
        <div className="arc-card rounded-3xl p-6 border-cyan-500/30 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <h3 className="font-display font-extrabold text-white text-base">
                ENABLE / DISABLE OPTIONAL HABITS
              </h3>
              <p className="text-xs text-slate-400">
                Choose which habits are active for your Winter Arc challenge. Checked habits will appear in your daily tracking matrix.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {enabledHabits.length} of {allHabits.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allHabits.map((habit) => {
              const isEnabled = preferences.enabledHabitIds.includes(habit.id);
              return (
                <div
                  key={habit.id}
                  onClick={() => handleToggleHabitEnable(habit.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all ${
                    isEnabled
                      ? 'bg-cyan-950/30 border-cyan-500/40 text-white'
                      : 'bg-zinc-900/40 border-white/5 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isEnabled ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-white/20'
                      }`}
                    >
                      {isEnabled && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{habit.name}</div>
                      <div className="text-[10px] text-slate-400">{habit.category}</div>
                    </div>
                  </div>
                  {habit.isCore && (
                    <span className="text-[9px] uppercase font-bold font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Core
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CATEGORY PILLS & HABIT CHECKLIST */}
      <div className="space-y-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900/60 border border-white/5 text-slate-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Habit Checkboxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {displayedHabits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              checked={!!selectedDay.habits[habit.id]}
              onToggle={() => toggleHabit(currentDay, habit.id)}
              showCategory
            />
          ))}
        </div>
      </div>

      {/* 4. DAY METRICS DETAILED LOGS (WORKOUT, GATE, SKILLS, SCREEN, WATER, SLEEP) */}
      <div className="arc-card rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-display font-black text-white text-lg uppercase tracking-wide">
            DETAILED METRICS FOR DAY {currentDay}
          </h3>
          <span className="text-xs font-mono text-slate-400">All data persists locally</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Workout Log */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Dumbbell className="w-3.5 h-3.5 text-blue-400" /> Workout Focus</span>
              <span>2h Goal</span>
            </div>
            <select
              value={selectedDay.metrics.workoutType || 'Push'}
              onChange={(e) => updateDayMetrics(currentDay, { workoutType: e.target.value })}
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white focus:outline-none focus:border-blue-400"
            >
              {['Push', 'Pull', 'Legs', 'Cardio', 'Core', 'Mobility', 'Full Body', 'Rest Day'].map((t) => (
                <option key={t} value={t} className="bg-[#0f1219]">
                  {t} Workout
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="number"
                value={selectedDay.metrics.workoutMinutes || 0}
                onChange={(e) => updateDayMetrics(currentDay, { workoutMinutes: Number(e.target.value) })}
                className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white"
                placeholder="Minutes"
              />
              <span className="text-xs text-slate-400 font-mono">Minutes trained</span>
            </div>
          </div>

          {/* GATE Hours Log */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-cyan-400" /> GATE War Room</span>
              <span>2h Target</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                value={selectedDay.metrics.gateHours || 0}
                onChange={(e) => updateDayMetrics(currentDay, { gateHours: Number(e.target.value) })}
                className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white"
              />
              <span className="text-xs text-slate-400 font-mono">Study Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={selectedDay.metrics.gateQuestions || 0}
                onChange={(e) => updateDayMetrics(currentDay, { gateQuestions: Number(e.target.value) })}
                className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white"
              />
              <span className="text-xs text-slate-400 font-mono">Questions Solved</span>
            </div>
          </div>

          {/* Skill Hours Log */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Code className="w-3.5 h-3.5 text-purple-400" /> Skill Craft</span>
              <span>2h Target</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                value={selectedDay.metrics.skillHours || 0}
                onChange={(e) => updateDayMetrics(currentDay, { skillHours: Number(e.target.value) })}
                className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white"
              />
              <span className="text-xs text-slate-400 font-mono">Coding Hours</span>
            </div>
            <input
              type="text"
              value={selectedDay.metrics.skillCategory || ''}
              onChange={(e) => updateDayMetrics(currentDay, { skillCategory: e.target.value })}
              placeholder="e.g. DSA Trees, Next.js, PyTorch"
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs text-white placeholder-slate-500"
            />
          </div>

          {/* Sleep Hours */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Moon className="w-3.5 h-3.5 text-indigo-400" /> Sleep Duration</span>
              <span>7-8h Goal</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                value={selectedDay.metrics.sleepHours || 0}
                onChange={(e) => updateDayMetrics(currentDay, { sleepHours: Number(e.target.value) })}
                className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white"
              />
              <span className="text-xs text-slate-400 font-mono">Hours Slept</span>
            </div>
          </div>

          {/* Screen Time Minutes */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-amber-400" /> Screen Time</span>
              <span>&lt; 480 mins</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={selectedDay.metrics.screenTimeMinutes || 0}
                onChange={(e) => updateDayMetrics(currentDay, { screenTimeMinutes: Number(e.target.value) })}
                className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white"
              />
              <span className="text-xs text-slate-400 font-mono">
                Mins ({((selectedDay.metrics.screenTimeMinutes || 0) / 60).toFixed(1)}h)
              </span>
            </div>
          </div>

          {/* Weight (Optional) */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Footprints className="w-3.5 h-3.5 text-emerald-400" /> Body Weight</span>
              <span>Morning Scale</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                value={selectedDay.metrics.weightKg || ''}
                onChange={(e) => updateDayMetrics(currentDay, { weightKg: Number(e.target.value) })}
                placeholder="75.0"
                className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white"
              />
              <span className="text-xs text-slate-400 font-mono">kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
