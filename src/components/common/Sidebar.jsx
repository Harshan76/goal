import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck2,
  CalendarDays,
  Flame,
  Dumbbell,
  BookOpen,
  Code,
  Brain,
  Apple,
  Smartphone,
  Book,
  Wallet,
  Sparkles,
  BarChart3,
  Award,
  ClipboardList,
  Target,
  Lightbulb,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  CheckCircle,
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'Core' },
  { id: 'today', label: "Today's Checklist", icon: CheckCircle, section: 'Core', badge: 'Active' },
  { id: 'tracker', label: 'Daily Tracker', icon: CalendarCheck2, section: 'Core' },
  { id: 'calendar', label: '90-Day Calendar', icon: CalendarDays, section: 'Core' },
  { id: 'arc', label: '3-Month Arc', icon: Flame, section: 'Core' },

  { id: 'fitness', label: 'Fitness & Body', icon: Dumbbell, section: 'Pillars' },
  { id: 'gate', label: 'GATE War Room', icon: BookOpen, section: 'Pillars', badge: '2h Target' },
  { id: 'skills', label: 'Skill Building', icon: Code, section: 'Pillars', badge: '2h Target' },
  { id: 'discipline', label: 'Discipline & Focus', icon: Brain, section: 'Pillars' },
  { id: 'nutrition', label: 'No Junk / Nutrition', icon: Apple, section: 'Pillars' },
  { id: 'screentime', label: 'Screen Time', icon: Smartphone, section: 'Pillars', badge: '<8h' },
  { id: 'reading', label: 'Reading Hub', icon: Book, section: 'Pillars' },
  { id: 'finance', label: 'Finance Discipline', icon: Wallet, section: 'Pillars' },
  { id: 'growth', label: 'Become Better', icon: Sparkles, section: 'Pillars' },

  { id: 'analytics', label: 'Analytics', icon: BarChart3, section: 'Insights' },
  { id: 'achievements', label: 'Achievements', icon: Award, section: 'Insights' },
  { id: 'reviews', label: 'Weekly & Monthly', icon: ClipboardList, section: 'Insights' },
  { id: 'goals', label: '90-Day Goals', icon: Target, section: 'Insights' },
  { id: 'ideas', label: 'Winter Arc Ideas', icon: Lightbulb, section: 'Insights' },
  { id: 'settings', label: 'Settings', icon: Settings, section: 'System' },
];

export function Sidebar({ currentView, setCurrentView, isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const sections = ['Core', 'Pillars', 'Insights', 'System'];

  const handleSelect = (id) => {
    setCurrentView(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-[#0B0E14] border-r border-white/10 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 flex-shrink-0">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-white text-base tracking-wider leading-none">
                  WINTER ARC
                </span>
                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest mt-0.5">
                  90-DAY OS
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Flame className="w-5 h-5 text-white" />
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Link List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          {sections.map((section) => {
            const items = NAV_ITEMS.filter((i) => i.section === section);
            return (
              <div key={section} className="space-y-1">
                {!isCollapsed && (
                  <div className="px-3 pb-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
                    {section}
                  </div>
                )}
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                      } ${isCollapsed ? 'justify-center px-2' : 'justify-between'}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isCollapsed && item.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md font-semibold tracking-wider uppercase ${
                            isActive
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="p-3.5 border-t border-white/10 bg-black/40">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-slate-200 truncate">
                  “No Excuses. Build Yourself.”
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Day 1 → Day 90</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
