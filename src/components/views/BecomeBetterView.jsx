import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Sparkles, CheckCircle, Plus, Mic, MessageSquare, Compass, Shield, UserCheck, Check } from 'lucide-react';

export function BecomeBetterView() {
  const { currentDay, currentDayData, updateDayMetrics } = useWinterArc();

  const [growthChecks, setGrowthChecks] = useState(() => {
    return currentDayData.becomeBetter || {
      communication: false,
      confidence: false,
      publicSpeaking: false,
      networking: false,
      learnNew: false,
      selfReflection: false,
      timeManagement: false,
    };
  });

  const pillars = [
    { id: 'communication', name: 'High-Impact Communication', desc: 'Speak with brevity, clear articulation, and zero filler words (um, uh).' },
    { id: 'confidence', name: 'Unshakable Confidence & Posture', desc: 'Stand tall with shoulders back; hold eye contact; speak with calm authority.' },
    { id: 'publicSpeaking', name: 'Public Speaking & Presentation', desc: 'Deliver an articulate presentation or record a 2-minute technical explanation.' },
    { id: 'networking', name: 'High-Value Networking', desc: 'Reach out, cold email, or engage meaningfully with an engineer/researcher you admire.' },
    { id: 'learnNew', name: 'Learn Something Brand New', desc: 'Expand your mental model with a novel algorithmic or philosophical insight.' },
    { id: 'selfReflection', name: 'Brutal Self-Reflection', desc: 'Audit where you were weak today and construct an actionable fix.' },
    { id: 'timeManagement', name: 'Masterful Time Management', desc: 'Zero wasted hours. Schedule every block with absolute intention.' },
  ];

  const handleToggle = (id) => {
    const next = { ...growthChecks, [id]: !growthChecks[id] };
    setGrowthChecks(next);
    updateDayMetrics(currentDay, { becomeBetter: next });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              CHARACTER, CHARISMA & STATURE
            </span>
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
            BECOME BETTER
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Transformation is not only about numbers—it is about elevating your character, confidence, communication, and leadership presence.
          </p>
        </div>
      </div>

      {/* 2. PILLARS GRID */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            DAY {currentDay} PERSONAL GROWTH PILLARS
          </h3>
          <span className="text-xs font-mono text-cyan-400">
            {Object.values(growthChecks).filter(Boolean).length} / {pillars.length} Conquered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {pillars.map((p) => {
            const isChecked = !!growthChecks[p.id];
            return (
              <div
                key={p.id}
                onClick={() => handleToggle(p.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-cyan-950/25 border-cyan-500/40 text-white shadow-[0_0_15px_-3px_rgba(56,189,248,0.1)]'
                    : 'bg-zinc-900/50 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors flex-shrink-0 mt-0.5 ${
                      isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold' : 'border-white/20 bg-zinc-800'
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{p.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
