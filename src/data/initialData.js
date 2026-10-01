// Winter Arc 90 Initial Data & Configurations

export const HABIT_CATEGORIES = {
  CORE: 'Core Pillars',
  DISCIPLINE: 'Discipline & Mindset',
  PRODUCTIVITY: 'Productivity & Growth',
  HEALTH: 'Health & Recovery',
};

export const DEFAULT_HABITS = [
  // 8 Core Daily Habits
  {
    id: 'water',
    name: 'Drink 4L Water',
    shortName: '4L Water',
    icon: 'Droplets',
    category: HABIT_CATEGORIES.CORE,
    isCore: true,
    target: '4 Liters',
    unit: 'L',
    targetValue: 4,
    description: 'Optimal hydration for cognitive function, energy, and muscle recovery.',
  },
  {
    id: 'sleep',
    name: 'Sleep 7–8 Hours',
    shortName: '7–8h Sleep',
    icon: 'Moon',
    category: HABIT_CATEGORIES.CORE,
    isCore: true,
    target: '7-8 Hours',
    unit: 'hrs',
    targetValue: 8,
    description: 'Non-negotiable brain and muscular recovery window.',
  },
  {
    id: 'gym',
    name: 'Gym / Workout — 2 Hours',
    shortName: '2h Workout',
    icon: 'Dumbbell',
    category: HABIT_CATEGORIES.CORE,
    isCore: true,
    target: '2 Hours',
    unit: 'hrs',
    targetValue: 2,
    description: 'Resistance training, cardio, mobility, or intense athletic session.',
  },
  {
    id: 'gate',
    name: 'GATE Preparation — 2 Hours',
    shortName: '2h GATE',
    icon: 'BookOpen',
    category: HABIT_CATEGORIES.CORE,
    isCore: true,
    target: '2 Hours',
    unit: 'hrs',
    targetValue: 2,
    description: 'Rigorous conceptual study, problem solving, revision, or mock tests.',
  },
  {
    id: 'skills',
    name: 'Skill Development — 2 Hours',
    shortName: '2h Skills',
    icon: 'Code',
    category: HABIT_CATEGORIES.CORE,
    isCore: true,
    target: '2 Hours',
    unit: 'hrs',
    targetValue: 2,
    description: 'Coding, DSA, AI/ML, system design, projects, or high-value technical craft.',
  },
  {
    id: 'no_junk',
    name: 'No Junk Food / Clean Fuel',
    shortName: 'No Junk',
    icon: 'Apple',
    category: HABIT_CATEGORIES.CORE,
    isCore: true,
    target: '100% Clean',
    unit: 'bool',
    targetValue: 1,
    description: 'Zero processed sugar, zero junk snacks, whole food fuel.',
  },
  {
    id: 'screen_time',
    name: 'Screen Time < 8 Hours',
    shortName: '<8h Screen',
    icon: 'Smartphone',
    category: HABIT_CATEGORIES.CORE,
    isCore: true,
    target: '< 8 Hours',
    unit: 'hrs',
    targetValue: 8,
    description: 'Eliminate mindless scrolling; keep screen consumption intentional.',
  },
  {
    id: 'steps',
    name: '10,000 Steps',
    shortName: '10K Steps',
    icon: 'Footprints',
    category: HABIT_CATEGORIES.CORE,
    isCore: true,
    target: '10,000 Steps',
    unit: 'steps',
    targetValue: 10000,
    description: 'Daily active baseline for cardiovascular and metabolic vitality.',
  },

  // 10 Additional Winter Arc Habits
  {
    id: 'reading',
    name: 'Read 20–30 Minutes',
    shortName: 'Read 30m',
    icon: 'Book',
    category: HABIT_CATEGORIES.PRODUCTIVITY,
    isCore: false,
    target: '25 Mins',
    unit: 'mins',
    targetValue: 30,
    description: 'Expand your perspective through books, research, or technical literature.',
  },
  {
    id: 'meditation',
    name: 'Meditation / Mindfulness',
    shortName: 'Meditation',
    icon: 'Sparkles',
    category: HABIT_CATEGORIES.DISCIPLINE,
    isCore: false,
    target: '10-15 Mins',
    unit: 'mins',
    targetValue: 15,
    description: 'Calm the nervous system, sharpen focus, and master impulse control.',
  },
  {
    id: 'journal',
    name: 'Daily Reflection / Journal',
    shortName: 'Journal',
    icon: 'PenTool',
    category: HABIT_CATEGORIES.DISCIPLINE,
    isCore: false,
    target: '1 Entry',
    unit: 'bool',
    targetValue: 1,
    description: 'Review victories, analyze mistakes, and set tomorrow’s battlefield.',
  },
  {
    id: 'clean_room',
    name: 'Keep Room / Workspace Clean',
    shortName: 'Clean Space',
    icon: 'Sparkle',
    category: HABIT_CATEGORIES.DISCIPLINE,
    isCore: false,
    target: 'Organized',
    unit: 'bool',
    targetValue: 1,
    description: 'Outer order reflects inner clarity. No messy desk, no messy mind.',
  },
  {
    id: 'wake_schedule',
    name: 'Wake Up on Planned Schedule',
    shortName: 'Early Wake',
    icon: 'Sun',
    category: HABIT_CATEGORIES.DISCIPLINE,
    isCore: false,
    target: 'Target Time',
    unit: 'bool',
    targetValue: 1,
    description: 'No snooze button. Wake up on the first alarm with intentional urgency.',
  },
  {
    id: 'no_late_scroll',
    name: 'No Late-Night Scrolling',
    shortName: 'No Late Scroll',
    icon: 'ShieldOff',
    category: HABIT_CATEGORIES.HEALTH,
    isCore: false,
    target: '1h Before Bed',
    unit: 'bool',
    targetValue: 1,
    description: 'Disconnect from all blue light and social feeds 60 mins before sleep.',
  },
  {
    id: 'track_spending',
    name: 'Track Daily Spending',
    shortName: 'Track Money',
    icon: 'Wallet',
    category: HABIT_CATEGORIES.PRODUCTIVITY,
    isCore: false,
    target: 'Log All Expenses',
    unit: 'bool',
    targetValue: 1,
    description: 'Know where every rupee / dollar flows. Eliminate wasteful leaks.',
  },
  {
    id: 'top3_priorities',
    name: 'Complete Top 3 Priorities',
    shortName: 'Top 3 Tasks',
    icon: 'CheckSquare',
    category: HABIT_CATEGORIES.PRODUCTIVITY,
    isCore: false,
    target: '3 Tasks',
    unit: 'tasks',
    targetValue: 3,
    description: 'Execute the 3 most crucial high-leverage outcomes of the day.',
  },
  {
    id: 'digital_detox',
    name: 'Digital Detox Period',
    shortName: 'Digital Detox',
    icon: 'RadioOff',
    category: HABIT_CATEGORIES.DISCIPLINE,
    isCore: false,
    target: '2h Screen-Free',
    unit: 'bool',
    targetValue: 1,
    description: 'Dedicated phone-free deep immersion time during the day.',
  },
  {
    id: 'grooming_selfcare',
    name: 'Personal Grooming / Self-Care',
    shortName: 'Self-Care',
    icon: 'Smile',
    category: HABIT_CATEGORIES.HEALTH,
    isCore: false,
    target: 'Completed',
    unit: 'bool',
    targetValue: 1,
    description: 'Skincare, hygiene, posture check, and sharp appearance.',
  },
];

export const MONTH_PHASES = [
  {
    month: 1,
    title: 'MONTH 1 — FOUNDATION',
    subtitle: 'Days 1 to 30',
    tagline: 'Fix sleep, build relentless daily routine, eliminate friction.',
    focusPoints: [
      'Lock in 7–8 hours consistent sleep schedule',
      'Build unbreakable gym consistency (5-6 days/week)',
      'Start dedicated 2h daily GATE study discipline',
      'Establish 2h daily skill building & coding routine',
      'Eliminate junk food and unnecessary sugary drinks',
      'Curb screen time under 8 hours per day',
    ],
    color: 'from-cyan-500/20 to-blue-600/20',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
  },
  {
    month: 2,
    title: 'MONTH 2 — DISCIPLINE',
    subtitle: 'Days 31 to 60',
    tagline: 'Increase intensity, deepen focus, compound technical skill.',
    focusPoints: [
      'Increase GATE problem-solving depth and subject coverage',
      'Push progressive overload in gym & fitness benchmarks',
      'Ship real-world projects & sharpen DSA mastery',
      'Cut distractions to near zero during deep work windows',
      'Deepen financial savings and intentional budgeting',
      'Maintain daily reflection and high mental clarity',
    ],
    color: 'from-amber-500/20 to-orange-600/20',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
  },
  {
    month: 3,
    title: 'MONTH 3 — TRANSFORMATION',
    subtitle: 'Days 61 to 90',
    tagline: 'Peak consistency, elite output, and lifelong identity change.',
    focusPoints: [
      'Peak consistency across all 18 discipline habits',
      'Comprehensive GATE mock tests and targeted weakness revision',
      'Chiseled physique and peak physical stamina',
      'Deploy full-stack/AI projects and polished portfolio',
      'Unshakable confidence and razor-sharp mental poise',
      'Emerge completely transformed into your highest self',
    ],
    color: 'from-emerald-500/20 to-teal-600/20',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
  },
];

export const GATE_SYLLABUS_DEFAULT = [
  {
    id: 'em',
    name: 'Engineering Mathematics',
    icon: 'Sigma',
    topics: [
      { id: 'em-1', name: 'Linear Algebra (Matrices, Eigenvalues & Vectors)', completed: true, difficulty: 'Medium' },
      { id: 'em-2', name: 'Calculus (Limits, Continuity, Partial Derivatives)', completed: true, difficulty: 'Medium' },
      { id: 'em-3', name: 'Probability & Statistics (Bayes, Random Variables)', completed: false, difficulty: 'Hard' },
      { id: 'em-4', name: 'Combinatorics & Graph Theory (Discrete Maths)', completed: false, difficulty: 'Hard' },
      { id: 'em-5', name: 'Mathematical Logic & Propositional Calculus', completed: true, difficulty: 'Easy' },
    ],
  },
  {
    id: 'prog_dsa',
    name: 'Programming & Data Structures',
    icon: 'Code',
    topics: [
      { id: 'ds-1', name: 'Recursion, Pointers & Memory Allocation in C', completed: true, difficulty: 'Medium' },
      { id: 'ds-2', name: 'Arrays, Stacks, Queues & Linked Lists', completed: true, difficulty: 'Easy' },
      { id: 'ds-3', name: 'Binary Trees, BSTs & AVL Trees', completed: true, difficulty: 'Medium' },
      { id: 'ds-4', name: 'Binary Heaps & Priority Queues', completed: false, difficulty: 'Medium' },
      { id: 'ds-5', name: 'Hashing & Hash Table Collisions', completed: true, difficulty: 'Easy' },
    ],
  },
  {
    id: 'algo',
    name: 'Algorithms',
    icon: 'Cpu',
    topics: [
      { id: 'algo-1', name: 'Asymptotic Analysis & Recurrences (Master Theorem)', completed: true, difficulty: 'Easy' },
      { id: 'algo-2', name: 'Divide and Conquer (Merge, Quick Sort)', completed: true, difficulty: 'Easy' },
      { id: 'algo-3', name: 'Greedy Algorithms (Huffman, MST Kruskal/Prim)', completed: false, difficulty: 'Medium' },
      { id: 'algo-4', name: 'Dynamic Programming (0/1 Knapsack, LCS, Matrix Chain)', completed: false, difficulty: 'Hard' },
      { id: 'algo-5', name: 'Graph Traversal (BFS, DFS, Dijkstra, Bellman-Ford)', completed: false, difficulty: 'Hard' },
      { id: 'algo-6', name: 'NP-Completeness & Approximation Algorithms', completed: false, difficulty: 'Hard' },
    ],
  },
  {
    id: 'dbms',
    name: 'Database Management Systems (DBMS)',
    icon: 'Database',
    topics: [
      { id: 'dbms-1', name: 'ER Model & Relational Algebra', completed: true, difficulty: 'Easy' },
      { id: 'dbms-2', name: 'SQL Queries (Joins, Nested Queries, Aggregations)', completed: true, difficulty: 'Medium' },
      { id: 'dbms-3', name: 'Normalization (1NF, 2NF, 3NF, BCNF, Functional Dependencies)', completed: false, difficulty: 'Medium' },
      { id: 'dbms-4', name: 'Transactions & Concurrency Control (ACID, Serializability, 2PL)', completed: false, difficulty: 'Hard' },
      { id: 'dbms-5', name: 'Indexing, B-Trees & B+ Trees', completed: false, difficulty: 'Medium' },
    ],
  },
  {
    id: 'os',
    name: 'Operating Systems',
    icon: 'Terminal',
    topics: [
      { id: 'os-1', name: 'Processes, Threads & CPU Scheduling Algorithms', completed: true, difficulty: 'Easy' },
      { id: 'os-2', name: 'Process Synchronization & Semaphores (Dining Philosophers, Producer-Consumer)', completed: false, difficulty: 'Hard' },
      { id: 'os-3', name: 'Deadlocks (Detection, Prevention, Banker’s Algorithm)', completed: true, difficulty: 'Medium' },
      { id: 'os-4', name: 'Memory Management & Paging (Virtual Memory, Page Replacement)', completed: false, difficulty: 'Hard' },
      { id: 'os-5', name: 'File Systems & Disk Scheduling (SCAN, C-SCAN, SSTF)', completed: false, difficulty: 'Easy' },
    ],
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    icon: 'Network',
    topics: [
      { id: 'cn-1', name: 'OSI & TCP/IP Model Layers & Protocols', completed: true, difficulty: 'Easy' },
      { id: 'cn-2', name: 'Data Link Layer (Flow Control, Error Control, Sliding Window, CSMA/CD)', completed: false, difficulty: 'Medium' },
      { id: 'cn-3', name: 'Network Layer (IPv4/IPv6, Subnetting, Routing Algorithms, OSPF, BGP)', completed: false, difficulty: 'Hard' },
      { id: 'cn-4', name: 'Transport Layer (TCP Handshake, Congestion Control, UDP)', completed: false, difficulty: 'Medium' },
      { id: 'cn-5', name: 'Application Layer (DNS, HTTP, SMTP, FTP)', completed: false, difficulty: 'Easy' },
    ],
  },
  {
    id: 'coa',
    name: 'Computer Organization & Architecture (COA)',
    icon: 'Server',
    topics: [
      { id: 'coa-1', name: 'Machine Instructions & Addressing Modes', completed: false, difficulty: 'Medium' },
      { id: 'coa-2', name: 'ALU, Data Path & Control Unit Design (Hardwired vs Microprogrammed)', completed: false, difficulty: 'Hard' },
      { id: 'coa-3', name: 'Instruction Pipelining & Pipeline Hazards', completed: false, difficulty: 'Hard' },
      { id: 'coa-4', name: 'Memory Hierarchy (Cache Memory Mapping, Cache Hit/Miss)', completed: false, difficulty: 'Medium' },
      { id: 'coa-5', name: 'I/O Interface (Interrupts, DMA)', completed: false, difficulty: 'Easy' },
    ],
  },
  {
    id: 'toc',
    name: 'Theory of Computation (TOC)',
    icon: 'Boxes',
    topics: [
      { id: 'toc-1', name: 'Regular Expressions & Finite Automata (DFA, NFA, Minimization)', completed: true, difficulty: 'Medium' },
      { id: 'toc-2', name: 'Context-Free Grammars & Pushdown Automata (PDA)', completed: false, difficulty: 'Hard' },
      { id: 'toc-3', name: 'Turing Machines & Decidability / Halting Problem', completed: false, difficulty: 'Hard' },
      { id: 'toc-4', name: 'Chomsky Hierarchy & Closure Properties', completed: false, difficulty: 'Medium' },
    ],
  },
  {
    id: 'cd',
    name: 'Compiler Design',
    icon: 'Layers',
    topics: [
      { id: 'cd-1', name: 'Lexical Analysis & Regular Expressions', completed: false, difficulty: 'Easy' },
      { id: 'cd-2', name: 'Parsing (LL(1), LR(0), SLR, CLR, LALR Parsers)', completed: false, difficulty: 'Hard' },
      { id: 'cd-3', name: 'Syntax-Directed Translation (SDT & S-attributed/L-attributed)', completed: false, difficulty: 'Medium' },
      { id: 'cd-4', name: 'Intermediate Code Generation & Code Optimization', completed: false, difficulty: 'Medium' },
    ],
  },
  {
    id: 'dl',
    name: 'Digital Logic',
    icon: 'ToggleLeft',
    topics: [
      { id: 'dl-1', name: 'Boolean Algebra & Minimization (K-Maps, Quine-McCluskey)', completed: true, difficulty: 'Easy' },
      { id: 'dl-2', name: 'Combinational Circuits (Multiplexers, Decoders, Adders)', completed: true, difficulty: 'Medium' },
      { id: 'dl-3', name: 'Sequential Circuits (Flip-Flops, Registers, Counters)', completed: false, difficulty: 'Medium' },
      { id: 'dl-4', name: 'Number Representations & Floating Point Standards', completed: true, difficulty: 'Easy' },
    ],
  },
  {
    id: 'ga',
    name: 'General Aptitude',
    icon: 'Brain',
    topics: [
      { id: 'ga-1', name: 'Quantitative Aptitude (Percentages, Profit/Loss, Ratios, Speed-Time)', completed: true, difficulty: 'Easy' },
      { id: 'ga-2', name: 'Spatial & Analytical Reasoning', completed: true, difficulty: 'Easy' },
      { id: 'ga-3', name: 'Verbal Ability & Reading Comprehension', completed: true, difficulty: 'Easy' },
    ],
  },
];

export const DEFAULT_SKILLS = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'Core Computer Science',
    targetHours: 60,
    completedHours: 18.5,
    icon: 'GitBranch',
    color: 'text-cyan-400',
    projects: ['LeetCode 150 Blind', 'Striver SDE Sheet', 'Graph Algorithms Implementation'],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Modern Web & React',
    category: 'Software Engineering',
    targetHours: 80,
    completedHours: 24.0,
    icon: 'Layers',
    color: 'text-blue-400',
    projects: ['Winter Arc 90 App', 'Real-time WebSocket Chat', 'REST & GraphQL Backend API'],
  },
  {
    id: 'ai_ml',
    name: 'AI / Machine Learning & LLMs',
    category: 'Applied AI',
    targetHours: 50,
    completedHours: 12.0,
    icon: 'Cpu',
    color: 'text-purple-400',
    projects: ['RAG Knowledge Base System', 'Fine-tuning small LLMs', 'PyTorch Neural Networks'],
  },
  {
    id: 'cloud_devops',
    name: 'Cloud, Docker & DevOps',
    category: 'Infrastructure',
    targetHours: 40,
    completedHours: 9.5,
    icon: 'Cloud',
    color: 'text-emerald-400',
    projects: ['Dockerized Microservices', 'GitHub Actions CI/CD Pipeline', 'AWS Deployment'],
  },
  {
    id: 'system_design',
    name: 'System Design & High-Scalability',
    category: 'Architecture',
    targetHours: 35,
    completedHours: 8.0,
    icon: 'Server',
    color: 'text-amber-400',
    projects: ['Distributed Cache Design', 'Rate Limiter Service', 'Message Queue Architecture'],
  },
  {
    id: 'communication',
    name: 'Communication & Technical Leadership',
    category: 'Personal Development',
    targetHours: 30,
    completedHours: 11.0,
    icon: 'Mic',
    color: 'text-rose-400',
    projects: ['Mock Technical Interviews', 'Engineering Blog Writing', 'Public Speaking Practice'],
  },
];

export const DEFAULT_MASTER_GOALS = [
  {
    id: 'goal-1',
    category: 'Fitness',
    title: 'Drop Body Fat to 12% & Bench 100kg',
    target: 'Sub-12% body fat, 100kg bench, 10K steps daily',
    deadline: 'Day 90',
    progress: 35,
    status: 'In Progress',
    notes: 'Prioritizing progressive overload, 160g daily protein, and zero junk food.',
  },
  {
    id: 'goal-2',
    category: 'GATE',
    title: 'Master All 12 GATE CS Subjects & Score 70+ in Full Mocks',
    target: 'Complete 100% syllabus + solve 15 full mock tests',
    deadline: 'Day 90',
    progress: 40,
    status: 'In Progress',
    notes: '2 hours daily dedicated war room study sessions without phone distractions.',
  },
  {
    id: 'goal-3',
    category: 'Skills',
    title: 'Build 3 Production-Grade Full-Stack & AI Systems',
    target: '3 complete GitHub repositories with live deployment',
    deadline: 'Day 75',
    progress: 50,
    status: 'In Progress',
    notes: '1. Winter Arc OS, 2. Distributed Microservices App, 3. RAG AI Assistant.',
  },
  {
    id: 'goal-4',
    category: 'Career',
    title: 'Crack Top Tier Software Engineering / Research Role',
    target: 'Solve 250 DSA problems + 10 mock technical interviews',
    deadline: 'Day 90',
    progress: 30,
    status: 'In Progress',
    notes: 'Focus on LeetCode Medium/Hard patterns and solid system design fundamentals.',
  },
  {
    id: 'goal-5',
    category: 'Finance',
    title: 'Save ₹50,000 / $1,000 & Track Every Expense',
    target: 'Maintain 60%+ savings rate and eliminate impulse purchases',
    deadline: 'Day 90',
    progress: 45,
    status: 'In Progress',
    notes: 'Daily expense logging in Winter Arc Finance tracker.',
  },
  {
    id: 'goal-6',
    category: 'Reading',
    title: 'Finish 6 High-Impact Non-Fiction & Tech Books',
    target: 'Read 6 complete books (Atomic Habits, Deep Work, Designing Data-Intensive Apps, etc.)',
    deadline: 'Day 90',
    progress: 33,
    status: 'In Progress',
    notes: '20-30 minutes mandatory night reading session before sleep.',
  },
  {
    id: 'goal-7',
    category: 'Personal',
    title: 'Achieve Ironclad Mental Discipline & Digital Sobriety',
    target: 'Screen time consistently under 6 hours, zero doomscrolling, daily journal',
    deadline: 'Day 90',
    progress: 60,
    status: 'In Progress',
    notes: 'Phone stays outside the study room during focus blocks.',
  },
];

export const DEFAULT_BOOKS = [
  {
    id: 'book-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    totalPages: 320,
    pagesRead: 320,
    status: 'completed',
    rating: 5,
    notes: 'Systems > Goals. You do not rise to the level of your goals; you fall to the level of your systems.',
  },
  {
    id: 'book-2',
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    totalPages: 304,
    pagesRead: 195,
    status: 'reading',
    rating: 5,
    notes: 'High-quality work produced = (Time Spent) x (Intensity of Focus). Eliminate shallow distraction.',
  },
  {
    id: 'book-3',
    title: 'Can’t Hurt Me: Master Your Mind and Defy the Odds',
    author: 'David Goggins',
    totalPages: 364,
    pagesRead: 0,
    status: 'wishlist',
    rating: 5,
    notes: 'The 40% rule. When your mind says you are done, you are only at 40% of your capability.',
  },
  {
    id: 'book-4',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    totalPages: 616,
    pagesRead: 140,
    status: 'reading',
    rating: 5,
    notes: 'The definitive bible of distributed systems, storage engines, and consensus.',
  },
];

export const MOTIVATIONAL_QUOTES = [
  "Discipline beats motivation every single day of the week.",
  "Your future self is built today. What will you hand them tonight?",
  "Don't break the chain. Consistency compounds in silence.",
  "Small actions. Repeated relentlessly. Create massive empires.",
  "Winter is when champions are forged in solitude while the world sleeps.",
  "You don't need easy conditions. You need unbreakable discipline.",
  "The pain of discipline is measured in ounces; the pain of regret in tons.",
  "When you feel like stopping, remember why you began this 90-day arc.",
  "No excuses. No negotiations with your weaker self.",
  "Lock in. The standard is excellence, not comfort.",
  "High performance is not an accident; it is a calculated daily ritual.",
  "Win the morning, command the afternoon, dominate the night.",
  "Every repetition, every study hour, every cold glass of water is a vote for who you are becoming.",
  "Comfort is the silent killer of greatness. Embrace the resistance.",
  "Sacrifice what you are today for what you are capable of becoming.",
  "The scoreboard doesn't lie. Focus on inputs, and the outputs take care of themselves.",
  "Master your impulses. When you master your mind, you master your destiny.",
  "Do it when you don't feel like it. That is the exact moment growth happens.",
  "A man who conquers himself is greater than one who conquers a thousand battles.",
  "90 days of absolute focus will put you 3 years ahead of your peers.",
];

export const MILESTONES = [
  { days: 7, label: '7 Days', title: 'Initiate', icon: 'Flame', desc: 'First week conquered. The spark is lit.' },
  { days: 14, label: '14 Days', title: 'Momentum', icon: 'Zap', desc: 'Two weeks of ironclad consistency.' },
  { days: 21, label: '21 Days', title: 'Habit Locked', icon: 'Anchor', desc: 'Neural pathways are reorganizing.' },
  { days: 30, label: '30 Days', title: 'Foundation Master', icon: 'ShieldCheck', desc: 'Month 1 conquered. The base is unbreakable.' },
  { days: 45, label: '45 Days', title: 'Halfway Titan', icon: 'Swords', desc: 'Midpoint reached. The weak have turned back; you keep marching.' },
  { days: 60, label: '60 Days', title: 'Discipline Forged', icon: 'Hammer', desc: 'Month 2 conquered. Discipline has become your default nature.' },
  { days: 75, label: '75 Days', title: 'Unstoppable Force', icon: 'TrendingUp', desc: 'The transformation is undeniable.' },
  { days: 90, label: '90 Days', title: 'Winter Arc Legend 👑', icon: 'Crown', desc: 'The 90-day transformation is complete. You are reborn.' },
];

export const ACHIEVEMENTS_LIST = [
  { id: 'streak_7', title: '7 Day Streak', desc: 'Complete all mandatory daily habits 7 days straight', icon: 'Flame', req: 'streak', threshold: 7 },
  { id: 'streak_14', title: '14 Day Streak', desc: 'Complete all mandatory daily habits 14 days straight', icon: 'Zap', req: 'streak', threshold: 14 },
  { id: 'streak_30', title: '30 Day Streak', desc: 'Unbroken month of discipline mastery', icon: 'ShieldAlert', req: 'streak', threshold: 30 },
  { id: 'workouts_50', title: '50 Workouts Logged', desc: 'Crushed 50 intense training sessions', icon: 'Dumbbell', req: 'workouts', threshold: 50 },
  { id: 'gate_50', title: '50 Hours GATE Study', desc: 'Logged 50 focused study hours in the GATE War Room', icon: 'BookOpen', req: 'gateHours', threshold: 50 },
  { id: 'skills_50', title: '50 Hours Skill Craft', desc: 'Dedicated 50 hours to code and engineering craft', icon: 'Code', req: 'skillHours', threshold: 50 },
  { id: 'steps_100k', title: '100,000 Total Steps', desc: 'Walked over 100K active steps', icon: 'Footprints', req: 'steps', threshold: 100000 },
  { id: 'no_junk_30', title: '30 Days No Junk Food', desc: 'Maintained 30 days of clean, disciplined nutrition', icon: 'Apple', req: 'noJunkDays', threshold: 30 },
  { id: 'screen_7', title: 'Digital Sovereign', desc: 'Kept screen time under 8h for 7 days', icon: 'Smartphone', req: 'screenDays', threshold: 7 },
  { id: 'reading_10', title: '10 Reading Sessions', desc: 'Completed 10 daily reading sessions', icon: 'Book', req: 'readingSessions', threshold: 10 },
  { id: 'water_100', title: '100 Liters Hydrated', desc: 'Logged 100+ Liters of pure water', icon: 'Droplets', req: 'waterTotal', threshold: 100 },
  { id: 'perfect_10', title: '10 Perfect Days', desc: 'Achieved 100% completion on 10 separate days', icon: 'CheckCircle2', req: 'perfectDays', threshold: 10 },
  { id: 'journal_14', title: 'Chronicler of Growth', desc: 'Logged 14 daily reflection journals', icon: 'PenTool', req: 'journalEntries', threshold: 14 },
  { id: 'arc_completed', title: '90-Day Arc Victor 👑', desc: 'Completed all 90 days of the Winter Arc challenge', icon: 'Crown', req: 'daysCompleted', threshold: 90 },
];

export const WINTER_ARC_IDEAS_CATALOG = [
  {
    category: 'PHYSICAL',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10 border-cyan-500/20',
    items: [
      { name: 'Gym / Strength Training', desc: 'Heavy compound lifts (Squat, Bench, Deadlift, Overhead Press).' },
      { name: 'Running / 5K Progression', desc: 'Build aerobic engine and cardiovascular stamina.' },
      { name: 'Daily 10,000 Steps', desc: 'Active non-exercise physical activity for fat burn.' },
      { name: 'Cycling / Sprint Intervals', desc: 'High-intensity anaerobic conditioning.' },
      { name: 'Mobility & Stretching', desc: '15 mins daily hip, shoulder, and thoracic mobility.' },
      { name: 'Posture Correction Routine', desc: 'Face pulls, dead hangs, and core stabilization.' },
    ],
  },
  {
    category: 'MENTAL & FOCUS',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20',
    items: [
      { name: 'Deep Work Blocks', desc: '90-minute distraction-free flow state study intervals.' },
      { name: 'Mindfulness & Box Breathing', desc: '10 mins box breathing (4s in, 4s hold, 4s out, 4s hold).' },
      { name: 'Daily Evening Journal', desc: 'Analyze 3 wins, 1 mistake, and tomorrow’s tactical priority.' },
      { name: 'Cold Showers', desc: '2 minutes cold exposure for dopamine and nervous system resilience.' },
      { name: 'Digital Sunsets', desc: 'Turn off all screens 1 hour before scheduled sleep time.' },
    ],
  },
  {
    category: 'CAREER & TECH CRAFT',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
    items: [
      { name: 'GATE War Room Mastery', desc: 'Solve 20 PYQs (Previous Year Questions) daily.' },
      { name: 'LeetCode / DSA Patterns', desc: 'Master Two Pointers, Sliding Window, DP, and Graph patterns.' },
      { name: 'Ship 3 Full-Stack Products', desc: 'Clean architecture, real databases, auth, and cloud hosting.' },
      { name: 'GitHub Daily Green Streak', desc: 'Commit meaningful, well-tested code every single day.' },
      { name: 'Technical Article Writing', desc: 'Publish 1 in-depth engineering breakdown every 2 weeks.' },
      { name: 'System Design Deep Dives', desc: 'Study Redis, Kafka, Cassandra, and distributed consensus.' },
    ],
  },
  {
    category: 'LIFESTYLE & RECOVERY',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    items: [
      { name: 'Strict Sleep Schedule', desc: 'Same bedtime and wake-up time 7 days a week.' },
      { name: 'Deep Clean Workspace', desc: 'Zero clutter desk, clean monitor, organized cables.' },
      { name: 'Sunday Meal Prep', desc: 'Prep high-protein wholesome meals for the upcoming week.' },
      { name: 'Zero Sugary Beverages', desc: 'Replace sodas and packaged juices with black coffee, green tea, water.' },
      { name: 'Skincare & Grooming Protocol', desc: 'Daily cleanser, moisturizer, sunscreen, and neat hair.' },
    ],
  },
  {
    category: 'FINANCE DISCIPLINE',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    items: [
      { name: 'Zero Impulse Spending', desc: 'Apply the 72-hour rule before any non-essential purchase.' },
      { name: 'Daily Expense Logging', desc: 'Log every single rupee/dollar spent before sleep.' },
      { name: 'Invest 20% of Income', desc: 'Automate SIP into low-cost index funds or mutual funds.' },
      { name: 'Cancel Unused Subscriptions', desc: 'Audit credit cards and cut auto-renewing entertainment.' },
    ],
  },
  {
    category: 'SOCIAL & CHARACTER',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10 border-rose-500/20',
    items: [
      { name: 'Direct Eye Contact & Posture', desc: 'Speak with calm authority and stand with chest tall.' },
      { name: 'Reach Out to 1 High-Value Peer', desc: 'Message or collaborate with a driven engineer/scholar.' },
      { name: 'Zero Complaining Rule', desc: 'When friction arises, focus 100% on the solution, 0% on complaining.' },
      { name: 'Quality Family Time', desc: '30 mins uninterrupted conversation with family without phone.' },
    ],
  },
];

// Generates the 90-day base data array
export function generateInitial90Days(startDateStr = new Date().toISOString().split('T')[0]) {
  const days = [];
  const startDate = new Date(startDateStr);

  for (let i = 1; i <= 90; i++) {
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + (i - 1));
    const dateStr = dayDate.toISOString().split('T')[0];

    const habitsMap = {};
    DEFAULT_HABITS.forEach(h => {
      habitsMap[h.id] = false;
    });

    days.push({
      dayNumber: i,
      date: dateStr,
      status: 'untracked', // 'completed' | 'partial' | 'missed' | 'untracked'
      habits: habitsMap,
      metrics: {
        waterLiters: 0,
        sleepHours: 0,
        workoutMinutes: 0,
        workoutType: 'Push',
        workoutNotes: '',
        gateHours: 0,
        gateTopics: [],
        gateQuestions: 0,
        skillHours: 0,
        skillCategory: 'DSA',
        skillNotes: '',
        steps: 0,
        screenTimeMinutes: 0,
        readingMinutes: 0,
        readingBook: 'Deep Work',
        readingPages: 0,
        weightKg: null,
        bodyMeasurements: { chest: null, waist: null, arms: null, thighs: null },
      },
      top3Tasks: [
        { id: `top3-${i}-1`, text: '2h Focused GATE study & PYQs', completed: false },
        { id: `top3-${i}-2`, text: '2h Intense gym workout', completed: false },
        { id: `top3-${i}-3`, text: '2h Skill development & code', completed: false },
      ],
      notes: '',
      nutrition: {
        noJunk: false,
        noSugaryDrinks: false,
        waterGoal: false,
        proteinGoal: false,
        fruitsVeggies: false,
        homeCooked: false,
        calories: 2200,
        proteinGrams: 140,
        mealNotes: '',
      },
      spending: [],
      becomeBetter: {
        communication: false,
        confidence: false,
        deepWork: false,
        gratitude: false,
        timeManagement: false,
      },
    });
  }

  return days;
}

// Generates a rich demo data state so the user can immediately experience the app in full glory
export function generateDemo90Days(startDateStr = new Date().toISOString().split('T')[0]) {
  const days = generateInitial90Days(startDateStr);
  
  // Fill Days 1 to 16 with realistic disciplined data, making Day 17 current day!
  const workoutTypes = ['Push', 'Pull', 'Legs', 'Cardio', 'Push', 'Pull', 'Rest Day', 'Full Body', 'Push', 'Pull', 'Legs', 'Core', 'Push', 'Pull', 'Legs', 'Cardio', 'Push'];
  const gateTopicsSample = [
    'Linear Algebra Matrices', 'Calculus Limits', 'Probability Bayes', 'C Pointers & Recursion',
    'Stacks & Queues', 'BSTs & AVL Trees', 'Asymptotic Notation', 'Merge & Quick Sort',
    'SQL Joins & Aggregations', 'Normalization Forms', 'Process Scheduling', 'Deadlocks Banker Algo',
    'Computer Networks IPv4', 'TCP Congestion Control', 'DFA & NFA Automata', 'Boolean Minimization', 'Quantitative Aptitude'
  ];

  for (let i = 0; i < 16; i++) {
    const d = days[i];
    const isPerfect = (i % 5 !== 2); // 80%+ consistency with a couple partial days
    const isPartial = (i % 5 === 2);

    d.status = isPerfect ? 'completed' : 'partial';

    // Core habits
    d.habits['water'] = true;
    d.habits['sleep'] = isPerfect;
    d.habits['gym'] = true;
    d.habits['gate'] = true;
    d.habits['skills'] = true;
    d.habits['no_junk'] = isPerfect;
    d.habits['screen_time'] = true;
    d.habits['steps'] = true;

    // Optional habits
    d.habits['reading'] = true;
    d.habits['meditation'] = isPerfect;
    d.habits['journal'] = true;
    d.habits['clean_room'] = true;
    d.habits['wake_schedule'] = isPerfect;
    d.habits['no_late_scroll'] = isPerfect;
    d.habits['track_spending'] = true;
    d.habits['top3_priorities'] = true;
    d.habits['digital_detox'] = isPerfect;
    d.habits['grooming_selfcare'] = true;

    d.metrics.waterLiters = isPerfect ? 4.2 : 3.5;
    d.metrics.sleepHours = isPerfect ? 7.8 : 6.5;
    d.metrics.workoutMinutes = isPerfect ? 120 : 90;
    d.metrics.workoutType = workoutTypes[i % workoutTypes.length];
    d.metrics.workoutNotes = `Strong session. Hit progressive overload on ${d.metrics.workoutType}. Felt energetic and focused.`;
    d.metrics.gateHours = isPerfect ? 2.5 : 2.0;
    d.metrics.gateTopics = [gateTopicsSample[i % gateTopicsSample.length]];
    d.metrics.gateQuestions = 15 + Math.floor(Math.random() * 10);
    d.metrics.skillHours = isPerfect ? 2.2 : 1.8;
    d.metrics.skillCategory = 'DSA & Full-Stack';
    d.metrics.skillNotes = 'Built component modules, solved 3 LeetCode mediums on tree patterns.';
    d.metrics.steps = 10000 + Math.floor(Math.random() * 2500);
    d.metrics.screenTimeMinutes = 320 + Math.floor(Math.random() * 80); // ~5.5 to 6.5 hours
    d.metrics.readingMinutes = 30;
    d.metrics.readingBook = 'Atomic Habits';
    d.metrics.readingPages = 15;
    d.metrics.weightKg = Number((78.5 - (i * 0.12)).toFixed(1));
    d.metrics.bodyMeasurements = {
      chest: 40.2,
      waist: Number((33.5 - (i * 0.05)).toFixed(1)),
      arms: 15.2,
      thighs: 23.0,
    };

    d.top3Tasks[0].completed = true;
    d.top3Tasks[1].completed = true;
    d.top3Tasks[2].completed = isPerfect;

    d.notes = `Day ${i + 1} reflection: High energy, iron discipline. Deep focus during GATE and coding blocks. Body feels conditioned.`;
    d.nutrition.noJunk = isPerfect;
    d.nutrition.noSugaryDrinks = true;
    d.nutrition.waterGoal = true;
    d.nutrition.proteinGoal = true;
    d.nutrition.fruitsVeggies = true;
    d.nutrition.homeCooked = true;

    d.spending = [
      { id: `sp-${i}-1`, amount: 120, category: 'Food', description: 'Fresh fruits and Greek yogurt' },
      { id: `sp-${i}-2`, amount: 50, category: 'Transport', description: 'Metro commute' },
    ];
  }

  // Day 17 (Today) — partially filled so user can check off remaining items live!
  const today = days[16];
  today.habits['water'] = true;
  today.habits['sleep'] = true;
  today.habits['gym'] = true;
  today.habits['gate'] = true;
  today.habits['skills'] = true;
  today.habits['no_junk'] = true;
  today.habits['screen_time'] = false; // user can check this
  today.habits['steps'] = true;
  today.habits['reading'] = false;
  today.habits['meditation'] = true;
  today.habits['top3_priorities'] = false;
  today.metrics.waterLiters = 3.5;
  today.metrics.sleepHours = 7.5;
  today.metrics.workoutMinutes = 110;
  today.metrics.workoutType = 'Push';
  today.metrics.gateHours = 2.0;
  today.metrics.skillHours = 2.0;
  today.metrics.steps = 9400;
  today.metrics.screenTimeMinutes = 340;
  today.top3Tasks[0].completed = true;
  today.top3Tasks[1].completed = true;
  today.top3Tasks[2].completed = false;

  return days;
}
