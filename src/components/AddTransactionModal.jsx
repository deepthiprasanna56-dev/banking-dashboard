import { useState } from 'react';
import { X, PlusCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function AddTransactionModal({
  isOpen,
  onClose,
  cards,
  onAddTransaction,
  currency
}) {
  const [type, setType] = useState('expense');
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [cardId, setCardId] = useState(cards[0]?.id || 'card-1');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const categories = [
    'Groceries',
    'Restaurants',
    'Shopping',
    'Transport',
    'Entertainment',
    'Utilities',
    'Health',
    'Income',
    'Investment',
    'General'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const selectedCard = cards.find(c => c.id === cardId) || cards[0];
    const finalAmount = type === 'expense' ? -numAmount : numAmount;

    const newTx = {
      id: `tx-${Date.now()}`,
      merchant: merchant.trim() || (type === 'income' ? 'Income Deposit' : 'Expense'),
      category: category,
      date: new Date().toISOString(),
      displayDate: 'Today, Just now',
      amount: finalAmount,
      type: type,
      status: 'Completed',
      card: `${selectedCard.name} (•••• ${selectedCard.last4})`,
      cardId: selectedCard.id,
      icon: type === 'income' ? 'down' : 'basket',
      color: type === 'income' ? 'lime' : 'peach',
      ref: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      note: note || (type === 'income' ? 'Direct credit' : 'Manual purchase entry')
    };

    onAddTransaction(newTx, finalAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-modal-pop">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#12221d] rounded-3xl border border-zinc-200 dark:border-emerald-800/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4.5 border-b border-zinc-100 dark:border-emerald-900/30 flex items-center justify-between bg-zinc-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-[#b4ea6c] flex items-center justify-center">
              <PlusCircle size={16} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">Record Transaction</h3>
              <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">Manual income or spending entry</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Income vs Expense Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-zinc-100 dark:bg-[#0c1a16] border border-zinc-200 dark:border-emerald-900/40">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                type === 'expense'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <ArrowUpRight size={14} />
              <span>Expense / Spend</span>
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                type === 'income'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <ArrowDownLeft size={14} />
              <span>Income / Credit</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Merchant / Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Trader Joe's, Client Invoice..."
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Amount ({currency.code})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                {currency.symbol}
              </span>
              <input
                type="number"
                step="any"
                min="0.01"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-base font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Account / Card</label>
              <select
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                {cards.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} (•••• {c.last4})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Note</label>
            <input
              type="text"
              placeholder="Optional notes or tag..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Record Entry</span>
          </button>
        </form>
      </div>
    </div>
  );
}
