import { useState } from 'react';
import { X, CreditCard, Plus, Check } from 'lucide-react';

export default function AddCardModal({
  isOpen,
  onClose,
  onAddCard,
  currency,
  userName = 'ALEX CARTER'
}) {
  const [name, setName] = useState('Platinum Freedom');
  const [type, setType] = useState('Credit');
  const [network, setNetwork] = useState('Visa Infinite');
  const [color, setColor] = useState('emerald');
  const [limit, setLimit] = useState('5000');
  const [holder, setHolder] = useState(userName.toUpperCase());

  if (!isOpen) return null;

  const colorThemes = [
    { id: 'emerald', label: 'Emerald Forest', class: 'card-theme-emerald' },
    { id: 'obsidian', label: 'Obsidian Matte', class: 'card-theme-obsidian' },
    { id: 'sunset', label: 'Sunset Copper', class: 'card-theme-sunset' },
    { id: 'gold', label: 'Royal Gold', class: 'card-theme-gold' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate random 16 digit card number
    const prefix = network.includes('Visa') ? '4' : '5';
    const randPart1 = Math.floor(100 + Math.random() * 900);
    const randPart2 = Math.floor(1000 + Math.random() * 9000);
    const randPart3 = Math.floor(1000 + Math.random() * 9000);
    const randPart4 = Math.floor(1000 + Math.random() * 9000);
    const fullNumber = `${prefix}${randPart1} ${randPart2} ${randPart3} ${randPart4}`;
    const last4 = `${randPart4}`;
    const cvv = String(Math.floor(100 + Math.random() * 900));

    const newCard = {
      id: `card-${Date.now()}`,
      name: name || 'Aura Titanium',
      type: type,
      network: network,
      number: fullNumber,
      last4: last4,
      cvv: cvv,
      expiry: '09/31',
      holder: holder || userName.toUpperCase(),
      balance: type === 'Debit' ? 2500.00 : 0.00,
      spendingLimit: parseFloat(limit) || 5000,
      spentThisMonth: 0.00,
      isFrozen: false,
      color: color,
      badge: `${type} Tier`,
      contactless: type !== 'Virtual',
      onlinePayments: true,
      internationalPayments: true
    };

    onAddCard(newCard);
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
              <CreditCard size={16} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">Issue New Card</h3>
              <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">Instant digital issuance with 3D Secure</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Interactive Card Preview */}
        <div className="p-6 pb-2">
          <div className="text-xs font-semibold text-zinc-400 dark:text-emerald-400/70 mb-2">Live Preview</div>
          <div className={`w-full h-44 rounded-2xl p-5 relative overflow-hidden transition-all shadow-xl card-theme-${color}`}>
            <div className="card-shimmer" />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="font-heading font-extrabold text-sm tracking-wider uppercase text-white/90">Aura</span>
                <span className="text-[10px] ml-1.5 px-2 py-0.5 rounded-md bg-white/10 text-white font-medium">{type}</span>
              </div>
              <span className="text-xs font-mono font-bold tracking-widest text-white/80">{network}</span>
            </div>

            <div className="relative z-10 my-3 flex items-center gap-3">
              <div className="emv-chip" />
              <span className="text-[10px] tracking-wider text-white/60 font-mono">))) Contactless</span>
            </div>

            <div className="relative z-10 font-mono-num font-semibold text-sm tracking-widest text-white/95">
              •••• &nbsp;•••• &nbsp;•••• &nbsp;9024
            </div>

            <div className="relative z-10 flex justify-between items-end mt-2 pt-2 border-t border-white/10 text-xs">
              <div>
                <span className="text-[8px] uppercase tracking-wider block text-white/60">Cardholder</span>
                <span className="font-bold tracking-wider text-[11px] text-white">{holder || 'YOUR NAME'}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] uppercase tracking-wider block text-white/60">Expires</span>
                <span className="font-mono text-[11px] text-white">09/31</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Settings Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Card Label / Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Travel Sapphire, Subscriptions..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Card Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Credit">Credit Card</option>
                <option value="Debit">Debit Card</option>
                <option value="Virtual">Virtual Card</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Network</label>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Visa Infinite">Visa Infinite</option>
                <option value="Mastercard World Elite">Mastercard World Elite</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Card Finish & Color</label>
            <div className="grid grid-cols-4 gap-2">
              {colorThemes.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    color === c.id
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/40'
                      : 'border-zinc-200 dark:border-emerald-900/40 hover:bg-zinc-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full card-theme-${c.id} flex items-center justify-center`}>
                    {color === c.id && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-300">{c.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Monthly Spending Limit</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">{currency.symbol}</span>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Cardholder Name</label>
              <input
                type="text"
                value={holder}
                onChange={(e) => setHolder(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500 uppercase"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Plus size={16} />
            <span>Issue & Activate Card Immediately</span>
          </button>
        </form>
      </div>
    </div>
  );
}
