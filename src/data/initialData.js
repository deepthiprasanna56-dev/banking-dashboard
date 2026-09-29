export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar', flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro', flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound', flag: '🇬🇧' },
  JPY: { code: 'JPY', symbol: '¥', rate: 155.0, name: 'Japanese Yen', flag: '🇯🇵' },
  INR: { code: 'INR', symbol: '₹', rate: 86.5, name: 'Indian Rupee', flag: '🇮🇳' },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.38, name: 'Canadian Dollar', flag: '🇨🇦' }
};

export const DEMO_PROFILES = [
  {
    id: 'demo-1',
    name: 'Alexander Vance',
    email: 'alex.vance@apexbank.com',
    role: 'Chief Investment Executive',
    avatar: 'AV',
    tier: 'Apex Obsidian Elite',
    accountNumber: '•••• 4829',
    routingNumber: '021000021',
    memberSince: '2023',
    creditScore: 840,
    balance: 68420.50
  },
  {
    id: 'demo-2',
    name: 'Marcus Sterling',
    email: 'marcus.sterling@apexbank.com',
    role: 'Private Reserve Client',
    avatar: 'MS',
    tier: 'Apex Private Reserve',
    accountNumber: '•••• 9102',
    routingNumber: '021000021',
    memberSince: '2022',
    creditScore: 785,
    balance: 24680.50
  },
  {
    id: 'demo-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@apexbank.com',
    role: 'Institutional Treasury Lead',
    avatar: 'ER',
    tier: 'Apex Treasury Vault',
    accountNumber: '•••• 6631',
    routingNumber: '021000021',
    memberSince: '2024',
    creditScore: 810,
    balance: 142900.00
  }
];

export const INITIAL_USER = DEMO_PROFILES[0];


export const INITIAL_CARDS = [
  {
    id: 'card-1',
    name: 'Emerald Everyday',
    type: 'Debit',
    network: 'Mastercard',
    number: '4829 8812 3901 4829',
    last4: '4829',
    cvv: '842',
    expiry: '08/29',
    holder: 'ALEX CARTER',
    balance: 14830.50,
    spendingLimit: 6000,
    spentThisMonth: 1840.50,
    isFrozen: false,
    color: 'emerald',
    badge: 'Primary Account',
    contactless: true,
    onlinePayments: true,
    internationalPayments: true
  },
  {
    id: 'card-2',
    name: 'Obsidian Infinite',
    type: 'Credit',
    network: 'Visa Infinite',
    number: '4532 9102 8831 1092',
    last4: '1092',
    cvv: '319',
    expiry: '11/30',
    holder: 'ALEX CARTER',
    balance: 9850.00,
    spendingLimit: 25000,
    spentThisMonth: 3550.00,
    isFrozen: false,
    color: 'obsidian',
    badge: '3% Cashback',
    contactless: true,
    onlinePayments: true,
    internationalPayments: true
  },
  {
    id: 'card-3',
    name: 'Sunset Cloud Virtual',
    type: 'Virtual',
    network: 'Mastercard',
    number: '5412 7700 4419 6631',
    last4: '6631',
    cvv: '904',
    expiry: '04/28',
    holder: 'ALEX CARTER',
    balance: 3200.00,
    spendingLimit: 3000,
    spentThisMonth: 420.00,
    isFrozen: false,
    color: 'sunset',
    badge: 'Single-Merchant Safe',
    contactless: false,
    onlinePayments: true,
    internationalPayments: false
  }
];

export const INITIAL_CONTACTS = [
  { id: 'c1', name: 'Maya Chen', initials: 'MC', handle: '@mayac', color: 'coral', bank: 'Chase Bank', recentAmount: 150 },
  { id: 'c2', name: 'Jordan Lee', initials: 'JL', handle: '@jordan_l', color: 'blue', bank: 'Aura Instant', recentAmount: 45 },
  { id: 'c3', name: 'Sam Keller', initials: 'SK', handle: '@samk', color: 'yellow', bank: 'Bank of America', recentAmount: 220 },
  { id: 'c4', name: 'Olivia Rodriguez', initials: 'OR', handle: '@olivia_r', color: 'green', bank: 'Wells Fargo', recentAmount: 80 },
  { id: 'c5', name: 'David Kim', initials: 'DK', handle: '@davidk', color: 'purple', bank: 'Citibank', recentAmount: 310 }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    date: '2026-09-29T10:42:00',
    displayDate: 'Today, 10:42 AM',
    amount: -86.42,
    type: 'expense',
    status: 'Completed',
    card: 'Emerald Everyday (•••• 4829)',
    cardId: 'card-1',
    icon: 'basket',
    color: 'mint',
    ref: 'TXN-90218401',
    note: 'Weekly organic groceries'
  },
  {
    id: 'tx-102',
    merchant: 'Netflix Premium 4K',
    category: 'Entertainment',
    date: '2026-09-29T08:16:00',
    displayDate: 'Today, 8:16 AM',
    amount: -19.99,
    type: 'expense',
    status: 'Completed',
    card: 'Sunset Cloud (•••• 6631)',
    cardId: 'card-3',
    icon: 'play',
    color: 'rose',
    ref: 'TXN-88401923',
    note: 'Monthly recurring subscription'
  },
  {
    id: 'tx-103',
    merchant: 'Olive Garden Bistro',
    category: 'Restaurants',
    date: '2026-09-28T19:30:00',
    displayDate: 'Yesterday, 7:30 PM',
    amount: -42.80,
    type: 'expense',
    status: 'Completed',
    card: 'Obsidian Infinite (•••• 1092)',
    cardId: 'card-2',
    icon: 'food',
    color: 'peach',
    ref: 'TXN-77382910',
    note: 'Dinner with team'
  },
  {
    id: 'tx-104',
    merchant: 'Salary Deposit - Stripe Inc',
    category: 'Income',
    date: '2026-09-26T09:00:00',
    displayDate: 'Sep 26, 2026',
    amount: 4850.00,
    type: 'income',
    status: 'Completed',
    card: 'Checking Account',
    cardId: 'card-1',
    icon: 'down',
    color: 'lime',
    ref: 'DIR-DEP-49201',
    note: 'Bi-weekly payroll direct deposit'
  },
  {
    id: 'tx-105',
    merchant: 'Uber Technologies',
    category: 'Transport',
    date: '2026-09-25T23:15:00',
    displayDate: 'Sep 25, 2026',
    amount: -24.50,
    type: 'expense',
    status: 'Completed',
    card: 'Emerald Everyday (•••• 4829)',
    cardId: 'card-1',
    icon: 'car',
    color: 'sky',
    ref: 'TXN-66491028',
    note: 'Airport ride'
  },
  {
    id: 'tx-106',
    merchant: 'Apple Store Fifth Ave',
    category: 'Shopping',
    date: '2026-09-24T14:40:00',
    displayDate: 'Sep 24, 2026',
    amount: -129.00,
    type: 'expense',
    status: 'Completed',
    card: 'Obsidian Infinite (•••• 1092)',
    cardId: 'card-2',
    icon: 'basket',
    color: 'purple',
    ref: 'APL-11928374',
    note: 'MagSafe accessories'
  },
  {
    id: 'tx-107',
    merchant: 'Freelance Design Retainer',
    category: 'Income',
    date: '2026-09-22T16:15:00',
    displayDate: 'Sep 22, 2026',
    amount: 1570.00,
    type: 'income',
    status: 'Completed',
    card: 'Checking Account',
    cardId: 'card-1',
    icon: 'down',
    color: 'lime',
    ref: 'INV-402910',
    note: 'Client project milestone #2'
  },
  {
    id: 'tx-108',
    merchant: 'Spotify Premium Family',
    category: 'Entertainment',
    date: '2026-09-20T00:00:00',
    displayDate: 'Sep 20, 2026',
    amount: -16.99,
    type: 'expense',
    status: 'Completed',
    card: 'Sunset Cloud (•••• 6631)',
    cardId: 'card-3',
    icon: 'play',
    color: 'rose',
    ref: 'TXN-55910283',
    note: 'Monthly subscription'
  },
  {
    id: 'tx-109',
    merchant: 'Blue Bottle Coffee',
    category: 'Restaurants',
    date: '2026-09-20T08:15:00',
    displayDate: 'Sep 20, 2026',
    amount: -7.25,
    type: 'expense',
    status: 'Completed',
    card: 'Emerald Everyday (•••• 4829)',
    cardId: 'card-1',
    icon: 'food',
    color: 'peach',
    ref: 'TXN-49201948',
    note: 'Morning pour-over coffee'
  },
  {
    id: 'tx-110',
    merchant: 'Equinox Fitness Club',
    category: 'Health',
    date: '2026-09-18T06:30:00',
    displayDate: 'Sep 18, 2026',
    amount: -180.00,
    type: 'expense',
    status: 'Completed',
    card: 'Obsidian Infinite (•••• 1092)',
    cardId: 'card-2',
    icon: 'chart',
    color: 'sky',
    ref: 'TXN-39102847',
    note: 'Monthly club membership'
  },
  {
    id: 'tx-111',
    merchant: 'ConEdison Electric Utility',
    category: 'Utilities',
    date: '2026-09-15T10:00:00',
    displayDate: 'Sep 15, 2026',
    amount: -94.30,
    type: 'expense',
    status: 'Completed',
    card: 'Checking Account',
    cardId: 'card-1',
    icon: 'receipt',
    color: 'yellow',
    ref: 'BIL-29103847',
    note: 'Power statement'
  },
  {
    id: 'tx-112',
    merchant: 'Vanguard Dividend Payout',
    category: 'Investment',
    date: '2026-09-02T08:00:00',
    displayDate: 'Sep 02, 2026',
    amount: 145.20,
    type: 'income',
    status: 'Completed',
    card: 'Savings Account',
    cardId: 'card-1',
    icon: 'down',
    color: 'lime',
    ref: 'DIV-1029384',
    note: 'Quarterly ETF distribution'
  }
];

export const INITIAL_BILLS = [
  {
    id: 'bill-1',
    title: 'ConEdison Clean Energy',
    category: 'Utilities',
    amount: 94.30,
    dueDate: '2026-10-03',
    daysLeft: 4,
    status: 'unpaid',
    icon: 'bolt',
    autoPay: true
  },
  {
    id: 'bill-2',
    title: 'Verizon Gigabit Fiber 5G',
    category: 'Internet',
    amount: 65.00,
    dueDate: '2026-10-06',
    daysLeft: 7,
    status: 'unpaid',
    icon: 'wifi',
    autoPay: false
  },
  {
    id: 'bill-3',
    title: 'Metropolitan Water Dept',
    category: 'Utilities',
    amount: 38.50,
    dueDate: '2026-10-12',
    daysLeft: 13,
    status: 'unpaid',
    icon: 'droplet',
    autoPay: false
  },
  {
    id: 'bill-4',
    title: 'State Farm Premier Auto',
    category: 'Insurance',
    amount: 142.00,
    dueDate: '2026-10-18',
    daysLeft: 19,
    status: 'unpaid',
    icon: 'shield',
    autoPay: true
  }
];

export const INITIAL_GOALS = [
  {
    id: 'goal-1',
    title: 'Emergency Rainy Day Fund',
    category: 'Safety',
    target: 10000,
    current: 8250,
    color: 'emerald',
    icon: 'shield',
    targetDate: 'Dec 2026'
  },
  {
    id: 'goal-2',
    title: 'Tokyo & Kyoto Autumn Trip',
    category: 'Travel',
    target: 5000,
    current: 3400,
    color: 'sky',
    icon: 'plane',
    targetDate: 'Nov 2026'
  },
  {
    id: 'goal-3',
    title: 'MacBook Pro M4 Max Studio',
    category: 'Tech',
    target: 3500,
    current: 2850,
    color: 'amber',
    icon: 'laptop',
    targetDate: 'Jan 2027'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Direct Deposit Cleared',
    message: 'Your salary of $4,850.00 from Stripe Inc. is now available in your Everyday account.',
    time: '2 hours ago',
    type: 'success',
    isRead: false
  },
  {
    id: 'notif-2',
    title: 'Upcoming Bill Payment Reminder',
    message: 'ConEdison bill of $94.30 is due in 4 days. Auto-pay is enabled.',
    time: '4 hours ago',
    type: 'warning',
    isRead: false
  },
  {
    id: 'notif-3',
    title: 'Smart Spending Insight',
    message: 'Great job! You spent 18% less on dining and entertainment compared to last month.',
    time: '1 day ago',
    type: 'info',
    isRead: false
  },
  {
    id: 'notif-4',
    title: 'Security Verification',
    message: 'New sign-in detected on Chrome macOS 15.1 in New York, NY. Was this you?',
    time: '2 days ago',
    type: 'alert',
    isRead: true
  }
];

export const SPENDING_BY_CATEGORY = [
  { name: 'Groceries', amount: 642.50, color: '#34d399', percentage: 22.6 },
  { name: 'Dining & Cafes', amount: 512.80, color: '#fb923c', percentage: 18.1 },
  { name: 'Shopping & Tech', amount: 489.00, color: '#a78bfa', percentage: 17.2 },
  { name: 'Transport & Travel', amount: 382.40, color: '#38bdf8', percentage: 13.5 },
  { name: 'Bills & Utilities', amount: 339.80, color: '#facc15', percentage: 12.0 },
  { name: 'Entertainment', amount: 284.00, color: '#f43f5e', percentage: 10.0 },
  { name: 'Health & Wellness', amount: 190.00, color: '#4ade80', percentage: 6.6 }
];

export const CASHFLOW_DATA = {
  Week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    income: [0, 4850, 0, 1570, 0, 0, 0],
    expenses: [120, 86, 42, 24, 180, 210, 85],
    totalSpent: 747.00,
    totalIncome: 6420.00,
    points: [45, 78, 62, 85, 48, 65, 38]
  },
  Month: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    income: [145, 1570, 4850, 0],
    expenses: [680, 720, 890, 550],
    totalSpent: 2840.50,
    totalIncome: 6565.00,
    points: [35, 55, 85, 60]
  },
  Year: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    income: [5800, 6100, 5900, 6400, 6200, 6700, 6400, 6800, 6420, 6500, 6700, 7200],
    expenses: [3200, 3100, 2950, 3400, 3100, 3500, 3300, 3600, 2840, 3200, 3900, 4200],
    totalSpent: 36390.00,
    totalIncome: 77120.00,
    points: [30, 42, 38, 56, 49, 68, 62, 75, 58, 64, 78, 85]
  }
};
