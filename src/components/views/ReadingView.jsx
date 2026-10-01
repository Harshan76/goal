import React, { useState } from 'react';
import { useWinterArc } from '../../context/WinterArcContext';
import { Book, Plus, CheckCircle, Flame, Star, BookOpen, Layers } from 'lucide-react';

export function ReadingView() {
  const { currentDay, currentDayData, readingData, addBook, updateBookProgress, updateDayMetrics, toggleHabit, stats } = useWinterArc();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newTotalPages, setNewTotalPages] = useState('300');

  const handleCreateBook = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addBook({
      title: newTitle.trim(),
      author: newAuthor.trim() || 'Unknown',
      totalPages: Number(newTotalPages) || 250,
      status: 'reading',
    });
    setNewTitle('');
    setNewAuthor('');
    setShowAddModal(false);
  };

  const completedBooks = readingData.books.filter((b) => b.status === 'completed');
  const activeBooks = readingData.books.filter((b) => b.status === 'reading');
  const totalPagesRead = readingData.books.reduce((acc, b) => acc + (b.pagesRead || 0), 0);

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. HERO BANNER */}
      <div className="arc-card rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                LITERATURE & INTELLECTUAL EXPANSION
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              READING HUB
            </h1>
            <p className="text-slate-400 text-sm">
              Daily Target: <strong className="text-emerald-300 font-mono">20–30 MINUTES / DAY</strong>. Read high-leverage non-fiction, computer science classics, and mental models.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-display font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" /> Add New Book
          </button>
        </div>

        {/* 3 Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3 border-t border-white/5">
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Book className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Books Completed</span>
              <div className="text-xl font-display font-black text-white">{completedBooks.length} Books</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Pages Read</span>
              <div className="text-xl font-display font-black text-white">{totalPagesRead} Pages</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Reading Streak</span>
              <div className="text-xl font-display font-black text-orange-400">{stats.currentStreak} Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S READING SESSION LOG */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            DAY {currentDay} READING LOG
          </h3>
          <span className="text-xs font-mono text-emerald-400">
            {currentDayData.habits.reading ? 'Daily Reading Done ✅' : 'Pending ⏳'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
            <label className="text-xs font-mono text-slate-400">Book Currently Reading</label>
            <input
              type="text"
              value={currentDayData.metrics.readingBook || 'Deep Work'}
              onChange={(e) => updateDayMetrics(currentDay, { readingBook: e.target.value })}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs text-white"
            />
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
            <label className="text-xs font-mono text-slate-400">Minutes Read Today</label>
            <input
              type="number"
              value={currentDayData.metrics.readingMinutes || 30}
              onChange={(e) => updateDayMetrics(currentDay, { readingMinutes: Number(e.target.value) })}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2 text-xs font-bold text-white"
            />
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-end">
            <button
              onClick={() => toggleHabit(currentDay, 'reading')}
              className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                currentDayData.habits.reading
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {currentDayData.habits.reading ? 'Reading Habit Checked ✅' : 'Check Off 30m Reading'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE BOOK SHELF */}
      <div className="arc-card rounded-3xl p-6 space-y-4">
        <h3 className="font-display font-extrabold text-white text-base uppercase tracking-wide">
          ACTIVE READING SHELF ({activeBooks.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeBooks.map((book) => {
            const pct = Math.min(100, Math.round((book.pagesRead / book.totalPages) * 100));
            return (
              <div key={book.id} className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{book.title}</h4>
                    <span className="text-xs text-slate-400 font-medium">by {book.author}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">{pct}%</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>{book.pagesRead} / {book.totalPages} Pages</span>
                    <span>{book.totalPages - book.pagesRead} pages left</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-400">Update Pages:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateBookProgress(book.id, (book.pagesRead || 0) + 15)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 text-xs font-mono border border-white/10"
                    >
                      +15 Pages
                    </button>
                    <button
                      onClick={() => updateBookProgress(book.id, (book.pagesRead || 0) + 30)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 text-xs font-mono border border-white/10"
                    >
                      +30 Pages
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F131C] border border-white/10 rounded-3xl p-6 space-y-4 animate-fadeIn">
            <h3 className="font-display font-black text-white text-lg">Add Book to Shelf</h3>
            <form onSubmit={handleCreateBook} className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400">Book Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Can't Hurt Me"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Author</label>
                <input
                  type="text"
                  placeholder="e.g. David Goggins"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Total Pages</label>
                <input
                  type="number"
                  value={newTotalPages}
                  onChange={(e) => setNewTotalPages(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
