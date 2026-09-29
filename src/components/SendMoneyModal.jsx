import { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Download,
  AlertCircle
} from 'lucide-react';
import { formatCurrency, fireConfetti } from '../utils/formatters';

export default function SendMoneyModal({
  isOpen,
  onClose,
  contacts,
  cards,
  totalBalance,
  currency,
  onSendSuccess,
  prefilledContact = null
}) {
  const [selectedContact, setSelectedContact] = useState(prefilledContact || contacts[0]);
  const [customRecipient, setCustomRecipient] = useState('');
  const [amount, setAmount] = useState('100');
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || 'card-1');
  const [category, setCategory] = useState('Transfer');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const quickAmounts = ['25', '50', '100', '250', '500'];
  const categories = ['Transfer', 'Dining & Food', 'Rent & Housing', 'Gift & Family', 'Services & Work'];

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const handleSend = (e) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    if (selectedCard.isFrozen) {
      setError(`Cannot send funds: ${selectedCard.name} is currently frozen. Please unfreeze it first.`);
      return;
    }

    if (numAmount > totalBalance) {
      setError(`Insufficient funds. Your total balance is ${formatCurrency(totalBalance, currency)}.`);
      return;
    }

    setIsProcessing(true);

    // Simulate instant secure blockchain/banking transfer
    setTimeout(() => {
      setIsProcessing(false);
      const recipientName = customRecipient.trim() || selectedContact?.name || 'Authorized Recipient';
      const txnRef = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const newTransaction = {
        id: `tx-${Date.now()}`,
        merchant: `Transfer to ${recipientName}`,
        category: category,
        date: new Date().toISOString(),
        displayDate: 'Just now',
        amount: -numAmount,
        type: 'expense',
        status: 'Completed',
        card: `${selectedCard.name} (•••• ${selectedCard.last4})`,
        cardId: selectedCard.id,
        icon: 'transfer',
        color: 'mint',
        ref: txnRef,
        note: note || `Instant transfer to ${recipientName}`
      };

      setSuccessReceipt({
        recipient: recipientName,
        amount: numAmount,
        card: selectedCard.name,
        ref: txnRef,
        date: new Date().toLocaleString(),
        note: note || 'Instant peer-to-peer transfer'
      });

      fireConfetti();
      onSendSuccess(newTransaction, numAmount);
    }, 900);
  };

  const handleDownloadReceipt = () => {
    if (!successReceipt) return;
    const content = `================================================
AURA FINANCIAL TECHNOLOGIES - TRANSFER RECEIPT
================================================
Transaction Reference: ${successReceipt.ref}
Date & Time:           ${successReceipt.date}
Recipient:             ${successReceipt.recipient}
Amount Sent:           ${formatCurrency(successReceipt.amount, currency)} (${currency.code})
Payment Method:        ${successReceipt.card}
Category:              ${category}
Status:                SETTLED & CONFIRMED
Note:                  ${successReceipt.note}
================================================
Thank you for using Aura Private Banking.
Member FDIC & Equal Housing Lender.
================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${successReceipt.ref}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setSuccessReceipt(null);
    setIsProcessing(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-modal-pop">
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#12221d] rounded-3xl border border-zinc-200 dark:border-emerald-800/40 shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-zinc-100 dark:border-emerald-900/30 flex items-center justify-between bg-zinc-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-[#b4ea6c] flex items-center justify-center">
              <Send size={16} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">
                {successReceipt ? 'Transfer Confirmed' : 'Send Money'}
              </h3>
              <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">
                {successReceipt ? 'Transaction Settled Instantly' : 'Instant 0% fee peer transfer'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Success Receipt State */}
        {successReceipt ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-[#b4ea6c] flex items-center justify-center animate-pulse-subtle">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-[#b4ea6c]">
                Payment Successful
              </p>
              <h2 className="text-3xl font-heading font-extrabold text-zinc-900 dark:text-white mt-1">
                {formatCurrency(successReceipt.amount, currency)}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-emerald-200/70 mt-1">
                Transferred to <b className="text-zinc-800 dark:text-white">{successReceipt.recipient}</b>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/40 text-left space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400 dark:text-emerald-400/60">Reference:</span>
                <span className="font-mono font-medium text-zinc-700 dark:text-zinc-200">{successReceipt.ref}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 dark:text-emerald-400/60">Payment Method:</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-200">{successReceipt.card}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 dark:text-emerald-400/60">Date & Time:</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-200">{successReceipt.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-300 dark:border-emerald-800/60 hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-colors"
              >
                <Download size={15} />
                <span>Save Receipt</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] text-xs font-bold transition-all shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSend} className="p-6 space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Recipient Picker */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Select Recipient
              </label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {contacts.map((c) => {
                  const isSelected = !customRecipient && selectedContact?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedContact(c);
                        setCustomRecipient('');
                      }}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/50 ring-2 ring-emerald-500/20'
                          : 'border-zinc-200 dark:border-emerald-900/40 hover:bg-zinc-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                        {c.initials}
                      </div>
                      <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300 truncate w-full text-center">
                        {c.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                placeholder="Or type name, handle (@username) or IBAN..."
                value={customRecipient}
                onChange={(e) => setCustomRecipient(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Amount input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Amount ({currency.code})
                </label>
                <span className="text-[11px] text-zinc-400 dark:text-emerald-400/70">
                  Available: {formatCurrency(totalBalance, currency)}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-xl text-zinc-400 dark:text-emerald-300">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  step="any"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-emerald-900/50 bg-zinc-50 dark:bg-[#0c1a16] text-2xl font-bold font-heading text-zinc-900 dark:text-white focus:outline-none focus:border-[#10b981] dark:focus:border-[#b4ea6c]"
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex items-center gap-2 mt-2">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      amount === q
                        ? 'bg-emerald-600 text-white border-emerald-600 dark:bg-[#b4ea6c] dark:text-[#112d26] dark:border-[#b4ea6c]'
                        : 'border-zinc-200 dark:border-emerald-900/50 bg-white dark:bg-[#142620] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5'
                    }`}
                  >
                    +${q}
                  </button>
                ))}
              </div>
            </div>

            {/* Pay From Card Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Pay From Account / Card
              </label>
              <select
                value={selectedCardId}
                onChange={(e) => setSelectedCardId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                {cards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.name} (•••• {card.last4}) - {formatCurrency(card.balance, currency)} {card.isFrozen ? '[FROZEN]' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Category and Note */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Reference Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dinner split, Rent..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#17483c] to-[#0e342a] dark:from-[#b4ea6c] dark:to-[#cff78d] text-white dark:text-[#112d26] font-bold text-sm shadow-lg shadow-emerald-950/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Securing & Transferring...</span>
                </>
              ) : (
                <>
                  <span>Send {formatCurrency(parseFloat(amount) || 0, currency)} Now</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
