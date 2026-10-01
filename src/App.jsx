import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  RotateCcw,
  Flame,
  Trophy,
  Check,
  CheckCircle2,
  Lock,
  User,
  LogOut,
  Sliders,
  Download,
  Upload,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Edit3,
  Plus,
  Trash2,
} from 'lucide-react';

const DEFAULT_GOALS = [
  { id: 'water', label: '4L Water', icon: '💧', header: '💧 4L Water' },
  { id: 'sleep', label: '7–8h Sleep', icon: '😴', header: '😴 7–8h Sleep' },
  { id: 'gym', label: '2h Gym', icon: '🏋️', header: '🏋️ 2h Gym' },
  { id: 'gate', label: '2h GATE', icon: '📚', header: '📚 2h GATE' },
  { id: 'skills', label: '2h Skills', icon: '💻', header: '💻 2h Skills' },
  { id: 'noJunk', label: 'No Junk', icon: '🚫', header: '🚫 No Junk' },
  { id: 'screen', label: '<8h Screen', icon: '📱', header: '📱 <8h Screen' },
  { id: 'steps', label: '10K Steps', icon: '🚶', header: '🚶 10K Steps' },
];

const MONTHS_CONFIG = [
  {
    month: 1,
    title: 'MONTH 1 — FOUNDATION',
    subtitle: 'Days 1 to 30',
    startDay: 1,
    endDay: 30,
  },
  {
    month: 2,
    title: 'MONTH 2 — DISCIPLINE',
    subtitle: 'Days 31 to 60',
    startDay: 31,
    endDay: 60,
  },
  {
    month: 3,
    title: 'MONTH 3 — TRANSFORMATION',
    subtitle: 'Days 61 to 90',
    startDay: 61,
    endDay: 90,
  },
];

const STORAGE_KEY_USERS = 'winter_arc_users_db_v4';
const STORAGE_KEY_CURRENT_USER = 'winter_arc_current_session_v4';

// Pre-seeded initial user accounts for instant testing
const INITIAL_DEMO_USERS = {
  avadh: {
    username: 'avadh',
    name: 'Avadh',
    password: 'password123',
    startDate: '2026-10-01',
    goals: [
      { id: 'water', label: '4L Water', icon: '💧', header: '💧 4L Water' },
      { id: 'sleep', label: '7–8h Sleep', icon: '😴', header: '😴 7–8h Sleep' },
      { id: 'gym', label: '2h Gym', icon: '🏋️', header: '🏋️ 2h Gym' },
      { id: 'gate', label: '2h GATE', icon: '📚', header: '📚 2h GATE' },
      { id: 'skills', label: '2h Skills', icon: '💻', header: '💻 2h Skills' },
      { id: 'noJunk', label: 'No Junk', icon: '🚫', header: '🚫 No Junk' },
      { id: 'screen', label: '<8h Screen', icon: '📱', header: '📱 <8h Screen' },
      { id: 'steps', label: '10K Steps', icon: '🚶', header: '🚶 10K Steps' },
    ],
    checks: {
      1: { water: true, sleep: true, gym: true, gate: true, skills: true, noJunk: true, screen: true, steps: true },
      2: { water: true, sleep: true, gym: true, gate: true, skills: true, noJunk: true, screen: true, steps: true },
      3: { water: true, sleep: true, gym: true, gate: true, skills: true, noJunk: true, screen: false, steps: true },
    },
  },
  alex: {
    username: 'alex',
    name: 'Alex (Tech & Coding Focus)',
    password: 'password123',
    startDate: '2026-10-01',
    goals: [
      { id: 'water', label: '3.5L Water', icon: '💧', header: '💧 3.5L Water' },
      { id: 'sleep', label: '8h Sleep', icon: '😴', header: '😴 8h Sleep' },
      { id: 'gym', label: '90m Workout', icon: '🏋️', header: '🏋️ 90m Workout' },
      { id: 'dsa', label: '3h DSA / LeetCode', icon: '💻', header: '💻 3h DSA' },
      { id: 'ai', label: '2h AI / PyTorch', icon: '🧠', header: '🧠 2h AI/ML' },
      { id: 'noJunk', label: 'Clean Diet', icon: '🥗', header: '🥗 Clean Diet' },
      { id: 'screen', label: '<6h Screen', icon: '📱', header: '📱 <6h Screen' },
      { id: 'steps', label: '12K Steps', icon: '🚶', header: '🚶 12K Steps' },
    ],
    checks: {
      1: { water: true, sleep: true, gym: true, dsa: true, ai: true, noJunk: true, screen: true, steps: true },
    },
  },
};

export default function App() {
  // 1. Users database in localStorage
  const [usersDb, setUsersDb] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DEMO_USERS;
  });

  // 2. Active logged-in user
  const [currentUsername, setCurrentUsername] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return ''; // empty means on Login screen
  });

  // Save usersDb to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(usersDb));
    } catch (e) {
      console.error(e);
    }
  }, [usersDb]);

  // Save current active session
  useEffect(() => {
    try {
      if (currentUsername) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, currentUsername);
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUsername]);

  // Login / Register Form state
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authUsername, setAuthUsername] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Table view filter & modals
  const [filterMonth, setFilterMonth] = useState('ALL'); // 'ALL' | 1 | 2 | 3
  const [showResetModal, setShowResetModal] = useState(false);
  const [showCustomizeGoalsModal, setShowCustomizeGoalsModal] = useState(false);
  const [editingGoalsDraft, setEditingGoalsDraft] = useState([]);

  // Active user object
  const currentUser = usersDb[currentUsername] || null;

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanUser = authUsername.trim().toLowerCase();
    if (!cleanUser || !authPassword) {
      setAuthError('Please enter username and password');
      return;
    }

    const existingUser = usersDb[cleanUser];
    if (!existingUser) {
      setAuthError('Account not found. Please check spelling or create a new account.');
      return;
    }

    if (existingUser.password !== authPassword) {
      setAuthError('Incorrect password.');
      return;
    }

    setCurrentUsername(cleanUser);
    setAuthUsername('');
    setAuthPassword('');
  };

  // Handle Register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanUser = authUsername.trim().toLowerCase();
    if (!cleanUser || !authPassword) {
      setAuthError('Username and password are required.');
      return;
    }

    if (usersDb[cleanUser]) {
      setAuthError('An account with this username already exists. Please login or choose another.');
      return;
    }

    const newUser = {
      username: cleanUser,
      name: authName.trim() || cleanUser,
      password: authPassword,
      startDate: '2026-10-01',
      goals: DEFAULT_GOALS,
      checks: {},
      createdAt: new Date().toISOString(),
    };

    setUsersDb((prev) => ({
      ...prev,
      [cleanUser]: newUser,
    }));

    setCurrentUsername(cleanUser);
    setAuthUsername('');
    setAuthName('');
    setAuthPassword('');
  };

  // Quick Demo Login
  const handleQuickLogin = (demoUsername) => {
    setCurrentUsername(demoUsername);
    setAuthError('');
  };

  // Log Out
  const handleLogout = () => {
    setCurrentUsername('');
  };

  // Update user's start date
  const handleUpdateStartDate = (newDate) => {
    if (!currentUsername) return;
    setUsersDb((prev) => ({
      ...prev,
      [currentUsername]: {
        ...prev[currentUsername],
        startDate: newDate,
      },
    }));
  };

  // Toggle goal checkbox
  const toggleGoal = (dayNum, goalId) => {
    if (!currentUsername) return;
    setUsersDb((prev) => {
      const user = prev[currentUsername];
      const userChecks = user.checks || {};
      const dayChecks = userChecks[dayNum] || {};
      const newVal = !dayChecks[goalId];

      return {
        ...prev,
        [currentUsername]: {
          ...user,
          checks: {
            ...userChecks,
            [dayNum]: {
              ...dayChecks,
              [goalId]: newVal,
            },
          },
        },
      };
    });
  };

  // Reset user's 90-day progress
  const handleResetUser = () => {
    if (!currentUsername) return;
    setUsersDb((prev) => ({
      ...prev,
      [currentUsername]: {
        ...prev[currentUsername],
        checks: {},
      },
    }));
    setShowResetModal(false);
  };

  // Open Customize Goals Modal
  const handleOpenCustomizeGoals = () => {
    if (!currentUser) return;
    setEditingGoalsDraft(JSON.parse(JSON.stringify(currentUser.goals || DEFAULT_GOALS)));
    setShowCustomizeGoalsModal(true);
  };

  // Save Customized Goals
  const handleSaveCustomGoals = () => {
    if (!currentUsername) return;
    setUsersDb((prev) => ({
      ...prev,
      [currentUsername]: {
        ...prev[currentUsername],
        goals: editingGoalsDraft,
      },
    }));
    setShowCustomizeGoalsModal(false);
  };

  // Export current user data as JSON
  const handleExportProfile = () => {
    if (!currentUser) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentUser, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `WINTER_ARC_${currentUser.username}_BACKUP.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import profile from JSON
  const handleImportProfile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.username && parsed.goals) {
          setUsersDb((prev) => ({
            ...prev,
            [parsed.username]: parsed,
          }));
          setCurrentUsername(parsed.username);
          alert(`Welcome, ${parsed.name || parsed.username}! Your goals and progress have been loaded.`);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  // Active user's goals & start date
  const activeGoals = currentUser?.goals || DEFAULT_GOALS;
  const activeStartDate = currentUser?.startDate || '2026-10-01';
  const activeChecks = currentUser?.checks || {};

  // Compute 90 Days data for active user
  const daysData = useMemo(() => {
    if (!currentUser) return [];
    const list = [];
    const baseDate = new Date(activeStartDate);
    const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let dayNum = 1; dayNum <= 90; dayNum++) {
      const currentD = new Date(baseDate);
      currentD.setDate(baseDate.getDate() + (dayNum - 1));

      const monthName = monthsNames[currentD.getMonth()];
      const dayOfMonth = currentD.getDate();
      const dateFormatted = `${monthName} ${dayOfMonth}`;

      const dayChecks = activeChecks[dayNum] || {};
      let completedCount = 0;
      activeGoals.forEach((g) => {
        if (dayChecks[g.id]) completedCount++;
      });

      const percentage = Math.round((completedCount / 8) * 100);
      const isPerfect = completedCount === 8;

      let scoreColor = 'text-slate-500';
      let emoji = '⚪';

      if (completedCount >= 7) {
        scoreColor = 'text-emerald-400 font-bold';
        emoji = '🟢';
      } else if (completedCount >= 4) {
        scoreColor = 'text-amber-400 font-bold';
        emoji = '🟡';
      } else if (completedCount > 0) {
        scoreColor = 'text-rose-400 font-bold';
        emoji = '🔴';
      }

      list.push({
        dayNumber: dayNum,
        dateString: dateFormatted,
        fullDateStr: currentD.toDateString(),
        checks: dayChecks,
        completedCount,
        percentage,
        isPerfect,
        scoreColor,
        emoji,
      });
    }
    return list;
  }, [currentUser, activeStartDate, activeChecks, activeGoals]);

  // Monthly stats for active user
  const monthlyStats = useMemo(() => {
    const res = {};
    MONTHS_CONFIG.forEach((m) => {
      const mDays = daysData.slice(m.startDay - 1, m.endDay);
      let totalCompleted = 0;
      let perfectDays = 0;

      mDays.forEach((d) => {
        totalCompleted += d.completedCount;
        if (d.isPerfect) perfectDays++;
      });

      const totalPossible = 240; // 30 days * 8 goals
      const avgPct = totalPossible > 0 ? ((totalCompleted / totalPossible) * 100).toFixed(1) : '0.0';

      res[m.month] = {
        totalCompleted,
        totalPossible,
        avgDailyPct: avgPct,
        perfectDays,
        days: mDays,
      };
    });
    return res;
  }, [daysData]);

  // Overall 90-Day calculations & Streaks for active user
  const overallStats = useMemo(() => {
    let totalCompleted = 0;
    let perfectDays = 0;

    daysData.forEach((d) => {
      totalCompleted += d.completedCount;
      if (d.isPerfect) perfectDays++;
    });

    const totalPossible = 720; // 90 * 8
    const overallPct = totalPossible > 0 ? ((totalCompleted / totalPossible) * 100).toFixed(1) : '0.0';

    // Consecutive 8/8 days streak
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < daysData.length; i++) {
      if (daysData[i].isPerfect) {
        tempStreak++;
        if (tempStreak > bestStreak) bestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }
    currentStreak = tempStreak;

    return {
      totalCompleted,
      totalPossible,
      overallPct,
      perfectDays,
      currentStreak,
      bestStreak,
    };
  }, [daysData]);

  // IF NOT LOGGED IN: SHOW AUTHENTICATION PAGE
  if (!currentUsername || !currentUser) {
    return (
      <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              WINTER ARC 90
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white uppercase">
              GOAL TRACKER
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
              90 Days • Discipline • Consistency • Growth
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Tabs: Sign In / Create Account */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-zinc-900 border border-white/5">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  authMode === 'login'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setAuthError(''); }}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  authMode === 'register'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-medium animate-fadeIn">
                {authError}
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={authMode === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400 font-medium">Your Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Avadh"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 font-medium">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter unique username"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-zinc-800/80 border border-white/10 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 mt-2"
              >
                {authMode === 'login' ? 'Sign In to Tracker' : 'Create 90-Day Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Profiles (for instant test without typing) */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block text-center">
                Or quick test with ready profiles:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('avadh')}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-white/5 hover:border-emerald-500/40 text-left transition-colors"
                >
                  <div className="text-xs font-bold text-white">Avadh</div>
                  <div className="text-[10px] text-slate-400 font-mono">Standard 8 Goals</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('alex')}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-white/5 hover:border-emerald-500/40 text-left transition-colors"
                >
                  <div className="text-xs font-bold text-white">Alex</div>
                  <div className="text-[10px] text-slate-400 font-mono">Custom Tech Goals</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED-IN VIEW: PURE 90-DAY GOAL TRACKER FOR THIS SPECIFIC USER
  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. TOP HEADER WITH USER PROFILE CONTROLS */}
      <header className="border-b border-white/10 bg-[#0C0E14]/90 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white uppercase">
                WINTER ARC — 90 DAY GOAL TRACKER
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
              90 Days • Discipline • Consistency • Growth
            </p>
          </div>

          {/* User Session, Start Date & Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Logged in User Pill & Switch */}
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-white/10 rounded-xl px-3 py-1.5 shadow-sm">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-white font-bold">{currentUser.name || currentUser.username}</span>
              <button
                type="button"
                onClick={handleLogout}
                title="Log Out / Switch Account"
                className="ml-1 text-slate-400 hover:text-rose-400 p-0.5"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Customize My 8 Goals Button */}
            <button
              type="button"
              onClick={handleOpenCustomizeGoals}
              className="flex items-center gap-1.5 bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 hover:text-white font-medium transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Edit My 8 Goals</span>
            </button>

            {/* Start Date Picker */}
            <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-white/10 rounded-xl px-3 py-1.5 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <label className="text-xs text-slate-400 font-mono font-medium">Start:</label>
              <input
                type="date"
                value={activeStartDate}
                onChange={(e) => handleUpdateStartDate(e.target.value)}
                className="bg-transparent text-xs text-white font-mono font-bold focus:outline-none cursor-pointer"
              />
            </div>

            {/* Month Filter Buttons */}
            <div className="flex items-center gap-1 bg-zinc-900/90 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setFilterMonth('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterMonth === 'ALL'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              {[1, 2, 3].map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMonth(m)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filterMonth === m
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  M{m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. STREAK & SUMMARY BAR */}
      <div className="bg-[#0C0E14] border-b border-white/5 py-3 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-500/30 animate-pulse" />
              <span className="text-slate-300">
                Current Streak:{' '}
                <strong className="text-orange-400 font-bold font-display text-sm">
                  {overallStats.currentStreak} DAYS
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">
                Best Streak:{' '}
                <strong className="text-amber-400 font-bold font-display text-sm">
                  {overallStats.bestStreak} Days
                </strong>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">
                Perfect Days:{' '}
                <strong className="text-emerald-400 font-bold font-display text-sm">
                  {overallStats.perfectDays} / 90
                </strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              Completed Goals:{' '}
              <strong className="text-white font-bold font-display text-sm">
                {overallStats.totalCompleted} / 720
              </strong>{' '}
              ({overallStats.overallPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* 3. MAIN TABLE BODY */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
        
        {MONTHS_CONFIG.map((mConfig) => {
          if (filterMonth !== 'ALL' && filterMonth !== mConfig.month) {
            return null;
          }

          const mStats = monthlyStats[mConfig.month];
          const mDays = mStats.days;

          return (
            <div
              key={mConfig.month}
              className="rounded-2xl border border-white/10 bg-[#0F1117] shadow-2xl overflow-hidden"
            >
              {/* Month Header Banner */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#141822] via-[#0F1117] to-[#141822] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-display font-black text-sm">
                    M{mConfig.month}
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-black text-white uppercase tracking-wide">
                      {mConfig.title}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">
                      {mConfig.subtitle} • {mDays[0]?.dateString} → {mDays[mDays.length - 1]?.dateString}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-400">
                    Completed:{' '}
                    <strong className="text-emerald-400 font-bold">
                      {mStats.totalCompleted} / {mStats.totalPossible}
                    </strong>
                  </span>
                  <span className="text-slate-400">
                    Avg:{' '}
                    <strong className="text-white font-bold">
                      {mStats.avgDailyPct}%
                    </strong>
                  </span>
                  <span className="text-slate-400">
                    Perfect:{' '}
                    <strong className="text-emerald-400 font-bold">
                      {mStats.perfectDays} / 30
                    </strong>
                  </span>
                </div>
              </div>

              {/* Table Wrapper with Sticky Left Day & Date Columns */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#12151E] text-xs font-mono text-slate-300 uppercase tracking-wider select-none">
                      {/* Sticky Day Column */}
                      <th className="py-3 px-3.5 sticky left-0 z-20 bg-[#12151E] border-r border-white/5 w-16 text-center">
                        Day
                      </th>
                      {/* Sticky Date Column */}
                      <th className="py-3 px-3.5 sticky left-16 z-20 bg-[#12151E] border-r border-white/5 w-24 text-center">
                        Date
                      </th>

                      {/* 8 Goals Columns (User's customized goals) */}
                      {activeGoals.map((g) => (
                        <th
                          key={g.id}
                          className="py-3 px-3 text-center border-r border-white/5 font-semibold text-slate-200"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{g.header || `${g.icon || '🎯'} ${g.label}`}</span>
                          </div>
                        </th>
                      ))}

                      {/* Daily Score Column */}
                      <th className="py-3 px-4 text-center w-32 font-bold text-white">
                        Daily Score
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5 text-sm">
                    {mDays.map((day) => {
                      return (
                        <tr
                          key={day.dayNumber}
                          className={`hover:bg-white/[0.02] transition-colors ${
                            day.isPerfect ? 'bg-emerald-950/10' : ''
                          }`}
                        >
                          {/* Sticky Day Cell */}
                          <td className="py-2.5 px-3.5 sticky left-0 z-10 bg-[#0F1117] border-r border-white/5 text-center font-display font-extrabold text-white text-xs">
                            Day {day.dayNumber}
                          </td>

                          {/* Sticky Date Cell */}
                          <td className="py-2.5 px-3.5 sticky left-16 z-10 bg-[#0F1117] border-r border-white/5 text-center font-mono text-xs text-slate-300 whitespace-nowrap">
                            {day.dateString}
                          </td>

                          {/* 8 Checkbox Cells */}
                          {activeGoals.map((g) => {
                            const isChecked = !!day.checks[g.id];
                            return (
                              <td
                                key={g.id}
                                className="py-2 px-3 text-center border-r border-white/5"
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleGoal(day.dayNumber, g.id)}
                                  title={`${g.label} for Day ${day.dayNumber}`}
                                  className={`w-8 h-8 rounded-lg border transition-all duration-150 inline-flex items-center justify-center ${
                                    isChecked
                                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30 scale-105'
                                      : 'bg-zinc-800/80 border-white/15 hover:border-emerald-500/50 hover:bg-zinc-800 text-transparent'
                                  }`}
                                >
                                  <Check
                                    className={`w-4 h-4 stroke-[3] transition-transform duration-150 ${
                                      isChecked ? 'scale-100' : 'scale-0'
                                    }`}
                                  />
                                </button>
                              </td>
                            );
                          })}

                          {/* Daily Score Cell */}
                          <td className="py-2 px-4 text-center whitespace-nowrap">
                            <div className="inline-flex items-center justify-center gap-1.5">
                              <span className="text-xs">{day.emoji}</span>
                              <span className={`font-mono text-xs font-bold ${day.scoreColor}`}>
                                {day.completedCount}/8
                              </span>
                              <span className="text-[11px] font-mono text-slate-400">
                                ({day.percentage}%)
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Monthly Summary Footer */}
              <div className="p-4 sm:p-5 bg-[#12151E] border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
                      {mConfig.title} SUMMARY
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Month {mConfig.month} totals for {currentUser.name || currentUser.username}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center font-mono">
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase block">Total Completed</span>
                      <strong className="text-emerald-400 text-sm sm:text-base font-bold">
                        {mStats.totalCompleted} / 240
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase block">Avg Daily Score</span>
                      <strong className="text-white text-sm sm:text-base font-bold">
                        {mStats.avgDailyPct}%
                      </strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase block">Perfect Days</span>
                      <strong className="text-emerald-400 text-sm sm:text-base font-bold">
                        {mStats.perfectDays} / 30
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 4. GRAND 90-DAY RESULT SUMMARY CARD (VERY BOTTOM) */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#101924] via-[#0C1017] to-[#080B10] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono uppercase font-bold tracking-widest">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                FINAL 90-DAY TRANSFORMATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                🏆 90 DAY RESULT
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Overall Success Rate</span>
                <span className="text-2xl font-display font-black text-emerald-400">
                  {overallStats.overallPct}%
                </span>
              </div>
            </div>
          </div>

          {/* 6 Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 font-mono">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Total Possible</span>
              <div className="text-lg font-bold text-white">720 Goals</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Completed</span>
              <div className="text-lg font-bold text-emerald-400">
                {overallStats.totalCompleted} / 720
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Overall Completion</span>
              <div className="text-lg font-bold text-white">{overallStats.overallPct}%</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Perfect Days</span>
              <div className="text-lg font-bold text-emerald-400">
                {overallStats.perfectDays} / 90
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Current Streak</span>
              <div className="text-lg font-bold text-orange-400">
                {overallStats.currentStreak} Days
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Best Streak</span>
              <div className="text-lg font-bold text-amber-400">
                {overallStats.bestStreak} Days
              </div>
            </div>
          </div>
        </div>

        {/* 5. USER ACTIONS: BACKUP / EXPORT / IMPORT / RESET */}
        <div className="pt-4 pb-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleExportProfile}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-slate-300 text-xs font-mono font-medium transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            Export My Profile JSON
          </button>

          <label className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-slate-300 text-xs font-mono font-medium transition-colors flex items-center gap-2 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            Import Profile JSON
            <input type="file" accept=".json" onChange={handleImportProfile} className="hidden" />
          </label>

          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 text-xs font-mono font-bold transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset My Progress
          </button>
        </div>
      </main>

      {/* 6. CUSTOMIZE 8 GOALS MODAL */}
      {showCustomizeGoalsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0F1219] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <h3 className="font-display font-black text-lg text-white">Customize Your 8 Goals</h3>
                <p className="text-xs text-slate-400 font-mono">Personalized for {currentUser.name || currentUser.username}</p>
              </div>
              <span className="text-xs font-mono text-emerald-400">8 Goals</span>
            </div>

            <div className="space-y-3">
              {editingGoalsDraft.map((goal, idx) => (
                <div key={goal.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/80 border border-white/5">
                  <span className="text-xs font-mono font-bold text-slate-500 w-5">{idx + 1}.</span>
                  <input
                    type="text"
                    placeholder="Emoji"
                    value={goal.icon || ''}
                    onChange={(e) => {
                      const updated = [...editingGoalsDraft];
                      updated[idx].icon = e.target.value;
                      updated[idx].header = `${e.target.value} ${updated[idx].label}`;
                      setEditingGoalsDraft(updated);
                    }}
                    className="w-12 bg-zinc-800 border border-white/10 rounded-lg p-1.5 text-center text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Goal Name (e.g. 2h UPSC, 10K Steps)"
                    value={goal.label}
                    onChange={(e) => {
                      const updated = [...editingGoalsDraft];
                      updated[idx].label = e.target.value;
                      updated[idx].header = `${updated[idx].icon || '🎯'} ${e.target.value}`;
                      setEditingGoalsDraft(updated);
                    }}
                    className="flex-1 bg-zinc-800 border border-white/10 rounded-lg p-1.5 text-xs text-white"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5 font-mono">
              <button
                type="button"
                onClick={() => setShowCustomizeGoalsModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomGoals}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
              >
                Save My Goals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F1219] border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-display font-black text-lg text-white">Reset 90-Day Tracker?</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Are you sure you want to reset all 90 days for <strong>{currentUser.name || currentUser.username}</strong>? This cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 font-mono">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetUser}
                className="px-5 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-400 transition-colors shadow-lg shadow-rose-500/20"
              >
                Yes, Reset My Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
