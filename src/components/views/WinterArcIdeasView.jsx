import React from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { WINTER_ARC_IDEAS_CATALOG } from '../../data/initialData';
import { Lightbulb, Plus, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export function WinterArcIdeasView({ setCurrentView }) {
  const { addMasterGoal, triggerCelebration } = useWinterArc();

  const handleAddAsGoal = (item, cat) => {
    addMasterGoal({
      title: item.name,
      category: cat === 'PHYSICAL' ? 'Fitness' : cat === 'CAREER & TECH CRAFT' ? 'Career' : cat === 'FINANCE DISCIPLINE' ? 'Finance' : 'Personal',
      target: item.desc,
      deadline: 'Day 90',
      notes: `Added from Winter Arc Ideas Catalog (${cat})`,
    });
    triggerCelebration();
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              DISCIPLINE PROTOCOLS & TACTICAL IDEAS
            </span>
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
            WINTER ARC IDEAS REPOSITORY
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            A curated arsenal of high-yield habits across physical conditioning, deep work, software engineering, financial mastery, and social composure.
          </p>
        </div>
      </div>

      {/* 2. CATEGORIZED CATALOG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WINTER_ARC_IDEAS_CATALOG.map((section) => (
          <div key={section.category} className="arc-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className={`font-display font-black text-base uppercase tracking-wide ${section.color}`}>
                {section.category}
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                {section.items.length} Ideas
              </span>
            </div>

            <div className="space-y-3">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">Winter Arc Protocol</span>
                    <button
                      onClick={() => handleAddAsGoal(item, section.category)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-xs font-mono transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add to 90-Day Goals
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
