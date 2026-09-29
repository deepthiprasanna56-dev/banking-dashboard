import { useState } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShoppingBag, 
  Tv, 
  UtensilsCrossed, 
  Car, 
  Receipt, 
  ChevronRight,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { formatCurrency, exportTransactionsToCSV } from '../utils/formatters';

export default function TransactionsTab({
  transactions,
  currency,
  onSelectTransaction,
  onOpenAddTransaction,
  onExportSuccess
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'income' | 'expense'
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'amount-high' | 'amount-low'

  const categories = ['All', 'Groceries', 'Restaurants', 'Entertainment', 'Transport', 'Utilities', 'Shopping', 'Health', 'Income'];

  // Filter & Search
  let filtered = transactions.filter((t) => {
    const matchesSearch = 
      t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.ref && t.ref.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.note && t.note.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesType = selectedType === 'all' || t.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount-high') return Math.abs(b.amount) - Math.abs(a.amount);
    if (sortBy === 'amount-low') return Math.abs(a.amount) - Math.abs(b.amount);
    return 0;
  });

  // Summaries
  const totalInflow = filtered.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const totalOutflow = filtered.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const netFlow = totalInflow - totalOutflow;

  const handleExportCSV = () => {
    const success = exportTransactionsToCSV(filtered, `Aura_Transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    if (success && onExportSuccess) {
      onExportSuccess(filtered.length);
    }
  };

  const getTxIcon = (category) => {
    switch (category) {
      case 'Groceries':
        return <ShoppingBag size={16} className="text-emerald-600 dark:text-[#b4ea6c]" />;
      case 'Entertainment':
        return <Tv size={16} className="text-rose-500" />;
      case 'Restaurants':
      case 'Dining':
        return <UtensilsCrossed size={16} className="text-amber-500" />;
      case 'Income':
        return <ArrowDownLeft size={16} className="text-emerald-500" />;
      case 'Transport':
        return <Car size={16} className="text-sky-500" />;
      default:
        return <Receipt size={16} className="text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-900 dark:text-white">
            Transactions Explorer
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-emerald-200/70 mt-1">
            Real-time auditable electronic ledger with categorization and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-emerald-800/40 bg-white dark:bg-[#142620] hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-all shadow-xs"
            title="Download CSV export"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAddTransaction}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] text-xs font-bold transition-all shadow-md active:scale-98"
          >
            <Plus size={15} />
            <span>Record Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-zinc-400 dark:text-emerald-400/70">Filtered Inflow</p>
            <p className="text-lg font-heading font-extrabold text-emerald-600 dark:text-[#b4ea6c]">
              +{formatCurrency(totalInflow, currency)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-[#b4ea6c] flex items-center justify-center">
            <ArrowDownLeft size={18} />
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-zinc-400 dark:text-emerald-400/70">Filtered Outflow</p>
            <p className="text-lg font-heading font-extrabold text-zinc-900 dark:text-white">
              -{formatCurrency(totalOutflow, currency)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <ArrowUpRight size={18} />
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-zinc-400 dark:text-emerald-400/70">Net Cash Flow</p>
            <p className={`text-lg font-heading font-extrabold ${netFlow >= 0 ? 'text-emerald-600 dark:text-[#b4ea6c]' : 'text-rose-600'}`}>
              {formatCurrency(netFlow, currency)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <SlidersHorizontal size={18} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by merchant, category, ref ID, or note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Type selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-700 dark:text-zinc-200 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="expense">Expenses Only</option>
              <option value="income">Income Only</option>
            </select>

            {/* Sort selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-700 dark:text-zinc-200 focus:outline-none"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#17483c] dark:bg-[#b4ea6c] text-white dark:text-[#112d26] font-bold shadow-xs'
                  : 'bg-zinc-100 dark:bg-[#142821] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List / Table */}
      <div className="glass-panel overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 dark:text-emerald-400/50 space-y-2">
            <Search size={36} className="mx-auto opacity-30" />
            <p className="text-sm font-semibold">No transactions matched your filters.</p>
            <p className="text-xs">Try clearing the search query or selecting "All" categories.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-emerald-900/20">
            {filtered.map((tx) => (
              <div
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-zinc-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#152a22] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getTxIcon(tx.category)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                      {tx.merchant}
                    </p>
                    <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60 truncate flex items-center gap-1.5">
                      <span>{tx.category}</span>
                      <span>•</span>
                      <span>{tx.card}</span>
                      <span>•</span>
                      <span>{tx.displayDate || tx.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className={`text-xs sm:text-sm font-heading font-extrabold ${
                      tx.amount > 0 ? 'text-emerald-600 dark:text-[#b4ea6c]' : 'text-zinc-900 dark:text-white'
                    }`}>
                      {formatCurrency(tx.amount, currency)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-[#b4ea6c] font-medium">
                      <CheckCircle2 size={11} />
                      <span>{tx.status}</span>
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-300 dark:text-emerald-900 group-hover:text-emerald-600 dark:group-hover:text-[#b4ea6c] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
