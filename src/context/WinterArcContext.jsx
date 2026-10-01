import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  DEFAULT_HABITS,
  DEFAULT_MASTER_GOALS,
  DEFAULT_SKILLS,
  DEFAULT_BOOKS,
  GATE_SYLLABUS_DEFAULT,
  ACHIEVEMENTS_LIST,
  MILESTONES,
  MONTH_PHASES,
  generateInitial90Days,
  generateDemo90Days,
} from '../data/initialData';
import { sounds } from '../utils/audio';

const WinterArcContext = createContext(null);

const STORAGE_KEYS = {
  DAYS: 'winter_arc_days_v2',
  PREFS: 'winter_arc_prefs_v2',
  GATE: 'winter_arc_gate_v2',
  SKILLS: 'winter_arc_skills_v2',
  GOALS: 'winter_arc_goals_v2',
  BOOKS: 'winter_arc_books_v2',
  REVIEWS: 'winter_arc_reviews_v2',
  FINANCE: 'winter_arc_finance_v2',
  ACHIEVEMENTS: 'winter_arc_achievements_v2',
};

export function WinterArcProvider({ children }) {
  // 1. Preferences & Configuration
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      name: 'Warrior',
      startDate: new Date().toISOString().split('T')[0],
      currentDay: 17, // default to 17 in demo or 1
      themeAccent: 'ice', // 'ice' | 'ember' | 'emerald' | 'purple'
      soundEnabled: true,
      enabledHabitIds: DEFAULT_HABITS.map(h => h.id),
      targets: {
        water: 4,
        sleep: 8,
        gymHours: 2,
        gateHours: 2,
        skillHours: 2,
        steps: 10000,
        screenTimeHours: 8,
        readMinutes: 30,
      },
    };
  });

  // 2. 90-Day Logs Array
  const [days, setDays] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DAYS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 90) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    // Default to demo data so app is immediately rich & populated
    return generateDemo90Days(preferences.startDate);
  });

  // 3. GATE War Room Data
  const [gateData, setGateData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GATE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      subjects: GATE_SYLLABUS_DEFAULT,
      mockTests: [
        { id: 'mock-1', title: 'GATE CS Mock Test 1 (Algorithms & DS)', date: '2026-09-15', score: 68, totalMarks: 100, rank: 42, notes: 'Strong in Trees & Sorting; need revision on Graph Dijkstra.' },
        { id: 'mock-2', title: 'GATE CS Subject Mock 2 (DBMS & OS)', date: '2026-09-22', score: 74, totalMarks: 100, rank: 28, notes: 'Good SQL speed; lost marks in Semaphore synchronization.' },
      ],
      customSubjects: [],
    };
  });

  // 4. Skills Lab Data
  const [skillsData, setSkillsData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      skills: DEFAULT_SKILLS,
    };
  });

  // 5. 90-Day Master Goals
  const [goalsData, setGoalsData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      masterGoals: DEFAULT_MASTER_GOALS,
    };
  });

  // 6. Reading Library
  const [readingData, setReadingData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      books: DEFAULT_BOOKS,
      currentBookId: 'book-2',
    };
  });

  // 7. Weekly & Monthly Reviews
  const [reviewsData, setReviewsData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      weekly: {
        1: { whatWentWell: 'Fixed sleep schedule and hit 6 days at the gym.', whatWentWrong: 'Screen time was high on Sunday.', whatToImprove: 'Set phone away 1h before bed.', biggestWin: 'Solved all DP questions for Week 1.', rating: 4 },
        2: { whatWentWell: 'Consistent 2h GATE sessions every day.', whatWentWrong: 'Skipped 1 meditation session.', whatToImprove: 'Wake up 15 mins earlier.', biggestWin: 'Bench press personal record + 50km total steps.', rating: 5 },
      },
      monthly: {
        1: { biggestAchievement: 'Conquered Foundation phase with 84% overall consistency.', biggestWeakness: 'Late night phone usage during weekends.', focusForNextMonth: 'Deepen GATE problem solving and double DSA velocity.', rating: 4.5 },
      },
    };
  });

  // 8. Finance Data
  const [financeData, setFinanceData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FINANCE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      currency: '₹',
      monthlyBudget: 25000,
      monthlySavingsGoal: 15000,
      expenses: [
        { id: 'exp-1', date: '2026-09-28', amount: 350, category: 'Food', description: 'Groceries & Whey Protein' },
        { id: 'exp-2', date: '2026-09-29', amount: 120, category: 'Education', description: 'GATE Test Series Access' },
        { id: 'exp-3', date: '2026-09-30', amount: 90, category: 'Transport', description: 'Metro travel' },
      ],
    };
  });

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(preferences));
    } catch (e) { console.error(e); }
  }, [preferences]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DAYS, JSON.stringify(days));
    } catch (e) { console.error(e); }
  }, [days]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GATE, JSON.stringify(gateData));
    } catch (e) { console.error(e); }
  }, [gateData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillsData));
    } catch (e) { console.error(e); }
  }, [skillsData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goalsData));
    } catch (e) { console.error(e); }
  }, [goalsData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(readingData));
    } catch (e) { console.error(e); }
  }, [readingData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviewsData));
    } catch (e) { console.error(e); }
  }, [reviewsData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FINANCE, JSON.stringify(financeData));
    } catch (e) { console.error(e); }
  }, [financeData]);

  // Current active day index
  const currentDay = preferences.currentDay || 1;
  const currentDayData = days[currentDay - 1] || days[0];

  // Helper to trigger confetti celebration
  const triggerCelebration = useCallback(() => {
    if (preferences.soundEnabled) {
      sounds.playVictory();
    }
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#0ea5e9', '#f97316', '#10b981', '#ffffff'],
      });
    } catch {
      // ignore
    }
  }, [preferences.soundEnabled]);

  // Comprehensive Live Statistics Calculations
  const stats = useMemo(() => {
    const enabledHabits = DEFAULT_HABITS.filter(h => preferences.enabledHabitIds.includes(h.id));
    const totalEnabledCount = enabledHabits.length || 1;

    let totalCompletedHabitsAllDays = 0;
    let totalPossibleHabitsAllDays = 0;
    let completedDaysCount = 0;
    let perfectDaysCount = 0;
    let almostPerfectDaysCount = 0;
    let totalWorkouts = 0;
    let totalWorkoutMinutes = 0;
    let totalGateHours = 0;
    let totalSkillHours = 0;
    let totalSteps = 0;
    let totalWaterLiters = 0;
    let totalReadingMinutes = 0;
    let totalScreenTimeMinutes = 0;
    let screenUnderTargetDays = 0;
    let noJunkDays = 0;
    let journalEntriesCount = 0;

    // Monthly breakdown stats
    const monthStats = {
      1: { completedDays: 0, totalHabits: 0, possibleHabits: 0, workoutMins: 0, gateHours: 0, skillHours: 0 },
      2: { completedDays: 0, totalHabits: 0, possibleHabits: 0, workoutMins: 0, gateHours: 0, skillHours: 0 },
      3: { completedDays: 0, totalHabits: 0, possibleHabits: 0, workoutMins: 0, gateHours: 0, skillHours: 0 },
    };

    // Day-by-day calculations
    const dailyScores = days.map((day) => {
      let habitsChecked = 0;
      enabledHabits.forEach(h => {
        if (day.habits && day.habits[h.id]) {
          habitsChecked++;
        }
      });

      const pct = Math.round((habitsChecked / totalEnabledCount) * 100);
      const isPerfect = habitsChecked === totalEnabledCount;
      const isAlmostPerfect = pct >= 80;
      const isDayLogged = habitsChecked > 0 || day.status !== 'untracked';

      if (isDayLogged) {
        totalCompletedHabitsAllDays += habitsChecked;
        totalPossibleHabitsAllDays += totalEnabledCount;
      }

      if (day.status === 'completed' || isPerfect) {
        completedDaysCount++;
      }
      if (isPerfect) {
        perfectDaysCount++;
      }
      if (isAlmostPerfect) {
        almostPerfectDaysCount++;
      }

      // Aggregate metrics
      if (day.habits?.gym || day.metrics?.workoutMinutes > 0) {
        totalWorkouts++;
        totalWorkoutMinutes += day.metrics?.workoutMinutes || 120;
      }
      totalGateHours += day.metrics?.gateHours || (day.habits?.gate ? 2 : 0);
      totalSkillHours += day.metrics?.skillHours || (day.habits?.skills ? 2 : 0);
      totalSteps += day.metrics?.steps || (day.habits?.steps ? 10000 : 0);
      totalWaterLiters += day.metrics?.waterLiters || (day.habits?.water ? 4 : 0);
      totalReadingMinutes += day.metrics?.readingMinutes || (day.habits?.reading ? 30 : 0);
      totalScreenTimeMinutes += day.metrics?.screenTimeMinutes || 360;

      if (day.habits?.screen_time || (day.metrics?.screenTimeMinutes > 0 && day.metrics.screenTimeMinutes <= 480)) {
        screenUnderTargetDays++;
      }
      if (day.habits?.no_junk || day.nutrition?.noJunk) {
        noJunkDays++;
      }
      if (day.notes && day.notes.trim().length > 10) {
        journalEntriesCount++;
      }

      // Month index
      const mIndex = day.dayNumber <= 30 ? 1 : day.dayNumber <= 60 ? 2 : 3;
      if (isDayLogged) {
        monthStats[mIndex].totalHabits += habitsChecked;
        monthStats[mIndex].possibleHabits += totalEnabledCount;
      }
      if (day.status === 'completed' || isPerfect) {
        monthStats[mIndex].completedDays++;
      }
      monthStats[mIndex].workoutMins += day.metrics?.workoutMinutes || 0;
      monthStats[mIndex].gateHours += day.metrics?.gateHours || 0;
      monthStats[mIndex].skillHours += day.metrics?.skillHours || 0;

      return {
        dayNumber: day.dayNumber,
        date: day.date,
        habitsChecked,
        totalEnabledCount,
        pct,
        isPerfect,
        isAlmostPerfect,
        status: day.status,
      };
    });

    // Streak calculation (consecutive days with completed status or >=80% up to currentDay)
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < currentDay; i++) {
      const score = dailyScores[i];
      if (score.isAlmostPerfect || score.status === 'completed') {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }
    currentStreak = tempStreak;

    // Today's specific score
    const todayScore = dailyScores[currentDay - 1] || { habitsChecked: 0, totalEnabledCount, pct: 0 };

    // Overall 90-day progress %
    const overallProgressPct = Math.round(
      (completedDaysCount / 90) * 100
    );

    // GATE syllabus overall progress
    let totalGateTopics = 0;
    let completedGateTopics = 0;
    gateData.subjects.forEach(sub => {
      sub.topics.forEach(t => {
        totalGateTopics++;
        if (t.completed) completedGateTopics++;
      });
    });

    return {
      dailyScores,
      currentStreak,
      longestStreak,
      completedDaysCount,
      perfectDaysCount,
      almostPerfectDaysCount,
      overallProgressPct,
      todayScore,
      totalCompletedHabitsAllDays,
      totalWorkouts,
      totalWorkoutHours: Number((totalWorkoutMinutes / 60).toFixed(1)),
      totalGateHours: Number(totalGateHours.toFixed(1)),
      totalSkillHours: Number(totalSkillHours.toFixed(1)),
      totalSteps,
      totalWaterLiters: Number(totalWaterLiters.toFixed(1)),
      totalReadingMinutes,
      avgScreenTimeHours: Number(((totalScreenTimeMinutes / Math.max(1, currentDay)) / 60).toFixed(1)),
      screenUnderTargetDays,
      noJunkDays,
      journalEntriesCount,
      monthStats,
      gateProgress: {
        totalTopics: totalGateTopics,
        completedTopics: completedGateTopics,
        pct: totalGateTopics > 0 ? Math.round((completedGateTopics / totalGateTopics) * 100) : 0,
      },
    };
  }, [days, preferences, gateData, currentDay]);

  // Automatic Achievements Evaluation
  const evaluatedAchievements = useMemo(() => {
    return ACHIEVEMENTS_LIST.map(ach => {
      let isUnlocked = false;
      let currentVal = 0;

      switch (ach.req) {
        case 'streak':
          currentVal = stats.longestStreak;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'workouts':
          currentVal = stats.totalWorkouts;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'gateHours':
          currentVal = stats.totalGateHours;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'skillHours':
          currentVal = stats.totalSkillHours;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'steps':
          currentVal = stats.totalSteps;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'noJunkDays':
          currentVal = stats.noJunkDays;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'screenDays':
          currentVal = stats.screenUnderTargetDays;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'readingSessions':
          currentVal = Math.floor(stats.totalReadingMinutes / 20);
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'waterTotal':
          currentVal = stats.totalWaterLiters;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'perfectDays':
          currentVal = stats.perfectDaysCount;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'journalEntries':
          currentVal = stats.journalEntriesCount;
          isUnlocked = currentVal >= ach.threshold;
          break;
        case 'daysCompleted':
          currentVal = stats.completedDaysCount;
          isUnlocked = currentVal >= ach.threshold;
          break;
        default:
          isUnlocked = false;
      }

      return {
        ...ach,
        unlocked: isUnlocked,
        currentVal,
        progressPct: Math.min(100, Math.round((currentVal / ach.threshold) * 100)),
      };
    });
  }, [stats]);

  // ACTIONS

  // 1. Toggle Habit
  const toggleHabit = useCallback((dayNum, habitId) => {
    setDays(prevDays => {
      const newDays = [...prevDays];
      const dayIdx = dayNum - 1;
      if (dayIdx < 0 || dayIdx >= 90) return prevDays;

      const day = { ...newDays[dayIdx] };
      const currentVal = !!day.habits[habitId];
      const newVal = !currentVal;

      day.habits = {
        ...day.habits,
        [habitId]: newVal,
      };

      // Play audio feedback
      if (preferences.soundEnabled) {
        if (newVal) sounds.playCheck();
        else sounds.playUncheck();
      }

      // Sync metric fields if linked
      if (habitId === 'water' && newVal && day.metrics.waterLiters < 4) {
        day.metrics = { ...day.metrics, waterLiters: 4 };
      }
      if (habitId === 'gym' && newVal && day.metrics.workoutMinutes === 0) {
        day.metrics = { ...day.metrics, workoutMinutes: 120 };
      }
      if (habitId === 'gate' && newVal && day.metrics.gateHours === 0) {
        day.metrics = { ...day.metrics, gateHours: 2 };
      }
      if (habitId === 'skills' && newVal && day.metrics.skillHours === 0) {
        day.metrics = { ...day.metrics, skillHours: 2 };
      }
      if (habitId === 'steps' && newVal && day.metrics.steps === 0) {
        day.metrics = { ...day.metrics, steps: 10000 };
      }
      if (habitId === 'reading' && newVal && day.metrics.readingMinutes === 0) {
        day.metrics = { ...day.metrics, readingMinutes: 30 };
      }

      // Check if all enabled habits are now complete
      const enabledHabits = DEFAULT_HABITS.filter(h => preferences.enabledHabitIds.includes(h.id));
      const allDone = enabledHabits.every(h => day.habits[h.id]);

      if (allDone) {
        day.status = 'completed';
        triggerCelebration();
      } else {
        const anyDone = enabledHabits.some(h => day.habits[h.id]);
        if (day.status !== 'missed') {
          day.status = anyDone ? 'partial' : 'untracked';
        }
      }

      newDays[dayIdx] = day;
      return newDays;
    });
  }, [preferences, triggerCelebration]);

  // 2. Set Day Status (Completed, Partial, Missed)
  const setDayStatus = useCallback((dayNum, status) => {
    setDays(prevDays => {
      const newDays = [...prevDays];
      const dayIdx = dayNum - 1;
      if (dayIdx >= 0 && dayIdx < 90) {
        newDays[dayIdx] = {
          ...newDays[dayIdx],
          status,
        };
      }
      return newDays;
    });
  }, []);

  // 3. Update Day Metrics
  const updateDayMetrics = useCallback((dayNum, metricsPartial) => {
    setDays(prevDays => {
      const newDays = [...prevDays];
      const dayIdx = dayNum - 1;
      if (dayIdx >= 0 && dayIdx < 90) {
        newDays[dayIdx] = {
          ...newDays[dayIdx],
          metrics: {
            ...newDays[dayIdx].metrics,
            ...metricsPartial,
          },
        };
      }
      return newDays;
    });
  }, []);

  // 4. Update Top 3 Tasks
  const updateTop3Task = useCallback((dayNum, taskId, updates) => {
    setDays(prevDays => {
      const newDays = [...prevDays];
      const dayIdx = dayNum - 1;
      if (dayIdx >= 0 && dayIdx < 90) {
        const day = { ...newDays[dayIdx] };
        day.top3Tasks = day.top3Tasks.map(t => (t.id === taskId ? { ...t, ...updates } : t));
        newDays[dayIdx] = day;
      }
      return newDays;
    });
  }, []);

  // 5. Update Day Reflection Notes
  const updateDayNotes = useCallback((dayNum, notes) => {
    setDays(prevDays => {
      const newDays = [...prevDays];
      const dayIdx = dayNum - 1;
      if (dayIdx >= 0 && dayIdx < 90) {
        newDays[dayIdx] = {
          ...newDays[dayIdx],
          notes,
        };
      }
      return newDays;
    });
  }, []);

  // 6. Update Nutrition Data
  const updateNutrition = useCallback((dayNum, nutritionPartial) => {
    setDays(prevDays => {
      const newDays = [...prevDays];
      const dayIdx = dayNum - 1;
      if (dayIdx >= 0 && dayIdx < 90) {
        newDays[dayIdx] = {
          ...newDays[dayIdx],
          nutrition: {
            ...newDays[dayIdx].nutrition,
            ...nutritionPartial,
          },
        };
      }
      return newDays;
    });
  }, []);

  // 7. Toggle GATE Topic
  const toggleGateTopic = useCallback((subjectId, topicId) => {
    setGateData(prev => {
      const newSubjects = prev.subjects.map(sub => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          topics: sub.topics.map(t => (t.id === topicId ? { ...t, completed: !t.completed } : t)),
        };
      });
      if (preferences.soundEnabled) sounds.playCheck();
      return { ...prev, subjects: newSubjects };
    });
  }, [preferences.soundEnabled]);

  // 8. Add Custom GATE Subject / Topic
  const addGateTopic = useCallback((subjectId, topicName, difficulty = 'Medium') => {
    setGateData(prev => {
      const newSubjects = prev.subjects.map(sub => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          topics: [
            ...sub.topics,
            { id: `custom-${Date.now()}`, name: topicName, completed: false, difficulty },
          ],
        };
      });
      return { ...prev, subjects: newSubjects };
    });
  }, []);

  // 9. Log Mock Test
  const logGateMockTest = useCallback((test) => {
    setGateData(prev => ({
      ...prev,
      mockTests: [
        { id: `mock-${Date.now()}`, ...test },
        ...prev.mockTests,
      ],
    }));
  }, []);

  // 10. Update Skill Hours
  const updateSkillHours = useCallback((skillId, hoursToAdd) => {
    setSkillsData(prev => ({
      ...prev,
      skills: prev.skills.map(s => {
        if (s.id !== skillId) return s;
        return {
          ...s,
          completedHours: Number((s.completedHours + hoursToAdd).toFixed(1)),
        };
      }),
    }));
  }, []);

  // 11. Add New Custom Skill
  const addSkill = useCallback((newSkill) => {
    setSkillsData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: `skill-${Date.now()}`,
          name: newSkill.name,
          category: newSkill.category || 'General',
          targetHours: Number(newSkill.targetHours) || 40,
          completedHours: 0,
          icon: newSkill.icon || 'Code',
          color: 'text-cyan-400',
          projects: [],
        },
      ],
    }));
  }, []);

  // 12. Master Goals Actions
  const addMasterGoal = useCallback((goal) => {
    setGoalsData(prev => ({
      ...prev,
      masterGoals: [
        ...prev.masterGoals,
        { id: `goal-${Date.now()}`, ...goal, progress: Number(goal.progress) || 0, status: 'In Progress' },
      ],
    }));
  }, []);

  const updateMasterGoal = useCallback((goalId, updates) => {
    setGoalsData(prev => ({
      ...prev,
      masterGoals: prev.masterGoals.map(g => (g.id === goalId ? { ...g, ...updates } : g)),
    }));
  }, []);

  const deleteMasterGoal = useCallback((goalId) => {
    setGoalsData(prev => ({
      ...prev,
      masterGoals: prev.masterGoals.filter(g => g.id !== goalId),
    }));
  }, []);

  // 13. Reading Actions
  const addBook = useCallback((book) => {
    setReadingData(prev => ({
      ...prev,
      books: [
        ...prev.books,
        { id: `book-${Date.now()}`, ...book, pagesRead: 0, rating: 5 },
      ],
    }));
  }, []);

  const updateBookProgress = useCallback((bookId, pagesRead) => {
    setReadingData(prev => ({
      ...prev,
      books: prev.books.map(b => {
        if (b.id !== bookId) return b;
        const newPages = Math.min(b.totalPages, pagesRead);
        const isDone = newPages >= b.totalPages;
        return {
          ...b,
          pagesRead: newPages,
          status: isDone ? 'completed' : b.status,
        };
      }),
    }));
  }, []);

  // 14. Finance Actions
  const addExpense = useCallback((expense) => {
    setFinanceData(prev => ({
      ...prev,
      expenses: [
        { id: `exp-${Date.now()}`, date: new Date().toISOString().split('T')[0], ...expense },
        ...prev.expenses,
      ],
    }));
  }, []);

  const deleteExpense = useCallback((expId) => {
    setFinanceData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(e => e.id !== expId),
    }));
  }, []);

  // 15. Reviews Actions
  const saveWeeklyReview = useCallback((weekNum, data) => {
    setReviewsData(prev => ({
      ...prev,
      weekly: {
        ...prev.weekly,
        [weekNum]: data,
      },
    }));
  }, []);

  const saveMonthlyReview = useCallback((monthNum, data) => {
    setReviewsData(prev => ({
      ...prev,
      monthly: {
        ...prev.monthly,
        [monthNum]: data,
      },
    }));
  }, []);

  // 16. Update Preferences
  const updatePreferences = useCallback((updates) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  }, []);

  // 17. Load Demo Data
  const loadDemoData = useCallback(() => {
    const demoDays = generateDemo90Days(preferences.startDate);
    setDays(demoDays);
    setPreferences(prev => ({ ...prev, currentDay: 17 }));
    triggerCelebration();
  }, [preferences.startDate, triggerCelebration]);

  // 18. Reset All Data
  const resetAllData = useCallback(() => {
    const freshDays = generateInitial90Days(new Date().toISOString().split('T')[0]);
    setDays(freshDays);
    setPreferences(prev => ({ ...prev, currentDay: 1 }));
    setGateData({ subjects: GATE_SYLLABUS_DEFAULT, mockTests: [], customSubjects: [] });
    setSkillsData({ skills: DEFAULT_SKILLS });
    setGoalsData({ masterGoals: DEFAULT_MASTER_GOALS });
    setReadingData({ books: DEFAULT_BOOKS, currentBookId: 'book-1' });
    setReviewsData({ weekly: {}, monthly: {} });
    setFinanceData({ currency: '₹', monthlyBudget: 25000, monthlySavingsGoal: 15000, expenses: [] });
  }, []);

  // 19. Export & Import
  const exportData = useCallback(() => {
    const fullBackup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      preferences,
      days,
      gateData,
      skillsData,
      goalsData,
      readingData,
      reviewsData,
      financeData,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `WINTER_ARC_90_BACKUP_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [preferences, days, gateData, skillsData, goalsData, readingData, reviewsData, financeData]);

  const importData = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.days && parsed.days.length === 90) {
        setDays(parsed.days);
        if (parsed.preferences) setPreferences(parsed.preferences);
        if (parsed.gateData) setGateData(parsed.gateData);
        if (parsed.skillsData) setSkillsData(parsed.skillsData);
        if (parsed.goalsData) setGoalsData(parsed.goalsData);
        if (parsed.readingData) setReadingData(parsed.readingData);
        if (parsed.reviewsData) setReviewsData(parsed.reviewsData);
        if (parsed.financeData) setFinanceData(parsed.financeData);
        triggerCelebration();
        return true;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
    return false;
  }, [triggerCelebration]);

  const value = {
    preferences,
    updatePreferences,
    days,
    currentDay,
    currentDayData,
    stats,
    achievements: evaluatedAchievements,
    milestones: MILESTONES,
    monthPhases: MONTH_PHASES,
    gateData,
    skillsData,
    goalsData,
    readingData,
    reviewsData,
    financeData,
    // Actions
    toggleHabit,
    setDayStatus,
    updateDayMetrics,
    updateTop3Task,
    updateDayNotes,
    updateNutrition,
    toggleGateTopic,
    addGateTopic,
    logGateMockTest,
    updateSkillHours,
    addSkill,
    addMasterGoal,
    updateMasterGoal,
    deleteMasterGoal,
    addBook,
    updateBookProgress,
    addExpense,
    deleteExpense,
    saveWeeklyReview,
    saveMonthlyReview,
    loadDemoData,
    resetAllData,
    exportData,
    importData,
    triggerCelebration,
  };

  return (
    <WinterArcContext.Provider value={value}>
      {children}
    </WinterArcContext.Provider>
  );
}

export function useWinterArc() {
  const context = useContext(WinterArcContext);
  if (!context) {
    throw new Error('useWinterArc must be used within a WinterArcProvider');
  }
  return context;
}
