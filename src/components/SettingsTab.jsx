import { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Moon, 
  Sun, 
  Download, 
  RotateCcw, 
  Check, 
  Smartphone, 
  Fingerprint,
  LogOut
} from 'lucide-react';
import { CURRENCIES } from '../data/initialData';

export default function SettingsTab({
  user,
  onUpdateUser,
  currency,
  setCurrency,
  isDark,
  setIsDark,
  onExportAllData,
  onResetData,
  onLogout
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [hideBalanceStartup, setHideBalanceStartup] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateUser({ name, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2400);
  };

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-900 dark:text-white">
          Account Settings & Security
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-emerald-200/70 mt-1">
          Customize your credentials, biometrics, default denomination, and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Details (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-emerald-900/30">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-amber-950 font-extrabold text-xl flex items-center justify-center shadow-md">
              {user.avatar}
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-xs text-emerald-600 dark:text-[#b4ea6c] font-semibold">{user.tier}</p>
              <p className="text-[11px] text-zinc-400">Account: {user.accountNumber}</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Verified Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-[#0c1a16] text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/30">
                <span className="text-[10px] text-zinc-400 block">Routing Transit (ACH)</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{user.routingNumber}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/30">
                <span className="text-[10px] text-zinc-400 block">Member Since</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{user.memberSince}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              {savedSuccess ? <Check size={15} /> : null}
              <span>{savedSuccess ? 'Profile Changes Saved!' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>

        {/* Preferences & Security (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Preferences */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <Globe size={18} className="text-emerald-500" />
              <span>Display & Regional Preferences</span>
            </h3>

            <div className="divide-y divide-zinc-100 dark:divide-emerald-900/30 text-xs">
              {/* Currency Selector */}
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200">Default Currency</p>
                  <p className="text-[11px] text-zinc-400">All balances calculate with real exchange rates</p>
                </div>
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(CURRENCIES[e.target.value])}
                  className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-emerald-800/40 bg-zinc-50 dark:bg-[#0c1a16] text-zinc-900 dark:text-white font-bold text-xs focus:outline-none"
                >
                  {Object.values(CURRENCIES).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Toggle */}
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200">Interface Theme</p>
                  <p className="text-[11px] text-zinc-400">Forest Emerald Dark Mode or Clean Ivory Light</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-emerald-800/40 bg-zinc-50 dark:bg-[#0c1a16] font-semibold text-xs"
                >
                  {isDark ? <Sun size={14} className="text-amber-300" /> : <Moon size={14} />}
                  <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>

              {/* Privacy Mask Toggle */}
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200">Mask Balance on Launch</p>
                  <p className="text-[11px] text-zinc-400">Hide net worth numbers when opening dashboard</p>
                </div>
                <input
                  type="checkbox"
                  checked={hideBalanceStartup}
                  onChange={(e) => setHideBalanceStartup(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Security & Authentication */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span>Biometrics & Authentication</span>
            </h3>

            <div className="divide-y divide-zinc-100 dark:divide-emerald-900/30 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-[#162c24]">
                    <Smartphone size={16} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-800 dark:text-zinc-200">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-zinc-400">Hardware token or authenticator app required</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-[#162c24]">
                    <Fingerprint size={16} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-800 dark:text-zinc-200">TouchID / FaceID WebAuthn</p>
                    <p className="text-[11px] text-zinc-400">Fast biometric authorization for transfers</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={biometrics}
                  onChange={(e) => setBiometrics(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Active Terminal Session & Security */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-teal-500" />
                  <span>Apex Terminal Session</span>
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Authenticated via 256-bit TLS Gateway. Active node: NYC-01.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Session
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#0c1a16] border border-zinc-200/80 dark:border-emerald-900/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{user.name}</p>
                <p className="text-[11px] text-zinc-400 font-mono">{user.email}</p>
              </div>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-500/20 transition-colors cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Lock Session / Sign Out</span>
                </button>
              )}
            </div>
          </div>

          {/* Data Export & Reset */}
          <div className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onExportAllData}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl border border-zinc-200 dark:border-emerald-800/40 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5"
            >
              <Download size={14} />
              <span>Export Audit Data</span>
            </button>

            <button
              onClick={onResetData}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
            >
              <RotateCcw size={14} />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
