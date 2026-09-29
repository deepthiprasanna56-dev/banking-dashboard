import { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Fingerprint, 
  CheckCircle2, 
  Sun, 
  Moon, 
  User, 
  Building2, 
  X,
  KeyRound,
  Check,
  AlertCircle
} from 'lucide-react';
import ApexLogo from './ApexLogo';
import { DEMO_PROFILES } from '../data/initialData';

export default function LoginScreen({ onLoginSuccess, isDark, setIsDark }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  
  // Sign In Form States
  const [email, setEmail] = useState('alex.vance@apexbank.com');
  const [password, setPassword] = useState('ApexSecure2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Sign Up Form States
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupTier, setSignupTier] = useState('Apex Obsidian');
  
  // UI Interaction States
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStepMessage, setAuthStepMessage] = useState('');
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Forgot Password Modal State
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: otp, 3: new password, 4: success
  const [otpCode, setOtpCode] = useState(['9', '8', '4', '2', '1', '0']);
  const [newPassword, setNewPassword] = useState('');

  // Handle Demo Profile Selection
  const handleSelectDemo = (profile) => {
    setEmail(profile.email);
    setPassword('ApexSecure2026!');
    setShowDemoMenu(false);
    setErrorMessage('');
  };

  // Submit Sign In
  const handleSignIn = (e) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both authorized email and password.');
      return;
    }

    setErrorMessage('');
    setIsAuthenticating(true);
    setAuthStepMessage('Verifying cryptographic keys & TLS session...');

    setTimeout(() => {
      setAuthStepMessage('Validating 256-bit AES cryptographic token...');
      setTimeout(() => {
        setAuthStepMessage('Access Authorized. Initializing terminal...');
        setTimeout(() => {
          setIsAuthenticating(false);
          // Find matching demo profile or create dynamic user object
          const matchingProfile = DEMO_PROFILES.find(
            (p) => p.email.toLowerCase() === email.trim().toLowerCase()
          );

          const finalUser = matchingProfile || {
            name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            email: email.trim(),
            avatar: email.substring(0, 2).toUpperCase(),
            accountNumber: '•••• 4829',
            routingNumber: '021000021',
            tier: 'Apex Elite Member',
            memberSince: '2026',
            creditScore: 820,
            balance: 45200.00
          };

          onLoginSuccess(finalUser);
        }, 600);
      }, 700);
    }, 700);
  };

  // Submit Biometric Quick Sign In
  const handleBiometricAuth = () => {
    setBiometricScanning(true);
    setErrorMessage('');
    setTimeout(() => {
      setBiometricScanning(false);
      handleSignIn();
    }, 1100);
  };

  // Submit Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setErrorMessage('Please fill in all registration fields.');
      return;
    }

    setIsAuthenticating(true);
    setAuthStepMessage('Generating biometric security vault...');
    setTimeout(() => {
      setAuthStepMessage('Provisioning institutional FDIC-backed ledger...');
      setTimeout(() => {
        setIsAuthenticating(false);
        const newUser = {
          name: signupName.trim(),
          email: signupEmail.trim(),
          avatar: signupName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
          accountNumber: `•••• ${Math.floor(1000 + Math.random() * 9000)}`,
          routingNumber: '021000021',
          tier: signupTier,
          memberSince: '2026',
          creditScore: 800,
          balance: 10000.00
        };
        onLoginSuccess(newUser);
      }, 800);
    }, 800);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-[#f4f7f5] dark:bg-[#070e0c] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-teal-500/30">
      
      {/* High-Tech Background Ambient Mesh & Cyber Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial Energy Halos */}
        <div className="absolute -top-40 -left-40 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-teal-500/10 dark:bg-teal-500/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-lime-400/8 dark:bg-lime-400/10 blur-[130px]" />

        {/* Fine Architectural Grid & Coordinate Lines */}
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0d9488 1px, transparent 1px),
              linear-gradient(to bottom, #0d9488 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Framing Crosshairs (+) in corners */}
        <div className="hidden lg:block absolute top-8 left-8 text-teal-700/30 dark:text-teal-400/20 font-mono text-xs select-none">
          + LAT: 40.7128° N | LNG: 74.0060° W // NODE: NYC-01
        </div>
        <div className="hidden lg:block absolute top-8 right-24 text-teal-700/30 dark:text-teal-400/20 font-mono text-xs select-none">
          SECURE_GATEWAY_V4.2 // 256-BIT AES-GCM +
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group">
          <ApexLogo size={32} />
          <div>
            <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
              Apex Bank
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-semibold border border-teal-300 dark:border-teal-500/30">
                PRO
              </span>
            </span>
            <p className="text-[10px] text-zinc-500 dark:text-teal-200/60 hidden sm:block tracking-wide">
              Institutional & Private Wealth Portal
            </p>
          </div>
        </div>

        {/* Top Controls: Live Core Badge & Theme Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-white/5 border border-zinc-200 dark:border-teal-500/20 backdrop-blur-md text-[11px] text-teal-800 dark:text-teal-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono">Apex Cryptographic Core: Online</span>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-teal-200 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2 text-xs shadow-xs"
            title="Toggle theme appearance"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={15} className="text-amber-300" /> : <Moon size={15} className="text-zinc-700" />}
            <span className="hidden sm:inline font-medium">{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>

      {/* Center Content: Login / Sign Up Card with Architectural Frame */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-4 sm:py-6">
        
        {/* Architectural Framed Box */}
        <div className="relative">
          {/* Subtle outer guideline dashed lines mimicking modern financial blueprint */}
          <div className="absolute -inset-4 sm:-inset-6 border border-dashed border-teal-500/25 dark:border-teal-500/20 rounded-3xl pointer-events-none" />
          <div className="absolute -top-3 left-6 px-2 bg-[#f4f7f5] dark:bg-[#0c1613] text-[10px] font-mono text-teal-700/60 dark:text-teal-400/50 uppercase tracking-widest pointer-events-none">
            AUTH_TERMINAL // CLIENT-FACING
          </div>

          {/* Main Card Surface */}
          <div className="relative bg-white/95 dark:bg-[#0c1815]/95 backdrop-blur-xl border border-zinc-200/90 dark:border-teal-500/25 rounded-2xl shadow-xl shadow-teal-950/5 dark:shadow-2xl dark:shadow-black/60 p-6 sm:p-8 overflow-hidden">
            
            {/* Subtle Top Glowing Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-80" />

            {/* Brand Logo & Title in Center */}
            <div className="flex flex-col items-center text-center mb-5">
              <div className="mb-2">
                <ApexLogo size={48} showGlow={true} />
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-white tracking-tight">
                Apex Bank
              </h1>
              <p className="text-xs text-zinc-500 dark:text-teal-200/70 mt-0.5">
                Next-generation financial intelligence & wealth portal
              </p>

              {/* Pre-authorized Demo Access Pill (Interactive Component) */}
              <div className="relative mt-3">
                <button
                  type="button"
                  onClick={() => setShowDemoMenu(!showDemoMenu)}
                  className="group inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-400/40 hover:border-teal-500 text-teal-800 dark:text-teal-300 hover:text-teal-900 dark:hover:text-teal-100 text-xs font-medium shadow-xs transition-all cursor-pointer"
                  title="Click to view pre-authorized demo credentials"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="tracking-wide">Pre-authorized Demo Access</span>
                  <span className="text-[10px] opacity-70 group-hover:translate-y-0.5 transition-transform">▼</span>
                </button>

                {/* Dropdown for Pre-Authorized Demo Personas */}
                {showDemoMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setShowDemoMenu(false)} 
                    />
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-[#091512] border border-zinc-200 dark:border-teal-500/40 shadow-2xl p-3 z-40 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-teal-900/40 px-1">
                        <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300/80 uppercase tracking-wider">
                          Select Demo Persona
                        </span>
                        <span className="text-[10px] text-teal-600 dark:text-teal-400/50 font-mono">1-Click Auto-Fill</span>
                      </div>
                      <div className="space-y-1.5">
                        {DEMO_PROFILES.map((profile) => {
                          const isSelected = email.toLowerCase() === profile.email.toLowerCase();
                          return (
                            <button
                              key={profile.id}
                              type="button"
                              onClick={() => handleSelectDemo(profile)}
                              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                                isSelected
                                  ? 'bg-teal-50 dark:bg-teal-900/40 border-teal-500 dark:border-teal-400/60 shadow-sm'
                                  : 'bg-zinc-50 dark:bg-white/5 border-zinc-100 dark:border-transparent hover:bg-zinc-100 dark:hover:bg-white/10'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 border border-teal-300 dark:border-teal-400/30 text-teal-900 dark:text-teal-300 font-bold text-xs flex items-center justify-center shrink-0">
                                {profile.avatar}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{profile.name}</p>
                                  {isSelected && <Check size={12} className="text-teal-600 dark:text-teal-400" />}
                                </div>
                                <p className="text-[11px] text-teal-700 dark:text-teal-300/70 truncate">{profile.email}</p>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">{profile.role}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-2 text-center text-[10px] text-zinc-500 dark:text-teal-300/50">
                        Pre-authorized session with simulated biometric key
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Demo Switcher Chips */}
            <div className="flex items-center justify-center gap-1.5 mb-5 flex-wrap">
              {DEMO_PROFILES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectDemo(p)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    email.toLowerCase() === p.email.toLowerCase()
                      ? 'bg-teal-50 dark:bg-teal-500/20 border-teal-400 text-teal-800 dark:text-teal-200 font-semibold shadow-xs'
                      : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-white/20'
                  }`}
                >
                  {p.name.split(' ')[0]} ({p.avatar})
                </button>
              ))}
            </div>

            {/* Tabs: Sign In / Create Account */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-teal-900/40 mb-5">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage('');
                }}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Open Account
              </button>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
                <AlertCircle size={15} className="shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* MODE 1: SIGN IN FORM */}
            {mode === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600 dark:text-teal-400/60">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@apexbank.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#091512]/90 border border-zinc-200 dark:border-teal-500/30 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(email);
                        setForgotStep(1);
                        setIsForgotOpen(true);
                      }}
                      className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600 dark:text-teal-400/60">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter master password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#091512]/90 border border-zinc-200 dark:border-teal-500/30 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Biometric Options */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-300 dark:border-teal-500/40 text-teal-600 focus:ring-teal-500 bg-white dark:bg-[#091512]"
                    />
                    <span className="text-zinc-600 dark:text-zinc-400">Remember this terminal</span>
                  </label>

                  {/* Biometric Passkey Shortcut */}
                  <button
                    type="button"
                    onClick={handleBiometricAuth}
                    disabled={isAuthenticating || biometricScanning}
                    className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-200 transition-colors cursor-pointer"
                    title="Simulate Passkey / Biometric Face ID login"
                  >
                    <Fingerprint size={15} className={biometricScanning ? 'animate-spin text-teal-500' : ''} />
                    <span className="text-[11px] font-medium">Face ID / Touch</span>
                  </button>
                </div>

                {/* Sign In Action Button */}
                <button
                  type="submit"
                  disabled={isAuthenticating || biometricScanning}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-teal-700/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{authStepMessage}</span>
                    </>
                  ) : biometricScanning ? (
                    <>
                      <Fingerprint size={18} className="animate-pulse text-white" />
                      <span>Scanning Biometric Vault...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* MODE 2: SIGN UP / OPEN ACCOUNT FORM */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Legal Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600 dark:text-teal-400/60">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      placeholder="e.g. Alexander Vance"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#091512]/90 border border-zinc-200 dark:border-teal-500/30 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Authorized Work / Personal Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600 dark:text-teal-400/60">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      placeholder="e.g. alexander@apexbank.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#091512]/90 border border-zinc-200 dark:border-teal-500/30 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Create Master Key (Password)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600 dark:text-teal-400/60">
                      <Lock size={16} />
                    </div>
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      placeholder="Minimum 8 characters"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#091512]/90 border border-zinc-200 dark:border-teal-500/30 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Account Tier Picker */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Account Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Personal Checking', label: 'Checking' },
                      { id: 'Apex Obsidian', label: 'Obsidian' },
                      { id: 'Corporate Treasury', label: 'Treasury' }
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSignupTier(tier.id)}
                        className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center cursor-pointer ${
                          signupTier === tier.id
                            ? 'bg-teal-50 dark:bg-teal-500/20 border-teal-400 text-teal-800 dark:text-teal-200'
                            : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-teal-700/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{authStepMessage}</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account & Launch Portal</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Switcher: "Don't have an account? Sign up" */}
            <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-teal-900/30 text-center">
              {mode === 'signin' ? (
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMessage('');
                    }}
                    className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setErrorMessage('');
                    }}
                    className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Trust & Compliance Footer */}
      <footer className="relative z-20 w-full max-w-5xl mx-auto px-4 py-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-teal-800/70 dark:text-teal-300/60 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" />
            <span>256-Bit Cryptographic TLS</span>
          </div>
          <span className="hidden sm:inline opacity-30">•</span>
          <div className="flex items-center gap-1.5">
            <Building2 size={14} className="text-teal-600 dark:text-teal-400" />
            <span>FDIC Insured up to $2,500,000</span>
          </div>
          <span className="hidden sm:inline opacity-30">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-teal-600 dark:text-teal-400" />
            <span>SOC2 Type II Certified</span>
          </div>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">
          © 2026 Apex Bank N.A. All rights reserved. Member FDIC. Equal Housing Opportunity.
        </p>
      </footer>

      {/* FORGOT PASSWORD MODAL */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#0d1c18] border border-zinc-200 dark:border-teal-500/30 p-6 shadow-2xl text-left">
            <button
              onClick={() => setIsForgotOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 border border-teal-300 dark:border-teal-400/30 text-teal-800 dark:text-teal-300 flex items-center justify-center">
                <KeyRound size={20} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-zinc-900 dark:text-white text-base">Account Recovery</h3>
                <p className="text-xs text-teal-700 dark:text-teal-300/70">Apex Master Key Reset</p>
              </div>
            </div>

            {forgotStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Enter your verified Apex Bank email. We will dispatch a 6-digit cryptographic verification code to your terminal.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#07110e] border border-zinc-200 dark:border-teal-500/30 text-xs text-zinc-900 dark:text-white outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setForgotStep(2)}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Send Verification Code
                </button>
              </div>
            )}

            {forgotStep === 2 && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Enter the 6-digit cryptographic OTP dispatched to <span className="text-teal-600 dark:text-teal-300 font-mono">{forgotEmail || email}</span>.
                </p>
                <div className="flex justify-between gap-1.5 py-1">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otpCode];
                        newOtp[idx] = e.target.value;
                        setOtpCode(newOtp);
                      }}
                      className="w-10 h-11 text-center font-mono font-bold text-base rounded-xl bg-zinc-50 dark:bg-[#07110e] border border-zinc-300 dark:border-teal-500/40 text-teal-800 dark:text-teal-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-400 outline-none"
                    />
                  ))}
                </div>
                <p className="text-[10px] text-teal-600 dark:text-teal-300/60 font-mono text-center">
                  Simulation Code: 984210 (Auto-filled)
                </p>
                <button
                  type="button"
                  onClick={() => setForgotStep(3)}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Verify Code
                </button>
              </div>
            )}

            {forgotStep === 3 && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Set a new master password for your Apex Bank terminal.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#07110e] border border-zinc-200 dark:border-teal-500/30 text-xs text-zinc-900 dark:text-white outline-none focus:border-teal-500 font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPassword(newPassword || 'ApexSecure2026!');
                    setForgotStep(4);
                  }}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Update & Authenticate
                </button>
              </div>
            )}

            {forgotStep === 4 && (
              <div className="space-y-4 text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h4 className="font-heading font-bold text-zinc-900 dark:text-white text-base">Key Updated Successfully</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Your credentials have been securely updated in the Apex Vault.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotOpen(false);
                    setForgotStep(1);
                  }}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
