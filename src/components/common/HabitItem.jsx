import React from 'react';
import { DynamicIcon } from './Icon';
import { Check, Flame, ChevronRight } from 'lucide-react';

export function HabitItem({
  habit,
  checked = false,
  onToggle,
  showCategory = false,
  compact = false,
  extraAction,
}) {
  return (
    <div
      onClick={onToggle}
      className={`group relative flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 select-none cursor-pointer ${
        checked
          ? 'bg-cyan-950/20 border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(56,189,248,0.15)]'
          : 'bg-zinc-900/40 border-white/5 hover:border-white/15 hover:bg-zinc-900/70'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Checkbox Icon Square */}
        <div
          className={`flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-300 flex-shrink-0 ${
            checked
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/30 scale-105'
              : 'border-white/20 bg-zinc-800/80 group-hover:border-cyan-400/60 text-transparent'
          }`}
        >
          <Check className={`w-4 h-4 stroke-[3] transition-transform duration-200 ${checked ? 'scale-100' : 'scale-0'}`} />
        </div>

        {/* Habit Icon & Text */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${checked ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400 group-hover:text-slate-200'}`}>
            <DynamicIcon name={habit.icon} className="w-4 h-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium tracking-wide truncate transition-colors ${
                checked ? 'text-white line-through opacity-85' : 'text-slate-200 group-hover:text-white'
              }`}>
                {habit.name}
              </span>
              {habit.isCore && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                  Core
                </span>
              )}
            </div>

            {!compact && habit.target && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-slate-400 font-mono">
                  Target: {habit.target}
                </span>
                {showCategory && habit.category && (
                  <span className="text-[10px] text-slate-400 border-l border-white/10 pl-2">
                    {habit.category}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {extraAction && (
        <div onClick={(e) => e.stopPropagation()} className="ml-2 flex-shrink-0">
          {extraAction}
        </div>
      )}
    </div>
  );
}
