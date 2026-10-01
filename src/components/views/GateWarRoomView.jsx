import React, { useState, useEffect } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { ProgressRing } from '../common/ProgressRing';
import { DynamicIcon } from '../common/Icon';
import { sounds } from '../../utils/audio';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Award,
  AlertTriangle,
  Zap,
  Check,
  Flame,
  Sigma,
  Layers,
} from 'lucide-react';

export function GateWarRoomView() {
  const {
    currentDay,
    currentDayData,
    stats,
    gateData,
    toggleGateTopic,
    addGateTopic,
    logGateMockTest,
    updateDayMetrics,
    toggleHabit,
    preferences,
  } = useWinterArc();

  // Focus / Pomodoro Study Timer (25 min default or 60 min focus block)
  const [timerDuration, setTimerDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('25m'); // '25m' | '50m' | '60m'

  // Subject selector filter
  const [selectedSubjectId, setSelectedSubjectId] = useState(gateData.subjects[0]?.id || 'em');
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDifficulty, setNewTopicDifficulty] = useState('Medium');

  // Mock Test Modal / Form state
  const [showMockModal, setShowMockModal] = useState(false);
  const [mockTitle, setMockTitle] = useState('');
  const [mockScore, setMockScore] = useState('');
  const [mockTotal, setMockTotal] = useState('100');
  const [mockNotes, setMockNotes] = useState('');

  // Study timer effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      sounds.playTimerComplete();
      // Auto-log 0.5h study time
      const currentH = currentDayData.metrics.gateHours || 0;
      updateDayMetrics(currentDay, { gateHours: Number((currentH + 0.5).toFixed(1)) });
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentDay, currentDayData, updateDayMetrics]);

  const handleSetTimer = (minutes, mode) => {
    setIsRunning(false);
    setTimerMode(mode);
    setTimerDuration(minutes * 60);
    setTimeLeft(minutes * 60);
  };

  const toggleTimer = () => {
    if (!isRunning && preferences.soundEnabled) sounds.playCheck();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerDuration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Add custom topic
  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;
    addGateTopic(selectedSubjectId, newTopicName.trim(), newTopicDifficulty);
    setNewTopicName('');
  };

  // Log mock test
  const handleAddMockTest = (e) => {
    e.preventDefault();
    if (!mockTitle.trim() || !mockScore) return;
    logGateMockTest({
      title: mockTitle.trim(),
      date: new Date().toISOString().split('T')[0],
      score: Number(mockScore),
      totalMarks: Number(mockTotal) || 100,
      notes: mockNotes.trim(),
    });
    setMockTitle('');
    setMockScore('');
    setMockNotes('');
    setShowMockModal(false);
  };

  const currentSubject = gateData.subjects.find((s) => s.id === selectedSubjectId) || gateData.subjects[0];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO GATE WAR ROOM BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#0c1626] via-[#09101b] to-[#06090f] p-6 lg:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              HIGH-IMPACT COGNITIVE ARENA
            </div>

            <h1 className="text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight">
              GATE WAR ROOM
            </h1>
            <p className="text-slate-400 text-sm">
              Daily Target: <strong className="text-cyan-300 font-mono">2.0 HOURS / DAY</strong>. Master all 12 core computer science & engineering subjects through relentless conceptual clarity and PYQ practice.
            </p>
          </div>

          {/* Quick Study Hours for Today */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/80 border border-white/10">
            <ProgressRing
              progress={stats.gateProgress.pct}
              size={85}
              strokeWidth={8}
              label="Syllabus"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                GATE Progress
              </span>
              <div className="text-xl font-display font-extrabold text-white">
                {stats.gateProgress.completedTopics} / {stats.gateProgress.totalTopics}{' '}
                <span className="text-xs font-normal text-slate-400">topics</span>
              </div>
              <div className="text-xs font-mono text-cyan-400 font-bold">
                {stats.totalGateHours}h Total Studied
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FOCUS STUDY TIMER & TODAY'S GATE METRICS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pomodoro / Deep Work Study Timer */}
        <div className="lg:col-span-5 arc-card rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
                GATE FOCUS STUDY TIMER
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
              Flow State
            </span>
          </div>

          {/* Timer Clock Face */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="text-6xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 font-mono">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              {isRunning ? '🔥 Focus Block in Progress. No Distractions.' : 'Select interval and lock in.'}
            </p>

            {/* Timer Presets */}
            <div className="flex items-center gap-2 mt-4">
              {[
                { label: '25m Sprint', mins: 25, key: '25m' },
                { label: '50m Deep Block', mins: 50, key: '50m' },
                { label: '60m War Mode', mins: 60, key: '60m' },
              ].map((preset) => (
                <button
                  key={preset.key}
                  onClick={() => handleSetTimer(preset.mins, preset.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    timerMode === preset.key
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-zinc-900/80 border border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={toggleTimer}
                className={`px-6 py-3 rounded-2xl font-display font-black text-sm flex items-center gap-2 transition-all shadow-xl ${
                  isRunning
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:from-cyan-400 hover:to-blue-400 shadow-cyan-500/30 scale-105'
                }`}
              >
                {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                {isRunning ? 'Pause Session' : 'Start Focus Block'}
              </button>

              <button
                onClick={resetTimer}
                className="p-3 rounded-2xl bg-zinc-800/80 hover:bg-zinc-700 text-slate-400 hover:text-white transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-center text-xs text-slate-400">
            Completing a focus block automatically logs <strong className="text-cyan-300 font-mono">+30m study time</strong> for Day {currentDay}.
          </div>
        </div>

        {/* Right: Today's GATE Subject & Questions Log */}
        <div className="lg:col-span-7 arc-card rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              DAY {currentDay} STUDY LOG & PYQ COUNTER
            </h3>
            <span className="text-xs font-mono text-cyan-400">Target: 2.0h / Day</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1.5">
              <label className="text-xs font-mono text-slate-400">Study Hours Logged Today</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={currentDayData.metrics.gateHours || 0}
                  onChange={(e) => updateDayMetrics(currentDay, { gateHours: Number(e.target.value) })}
                  className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-sm font-bold text-white focus:outline-none focus:border-cyan-400"
                />
                <span className="text-xs text-slate-400 font-mono">Hours</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1.5">
              <label className="text-xs font-mono text-slate-400">GATE Questions Solved Today</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={currentDayData.metrics.gateQuestions || 0}
                  onChange={(e) => updateDayMetrics(currentDay, { gateQuestions: Number(e.target.value) })}
                  className="w-24 bg-zinc-800 border border-white/10 rounded-xl p-2 text-sm font-bold text-white focus:outline-none focus:border-cyan-400"
                />
                <span className="text-xs text-slate-400 font-mono">PYQs / Problems</span>
              </div>
            </div>
          </div>

          {/* Mock Test Quick Logger */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-display font-extrabold text-white">Full Length Mock Tests</span>
              <p className="text-[11px] text-slate-400">{gateData.mockTests.length} Mock Tests Recorded</p>
            </div>
            <button
              onClick={() => setShowMockModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Log Mock Test
            </button>
          </div>
        </div>
      </div>

      {/* 3. SYLLABUS CHECKLIST & SUBJECT MATRIX (12 CORE SUBJECTS) */}
      <div className="arc-card rounded-3xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div>
            <h3 className="font-display font-black text-white text-lg uppercase tracking-wide">
              GATE CS / IT OFFICIAL SYLLABUS MATRIX
            </h3>
            <p className="text-xs text-slate-400">
              Select a subject to view topic mastery, mark completed concepts, or add custom subtopics.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            {stats.gateProgress.completedTopics} / {stats.gateProgress.totalTopics} Topics Mastered ({stats.gateProgress.pct}%)
          </span>
        </div>

        {/* Subject Pills Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {gateData.subjects.map((sub) => {
            const isSelected = sub.id === selectedSubjectId;
            const subCompleted = sub.topics.filter((t) => t.completed).length;
            const subTotal = sub.topics.length;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <span>{sub.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-black/20 text-slate-900 font-bold' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {subCompleted}/{subTotal}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Subject's Topic Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
            <span>{currentSubject.name} Topics</span>
            <span>Click any topic to toggle mastery</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentSubject.topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => toggleGateTopic(currentSubject.id, topic.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  topic.completed
                    ? 'bg-cyan-950/20 border-cyan-500/40 text-slate-200 shadow-[0_0_15px_-3px_rgba(56,189,248,0.1)]'
                    : 'bg-zinc-900/50 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors flex-shrink-0 ${
                      topic.completed
                        ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold'
                        : 'border-white/20 bg-zinc-800'
                    }`}
                  >
                    {topic.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs font-medium truncate ${topic.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                    {topic.name}
                  </span>
                </div>

                <span
                  className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ml-2 flex-shrink-0 ${
                    topic.difficulty === 'Hard'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : topic.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}
                >
                  {topic.difficulty}
                </span>
              </div>
            ))}
          </div>

          {/* Add Custom Topic Form */}
          <form onSubmit={handleAddTopic} className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder={`Add custom topic to ${currentSubject.name}...`}
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              className="flex-1 min-w-[200px] bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <select
              value={newTopicDifficulty}
              onChange={(e) => setNewTopicDifficulty(e.target.value)}
              className="bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs font-mono text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-display font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Topic
            </button>
          </form>
        </div>
      </div>

      {/* 4. MOCK TEST LOG HISTORY */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
              RECORDED GATE MOCK TESTS ({gateData.mockTests.length})
            </h3>
          </div>
          <button
            onClick={() => setShowMockModal(true)}
            className="text-xs text-cyan-400 hover:underline font-mono"
          >
            + Add New Test Log
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {gateData.mockTests.map((mock) => (
            <div key={mock.id} className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-white">{mock.title}</span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {mock.score} / {mock.totalMarks} Marks ({Math.round((mock.score / mock.totalMarks) * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>Date: {mock.date}</span>
                {mock.rank && <span>Rank: #{mock.rank}</span>}
              </div>
              {mock.notes && <p className="text-xs text-slate-300 italic pt-1">{mock.notes}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Mock Test Modal */}
      {showMockModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F131C] border border-white/10 rounded-3xl p-6 space-y-4 animate-fadeIn">
            <h3 className="font-display font-black text-white text-lg">Log New Mock Test</h3>
            <form onSubmit={handleAddMockTest} className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400">Test Name / Series</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Made Easy Full Length Mock 3"
                  value={mockTitle}
                  onChange={(e) => setMockTitle(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400">Marks Scored</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="72.5"
                    value={mockScore}
                    onChange={(e) => setMockScore(e.target.value)}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400">Total Marks</label>
                  <input
                    type="number"
                    value={mockTotal}
                    onChange={(e) => setMockTotal(e.target.value)}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Analysis & Weak Areas</label>
                <textarea
                  rows={2}
                  value={mockNotes}
                  onChange={(e) => setMockNotes(e.target.value)}
                  placeholder="e.g. Lost marks in Calculus and TOC Decidability..."
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowMockModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                >
                  Save Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
