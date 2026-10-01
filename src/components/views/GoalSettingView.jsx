import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Target, Plus, Trash2, Edit2, CheckCircle2, Flame, Clock } from 'lucide-react';

export function GoalSettingView() {
  const { goalsData, addMasterGoal, updateMasterGoal, deleteMasterGoal } = useWinterArc();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState('Fitness');
  const [newTarget, setNewTarget] = useState('');
  const [newDeadline, setNewDeadline] = useState('Day 90');
  const [newNotes, setNewNotes] = useState('');

  const categories = ['Fitness', 'GATE', 'Career', 'Skills', 'Finance', 'Personal', 'Reading', 'Other'];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addMasterGoal({
      title: newTitle.trim(),
      category: newCat,
      target: newTarget.trim(),
      deadline: newDeadline.trim(),
      notes: newNotes.trim(),
    });
    setNewTitle('');
    setNewTarget('');
    setNewNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                90-DAY VICTORY TARGETS
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              MY 90-DAY GOALS
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Define the non-negotiable transformations you will achieve by Day 90 across fitness, GATE, skills, finances, and character.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 text-slate-950 font-display font-bold text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> Add Master Goal
          </button>
        </div>
      </div>

      {/* 2. GOALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goalsData.masterGoals.map((goal) => (
          <div key={goal.id} className="arc-card rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase">
                  {goal.category}
                </span>
                <h3 className="font-display font-black text-base text-white pt-1">{goal.title}</h3>
              </div>
              <button
                onClick={() => deleteMasterGoal(goal.id)}
                className="text-slate-500 hover:text-rose-400 p-1"
                title="Delete Goal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 font-mono">
                <span>Target: <strong className="text-slate-200">{goal.target}</strong></span>
                <span>Deadline: <strong className="text-cyan-400">{goal.deadline}</strong></span>
              </div>
              {goal.notes && <p className="text-slate-400 italic">{goal.notes}</p>}
            </div>

            {/* Slider to adjust progress */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Current Progress</span>
                <span className="text-cyan-400 font-bold">{goal.progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => updateMasterGoal(goal.id, { progress: Number(e.target.value) })}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F131C] border border-white/10 rounded-3xl p-6 space-y-4 animate-fadeIn">
            <h3 className="font-display font-black text-white text-lg">Create 90-Day Master Goal</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400">Goal Category</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs font-mono text-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Goal Statement</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master all 12 GATE subjects & solve 15 full mocks"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400">Measurable Target</label>
                  <input
                    type="text"
                    placeholder="e.g. Score 70+ marks"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400">Deadline</label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Strategy Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Tactical execution rules..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
