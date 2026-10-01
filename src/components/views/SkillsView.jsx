import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { DynamicIcon } from '../common/Icon';
import {
  Code,
  Plus,
  GitBranch,
  Layers,
  Cpu,
  Cloud,
  Server,
  Mic,
  Clock,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Zap,
} from 'lucide-react';

export function SkillsView() {
  const { currentDay, currentDayData, skillsData, updateSkillHours, addSkill, updateDayMetrics, toggleHabit, stats } = useWinterArc();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Core Tech');
  const [newSkillTarget, setNewSkillTarget] = useState('50');

  const handleCreateSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      targetHours: Number(newSkillTarget) || 40,
    });
    setNewSkillName('');
    setShowAddModal(false);
  };

  const handleAddHourToSkill = (skillId, amount) => {
    updateSkillHours(skillId, amount);
    // Also increment day skill hours
    const currentH = currentDayData.metrics.skillHours || 0;
    const nextH = Number((currentH + amount).toFixed(1));
    updateDayMetrics(currentDay, { skillHours: nextH });
    if (nextH >= 2 && !currentDayData.habits.skills) {
      toggleHabit(currentDay, 'skills');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO HEADER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                TECHNICAL MASTERY & ENGINEERING CRAFT
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              SKILL BUILDING LAB
            </h1>
            <p className="text-slate-400 text-sm">
              Daily Target: <strong className="text-purple-300 font-mono">2.0 HOURS / DAY</strong>. Build production systems, master DSA patterns, and ship open-source engineering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">90-Day Cumulative</span>
              <div className="text-xl font-display font-black text-purple-400">
                {stats.totalSkillHours}h <span className="text-xs font-normal text-white">Crafted</span>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-3 rounded-2xl bg-purple-500 text-white font-display font-bold text-xs hover:bg-purple-400 transition-all flex items-center gap-1.5 shadow-lg shadow-purple-500/25"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S SKILL DEV SPEED LOGGER */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
              DAY {currentDay} SKILL WORK SESSION
            </h3>
          </div>
          <span className="text-xs font-mono text-purple-400 font-bold">
            {currentDayData.metrics.skillHours || 0} / 2.0h Today ({currentDayData.habits.skills ? 'Done ✅' : 'Pending ⏳'})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
            <label className="text-xs font-mono text-slate-400">Today's Focus Topic</label>
            <input
              type="text"
              value={currentDayData.metrics.skillCategory || ''}
              onChange={(e) => updateDayMetrics(currentDay, { skillCategory: e.target.value })}
              placeholder="e.g. Graph Algorithms, Next.js 15, LLM Fine-Tuning"
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs text-white"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
            <label className="text-xs font-mono text-slate-400">Hours Logged Today</label>
            <input
              type="number"
              step="0.1"
              value={currentDayData.metrics.skillHours || 0}
              onChange={(e) => updateDayMetrics(currentDay, { skillHours: Number(e.target.value) })}
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2 text-xs font-bold text-white"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-end">
            <button
              onClick={() => toggleHabit(currentDay, 'skills')}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentDayData.habits.skills
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {currentDayData.habits.skills ? '2h Skill Habit Completed ✅' : 'Check Off 2h Goal'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. SKILL TRACKS PROGRESS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillsData.skills.map((skill) => {
          const pct = Math.min(100, Math.round((skill.completedHours / skill.targetHours) * 100));

          return (
            <div key={skill.id} className="arc-card rounded-3xl p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <DynamicIcon name={skill.icon || 'Code'} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{skill.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{skill.category}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-purple-400">{pct}%</span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Progress</span>
                  <span>{skill.completedHours} / {skill.targetHours} Hours</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Quick Add Log Buttons */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400">Quick Log:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleAddHourToSkill(skill.id, 0.5)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 text-xs font-mono border border-white/10 transition-colors"
                  >
                    +30m
                  </button>
                  <button
                    onClick={() => handleAddHourToSkill(skill.id, 1.0)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 text-xs font-mono border border-white/10 transition-colors"
                  >
                    +1.0h
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F131C] border border-white/10 rounded-3xl p-6 space-y-4 animate-fadeIn">
            <h3 className="font-display font-black text-white text-lg">Create Custom Skill Track</h3>
            <form onSubmit={handleCreateSkill} className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rust Systems Programming"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Backend, AI, Mobile"
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">90-Day Target Hours</label>
                <input
                  type="number"
                  value={newSkillTarget}
                  onChange={(e) => setNewSkillTarget(e.target.value)}
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
                  className="px-5 py-2 rounded-xl bg-purple-500 text-white font-bold text-xs hover:bg-purple-400"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
