import { X, Download, RefreshCw, CheckCircle, ShieldCheck, Tag, Calendar, CreditCard, FileText } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function TransactionDetailModal({
  transaction,
  isOpen,
  onClose,
  currency,
  onRepeatTransaction
}) {
  if (!isOpen || !transaction) return null;

  const isIncome = transaction.amount > 0;

  const handleDownload = () => {
    const text = `-----------------------------------------------
AURA FINANCIAL TECHNOLOGIES - DIGITAL RECEIPT
-----------------------------------------------
Transaction ID:  ${transaction.ref || transaction.id}
Date & Time:     ${transaction.displayDate || transaction.date}
Merchant/Entity: ${transaction.merchant}
Category:        ${transaction.category}
Amount:          ${formatCurrency(transaction.amount, currency)} (${currency.code})
Payment Method:  ${transaction.card}
Status:          ${transaction.status || 'Settled'}
Note:            ${transaction.note || 'None'}
-----------------------------------------------
Aura Private Banking - Instant Electronic Clearing
-----------------------------------------------`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${transaction.ref || transaction.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-modal-pop">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#12221d] rounded-3xl border border-zinc-200 dark:border-emerald-800/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-emerald-900/30 flex items-center justify-between bg-zinc-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-emerald-400">
            <ShieldCheck size={16} className="text-emerald-600 dark:text-[#b4ea6c]" />
            <span>Verified Digital Receipt</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <X size={18} />
          </button>
        </div>

        {/* Amount & Status banner */}
        <div className="p-6 text-center border-b border-zinc-100 dark:border-emerald-900/30 bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-emerald-950/10">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-100 dark:bg-[#18352b] flex items-center justify-center text-zinc-700 dark:text-emerald-200 font-bold mb-3 shadow-sm">
            <FileText size={24} />
          </div>
          <h3 className="font-heading font-bold text-lg text-zinc-900 dark:text-white">
            {transaction.merchant}
          </h3>
          <div className={`text-3xl font-heading font-extrabold my-2 ${
            isIncome ? 'text-emerald-600 dark:text-[#b4ea6c]' : 'text-zinc-900 dark:text-white'
          }`}>
            {formatCurrency(transaction.amount, currency)}
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            <CheckCircle size={12} />
            <span>{transaction.status || 'Completed'}</span>
          </span>
        </div>

        {/* Receipt Key-Value Rows */}
        <div className="p-6 space-y-3 text-xs">
          <div className="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-emerald-900/20">
            <span className="flex items-center gap-1.5 text-zinc-400 dark:text-emerald-400/70">
              <Calendar size={13} />
              <span>Timestamp</span>
            </span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{transaction.displayDate || transaction.date}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-emerald-900/20">
            <span className="flex items-center gap-1.5 text-zinc-400 dark:text-emerald-400/70">
              <Tag size={13} />
              <span>Category</span>
            </span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{transaction.category}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-emerald-900/20">
            <span className="flex items-center gap-1.5 text-zinc-400 dark:text-emerald-400/70">
              <CreditCard size={13} />
              <span>Account / Card</span>
            </span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{transaction.card}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-emerald-900/20">
            <span className="text-zinc-400 dark:text-emerald-400/70">Transaction Ref</span>
            <span className="font-mono text-zinc-700 dark:text-zinc-300">{transaction.ref || transaction.id}</span>
          </div>

          {transaction.note && (
            <div className="pt-1 text-zinc-500 dark:text-emerald-300/80 italic">
              "{transaction.note}"
            </div>
          )}
        </div>

        {/* Modal Buttons */}
        <div className="p-6 pt-0 flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-emerald-800/60 hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-colors"
          >
            <Download size={14} />
            <span>Save Receipt</span>
          </button>

          {!isIncome && (
            <button
              onClick={() => {
                onClose();
                onRepeatTransaction(transaction);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] text-xs font-bold transition-all shadow-md active:scale-98"
            >
              <RefreshCw size={13} />
              <span>Repeat Transfer</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
