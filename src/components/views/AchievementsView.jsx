import React from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { DynamicIcon } from '../common/Icon';
import { Flame, Award, Crown, CheckCircle2, Lock, Zap, Shield, Sparkles } from 'lucide-react';

export function AchievementsView() {
  const { stats, achievements, milestones, currentDay } = useWinterArc();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO STREAK & ACHIEVEMENTS BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                IRONCLAD STREAK & GLORY SYSTEM
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              STREAKS & ACHIEVEMENTS
            </h1>
            <p className="text-slate-400 text-sm">
              Every badge is earned through verifiable discipline. Badges unlock automatically based on your real logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Unlocked Badges</span>
              <div className="text-2xl font-display font-black text-orange-400 mt-0.5">
                {unlockedCount} / {achievements.length} Badges
              </div>
            </div>
          </div>
        </div>

        {/* Streak Metrics 4-Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-3 border-t border-white/5">
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> Current Streak
            </span>
            <div className="text-2xl font-display font-black text-orange-400 mt-0.5">
              {stats.currentStreak} <span className="text-xs font-mono font-normal text-slate-400">Days</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Best Streak
            </span>
            <div className="text-2xl font-display font-black text-amber-400 mt-0.5">
              {stats.longestStreak} <span className="text-xs font-mono font-normal text-slate-400">Days</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Perfect Days (100%)
            </span>
            <div className="text-2xl font-display font-black text-emerald-400 mt-0.5">
              {stats.perfectDaysCount} <span className="text-xs font-mono font-normal text-slate-400">Days</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Days Completed
            </span>
            <div className="text-2xl font-display font-black text-cyan-400 mt-0.5">
              {stats.completedDaysCount} <span className="text-xs font-mono font-normal text-slate-400">/ 90</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 8-STAGE STREAK MILESTONES */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            90-DAY TRANSFORMATION MILESTONES (8 CRUCIBLES)
          </h3>
          <span className="text-xs font-mono text-amber-400">
            {milestones.filter((m) => stats.longestStreak >= m.days).length} / {milestones.length} Reached
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {milestones.map((m) => {
            const isUnlocked = stats.longestStreak >= m.days;
            return (
              <div
                key={m.days}
                className={`p-4 rounded-2xl border transition-all text-center flex flex-col justify-between space-y-2 ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-amber-500/20 to-orange-600/10 border-amber-500/40 shadow-lg shadow-amber-500/10'
                    : 'bg-zinc-900/40 border-white/5 opacity-55'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">{m.label}</span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>

                <div className="py-1">
                  <div className="font-display font-black text-sm text-white">{m.title}</div>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{m.desc}</p>
                </div>

                <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-amber-400">
                  {isUnlocked ? 'Unlocked 👑' : `${stats.longestStreak}/${m.days} Days`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. AUTOMATED ACHIEVEMENTS GRID (14 BADGES) */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            AUTOMATIC CRITERIA ACHIEVEMENTS ({unlockedCount}/{achievements.length})
          </h3>
          <span className="text-xs font-mono text-cyan-400">Calculated from Real Data</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                ach.unlocked
                  ? 'bg-cyan-950/20 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                  : 'bg-zinc-900/40 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      ach.unlocked
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-zinc-800 text-slate-500'
                    }`}
                  >
                    <DynamicIcon name={ach.icon || 'Award'} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{ach.title}</h4>
                    <p className="text-[10px] text-slate-400">{ach.desc}</p>
                  </div>
                </div>
                {ach.unlocked ? (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Current: {ach.currentVal} / {ach.threshold}</span>
                  <span className={ach.unlocked ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                    {ach.progressPct}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      ach.unlocked ? 'bg-cyan-400' : 'bg-slate-600'
                    }`}
                    style={{ width: `${ach.progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
