import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  CreditCard, 
  Send, 
  PieChart, 
  Settings, 
  Sun, 
  Moon, 
  X, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import ApexLogo from './ApexLogo';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  isDark,
  setIsDark,
  onOpenSendMoney,
  transactionsCount,
  cardsCount,
  user,
  onLogout
}) {
  const navItems = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Transactions', label: 'Transactions', icon: ArrowLeftRight, badge: transactionsCount },
    { id: 'Cards', label: 'My Cards', icon: CreditCard, badge: cardsCount },
    { id: 'Payments', label: 'Payments & Transfers', icon: Send },
    { id: 'Insights', label: 'Insights & Analytics', icon: PieChart },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 lg:w-68 flex flex-col p-5 bg-[#112d26] dark:bg-[#0c1a16] text-[#e2ede7] border-r border-emerald-900/30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveTab('Overview');
              setIsMobileOpen(false);
            }}
          >
            <ApexLogo size={36} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl tracking-tight text-white">Apex</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30">
                  BANK
                </span>
              </div>
              <p className="text-[10px] tracking-wider font-semibold text-emerald-300/70 uppercase">Wealth & Banking</p>
            </div>
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-emerald-300/60 hover:text-white hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Workspace Label */}
        <p className="px-3 mb-2 text-[10px] font-bold tracking-wider text-emerald-400/50 uppercase">
          Financial Workspace
        </p>

        {/* Navigation links */}
        <nav className="space-y-1.5 mb-6 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#1e483d] text-white shadow-md shadow-emerald-950/40 font-semibold'
                    : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon
                  size={19}
                  className={`transition-colors shrink-0 ${
                    isActive ? 'text-[#b4ea6c]' : 'text-emerald-300/60 group-hover:text-emerald-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`ml-auto text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-[#b4ea6c] text-[#112d26]'
                        : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mini Wealth Promo Card */}
        <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-[#1a4439] to-[#123129] border border-emerald-500/20 mb-5 shadow-inner">
          <div className="absolute top-2 right-2 p-1 text-[#b4ea6c]/30">
            <Sparkles size={24} />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#b4ea6c] mb-1">
            <ShieldCheck size={13} />
            <span>Smart Yield Vault</span>
          </div>
          <h4 className="text-xs font-bold text-white mb-1">Earn 5.15% APY</h4>
          <p className="text-[11px] text-emerald-200/70 mb-3 leading-relaxed">
            Auto-compound your idle checking funds with instant liquidity.
          </p>
          <button
            onClick={() => {
              onOpenSendMoney();
              setIsMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#b4ea6c] hover:bg-[#cbf58b] text-[#112d26] text-xs font-bold transition-transform active:scale-98 shadow-sm"
          >
            <span>Transfer to Yield</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Sidebar Footer with Profile, Logout & Theme Switcher */}
        <div className="pt-4 border-t border-emerald-800/40 flex items-center justify-between">
          <button 
            onClick={() => {
              setActiveTab('Settings');
              setIsMobileOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group min-w-0 flex-1 mr-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 text-emerald-950 font-bold text-xs flex items-center justify-center ring-2 ring-emerald-500/30 shrink-0">
              {user?.avatar || 'QB'}
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-xs font-bold text-white group-hover:text-[#b4ea6c] transition-colors truncate">
                {user?.name || 'Authorized Client'}
              </p>
              <p className="text-[10px] text-emerald-300/60 truncate">
                {user?.tier || 'Apex Wealth'}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-emerald-300/80 hover:text-rose-400 transition-colors"
                title="Lock Session / Sign Out"
                aria-label="Lock Session"
              >
                <LogOut size={16} />
              </button>
            )}

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 hover:text-white transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark/light theme"
            >
              {isDark ? <Sun size={16} className="text-amber-300" /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
