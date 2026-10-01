import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { HabitItem } from '../common/HabitItem';
import { ProgressRing } from '../common/ProgressRing';
import { DEFAULT_HABITS } from '../../data/initialData';
import {
  CheckCircle,
  Plus,
  Trash2,
  Edit2,
  Flame,
  Calendar,
  Sparkles,
  Droplets,
  Footprints,
  Clock,
  Dumbbell,
  BookOpen,
  Code,
  PenTool,
  Save,
} from 'lucide-react';

export function TodayChecklistView() {
  const {
    preferences,
    currentDay,
    currentDayData,
    stats,
    toggleHabit,
    updateDayMetrics,
    updateTop3Task,
    updateDayNotes,
    monthPhases,
  } = useWinterArc();

  const [newPriorityText, setNewPriorityText] = useState('');
  const [editingPriorityId, setEditingPriorityId] = useState(null);
  const [editText, setEditText] = useState('');
  const [notesDraft, setNotesDraft] = useState(currentDayData.notes || '');

  const currentPhaseIndex = currentDay <= 30 ? 0 : currentDay <= 60 ? 1 : 2;
  const currentPhase = monthPhases[currentPhaseIndex];

  const enabledHabits = DEFAULT_HABITS.filter((h) => preferences.enabledHabitIds.includes(h.id));
  const coreHabits = enabledHabits.filter((h) => h.isCore);
  const optionalHabits = enabledHabits.filter((h) => !h.isCore);

  const todayScore = stats.todayScore;

  // Handle adding Top 3 task if fewer than 3
  const handleAddTop3 = (e) => {
    e.preventDefault();
    if (!newPriorityText.trim()) return;
    const currentTasks = currentDayData.top3Tasks || [];
    if (currentTasks.length >= 3) return;

    const newTask = {
      id: `top3-${currentDay}-${Date.now()}`,
      text: newPriorityText.trim(),
      completed: false,
    };
    // Update tasks
    const updated = [...currentTasks, newTask];
    // update state through context
    updateDayMetrics(currentDay, {}); // triggers day update
    currentDayData.top3Tasks = updated;
    setNewPriorityText('');
  };

  const handleSaveNotes = () => {
    updateDayNotes(currentDay, notesDraft);
  };

  // Quick increment helpers
  const handleAddWater = (delta) => {
    const current = currentDayData.metrics.waterLiters || 0;
    const nextVal = Number(Math.max(0, current + delta).toFixed(1));
    updateDayMetrics(currentDay, { waterLiters: nextVal });
    if (nextVal >= 4 && !currentDayData.habits.water) {
      toggleHabit(currentDay, 'water');
    }
  };

  const handleAddSteps = (delta) => {
    const current = currentDayData.metrics.steps || 0;
    const nextVal = Math.max(0, current + delta);
    updateDayMetrics(currentDay, { steps: nextVal });
    if (nextVal >= 10000 && !currentDayData.habits.steps) {
      toggleHabit(currentDay, 'steps');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. TODAY'S HEADER BANNER & LIVE SCORE */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0e1726] via-[#0b101b] to-[#07090D] p-6 lg:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase font-bold tracking-wider">
                {currentPhase.title}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentDayData.date}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-display font-black text-white tracking-tight">
              TODAY — DAY {currentDay}
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Execute with absolute intent. Complete your daily standard before your head hits the pillow.
            </p>
          </div>

          {/* Today's Score Metric Card */}
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-xl">
            <ProgressRing
              progress={todayScore.pct}
              size={90}
              strokeWidth={8}
              label="Today"
              className="flex-shrink-0"
            />
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                Today's Score
              </span>
              <div className="text-2xl font-display font-extrabold text-white">
                {todayScore.habitsChecked} / {todayScore.totalEnabledCount}{' '}
                <span className="text-sm font-normal text-slate-400">completed</span>
              </div>
              <div className="text-xs font-mono font-bold text-cyan-400">
                {todayScore.pct}% Daily Rating
              </div>
            </div>
          </div>
        </div>

        {/* Large Linear Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>Daily Execution Bar</span>
            <span className="text-white font-bold">{todayScore.pct}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-zinc-800/80 overflow-hidden border border-white/5 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full transition-all duration-500 shadow-md shadow-cyan-500/40"
              style={{ width: `${todayScore.pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. TODAY'S TOP 3 PRIORITIES */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-black text-white text-base uppercase tracking-wide">
                TODAY'S TOP 3 PRIORITIES
              </h3>
              <p className="text-[11px] text-slate-400">The 3 needle-movers that make today a definitive victory.</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg">
            {currentDayData.top3Tasks?.filter((t) => t.completed).length || 0} / {currentDayData.top3Tasks?.length || 3} Done
          </span>
        </div>

        {/* Top 3 Task List */}
        <div className="space-y-2.5">
          {(currentDayData.top3Tasks || []).map((task, idx) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400'
                  : 'bg-zinc-900/50 border-white/5 hover:border-white/15'
              }`}
            >
              <div
                onClick={() => updateTop3Task(currentDay, task.id, { completed: !task.completed })}
                className="flex items-center gap-3 flex-1 cursor-pointer select-none"
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                    task.completed
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                      : 'border-white/20 bg-zinc-800'
                  }`}
                >
                  {task.completed ? <CheckCircle className="w-4 h-4 stroke-[3]" /> : <span className="text-xs font-mono font-bold text-slate-400">{idx + 1}</span>}
                </div>
                <span className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                  {task.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CORE MANDATORY HABITS (8 NON-NEGOTIABLES) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="font-display font-extrabold text-white text-lg uppercase tracking-wide">
              CORE NON-NEGOTIABLE HABITS ({coreHabits.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            {coreHabits.filter((h) => currentDayData.habits[h.id]).length} / {coreHabits.length} Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {coreHabits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              checked={!!currentDayData.habits[habit.id]}
              onToggle={() => toggleHabit(currentDay, habit.id)}
              showCategory
            />
          ))}
        </div>
      </div>

      {/* 4. OPTIONAL WINTER ARC GROWTH HABITS */}
      {optionalHabits.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <h3 className="font-display font-extrabold text-white text-lg uppercase tracking-wide">
                WINTER ARC GROWTH & DISCIPLINE HABITS ({optionalHabits.length})
              </h3>
            </div>
            <span className="text-xs font-mono text-purple-400">
              {optionalHabits.filter((h) => currentDayData.habits[h.id]).length} / {optionalHabits.length} Complete
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {optionalHabits.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                checked={!!currentDayData.habits[habit.id]}
                onToggle={() => toggleHabit(currentDay, habit.id)}
                showCategory
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. QUICK METRIC LOGGER DIALS & COUNTERS */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          TODAY'S NUMERICAL LOGS & METRICS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Water Counter */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5 text-sky-400" /> Water</span>
              <span>Target: 4L</span>
            </div>
            <div className="text-2xl font-display font-black text-white">
              {currentDayData.metrics.waterLiters || 0} <span className="text-xs font-mono font-normal text-slate-400">Liters</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleAddWater(0.5)}
                className="flex-1 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-xs font-mono font-bold transition-colors"
              >
                +0.5L
              </button>
              <button
                onClick={() => handleAddWater(1.0)}
                className="flex-1 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-xs font-mono font-bold transition-colors"
              >
                +1.0L
              </button>
            </div>
          </div>

          {/* Steps Counter */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Footprints className="w-3.5 h-3.5 text-emerald-400" /> Steps</span>
              <span>Target: 10,000</span>
            </div>
            <div className="text-2xl font-display font-black text-white">
              {(currentDayData.metrics.steps || 0).toLocaleString()} <span className="text-xs font-mono font-normal text-slate-400">steps</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleAddSteps(2000)}
                className="flex-1 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold transition-colors"
              >
                +2k Steps
              </button>
              <button
                onClick={() => handleAddSteps(5000)}
                className="flex-1 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold transition-colors"
              >
                +5k Steps
              </button>
            </div>
          </div>

          {/* GATE Study Hours */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-cyan-400" /> GATE Study</span>
              <span>Target: 2h</span>
            </div>
            <div className="text-2xl font-display font-black text-white">
              {currentDayData.metrics.gateHours || 0} <span className="text-xs font-mono font-normal text-slate-400">Hours</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  const current = currentDayData.metrics.gateHours || 0;
                  const nextVal = Number((current + 0.5).toFixed(1));
                  updateDayMetrics(currentDay, { gateHours: nextVal });
                  if (nextVal >= 2 && !currentDayData.habits.gate) toggleHabit(currentDay, 'gate');
                }}
                className="flex-1 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold transition-colors"
              >
                +30m Study
              </button>
            </div>
          </div>

          {/* Skill Hours */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><Code className="w-3.5 h-3.5 text-purple-400" /> Skill Craft</span>
              <span>Target: 2h</span>
            </div>
            <div className="text-2xl font-display font-black text-white">
              {currentDayData.metrics.skillHours || 0} <span className="text-xs font-mono font-normal text-slate-400">Hours</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  const current = currentDayData.metrics.skillHours || 0;
                  const nextVal = Number((current + 0.5).toFixed(1));
                  updateDayMetrics(currentDay, { skillHours: nextVal });
                  if (nextVal >= 2 && !currentDayData.habits.skills) toggleHabit(currentDay, 'skills');
                }}
                className="flex-1 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold transition-colors"
              >
                +30m Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. DAILY REFLECTION JOURNAL */}
      <div className="arc-card rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
              DAILY REFLECTION JOURNAL — DAY {currentDay}
            </h3>
          </div>
          <button
            onClick={handleSaveNotes}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-display font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Reflection
          </button>
        </div>

        <textarea
          rows={3}
          value={notesDraft}
          onChange={(e) => {
            setNotesDraft(e.target.value);
            updateDayNotes(currentDay, e.target.value);
          }}
          placeholder="Reflect on today's discipline, obstacles overcome, and key breakthroughs..."
          className="w-full bg-zinc-900/60 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
        />
      </div>
    </div>
  );
}
