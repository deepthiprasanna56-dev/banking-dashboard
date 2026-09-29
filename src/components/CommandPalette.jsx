import { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Send, 
  CreditCard, 
  PlusCircle, 
  Download, 
  Moon, 
  Sun, 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Settings 
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function CommandPalette({
  isOpen,
  onClose,
  setActiveTab,
  onOpenSendMoney,
  onOpenAddCard,
  onOpenAddTransaction,
  onExportCSV,
  isDark,
  setIsDark,
  transactions,
  currency,
  onSelectTransaction
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent will toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const standardActions = [
    { id: 'act-send', label: 'Send Money to contact or account', icon: Send, run: () => { onClose(); onOpenSendMoney(); } },
    { id: 'act-card', label: 'Issue a New Virtual or Physical Card', icon: CreditCard, run: () => { onClose(); onOpenAddCard(); } },
    { id: 'act-tx', label: 'Record Manual Transaction', icon: PlusCircle, run: () => { onClose(); onOpenAddTransaction(); } },
    { id: 'act-csv', label: 'Download Transaction Statement (.CSV)', icon: Download, run: () => { onClose(); onExportCSV(); } },
    { id: 'act-theme', label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`, icon: isDark ? Sun : Moon, run: () => { setIsDark(!isDark); onClose(); } },
    { id: 'nav-overview', label: 'Go to Overview Dashboard', icon: LayoutDashboard, run: () => { setActiveTab('Overview'); onClose(); } },
    { id: 'nav-tx', label: 'Go to Transactions Explorer', icon: ArrowLeftRight, run: () => { setActiveTab('Transactions'); onClose(); } },
    { id: 'nav-cards', label: 'Go to My Cards & Security', icon: CreditCard, run: () => { setActiveTab('Cards'); onClose(); } },
    { id: 'nav-insights', label: 'Go to Insights & Analytics', icon: PieChart, run: () => { setActiveTab('Insights'); onClose(); } },
    { id: 'nav-settings', label: 'Go to Settings & Profile', icon: Settings, run: () => { setActiveTab('Settings'); onClose(); } },
  ];

  // Filter actions & transactions matching search
  const filteredActions = standardActions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const matchedTransactions = query.trim().length > 1
    ? transactions.filter(t => 
        t.merchant.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-modal-pop">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#12221d] rounded-2xl border border-zinc-200 dark:border-emerald-800/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-emerald-900/30">
          <Search size={18} className="text-zinc-400 dark:text-emerald-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search transactions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {matchedTransactions.length > 0 && (
            <div className="mb-2">
              <p className="px-3 py-1 text-[10px] font-bold text-zinc-400 dark:text-emerald-400/60 uppercase tracking-wider">
                Matching Transactions
              </p>
              {matchedTransactions.map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => {
                    onSelectTransaction(tx);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors group"
                >
                  <div>
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">{tx.merchant}</p>
                    <p className="text-[10px] text-zinc-400">{tx.category} • {tx.displayDate}</p>
                  </div>
                  <span className={`text-xs font-bold ${tx.amount > 0 ? 'text-emerald-600 dark:text-[#b4ea6c]' : 'text-zinc-900 dark:text-white'}`}>
                    {formatCurrency(tx.amount, currency)}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div>
            <p className="px-3 py-1 text-[10px] font-bold text-zinc-400 dark:text-emerald-400/60 uppercase tracking-wider">
              Fast Commands & Pages
            </p>
            {filteredActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.run}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-900 dark:hover:text-[#b4ea6c] transition-colors group"
                >
                  <Icon size={16} className="text-zinc-400 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-[#b4ea6c]" />
                  <span className="flex-1 text-left">{action.label}</span>
                  <ArrowRight size={13} className="text-zinc-300 dark:text-emerald-900 group-hover:text-emerald-600 dark:group-hover:text-[#b4ea6c] transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-[#0c1a16] border-t border-zinc-100 dark:border-emerald-900/30 flex items-center justify-between text-[11px] text-zinc-400 dark:text-emerald-400/50">
          <span>Navigate with arrows</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
