import React from 'react';
import { LayoutDashboard, CheckCircle, CalendarDays, BookOpen, User } from 'lucide-react';

export function MobileNav({ currentView, setCurrentView }) {
  const quickTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'today', label: 'Today', icon: CheckCircle },
    { id: 'calendar', label: '90 Days', icon: CalendarDays },
    { id: 'gate', label: 'GATE', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0D13]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl shadow-black">
      {quickTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentView(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-cyan-400' : ''}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
