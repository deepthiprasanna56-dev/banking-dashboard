import { useState } from 'react';
import { 
  Plus, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  RotateCw, 
  ShieldCheck, 
  Wifi, 
  Globe, 
  ShoppingBag, 
  Eye, 
  EyeOff,
  Award
} from 'lucide-react';
import { formatCurrency, copyToClipboard } from '../utils/formatters';

export default function CardsTab({
  cards,
  currency,
  onOpenAddCard,
  onToggleFreezeCard,
  onUpdateCardLimit,
  onToggleCardSetting
}) {
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || 'card-1');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const handleCopy = async () => {
    if (!activeCard) return;
    await copyToClipboard(activeCard.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const spentPercentage = Math.min(
    Math.round((activeCard.spentThisMonth / (activeCard.spendingLimit || 5000)) * 100),
    100
  );

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-900 dark:text-white">
            Cards & Biometric Security
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-emerald-200/70 mt-1">
            Manage your physical obsidian metal and cloud virtual cards with real-time controls.
          </p>
        </div>

        <button
          onClick={onOpenAddCard}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] text-xs font-bold transition-all shadow-md active:scale-98"
        >
          <Plus size={15} />
          <span>Issue New Card</span>
        </button>
      </div>

      {/* Card Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCardId(c.id);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all ${
              selectedCardId === c.id
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-[#b4ea6c] shadow-sm'
                : 'border-zinc-200 dark:border-emerald-900/40 bg-white dark:bg-[#12221d] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-full card-theme-${c.color}`} />
            <span>{c.name}</span>
            <span className="font-mono text-[11px] opacity-75">•••• {c.last4}</span>
            {c.isFrozen && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 font-semibold">
                FROZEN
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Grid: Card 3D Viewer & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 3D Flip Card Interactive Stage (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-6 sm:p-8 flex flex-col items-center justify-center">
            {/* Interactive Flip Trigger */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-400 dark:text-emerald-400/70 uppercase tracking-wider">
                Interactive 3D Card
              </span>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-[#b4ea6c] hover:underline"
              >
                <RotateCw size={14} />
                <span>{isFlipped ? 'Show Front' : 'Flip to View CVV'}</span>
              </button>
            </div>

            {/* The 3D Flip Card */}
            <div 
              className="card-perspective w-full max-w-sm h-56 cursor-pointer my-2 select-none"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
                {/* FRONT FACE */}
                <div className={`card-face p-6 flex flex-col justify-between shadow-2xl card-theme-${activeCard.color}`}>
                  <div className="card-shimmer" />
                  
                  {/* Top Bar */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-extrabold text-base tracking-wider uppercase text-white/90">
                        Aura
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-semibold">
                        {activeCard.type}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-white/80">
                      {activeCard.network}
                    </span>
                  </div>

                  {/* EMV Chip & Contactless wave */}
                  <div className="my-2 flex items-center gap-3 relative z-10">
                    <div className="emv-chip" />
                    {activeCard.contactless && (
                      <span className="text-[11px] text-white/70 font-mono tracking-widest">
                        )))
                      </span>
                    )}
                  </div>

                  {/* Card Number */}
                  <div className="font-mono-num font-bold text-lg sm:text-xl tracking-widest text-white relative z-10 drop-shadow-sm">
                    {activeCard.number}
                  </div>

                  {/* Bottom details */}
                  <div className="flex items-end justify-between pt-2 border-t border-white/15 relative z-10">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider block text-white/60">Cardholder</span>
                      <span className="font-bold text-xs tracking-wider text-white">{activeCard.holder}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-wider block text-white/60">Expires</span>
                      <span className="font-mono text-xs font-semibold text-white">{activeCard.expiry}</span>
                    </div>
                  </div>

                  {/* Frozen Overlay */}
                  {activeCard.isFrozen && (
                    <div className="absolute inset-0 bg-[#0b1714]/85 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-white font-bold z-20">
                      <Lock size={28} className="text-rose-400" />
                      <span className="text-xs tracking-wider">CARD TEMPORARILY FROZEN</span>
                    </div>
                  )}
                </div>

                {/* BACK FACE */}
                <div className={`card-face card-face-back p-6 flex flex-col justify-between shadow-2xl card-theme-${activeCard.color}`}>
                  <div className="w-full h-10 bg-black/90 -mx-6 mt-1" />
                  
                  <div className="my-2 space-y-2">
                    <div className="flex items-center justify-end bg-white/95 px-4 py-2 rounded-lg text-zinc-900 font-mono text-xs font-bold shadow-inner">
                      <span className="text-[10px] text-zinc-500 mr-3">CVV / CVC:</span>
                      <span className="tracking-widest text-sm">
                        {showCvv ? activeCard.cvv : '•••'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCvv(!showCvv);
                        }}
                        className="ml-3 text-zinc-500 hover:text-zinc-800"
                        title={showCvv ? 'Hide CVV' : 'Reveal CVV'}
                      >
                        {showCvv ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>

                    <p className="text-[9px] text-white/70 text-right leading-tight">
                      For customer concierge: +1 (800) 555-AURA • Not transferable.
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-white/50 tracking-wider">
                    <span>Authorized Signature</span>
                    <span>Aura Bank N.A. Member FDIC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons Under Card */}
            <div className="w-full flex items-center justify-center gap-3 mt-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-emerald-800/40 bg-zinc-50 dark:bg-[#12221d] hover:bg-zinc-100 dark:hover:bg-white/5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? 'Number Copied' : 'Copy Card Number'}</span>
              </button>

              <button
                onClick={() => onToggleFreezeCard(activeCard.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  activeCard.isFrozen
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'border border-zinc-200 dark:border-emerald-800/40 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5'
                }`}
              >
                {activeCard.isFrozen ? <Unlock size={14} /> : <Lock size={14} />}
                <span>{activeCard.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}</span>
              </button>
            </div>
          </div>

          {/* Spending Limit Progress Slider */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Monthly Spend Limit
                </h4>
                <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">
                  {formatCurrency(activeCard.spentThisMonth, currency)} spent of {formatCurrency(activeCard.spendingLimit, currency)}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
                {spentPercentage}% used
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-emerald-950 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${spentPercentage}%` }}
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <label className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">Adjust Limit:</label>
              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={activeCard.spendingLimit || 5000}
                onChange={(e) => onUpdateCardLimit(activeCard.id, parseFloat(e.target.value))}
                className="flex-1 accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 shrink-0">
                {formatCurrency(activeCard.spendingLimit, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Security Controls & Benefits (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Security Features Toggles */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span>Security & Channels</span>
            </h3>

            <div className="divide-y divide-zinc-100 dark:divide-emerald-900/30">
              {/* Contactless */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-[#162c24] text-zinc-600 dark:text-zinc-300">
                    <Wifi size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Contactless Payments (NFC)</p>
                    <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">Tap to pay at merchant point of sale</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={activeCard.contactless}
                  onChange={() => onToggleCardSetting(activeCard.id, 'contactless')}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              {/* Online Transactions */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-[#162c24] text-zinc-600 dark:text-zinc-300">
                    <ShoppingBag size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Online E-Commerce Transactions</p>
                    <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">Allow purchases on internet websites</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={activeCard.onlinePayments}
                  onChange={() => onToggleCardSetting(activeCard.id, 'onlinePayments')}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              {/* International Payments */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-[#162c24] text-zinc-600 dark:text-zinc-300">
                    <Globe size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">International & FX Roaming</p>
                    <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">Zero foreign exchange surcharge abroad</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={activeCard.internationalPayments}
                  onChange={() => onToggleCardSetting(activeCard.id, 'internationalPayments')}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Exclusive Card Benefits */}
          <div className="glass-panel p-6">
            <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <Award size={18} className="text-amber-500" />
              <span>Card Privileges & Rewards</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/40 flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-[#b4ea6c] font-bold">
                  3.0%
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">Cashback on Flights & Hotels</p>
                  <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">Direct auto-credit to checking balance</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/40 flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-bold">
                  VIP
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">Priority Pass Airport Lounge</p>
                  <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">Unlimited lounge access across 1,300+ airports</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/40 flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-bold">
                  $0
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">Zero Foreign Transaction Fees</p>
                  <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">Interbank rate everywhere you travel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
