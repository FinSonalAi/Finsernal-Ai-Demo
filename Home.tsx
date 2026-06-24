import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useExitIntent } from '@/hooks/useExitIntent';
import DashboardLayout from '@/components/DashboardLayout';
import { ChevronRight, Sparkles, Zap, TrendingUp, PieChart, BarChart3 } from 'lucide-react';

interface Income {
  id: string;
  amount: number;
  source: string;
  date: string;
}

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  notes: string;
}

interface Budget {
  id: string;
  category: string;
  amount: number;
}

interface Savings {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

const INITIAL_DASHBOARD_INCOMES: Income[] = [
  { id: 'inc-demo-1', amount: 95000, source: 'Core Tech Contract MRR', date: '2026-06-01' }
];

const INITIAL_DASHBOARD_EXPENSES: Expense[] = [
  { id: 'exp-demo-1', amount: 8400, category: 'Food', date: '2026-06-02', notes: 'Dietary supplies' },
  { id: 'exp-demo-2', amount: 26000, category: 'Bills', date: '2026-06-03', notes: 'Production server scaling architecture' },
  { id: 'exp-demo-3', amount: 14000, category: 'Shopping', date: '2026-06-04', notes: 'Mechanical peripherals' },
  { id: 'exp-demo-4', amount: 3800, category: 'Transport', date: '2026-06-05', notes: 'Express highway logistics' }
];

const INITIAL_DASHBOARD_BUDGETS: Budget[] = [
  { id: 'bud-demo-1', category: 'Food', amount: 12000 },
  { id: 'bud-demo-2', category: 'Bills', amount: 25000 },
  { id: 'bud-demo-3', category: 'Shopping', amount: 15000 },
  { id: 'bud-demo-4', category: 'Transport', amount: 5000 }
];

const INITIAL_DASHBOARD_SAVINGS: Savings[] = [
  { id: 'sav-demo-1', name: 'Operational 6-Month Runway Pool', targetAmount: 400000, currentAmount: 145000, targetDate: '2026-12-31' }
];

export default function Home() {
  // Activate exit intent detection
  useExitIntent();
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'income' | 'expenses' | 'budgets' | 'savings' | 'ai-coach'>('dashboard');
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [savings, setSavings] = useState<Savings[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const chatScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resetToken = localStorage.getItem('finsernal_manual_reset_fired');
    
    if (resetToken === 'true') {
      setIncomes([]);
      setExpenses([]);
      setBudgets([]);
      setSavings([]);
      setCurrentOnboardingStep(2);
    } else {
      setIncomes(JSON.parse(JSON.stringify(INITIAL_DASHBOARD_INCOMES)));
      setExpenses(JSON.parse(JSON.stringify(INITIAL_DASHBOARD_EXPENSES)));
      setBudgets(JSON.parse(JSON.stringify(INITIAL_DASHBOARD_BUDGETS)));
      setSavings(JSON.parse(JSON.stringify(INITIAL_DASHBOARD_SAVINGS)));
    }

    initializeDefaultChatFrame();
  }, []);

  useEffect(() => {
    if (chatScrollerRef.current) {
      chatScrollerRef.current.scrollTop = chatScrollerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const initializeDefaultChatFrame = () => {
    setChatMessages([
      {
        role: 'ai',
        text: 'Hello! I am your finsernal ai Strategic Wealth Planner. I have ingested your pre-loaded sandbox matrix. Ask me how to optimize your runway metrics!'
      }
    ]);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'ai',
        text: '<strong>Sandbox Evaluation Insight:</strong> Based on your test balance matrix, your current retained liquidity surplus is highly optimized.<br><br><a href="https://imjo.in/rHCt6C" target="_blank" class="mt-1 inline-block bg-gradient-to-r from-emerald-400 to-teal-500 font-extrabold text-[11px] text-slate-950 px-3 py-1.5 rounded shadow transition uppercase tracking-wide">Activate Premium Coach Node (₹99)</a>'
      }]);
    }, 600);
  };

  const handleReset = () => {
    localStorage.setItem('finsernal_manual_reset_fired', 'true');
    setIncomes([]);
    setExpenses([]);
    setBudgets([]);
    setSavings([]);
    setCurrentOnboardingStep(2);
  };

  const totalBalance = incomes.reduce((sum, inc) => sum + inc.amount, 0) - expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlySavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const viewTitles = {
    dashboard: 'Financial Control Room',
    income: 'Inflow Transactions Ledger',
    expenses: 'Outflow Matrix Controller',
    budgets: 'Budget Security Configuration',
    savings: 'Strategic Sinks Portfolio',
    'ai-coach': 'AI Financial Intelligence Coach'
  };

  const dashboardContent = (
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-5">
                <Card className="rounded-xl border border-slate-800 bg-slate-900 p-4 md:p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Balance</p>
                  <p className="text-lg md:text-2xl font-bold text-white">₹{totalBalance.toLocaleString()}</p>
                </Card>
                <Card className="rounded-xl border border-slate-800 bg-slate-900 p-4 md:p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Monthly Inflow</p>
                  <p className="text-lg md:text-2xl font-bold text-emerald-400">₹{totalIncome.toLocaleString()}</p>
                </Card>
                <Card className="rounded-xl border border-slate-800 bg-slate-900 p-4 md:p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Monthly Outflow</p>
                  <p className="text-lg md:text-2xl font-bold text-rose-400">₹{totalExpense.toLocaleString()}</p>
                </Card>
                <Card className="rounded-xl border border-slate-800 bg-slate-900 p-4 md:p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Monthly Savings</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-400">₹{monthlySavings.toLocaleString()}</p>
                </Card>
                <Card className="rounded-xl border border-slate-800 bg-slate-900 p-4 md:p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Savings Rate</p>
                  <p className="text-lg md:text-2xl font-bold text-white">{savingsRate.toFixed(1)}%</p>
                </Card>
                <Card className="rounded-xl border border-slate-800 bg-slate-900 p-4 md:p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Budget Used</p>
                  <p className="text-lg md:text-2xl font-bold text-white">0%</p>
                </Card>
              </div>

              {/* AI Insights Card */}
              <div className="border border-gradient-to-r from-emerald-500 to-blue-500 bg-slate-900 p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Live AI Insights Summary</h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400 uppercase">Daily Pulse</span>
                    </div>
                    <p className="text-xs text-slate-300">Sandbox parameters loaded. Capital concentration paths track heavily inside the Bills cluster segment.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-blue-400 uppercase">Weekly Forecast</span>
                    </div>
                    <p className="text-xs text-slate-300">Allocations match safe control parameters perfectly.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-bold text-purple-400 uppercase">Monthly Trend</span>
                    </div>
                    <p className="text-xs text-slate-300">Current savings rate anchors around {savingsRate.toFixed(1)}%. Core asset protection runway holds stable metrics.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Income View */}
          {currentView === 'income' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Income Sources</h3>
              {incomes.map(income => (
                <Card key={income.id} className="bg-slate-900 border border-slate-800 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-white">{income.source}</p>
                      <p className="text-xs text-slate-400">{income.date}</p>
                    </div>
                    <p className="text-lg font-bold text-emerald-400">₹{income.amount.toLocaleString()}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Expenses View */}
          {currentView === 'expenses' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Expenses</h3>
              {expenses.map(expense => (
                <Card key={expense.id} className="bg-slate-900 border border-slate-800 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-white">{expense.category}</p>
                      <p className="text-xs text-slate-400">{expense.notes}</p>
                      <p className="text-xs text-slate-500">{expense.date}</p>
                    </div>
                    <p className="text-lg font-bold text-rose-400">₹{expense.amount.toLocaleString()}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Budgets View */}
          {currentView === 'budgets' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Budget Guardrails</h3>
              {budgets.map(budget => (
                <Card key={budget.id} className="bg-slate-900 border border-slate-800 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-white">{budget.category}</p>
                    <p className="text-lg font-bold text-blue-400">₹{budget.amount.toLocaleString()}</p>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Savings View */}
          {currentView === 'savings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Capital Sinks</h3>
              {savings.map(saving => (
                <Card key={saving.id} className="bg-slate-900 border border-slate-800 p-4">
                  <div className="mb-3">
                    <p className="font-semibold text-white">{saving.name}</p>
                    <p className="text-xs text-slate-400">Target: {saving.targetDate}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-emerald-400 font-semibold">₹{saving.currentAmount.toLocaleString()} / ₹{saving.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full" 
                        style={{ width: `${(saving.currentAmount / saving.targetAmount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* AI Coach View */}
          {currentView === 'ai-coach' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-[500px] overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center bg-slate-900/40">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse mr-2"></div>
                  <h4 className="font-bold text-white text-sm">Autonomous Co-Pilot Planner</h4>
                </div>
                <div ref={chatScrollerRef} className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/40">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl text-xs max-w-[85%] ${
                        msg.role === 'user'
                          ? 'ml-auto text-emerald-400 bg-slate-900/60 border border-emerald-500/20'
                          : 'mr-auto text-slate-300 bg-slate-900 border border-slate-800'
                      }`}
                    >
                      <strong>{msg.role === 'user' ? 'Me: ' : 'AI Co-Pilot: '}</strong>
                      <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-slate-800 bg-slate-900/60">
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask your intelligence coach anything about your goals..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                    />
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-sm">
                      Query
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 z-40 flex justify-around items-center py-2.5 shadow-2xl">
        {(['dashboard', 'income', 'expenses', 'budgets', 'ai-coach'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`flex flex-col items-center text-center space-y-1 flex-1 ${
              currentView === view ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            {view === 'dashboard' && <LayoutDashboard className="w-5 h-5" />}
            {view === 'income' && <Wallet className="w-5 h-5" />}
            {view === 'expenses' && <CreditCard className="w-5 h-5" />}
            {view === 'budgets' && <Sliders className="w-5 h-5" />}
            {view === 'ai-coach' && <Bot className="w-5 h-5" />}
            <span className="text-[10px] font-medium">
              {view === 'dashboard' && 'Panel'}
              {view === 'income' && 'Inflow'}
              {view === 'expenses' && 'Outflow'}
              {view === 'budgets' && 'Limits'}
              {view === 'ai-coach' && 'Coach'}
            </span>
          </button>
        </div>
      </div>
    );

  return (
    <DashboardLayout
      currentView={currentView}
      onViewChange={setCurrentView}
      onReset={handleReset}
      viewTitles={viewTitles}
    >
      {dashboardContent}
    </DashboardLayout>
  );
        }
