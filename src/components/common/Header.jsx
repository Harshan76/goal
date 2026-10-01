import React from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Flame, Calendar, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight, Shield, Award } from 'lucide-react';

export function Header({ onOpenMobileMenu, currentView, setCurrentView }) {
  const { preferences, updatePreferences, currentDay, stats, days, monthPhases } = useWinterArc();

  // Find active phase
  const currentPhaseIndex = currentDay <= 30 ? 0 : currentDay <= 60 ? 1 : 2;
  const activePhase = monthPhases[currentPhaseIndex];

  const handlePrevDay = () => {
    if (currentDay > 1) {
      updatePreferences({ currentDay: currentDay - 1 });
    }
  };

  const handleNextDay = () => {
    if (currentDay < 90) {
      updatePreferences({ currentDay: currentDay + 1 });
    }
  };

  const handleJumpToToday = () => {
    // Default today in demo is 17 or calculated from start date
    updatePreferences({ currentDay: 17 });
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#08090D]/85 backdrop-blur-xl px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Toggle & Title / Arc Phase */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Open Navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 text-lg uppercase">
                Winter Arc 90
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono tracking-tight">
              90 DAYS • DISCIPLINE • GROWTH • TRANSFORMATION
            </span>
          </div>
        </div>

        {/* Center: Day Navigator Switcher */}
        <div className="flex items-center gap-2 bg-zinc-900/90 border border-white/10 rounded-2xl p-1 shadow-lg shadow-black/40">
          <button
            onClick={handlePrevDay}
            disabled={currentDay <= 1}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Day Picker Dropdown */}
          <div className="flex items-center gap-1.5 px-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <select
              value={currentDay}
              onChange={(e) => updatePreferences({ currentDay: Number(e.target.value) })}
              className="bg-transparent text-white font-display font-bold text-sm tracking-wide focus:outline-none cursor-pointer"
            >
              {days.map((d) => (
                <option key={d.dayNumber} value={d.dayNumber} className="bg-[#0f1219] text-white">
                  Day {d.dayNumber} / 90 — {d.dayNumber <= 30 ? 'M1 Foundation' : d.dayNumber <= 60 ? 'M2 Discipline' : 'M3 Transformation'}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleNextDay}
            disabled={currentDay >= 90}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Phase Badge, Streak, Sound Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Phase Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              {activePhase.title.split('—')[1] || 'Foundation'}
            </span>
          </div>

          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-400 shadow-sm shadow-orange-500/10">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-500/40 animate-pulse" />
            <span className="font-display font-extrabold text-xs tracking-wider">
              {stats.currentStreak}D STREAK
            </span>
          </div>

          {/* Audio Sound Toggle */}
          <button
            onClick={() => updatePreferences({ soundEnabled: !preferences.soundEnabled })}
            className={`p-2 rounded-xl border transition-all ${
              preferences.soundEnabled
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
            }`}
            title={preferences.soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {preferences.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
