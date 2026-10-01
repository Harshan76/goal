import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import {
  Dumbbell,
  Flame,
  TrendingDown,
  TrendingUp,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Footprints,
  Droplets,
  Activity,
} from 'lucide-react';

export function FitnessView() {
  const { currentDay, currentDayData, days, stats, updateDayMetrics, toggleHabit } = useWinterArc();

  // Custom Workout Planner state (local storage or component state)
  const [exercises, setExercises] = useState([
    { id: '1', name: 'Barbell Flat Bench Press', sets: '4', reps: '8-10', weight: '85 kg' },
    { id: '2', name: 'Incline Dumbbell Press', sets: '3', reps: '10-12', weight: '30 kg' },
    { id: '3', name: 'Standing Overhead Barbell Press', sets: '4', reps: '6-8', weight: '55 kg' },
    { id: '4', name: 'Tricep Rope Pushdowns', sets: '3', reps: '12-15', weight: '35 kg' },
    { id: '5', name: 'Lateral Cable Raises', sets: '4', reps: '15', weight: '12 kg' },
  ]);

  const [newExName, setNewExName] = useState('');
  const [newExSets, setNewExSets] = useState('3');
  const [newExReps, setNewExReps] = useState('10');
  const [newExWeight, setNewExWeight] = useState('');

  const workoutCategories = [
    'Push', 'Pull', 'Legs', 'Cardio', 'Core', 'Mobility', 'Full Body', 'Rest Day'
  ];

  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!newExName.trim()) return;
    setExercises([
      ...exercises,
      {
        id: `ex-${Date.now()}`,
        name: newExName.trim(),
        sets: newExSets,
        reps: newExReps,
        weight: newExWeight.trim() || 'Bodyweight',
      },
    ]);
    setNewExName('');
    setNewExWeight('');
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  // 90-Day Weight trend data points
  const weightDataPoints = days
    .filter((d) => d.metrics.weightKg != null && d.metrics.weightKg > 0)
    .map((d) => ({ day: d.dayNumber, weight: d.metrics.weightKg, date: d.date }));

  const currentWeight = currentDayData.metrics.weightKg || (weightDataPoints.length > 0 ? weightDataPoints[weightDataPoints.length - 1].weight : 75.0);
  const startWeight = weightDataPoints.length > 0 ? weightDataPoints[0].weight : currentWeight;
  const weightDelta = Number((currentWeight - startWeight).toFixed(1));

  // Current day measurements
  const measurements = currentDayData.metrics.bodyMeasurements || {};

  const handleUpdateMeasurement = (field, val) => {
    const nextMeasurements = { ...measurements, [field]: Number(val) || null };
    updateDayMetrics(currentDay, { bodyMeasurements: nextMeasurements });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO FITNESS BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                PHYSIQUE & ATHLETIC COMMAND
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              FITNESS & BODY MASTER
            </h1>
            <p className="text-slate-400 text-sm">
              Forge an unbreakable aesthetic physique. 2 hours daily mandatory workout standard.
            </p>
          </div>

          {/* Quick Workout Toggle for Day */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/90 border border-white/10">
            <div className="text-right">
              <div className="text-xs font-mono text-slate-400">Day {currentDay} Workout</div>
              <div className="text-sm font-bold text-white">
                {currentDayData.habits.gym ? 'Completed ✅' : 'Pending ⏳'}
              </div>
            </div>
            <button
              onClick={() => toggleHabit(currentDay, 'gym')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentDayData.habits.gym
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              {currentDayData.habits.gym ? 'Workout Checked' : 'Mark Done (2h)'}
            </button>
          </div>
        </div>

        {/* 4 Metrics Key Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-3 border-t border-white/5">
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Total Workouts</span>
            <div className="text-2xl font-display font-black text-white mt-0.5">
              {stats.totalWorkouts} <span className="text-xs font-mono font-normal text-slate-400">sessions</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Workout Hours</span>
            <div className="text-2xl font-display font-black text-blue-400 mt-0.5">
              {stats.totalWorkoutHours}h
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Current Weight</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-2xl font-display font-black text-white">{currentWeight} kg</span>
              {weightDelta !== 0 && (
                <span className={`text-xs font-mono font-bold flex items-center ${weightDelta < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {weightDelta < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                  {Math.abs(weightDelta)}kg
                </span>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Total Steps</span>
            <div className="text-2xl font-display font-black text-emerald-400 mt-0.5">
              {(stats.totalSteps / 1000).toFixed(0)}k <span className="text-xs font-mono font-normal text-slate-400">steps</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S WORKOUT PROTOCOL & CATEGORY SELECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Category Selector & Session Log */}
        <div className="lg:col-span-6 arc-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="font-display font-black text-white text-base uppercase tracking-wide flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              DAY {currentDay} WORKOUT CONFIGURATION
            </h3>
            <span className="text-xs font-mono text-blue-400">{currentDayData.metrics.workoutType || 'Push'}</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase font-bold">
              Select Workout Split
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {workoutCategories.map((cat) => {
                const isSelected = (currentDayData.metrics.workoutType || 'Push') === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => updateDayMetrics(currentDay, { workoutType: cat })}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected
                        ? 'bg-blue-500 text-white border-blue-400 shadow-md shadow-blue-500/20'
                        : 'bg-zinc-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Duration (Minutes)</label>
              <input
                type="number"
                value={currentDayData.metrics.workoutMinutes || 120}
                onChange={(e) => updateDayMetrics(currentDay, { workoutMinutes: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-sm font-bold text-white focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Scale Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={currentDayData.metrics.weightKg || ''}
                onChange={(e) => updateDayMetrics(currentDay, { weightKg: Number(e.target.value) })}
                placeholder="75.0"
                className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-sm font-bold text-white focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-mono text-slate-400">Workout Notes / PRs Hit</label>
            <textarea
              rows={2}
              value={currentDayData.metrics.workoutNotes || ''}
              onChange={(e) => updateDayMetrics(currentDay, { workoutNotes: e.target.value })}
              placeholder="e.g. Hit 85kg bench press 4x8, increased cable volume..."
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 resize-none"
            />
          </div>
        </div>

        {/* Right: Body Measurements Tracker */}
        <div className="lg:col-span-6 arc-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="font-display font-black text-white text-base uppercase tracking-wide flex items-center gap-2">
              <Footprints className="w-4 h-4 text-emerald-400" />
              BODY MEASUREMENTS LOG (INCHES)
            </h3>
            <span className="text-xs font-mono text-slate-400">Tape Measurements</span>
          </div>

          <p className="text-xs text-slate-400">
            Track circumference measurements weekly to visualize hypertrophy and waist taper.
          </p>

          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-xs font-mono text-slate-400">Chest (in)</label>
              <input
                type="number"
                step="0.1"
                value={measurements.chest || ''}
                onChange={(e) => handleUpdateMeasurement('chest', e.target.value)}
                placeholder="40.0"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-sm font-bold text-white"
              />
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-xs font-mono text-slate-400">Waist (in)</label>
              <input
                type="number"
                step="0.1"
                value={measurements.waist || ''}
                onChange={(e) => handleUpdateMeasurement('waist', e.target.value)}
                placeholder="32.5"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-sm font-bold text-white"
              />
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-xs font-mono text-slate-400">Arms (in)</label>
              <input
                type="number"
                step="0.1"
                value={measurements.arms || ''}
                onChange={(e) => handleUpdateMeasurement('arms', e.target.value)}
                placeholder="15.5"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-sm font-bold text-white"
              />
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-xs font-mono text-slate-400">Thighs (in)</label>
              <input
                type="number"
                step="0.1"
                value={measurements.thighs || ''}
                onChange={(e) => handleUpdateMeasurement('thighs', e.target.value)}
                placeholder="23.0"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-sm font-bold text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. WORKOUT ROUTINE BUILDER / PLANNER */}
      <div className="arc-card rounded-3xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-black text-white text-base uppercase tracking-wide">
                ACTIVE WORKOUT PLANNER & EXERCISE MATRIX
              </h3>
              <p className="text-xs text-slate-400">Log your movements, target volume, and progressive overload weights.</p>
            </div>
          </div>
          <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {exercises.length} Exercises Planned
          </span>
        </div>

        {/* Exercise List */}
        <div className="space-y-2.5">
          {exercises.map((ex, idx) => (
            <div
              key={ex.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-white truncate">{ex.name}</div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-0.5">
                    <span>{ex.sets} Sets</span>
                    <span>•</span>
                    <span>{ex.reps} Reps</span>
                    <span>•</span>
                    <span className="text-blue-300 font-bold">{ex.weight}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteExercise(ex.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors ml-2"
                title="Remove Exercise"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Exercise Form */}
        <form onSubmit={handleAddExercise} className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Exercise name (e.g. Romanian Deadlift)"
            value={newExName}
            onChange={(e) => setNewExName(e.target.value)}
            className="flex-1 min-w-[200px] bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="Sets (3)"
            value={newExSets}
            onChange={(e) => setNewExSets(e.target.value)}
            className="w-20 bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white text-center"
          />
          <input
            type="text"
            placeholder="Reps (10)"
            value={newExReps}
            onChange={(e) => setNewExReps(e.target.value)}
            className="w-20 bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white text-center"
          />
          <input
            type="text"
            placeholder="Weight (kg/lbs)"
            value={newExWeight}
            onChange={(e) => setNewExWeight(e.target.value)}
            className="w-28 bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white text-center"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-blue-500 text-white font-display font-bold text-xs hover:bg-blue-400 transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" /> Add Exercise
          </button>
        </form>
      </div>
    </div>
  );
}
