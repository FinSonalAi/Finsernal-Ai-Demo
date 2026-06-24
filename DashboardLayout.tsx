
import { ReactNode } from 'react';
import { Trash2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  onReset: () => void;
  viewTitles: Record<string, string>;
}

export default function DashboardLayout({
  children,
  currentView,
  onViewChange,
  onReset,
  viewTitles
}: DashboardLayoutProps) {
  const views = ['dashboard', 'income', 'expenses', 'budgets', 'savings', 'ai-coach'] as const;
  const viewIcons: Record<string, string> = {
    dashboard: '📊',
    income: '💰',
    expenses: '💳',
    budgets: '⚙️',
    savings: '🎯',
    'ai-coach': '🤖'
  };

  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen flex flex-col md:flex-row overflow-x-hidden pb-20 md:pb-0">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 px-4 py-4 w-full sticky top-0 z-30">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-emerald-500 rounded flex items-center justify-center font-black text-slate-950">F</div>
          <span className="text-xl font-bold tracking-wider text-white">finsernal ai</span>
        </div>
        <button onClick={onReset} className="text-xs font-extrabold bg-slate-950 border border-slate-800 text-rose-400 py-2 px-3 rounded-lg transition active:bg-rose-950/40">
          Reset Sandbox
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col justify-between h-screen fixed left-0 top-0 z-20">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="h-9 w-9 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-xl text-slate-950">F</div>
            <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">finsernal ai</span>
          </div>
          <nav className="space-y-1.5">
            {views.map((view) => (
              <button
                key={view}
                id={`nav-target-${view}`}
                onClick={() => onViewChange(view)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  currentView === view
                    ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>{viewIcons[view]}</span>
                <span>
                  {view === 'dashboard' && 'Dashboard'}
                  {view === 'income' && 'Income Inflow'}
                  {view === 'expenses' && 'Outflow Ledger'}
                  {view === 'budgets' && 'Budget Guardrails'}
                  {view === 'savings' && 'Capital Sinks'}
                  {view === 'ai-coach' && 'AI Wealth Coach'}
                </span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-800">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Unlimited Trial Mode</p>
            <p className="text-[10px] text-slate-400 mt-1">Interactive Systems Guide Active</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 w-full min-h-screen overflow-y-auto">
        {/* Desktop Header */}
        <header className="hidden md:flex h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{viewTitles[currentView]}</h2>
          <div className="flex items-center space-x-3">
            <button onClick={onReset} className="flex items-center space-x-1 bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-xs text-slate-400 hover:text-rose-400 py-2 px-3 rounded-lg transition">
              <Trash2 className="w-4 h-4" />
              <span>Purge Sandbox</span>
            </button>
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 py-1.5 px-4 rounded-full">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-300 font-medium tracking-wide">Sandbox Engine Online</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-8 space-y-8 w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
