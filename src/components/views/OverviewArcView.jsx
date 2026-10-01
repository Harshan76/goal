import React from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Flame, Shield, Zap, Crown, CheckCircle2, ChevronRight, Target, Sparkles } from 'lucide-react';

export function OverviewArcView({ setCurrentView }) {
  const { currentDay, stats, monthPhases } = useWinterArc();

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1322] via-[#090d16] to-[#06080d] p-6 lg:p-8 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase font-bold tracking-widest">
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            Macro Strategy
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
            MY 90-DAY ARC
          </h1>
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
            A 90-day seasonal crucible divided into three distinct psychological and physical phases. Each 30-day epoch elevates the standard and hardens your discipline.
          </p>
        </div>
      </div>

      {/* 2. THREE GRAND PHASE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {monthPhases.map((phase) => {
          const isCurrent = currentDay >= (phase.month - 1) * 30 + 1 && currentDay <= phase.month * 30;
          const isPast = currentDay > phase.month * 30;
          const mStats = stats.monthStats[phase.month];
          const phasePct = mStats.possibleHabits > 0 ? Math.round((mStats.totalHabits / mStats.possibleHabits) * 100) : 0;

          const icons = [Shield, Zap, Crown];
          const PhaseIcon = icons[phase.month - 1];

          return (
            <div
              key={phase.month}
              className={`relative rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'bg-gradient-to-b from-[#111c2e] to-[#0c121e] border-cyan-500/50 shadow-2xl shadow-cyan-500/10'
                  : isPast
                  ? 'bg-zinc-900/50 border-emerald-500/30'
                  : 'bg-zinc-900/30 border-white/5 opacity-85'
              }`}
            >
              {/* Active / Done Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isCurrent
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : isPast
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    <PhaseIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {phase.subtitle}
                    </span>
                    <h3 className="text-base font-display font-black text-white">
                      {phase.title}
                    </h3>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                    Active Phase
                  </span>
                )}
                {isPast && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    Conquered
                  </span>
                )}
              </div>

              {/* Tagline */}
              <div className="py-4">
                <p className="text-xs font-medium text-cyan-300 italic mb-4">
                  “{phase.tagline}”
                </p>

                {/* Focus Points List */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                    Core Focus Points:
                  </span>
                  {phase.focusPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Progress Metrics */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Phase Completion</span>
                  <span className="text-white font-bold">{phasePct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: `${phasePct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>{mStats.completedDays}/30 Days Done</span>
                  <span>{mStats.gateHours}h GATE</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. WINTER ARC CODE OF CONDUCT */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <h3 className="text-lg font-display font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          THE WINTER ARC CODE OF CONDUCT
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-1.5">
            <span className="font-bold font-display text-sm text-cyan-400">1. Silence & Solitude</span>
            <p className="text-slate-400 leading-relaxed">
              Do not announce your goals to the crowd. Work relentlessly in the dark and let your results speak.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-1.5">
            <span className="font-bold font-display text-sm text-cyan-400">2. Non-Negotiable Standard</span>
            <p className="text-slate-400 leading-relaxed">
              Every habit is mandatory. On low-energy days, you do not quit; you execute with calm, stoic discipline.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-1.5">
            <span className="font-bold font-display text-sm text-cyan-400">3. Identity Transformation</span>
            <p className="text-slate-400 leading-relaxed">
              You are not trying out a routine; you are shedding your former self and forging an elite operator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
