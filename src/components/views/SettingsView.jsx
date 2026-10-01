import React, { useState, useRef } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import {
  Settings,
  User,
  Calendar,
  Volume2,
  VolumeX,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Save,
  CheckCircle,
  PlayCircle,
} from 'lucide-react';

export function SettingsView() {
  const {
    preferences,
    updatePreferences,
    exportData,
    importData,
    loadDemoData,
    resetAllData,
    triggerCelebration,
  } = useWinterArc();

  const fileInputRef = useRef(null);
  const [profileName, setProfileName] = useState(preferences.name || 'Warrior');
  const [startDate, setStartDate] = useState(preferences.startDate || new Date().toISOString().split('T')[0]);
  const [targets, setTargets] = useState(preferences.targets || {
    water: 4,
    sleep: 8,
    gymHours: 2,
    gateHours: 2,
    skillHours: 2,
    steps: 10000,
    screenTimeHours: 8,
    readMinutes: 30,
  });

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updatePreferences({
      name: profileName.trim() || 'Warrior',
      startDate: startDate,
      targets: targets,
    });
    setSaveSuccessMsg('Profile & Targets saved successfully!');
    triggerCelebration();
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const success = importData(content);
        if (success) {
          alert('Data imported successfully! Your Winter Arc dashboard has been restored.');
        } else {
          alert('Invalid backup file. Please check the JSON format.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              SYSTEM CONFIGURATION & VAULT
            </span>
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
            SETTINGS & DATA CONTROL
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Configure your transformation targets, manage audio preferences, backup your telemetry, or reset your journey.
          </p>
        </div>
      </div>

      {/* 2. PROFILE & TARGETS FORM */}
      <form onSubmit={handleSaveProfile} className="arc-card rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            OPERATOR PROFILE & CUSTOM TARGETS
          </h3>
          {saveSuccessMsg && (
            <span className="text-xs font-mono text-emerald-400 font-bold animate-fadeIn">
              {saveSuccessMsg}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-400">Profile Name</label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-400">90-Day Challenge Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
            />
          </div>
        </div>

        {/* Customizable Target Numbers */}
        <div className="pt-2 space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
            Daily Target Benchmarks
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-[11px] font-mono text-slate-400">Water Target (L)</label>
              <input
                type="number"
                step="0.5"
                value={targets.water}
                onChange={(e) => setTargets({ ...targets, water: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-[11px] font-mono text-slate-400">Sleep Goal (Hours)</label>
              <input
                type="number"
                value={targets.sleep}
                onChange={(e) => setTargets({ ...targets, sleep: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-[11px] font-mono text-slate-400">GATE Target (Hours)</label>
              <input
                type="number"
                step="0.5"
                value={targets.gateHours}
                onChange={(e) => setTargets({ ...targets, gateHours: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-[11px] font-mono text-slate-400">Skills Target (Hours)</label>
              <input
                type="number"
                step="0.5"
                value={targets.skillHours}
                onChange={(e) => setTargets({ ...targets, skillHours: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-[11px] font-mono text-slate-400">Steps Target</label>
              <input
                type="number"
                step="1000"
                value={targets.steps}
                onChange={(e) => setTargets({ ...targets, steps: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-[11px] font-mono text-slate-400">Max Screen (Hours)</label>
              <input
                type="number"
                value={targets.screenTimeHours}
                onChange={(e) => setTargets({ ...targets, screenTimeHours: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-[11px] font-mono text-slate-400">Gym Target (Hours)</label>
              <input
                type="number"
                step="0.5"
                value={targets.gymHours}
                onChange={(e) => setTargets({ ...targets, gymHours: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <label className="text-[11px] font-mono text-slate-400">Reading (Mins)</label>
              <input
                type="number"
                step="5"
                value={targets.readMinutes}
                onChange={(e) => setTargets({ ...targets, readMinutes: Number(e.target.value) })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-display font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </form>

      {/* 3. DEMO DATA LOADER, DATA BACKUP & RESTORE */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-6">
        <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
          <Download className="w-4 h-4 text-cyan-400" />
          SAMPLE DEMO DATA & LOCAL VAULT BACKUP
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Demo Data Button */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-cyan-400" />
                Load Sample Demo Data
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Populates rich telemetry through Day 17 to explore all analytics, charts, streaks, and syllabus modules.
              </p>
            </div>
            <button
              type="button"
              onClick={loadDemoData}
              className="w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30 transition-colors"
            >
              Load Full Demo Data
            </button>
          </div>

          {/* Export JSON Button */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                Export Data (JSON)
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Download a complete, offline JSON snapshot of your 90 days, syllabus checks, and financial logs.
              </p>
            </div>
            <button
              type="button"
              onClick={exportData}
              className="w-full py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 transition-colors"
            >
              Export JSON Backup
            </button>
          </div>

          {/* Import JSON Button */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-400" />
                Restore From Backup
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Restore previous data from an exported Winter Arc JSON backup file.
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-mono font-bold border border-blue-500/30 transition-colors"
            >
              Upload & Restore JSON
            </button>
          </div>
        </div>
      </div>

      {/* 4. DANGER ZONE / RESET */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 border-rose-500/20 space-y-4">
        <h3 className="font-display font-extrabold text-rose-400 text-base uppercase tracking-wide flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          DANGER ZONE — HARD RESET
        </h3>
        <p className="text-xs text-slate-400">
          Reset all 90 days, streak history, syllabus marks, and metrics back to Day 1 blank slate. This action requires explicit confirmation.
        </p>

        {!showResetConfirm ? (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold transition-colors"
          >
            Reset All 90-Day Data...
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-3 animate-fadeIn">
            <p className="text-xs text-rose-300 font-semibold">
              Are you 100% sure you want to erase all logs and restart from Day 1?
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  resetAllData();
                  setShowResetConfirm(false);
                  alert('All data has been reset to Day 1 fresh state.');
                }}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-400"
              >
                Yes, Delete All Data
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-slate-300 text-xs hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
