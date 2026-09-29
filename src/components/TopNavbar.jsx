import { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronDown, 
  Plus, 
  Send, 
  Check,
  LogOut,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';
import { CURRENCIES } from '../data/initialData';

export default function TopNavbar({
  activeTab,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenNotifications,
  unreadNotificationsCount,
  currency,
  setCurrency,
  onOpenSendMoney,
  onOpenAddTransaction,
  user,
  onLogout,
  onNavigateSettings
}) {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/90 dark:bg-[#0e1d19]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-emerald-950 px-4 sm:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
          aria-label="Open mobile navigation"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-zinc-400 dark:text-emerald-500/70 font-medium">Apex Bank</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="font-semibold text-zinc-900 dark:text-white capitalize">
            {activeTab}
          </span>
        </div>
      </div>

      {/* Right: Actions, Currency Switcher, Notifications, Search, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-[#152a23] hover:bg-zinc-200/70 dark:hover:bg-[#1c362d] text-zinc-500 dark:text-emerald-200/70 text-xs transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-emerald-600/30"
          title="Search transactions and actions (Ctrl+K)"
        >
          <Search size={15} />
          <span className="hidden md:inline font-medium">Search anything...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded text-zinc-400">
            ⌘K
          </kbd>
        </button>

        {/* Currency Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-[#152a23] hover:bg-zinc-200/70 dark:hover:bg-[#1c362d] text-zinc-700 dark:text-emerald-100 text-xs font-semibold border border-zinc-200/70 dark:border-emerald-800/40 transition-colors"
            aria-label="Select Currency"
          >
            <span>{currency.flag}</span>
            <span>{currency.code}</span>
            <ChevronDown size={13} className="text-zinc-400" />
          </button>

          {showCurrencyDropdown && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setShowCurrencyDropdown(false)} 
              />
              <div className="absolute right-0 mt-2 z-40 w-44 rounded-2xl bg-white dark:bg-[#142620] border border-zinc-200 dark:border-emerald-800/50 shadow-xl py-1.5 animate-modal-pop">
                <p className="px-3 py-1 text-[10px] font-bold text-zinc-400 dark:text-emerald-400/60 uppercase tracking-wider">
                  Select Currency
                </p>
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                      currency.code === c.code
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-[#b4ea6c]'
                        : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span>{c.code}</span>
                      <span className="text-zinc-400 dark:text-zinc-500 font-normal">({c.symbol})</span>
                    </span>
                    {currency.code === c.code && <Check size={14} className="text-emerald-600 dark:text-[#b4ea6c]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#152a23] transition-colors"
          aria-label="View notifications"
        >
          <Bell size={18} />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#0e1d19]" />
          )}
        </button>

        {/* Quick Add Transaction Button */}
        <button
          onClick={onOpenAddTransaction}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-emerald-800/40 hover:bg-zinc-100 dark:hover:bg-[#152a23] text-zinc-700 dark:text-zinc-200 text-xs font-semibold transition-colors"
          title="Record transaction"
        >
          <Plus size={14} />
          <span>Record</span>
        </button>

        {/* Primary Action Button: Send Money */}
        <button
          onClick={onOpenSendMoney}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#17483c] to-[#0f342a] dark:from-[#b4ea6c] dark:to-[#cff78d] text-white dark:text-[#112d26] text-xs font-bold shadow-md shadow-emerald-950/20 hover:opacity-95 transition-transform active:scale-97"
        >
          <Send size={13} />
          <span>Send Money</span>
        </button>

        {/* User Avatar Button & Dropdown */}
        <div className="relative pl-1.5 border-l border-zinc-200 dark:border-emerald-900/40">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-left"
            aria-label="User Profile Menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 text-emerald-950 font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
              {user.avatar || 'QB'}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-tight truncate max-w-[120px]">
                {user.name}
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-emerald-400/70 leading-tight">
                {user.tier ? user.tier.split(' ')[0] + ' Member' : 'Private Client'}
              </p>
            </div>
            <ChevronDown size={13} className="text-zinc-400 hidden xl:block" />
          </button>

          {/* Profile Dropdown */}
          {showUserDropdown && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setShowUserDropdown(false)} 
              />
              <div className="absolute right-0 mt-2 z-40 w-64 rounded-2xl bg-white dark:bg-[#10221c] border border-zinc-200 dark:border-emerald-800/50 shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-150">
                {/* User Info Header */}
                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-[#091512] border border-zinc-100 dark:border-emerald-900/30 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-bold text-xs flex items-center justify-center border border-teal-500/30 shrink-0">
                      {user.avatar || 'QB'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                      <ShieldCheck size={11} />
                      Verified KYC Level 3
                    </span>
                    <span className="text-zinc-400 font-mono">{user.accountNumber || '•••• 4829'}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-1">
                  {onNavigateSettings && (
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onNavigateSettings();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <UserIcon size={14} className="text-zinc-400" />
                      <span>Security & Profile</span>
                    </button>
                  )}

                  {onLogout && (
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Lock Session / Sign Out</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
