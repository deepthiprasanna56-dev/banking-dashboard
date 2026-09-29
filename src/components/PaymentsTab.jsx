import { useState } from 'react';
import { 
  Send, 
  Receipt, 
  CheckCircle2, 
  Zap, 
  Wifi, 
  Shield, 
  Copy, 
  Check 
} from 'lucide-react';
import { formatCurrency, copyToClipboard } from '../utils/formatters';

export default function PaymentsTab({
  bills,
  onPayBill,
  contacts,
  onOpenSendMoney,
  onOpenSendMoneyWithContact,
  currency,
  user
}) {
  const [activeSubTab, setActiveSubTab] = useState('bills'); // 'bills' | 'request' | 'send'
  const [requestAmount, setRequestAmount] = useState('75.00');
  const [copiedLink, setCopiedLink] = useState(false);

  const getBillIcon = (cat) => {
    switch (cat) {
      case 'Utilities':
        return <Zap size={18} className="text-amber-500" />;
      case 'Internet':
        return <Wifi size={18} className="text-sky-500" />;
      case 'Insurance':
        return <Shield size={18} className="text-emerald-500" />;
      default:
        return <Receipt size={18} className="text-purple-500" />;
    }
  };

  const handleCopyPaymentLink = async () => {
    await copyToClipboard(`https://aura.bank/pay/${user.email.split('@')[0]}?amount=${requestAmount}&cur=${currency.code}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-900 dark:text-white">
            Payments & Transfers
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-emerald-200/70 mt-1">
            Global wire transfers, automated utility settlements, and instant peer payment requests.
          </p>
        </div>

        {/* Sub-tab Pill Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-zinc-100 dark:bg-[#0c1a16] border border-zinc-200 dark:border-emerald-900/40 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('bills')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === 'bills'
                ? 'bg-white dark:bg-[#18362d] text-zinc-900 dark:text-[#b4ea6c] shadow-xs'
                : 'text-zinc-500 dark:text-emerald-400/70 hover:text-zinc-800'
            }`}
          >
            Pay Bills ({bills.filter(b => b.status === 'unpaid').length})
          </button>
          <button
            onClick={() => setActiveSubTab('send')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === 'send'
                ? 'bg-white dark:bg-[#18362d] text-zinc-900 dark:text-[#b4ea6c] shadow-xs'
                : 'text-zinc-500 dark:text-emerald-400/70 hover:text-zinc-800'
            }`}
          >
            Peer Transfer
          </button>
          <button
            onClick={() => setActiveSubTab('request')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeSubTab === 'request'
                ? 'bg-white dark:bg-[#18362d] text-zinc-900 dark:text-[#b4ea6c] shadow-xs'
                : 'text-zinc-500 dark:text-emerald-400/70 hover:text-zinc-800'
            }`}
          >
            Request & QR
          </button>
        </div>
      </div>

      {/* Subtab 1: Pay Bills */}
      {activeSubTab === 'bills' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bills.map((bill) => {
              const isPaid = bill.status === 'paid';
              return (
                <div
                  key={bill.id}
                  className={`glass-panel p-5 flex flex-col justify-between transition-all ${
                    isPaid ? 'opacity-65' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-[#162c24] flex items-center justify-center">
                        {getBillIcon(bill.category)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                          {bill.title}
                        </h4>
                        <span className="text-[11px] text-zinc-400 dark:text-emerald-400/60">
                          {bill.category} • Due: {bill.dueDate}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      isPaid
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-[#b4ea6c]'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                    }`}>
                      {isPaid ? 'Settled' : `${bill.daysLeft} days left`}
                    </span>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-emerald-900/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Statement Amount</span>
                      <span className="text-lg font-heading font-extrabold text-zinc-900 dark:text-white">
                        {formatCurrency(bill.amount, currency)}
                      </span>
                    </div>

                    {isPaid ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-[#b4ea6c]">
                        <CheckCircle2 size={16} />
                        <span>Paid & Cleared</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onPayBill(bill)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] text-xs font-bold transition-all shadow-md active:scale-98"
                      >
                        <Zap size={14} />
                        <span>Pay Bill Now</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 2: Peer Transfer */}
      {activeSubTab === 'send' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 glass-panel p-6 sm:p-7 space-y-6">
            <div>
              <h3 className="font-heading font-bold text-lg text-zinc-900 dark:text-white">
                Send Money Instantly
              </h3>
              <p className="text-xs text-zinc-500 dark:text-emerald-200/70 mt-1">
                Zero fees, instant settlement across all domestic and international Aura accounts.
              </p>
            </div>

            {/* Contacts Grid */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                Saved Payees & Beneficiaries
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => onOpenSendMoneyWithContact(contact)}
                    className="p-3.5 rounded-2xl border border-zinc-200 dark:border-emerald-900/40 hover:border-emerald-500 dark:hover:border-[#b4ea6c] hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-left transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                      {contact.initials}
                    </div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{contact.name}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{contact.bank}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenSendMoney()}
              className="w-full py-3.5 px-4 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Send size={15} />
              <span>Launch Transfer Modal</span>
            </button>
          </div>

          <div className="lg:col-span-5 glass-panel p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white mb-2">
                Transfer Protection
              </h3>
              <p className="text-xs text-zinc-500 dark:text-emerald-200/70 leading-relaxed mb-4">
                Every transaction processed via Apex Bank utilizes 256-bit AES cryptographic encryption with end-to-end FDIC assurance up to $2,500,000.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/40 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Domestic Settlement:</span>
                <span className="font-bold text-emerald-600 dark:text-[#b4ea6c]">Real-Time (Under 3s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Network Fee:</span>
                <span className="font-bold text-emerald-600 dark:text-[#b4ea6c]">$0.00 (Zero)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Routing Number:</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-200">021000021</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Request & QR */}
      {activeSubTab === 'request' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Code generator */}
          <div className="glass-panel p-6 sm:p-8 flex flex-col items-center text-center">
            <h3 className="font-heading font-bold text-lg text-zinc-900 dark:text-white mb-1">
              Personal Scan-to-Pay QR
            </h3>
            <p className="text-xs text-zinc-400 dark:text-emerald-400/60 mb-6">
              Friends can scan this code with their smartphone camera to pay you directly.
            </p>

            {/* SVG Rendered QR Code */}
            <div className="w-52 h-52 p-4 rounded-3xl bg-white shadow-xl border-4 border-emerald-500/20 flex items-center justify-center mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* QR Pattern Representation */}
                <rect x="0" y="0" width="100" height="100" fill="white" />
                {/* Corners */}
                <rect x="5" y="5" width="25" height="25" fill="#112d26" rx="4" />
                <rect x="9" y="9" width="17" height="17" fill="white" rx="2" />
                <rect x="13" y="13" width="9" height="9" fill="#112d26" rx="1" />

                <rect x="70" y="5" width="25" height="25" fill="#112d26" rx="4" />
                <rect x="74" y="9" width="17" height="17" fill="white" rx="2" />
                <rect x="78" y="13" width="9" height="9" fill="#112d26" rx="1" />

                <rect x="5" y="70" width="25" height="25" fill="#112d26" rx="4" />
                <rect x="9" y="74" width="17" height="17" fill="white" rx="2" />
                <rect x="13" y="78" width="9" height="9" fill="#112d26" rx="1" />

                {/* Data points */}
                <rect x="36" y="8" width="8" height="8" fill="#112d26" />
                <rect x="50" y="8" width="8" height="8" fill="#112d26" />
                <rect x="36" y="22" width="12" height="6" fill="#112d26" />
                <rect x="8" y="38" width="10" height="8" fill="#112d26" />
                <rect x="24" y="38" width="8" height="12" fill="#112d26" />
                <rect x="38" y="38" width="24" height="24" fill="#10b981" rx="4" />
                <rect x="68" y="38" width="8" height="8" fill="#112d26" />
                <rect x="82" y="38" width="10" height="14" fill="#112d26" />
                <rect x="36" y="70" width="8" height="12" fill="#112d26" />
                <rect x="50" y="70" width="14" height="8" fill="#112d26" />
                <rect x="70" y="70" width="12" height="12" fill="#112d26" />
                <rect x="88" y="70" width="6" height="20" fill="#112d26" />
              </svg>
            </div>

            <p className="font-heading font-extrabold text-sm text-zinc-800 dark:text-zinc-100">
              Alex Carter
            </p>
            <p className="text-xs text-zinc-400 font-mono">@alex_carter • Aura Instant</p>
          </div>

          {/* Payment Link Generator */}
          <div className="glass-panel p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-zinc-900 dark:text-white mb-2">
                Create Shareable Payment Link
              </h3>
              <p className="text-xs text-zinc-500 dark:text-emerald-200/70 mb-5">
                Set a specific request amount to generate a pre-filled instant checkout link.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Requested Amount ({currency.code})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                      {currency.symbol}
                    </span>
                    <input
                      type="number"
                      step="any"
                      min="1"
                      value={requestAmount}
                      onChange={(e) => setRequestAmount(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-base font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/40">
                  <span className="text-[10px] text-zinc-400 block mb-1">Generated Payment URL</span>
                  <div className="font-mono text-xs text-emerald-600 dark:text-[#b4ea6c] truncate">
                    https://aura.bank/pay/alex?amount={requestAmount}&cur={currency.code}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyPaymentLink}
              className="w-full mt-6 py-3 px-4 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {copiedLink ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Payment Link'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
