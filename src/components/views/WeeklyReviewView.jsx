import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { ClipboardList, Award, Calendar, Save, CheckCircle2, Flame, AlertCircle } from 'lucide-react';

export function WeeklyReviewView() {
  const { currentDay, days, reviewsData, saveWeeklyReview, saveMonthlyReview, monthPhases, stats } = useWinterArc();

  const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' | 'monthly'
  const [selectedWeek, setSelectedWeek] = useState(Math.max(1, Math.ceil(currentDay / 7)));
  const [selectedMonth, setSelectedMonth] = useState(Math.max(1, Math.ceil(currentDay / 30)));

  // Weekly review form draft
  const currentWeeklySaved = reviewsData.weekly?.[selectedWeek] || {};
  const [wentWell, setWentWell] = useState(currentWeeklySaved.whatWentWell || '');
  const [wentWrong, setWentWrong] = useState(currentWeeklySaved.whatWentWrong || '');
  const [toImprove, setToImprove] = useState(currentWeeklySaved.whatToImprove || '');
  const [biggestWin, setBiggestWin] = useState(currentWeeklySaved.biggestWin || '');

  // Monthly review form draft
  const currentMonthlySaved = reviewsData.monthly?.[selectedMonth] || {};
  const [achievement, setAchievement] = useState(currentMonthlySaved.biggestAchievement || '');
  const [weakness, setWeakness] = useState(currentMonthlySaved.biggestWeakness || '');
  const [nextFocus, setNextFocus] = useState(currentMonthlySaved.focusForNextMonth || '');

  // Calculate 7-day stats for selected week
  const weekStartDay = (selectedWeek - 1) * 7 + 1;
  const weekEndDay = Math.min(90, selectedWeek * 7);
  const weekDays = days.slice(weekStartDay - 1, weekEndDay);

  let weekHabitsChecked = 0;
  let weekHabitsTotal = 0;
  let weekGymDays = 0;
  let weekGateHours = 0;
  let weekSkillHours = 0;
  let weekSteps = 0;
  let weekScreenMins = 0;
  let weekNoJunkDays = 0;

  weekDays.forEach((d) => {
    const s = stats.dailyScores[d.dayNumber - 1];
    if (s) {
      weekHabitsChecked += s.habitsChecked;
      weekHabitsTotal += s.totalEnabledCount;
    }
    if (d.habits?.gym || d.metrics?.workoutMinutes > 0) weekGymDays++;
    weekGateHours += d.metrics?.gateHours || (d.habits?.gate ? 2 : 0);
    weekSkillHours += d.metrics?.skillHours || (d.habits?.skills ? 2 : 0);
    weekSteps += d.metrics?.steps || (d.habits?.steps ? 10000 : 0);
    weekScreenMins += d.metrics?.screenTimeMinutes || 340;
    if (d.habits?.no_junk || d.nutrition?.noJunk) weekNoJunkDays++;
  });

  const weekCompletionPct = weekHabitsTotal > 0 ? Math.round((weekHabitsChecked / weekHabitsTotal) * 100) : 0;
  const weekAvgScreenHours = Number(((weekScreenMins / Math.max(1, weekDays.length)) / 60).toFixed(1));

  const handleSaveWeek = () => {
    saveWeeklyReview(selectedWeek, {
      whatWentWell: wentWell,
      whatWentWrong: wentWrong,
      whatToImprove: toImprove,
      biggestWin: biggestWin,
    });
  };

  const handleSaveMonth = () => {
    saveMonthlyReview(selectedMonth, {
      biggestAchievement: achievement,
      biggestWeakness: weakness,
      focusForNextMonth: nextFocus,
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                STRATEGIC AUDIT & SYNTHESIS
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              WEEKLY & MONTHLY REVIEWS
            </h1>
            <p className="text-slate-400 text-sm">
              Unexamined effort is wasted effort. Audit your metrics, course-correct friction, and lock in the next cycle.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'weekly' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekly Reviews (1–13)
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'monthly' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Reviews (M1, M2, M3)
            </button>
          </div>
        </div>
      </div>

      {/* 2. WEEKLY REVIEWS TAB */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          {/* Week Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {Array.from({ length: 13 }, (_, i) => i + 1).map((w) => (
              <button
                key={w}
                onClick={() => {
                  setSelectedWeek(w);
                  const saved = reviewsData.weekly?.[w] || {};
                  setWentWell(saved.whatWentWell || '');
                  setWentWrong(saved.whatWentWrong || '');
                  setToImprove(saved.whatToImprove || '');
                  setBiggestWin(saved.biggestWin || '');
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedWeek === w
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900/60 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Week {w < 10 ? `0${w}` : w}
              </button>
            ))}
          </div>

          {/* Week Metrics Snapshot Grid */}
          <div className="arc-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
                WEEK {selectedWeek < 10 ? `0${selectedWeek}` : selectedWeek} METRIC SCORECARD (DAYS {weekStartDay}–{weekEndDay})
              </h3>
              <span className="text-xs font-mono text-cyan-400 font-bold">{weekCompletionPct}% Completion</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Habit Score</span>
                <div className="text-xl font-display font-black text-cyan-400">{weekCompletionPct}%</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Gym Days</span>
                <div className="text-xl font-display font-black text-white">{weekGymDays} / 7 Days</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">GATE Studied</span>
                <div className="text-xl font-display font-black text-white">{weekGateHours.toFixed(1)}h</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Skill Crafted</span>
                <div className="text-xl font-display font-black text-white">{weekSkillHours.toFixed(1)}h</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Total Steps</span>
                <div className="text-xl font-display font-black text-emerald-400">{(weekSteps / 1000).toFixed(0)}k</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Avg Screen</span>
                <div className="text-xl font-display font-black text-amber-400">{weekAvgScreenHours}h/day</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">No-Junk Days</span>
                <div className="text-xl font-display font-black text-emerald-400">{weekNoJunkDays} / 7 Days</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Status</span>
                <div className="text-xl font-display font-black text-cyan-400">
                  {weekCompletionPct >= 80 ? 'Mastery 🔥' : 'In Progress ⏳'}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Reflection Text Prompts */}
          <div className="arc-card rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
                WEEK {selectedWeek} STRATEGIC RETROSPECTIVE
              </h3>
              <button
                onClick={handleSaveWeek}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save Weekly Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  1. What went exceptionally well this week?
                </label>
                <textarea
                  rows={3}
                  value={wentWell}
                  onChange={(e) => setWentWell(e.target.value)}
                  placeholder="e.g. Fixed sleep schedule, hit 6 gym sessions, finished DP module..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-rose-400 uppercase">
                  2. What went wrong / biggest friction?
                </label>
                <textarea
                  rows={3}
                  value={wentWrong}
                  onChange={(e) => setWentWrong(e.target.value)}
                  placeholder="e.g. High phone screen time on Sunday evening..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-amber-400 uppercase">
                  3. What is my #1 upgrade for next week?
                </label>
                <textarea
                  rows={3}
                  value={toImprove}
                  onChange={(e) => setToImprove(e.target.value)}
                  placeholder="e.g. Put phone in another room at 10:00 PM every night..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  4. Biggest Win & Victory of the Week!
                </label>
                <textarea
                  rows={3}
                  value={biggestWin}
                  onChange={(e) => setBiggestWin(e.target.value)}
                  placeholder="e.g. Scored 74/100 on mock test and hit PR in bench press..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MONTHLY REVIEWS TAB */}
      {activeTab === 'monthly' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSelectedMonth(m);
                  const saved = reviewsData.monthly?.[m] || {};
                  setAchievement(saved.biggestAchievement || '');
                  setWeakness(saved.biggestWeakness || '');
                  setNextFocus(saved.focusForNextMonth || '');
                }}
                className={`flex-1 py-3 rounded-2xl text-xs font-display font-black uppercase transition-all ${
                  selectedMonth === m
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-900/60 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Month {m} — {monthPhases[m - 1].title.split('—')[1]}
              </button>
            ))}
          </div>

          {/* Month Synthesis Form */}
          <div className="arc-card rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
                MONTH {selectedMonth} MASTER SYNTHESIS & AUDIT
              </h3>
              <button
                onClick={handleSaveMonth}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save Month Review
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  🏆 Biggest Achievement of Month {selectedMonth}
                </label>
                <textarea
                  rows={2}
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  placeholder="e.g. Conquered the foundation phase with 85% habit consistency and zero missed gym sessions..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-rose-400 uppercase">
                  ⚠️ Biggest Weakness / Vulnerability Identified
                </label>
                <textarea
                  rows={2}
                  value={weakness}
                  onChange={(e) => setWeakness(e.target.value)}
                  placeholder="e.g. Weak in Operating System synchronization and weekend screen time..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  🎯 Prime Directive & Focus for Next Month
                </label>
                <textarea
                  rows={2}
                  value={nextFocus}
                  onChange={(e) => setNextFocus(e.target.value)}
                  placeholder="e.g. Double down on mock tests and solve 100 hard DSA problems..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
