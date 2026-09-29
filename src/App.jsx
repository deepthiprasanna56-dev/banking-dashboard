import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import OverviewTab from './components/OverviewTab';
import TransactionsTab from './components/TransactionsTab';
import CardsTab from './components/CardsTab';
import PaymentsTab from './components/PaymentsTab';
import InsightsTab from './components/InsightsTab';
import SettingsTab from './components/SettingsTab';

import SendMoneyModal from './components/SendMoneyModal';
import AddCardModal from './components/AddCardModal';
import AddTransactionModal from './components/AddTransactionModal';
import TransactionDetailModal from './components/TransactionDetailModal';
import NotificationsDrawer from './components/NotificationsDrawer';
import CommandPalette from './components/CommandPalette';
import Toast from './components/Toast';
import LoginScreen from './components/LoginScreen';

import {
  CURRENCIES,
  INITIAL_USER,
  INITIAL_CARDS,
  INITIAL_CONTACTS,
  INITIAL_TRANSACTIONS,
  INITIAL_BILLS,
  INITIAL_GOALS,
  INITIAL_NOTIFICATIONS
} from './data/initialData';

import { formatCurrency, exportTransactionsToCSV, fireConfetti } from './utils/formatters';

export default function App() {
  // Navigation & View
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('apex_auth_session') === 'true';
  });

  // Currency & Financial State
  const [currency, setCurrency] = useState(CURRENCIES.USD);
  const [totalBalance, setTotalBalance] = useState(68420.50);
  const [showBalance, setShowBalance] = useState(true);

  // Entities Data State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('apex_user_profile');
      if (savedUser) return JSON.parse(savedUser);
    } catch {
      // fallback
    }
    return INITIAL_USER;
  });
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [bills, setBills] = useState(INITIAL_BILLS);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modals State
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);
  const [prefilledContact, setPrefilledContact] = useState(null);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [selectedTxForDetail, setSelectedTxForDetail] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchPaletteOpen, setIsSearchPaletteOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Theme synchronization with HTML class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Global Toast helper
  const notify = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Keyboard shortcut listener for Command Palette (Ctrl+K or ⌘K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Authentication Handlers
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    if (loggedInUser.balance) {
      setTotalBalance(loggedInUser.balance);
    }
    setIsAuthenticated(true);
    localStorage.setItem('apex_auth_session', 'true');
    localStorage.setItem('apex_user_profile', JSON.stringify(loggedInUser));
    fireConfetti();
    notify(`Welcome back, ${loggedInUser.name}! Apex terminal unlocked.`, 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('apex_auth_session');
    notify('Session locked. Apex terminal secured.', 'info');
  };

  // Handlers
  const handleOpenSendMoneyWithContact = (contact) => {
    setPrefilledContact(contact);
    setIsSendMoneyOpen(true);
  };

  const handleSendSuccess = (newTx, amountSent) => {
    setTransactions((prev) => [newTx, ...prev]);
    setTotalBalance((prev) => Math.max(0, prev - amountSent));

    // Also deduct from card balance if matching
    setCards((prev) =>
      prev.map((c) =>
        c.id === newTx.cardId
          ? { ...c, balance: Math.max(0, c.balance - amountSent), spentThisMonth: c.spentThisMonth + amountSent }
          : c
      )
    );

    notify(`Sent ${formatCurrency(amountSent, currency)} successfully!`, 'success');
  };

  const handlePayBill = (bill) => {
    if (bill.amount > totalBalance) {
      notify(`Insufficient funds to pay ${bill.title}.`, 'error');
      return;
    }

    setTotalBalance((prev) => prev - bill.amount);
    setBills((prev) =>
      prev.map((b) => (b.id === bill.id ? { ...b, status: 'paid' } : b))
    );

    const billTx = {
      id: `tx-${Date.now()}`,
      merchant: bill.title,
      category: bill.category,
      date: new Date().toISOString(),
      displayDate: 'Today, Just now',
      amount: -bill.amount,
      type: 'expense',
      status: 'Completed',
      card: 'Everyday Checking (•••• 4829)',
      cardId: 'card-1',
      icon: 'receipt',
      color: 'yellow',
      ref: `BIL-${Math.floor(10000000 + Math.random() * 90000000)}`,
      note: `Bill settlement for ${bill.title}`
    };

    setTransactions((prev) => [billTx, ...prev]);
    fireConfetti();
    notify(`Settled ${bill.title} (${formatCurrency(bill.amount, currency)})!`, 'success');
  };

  const handleContributeSavings = (goalId, amount) => {
    if (amount > totalBalance) {
      notify('Insufficient funds to contribute.', 'error');
      return;
    }

    setTotalBalance((prev) => prev - amount);
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, current: Math.min(g.target, g.current + amount) } : g
      )
    );

    const goalTx = {
      id: `tx-${Date.now()}`,
      merchant: 'Vault Contribution',
      category: 'Savings',
      date: new Date().toISOString(),
      displayDate: 'Today, Just now',
      amount: -amount,
      type: 'expense',
      status: 'Completed',
      card: 'Everyday Checking (•••• 4829)',
      cardId: 'card-1',
      icon: 'chart',
      color: 'lime',
      ref: `SAV-${Math.floor(10000000 + Math.random() * 90000000)}`,
      note: `Smart savings deposit`
    };

    setTransactions((prev) => [goalTx, ...prev]);
    notify(`Added ${formatCurrency(amount, currency)} to goal!`, 'success');
  };

  const handleToggleFreezeCard = (cardId) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const nextState = !c.isFrozen;
          notify(
            nextState ? `${c.name} has been frozen.` : `${c.name} is now active and unfrozen.`,
            nextState ? 'info' : 'success'
          );
          return { ...c, isFrozen: nextState };
        }
        return c;
      })
    );
  };

  const handleUpdateCardLimit = (cardId, newLimit) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, spendingLimit: newLimit } : c))
    );
  };

  const handleToggleCardSetting = (cardId, settingKey) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId ? { ...c, [settingKey]: !c[settingKey] } : c
      )
    );
    notify('Card security preferences updated.', 'info');
  };

  const handleAddCard = (newCard) => {
    setCards((prev) => [newCard, ...prev]);
    fireConfetti();
    notify(`New ${newCard.name} issued and activated!`, 'success');
  };

  const handleAddTransaction = (newTx, amountChange) => {
    setTransactions((prev) => [newTx, ...prev]);
    setTotalBalance((prev) => prev + amountChange);
    notify('Transaction entry saved successfully.', 'success');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    notify('All notifications marked as read.', 'info');
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    notify('Notifications cleared.', 'info');
  };

  const handleNotificationClick = (notif) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    notify(notif.title, 'info');
  };

  const handleExportAllData = () => {
    exportTransactionsToCSV(transactions, `Aura_Financial_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    notify('Full ledger exported as CSV.', 'success');
  };

  const handleResetData = () => {
    setTotalBalance(24680.50);
    setCards(INITIAL_CARDS);
    setContacts(INITIAL_CONTACTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setBills(INITIAL_BILLS);
    setGoals(INITIAL_GOALS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setUser(INITIAL_USER);
    notify('Demo state successfully reset to initial records.', 'info');
  };

  // If unauthenticated, render the Apex Bank Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          isDark={isDark}
          setIsDark={setIsDark}
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenSendMoney={() => {
          setPrefilledContact(null);
          setIsSendMoneyOpen(true);
        }}
        transactionsCount={transactions.length}
        cardsCount={cards.length}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 xl:pl-68 flex flex-col min-h-screen">
        {/* Sticky Top Bar */}
        <TopNavbar
          activeTab={activeTab}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          onOpenSearch={() => setIsSearchPaletteOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotificationsCount={notifications.filter((n) => !n.isRead).length}
          currency={currency}
          setCurrency={setCurrency}
          onOpenSendMoney={() => {
            setPrefilledContact(null);
            setIsSendMoneyOpen(true);
          }}
          onOpenAddTransaction={() => setIsAddTxOpen(true)}
          user={user}
          onLogout={handleLogout}
          onNavigateSettings={() => setActiveTab('Settings')}
        />

        {/* Dynamic Tab Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'Overview' && (
            <OverviewTab
              totalBalance={totalBalance}
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              currency={currency}
              transactions={transactions}
              contacts={contacts}
              cards={cards}
              onOpenSendMoney={() => {
                setPrefilledContact(null);
                setIsSendMoneyOpen(true);
              }}
              onOpenSendMoneyWithContact={handleOpenSendMoneyWithContact}
              onOpenAddTransaction={() => setIsAddTxOpen(true)}
              onOpenAddCard={() => setIsAddCardOpen(true)}
              onSelectTransaction={(tx) => setSelectedTxForDetail(tx)}
              setActiveTab={setActiveTab}
              onToggleFreezeCard={handleToggleFreezeCard}
              onContributeSavings={(amount) => handleContributeSavings('goal-1', amount)}
              user={user}
            />
          )}

          {activeTab === 'Transactions' && (
            <TransactionsTab
              transactions={transactions}
              currency={currency}
              onSelectTransaction={(tx) => setSelectedTxForDetail(tx)}
              onOpenAddTransaction={() => setIsAddTxOpen(true)}
              onExportSuccess={(count) => notify(`Exported ${count} transactions to CSV.`, 'success')}
            />
          )}

          {activeTab === 'Cards' && (
            <CardsTab
              cards={cards}
              currency={currency}
              onOpenAddCard={() => setIsAddCardOpen(true)}
              onToggleFreezeCard={handleToggleFreezeCard}
              onUpdateCardLimit={handleUpdateCardLimit}
              onToggleCardSetting={handleToggleCardSetting}
            />
          )}

          {activeTab === 'Payments' && (
            <PaymentsTab
              bills={bills}
              onPayBill={handlePayBill}
              contacts={contacts}
              onOpenSendMoney={() => {
                setPrefilledContact(null);
                setIsSendMoneyOpen(true);
              }}
              onOpenSendMoneyWithContact={handleOpenSendMoneyWithContact}
              currency={currency}
              totalBalance={totalBalance}
              user={user}
            />
          )}

          {activeTab === 'Insights' && (
            <InsightsTab
              goals={goals}
              onContributeGoal={(goalId, amount) => handleContributeSavings(goalId, amount)}
              onAddGoal={() => {
                const newGoal = {
                  id: `goal-${Date.now()}`,
                  title: 'New Investment Target',
                  target: 5000,
                  current: 0,
                  color: 'emerald',
                  icon: 'shield',
                  targetDate: '2027'
                };
                setGoals((prev) => [...prev, newGoal]);
                notify('New goal created!', 'success');
              }}
              currency={currency}
              totalBalance={totalBalance}
            />
          )}

          {activeTab === 'Settings' && (
            <SettingsTab
              user={user}
              onUpdateUser={(updated) => {
                setUser((prev) => ({ ...prev, ...updated }));
                notify('Profile updated.', 'success');
              }}
              currency={currency}
              setCurrency={setCurrency}
              isDark={isDark}
              setIsDark={setIsDark}
              onExportAllData={handleExportAllData}
              onResetData={handleResetData}
              onLogout={handleLogout}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="p-6 border-t border-zinc-200/80 dark:border-emerald-950 text-xs text-zinc-400 dark:text-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-zinc-700 dark:text-zinc-200">Apex Bank Technologies</span>
            <span>•</span>
            <span>Member FDIC</span>
            <span>•</span>
            <span>Equal Housing Lender</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => notify('Security policies compliant with ISO-27001.', 'info')} className="hover:underline">
              Security
            </button>
            <button onClick={() => notify('Privacy statement: 100% client encryption.', 'info')} className="hover:underline">
              Privacy
            </button>
            <button onClick={() => notify('Aura Concierge 24/7 hotline: 1-800-555-AURA', 'info')} className="hover:underline">
              Support
            </button>
          </div>
        </footer>
      </div>

      {/* Floating Modals and Dialogs */}
      <SendMoneyModal
        isOpen={isSendMoneyOpen}
        onClose={() => {
          setIsSendMoneyOpen(false);
          setPrefilledContact(null);
        }}
        contacts={contacts}
        cards={cards}
        totalBalance={totalBalance}
        currency={currency}
        onSendSuccess={handleSendSuccess}
        prefilledContact={prefilledContact}
      />

      <AddCardModal
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        onAddCard={handleAddCard}
        currency={currency}
        userName={user.name}
      />

      <AddTransactionModal
        isOpen={isAddTxOpen}
        onClose={() => setIsAddTxOpen(false)}
        cards={cards}
        onAddTransaction={handleAddTransaction}
        currency={currency}
      />

      <TransactionDetailModal
        transaction={selectedTxForDetail}
        isOpen={!!selectedTxForDetail}
        onClose={() => setSelectedTxForDetail(null)}
        currency={currency}
        onRepeatTransaction={() => {
          setIsSendMoneyOpen(true);
        }}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onClearAll={handleClearAllNotifications}
        onNotificationClick={handleNotificationClick}
      />

      <CommandPalette
        isOpen={isSearchPaletteOpen}
        onClose={() => setIsSearchPaletteOpen(false)}
        setActiveTab={setActiveTab}
        onOpenSendMoney={() => {
          setPrefilledContact(null);
          setIsSendMoneyOpen(true);
        }}
        onOpenAddCard={() => setIsAddCardOpen(true)}
        onOpenAddTransaction={() => setIsAddTxOpen(true)}
        onExportCSV={handleExportAllData}
        isDark={isDark}
        setIsDark={setIsDark}
        transactions={transactions}
        currency={currency}
        onSelectTransaction={(tx) => setSelectedTxForDetail(tx)}
      />

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
