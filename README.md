# Aura Banking — Next-Generation Financial Dashboard UI

A modern, responsive, and interactive Banking Dashboard UI built with **React 19**, **Vite**, and **Tailwind CSS**. Designed with an executive fintech aesthetic inspired by Linear, Revolut, Stripe, and Apple Card.

---

## 🌟 Key Features

### 1. 📊 Executive Overview & Portfolio
- **Real-Time Net Worth & Account Balance**: Displays total available balance with dynamic masking (`••••••••`) privacy toggle and month-over-month growth analytics (+8.2%).
- **Interactive Bezier Cash Flow Trajectory**: Smooth SVG spline chart with hover tooltips displaying date and exact spend/income metrics across **Week**, **Month**, and **Year** timescales.
- **Key Financial Health Indicators**: Real-time monthly inflow/outflow comparison, savings goal progress, and Tier-1 credit health score (785).

### 2. 💳 3D Interactive Cards & Biometric Controls
- **3D Interactive Flip Cards**: Real-time 3D rotation (`rotateY(180deg)`) revealing magnetic stripe, signature bar, customer concierge, and CVV code with eye toggle.
- **Security Suite**: One-click card freezing, real-time monthly spending limit sliders, and toggles for Contactless NFC, Online E-Commerce, and International FX transactions.
- **Instant Card Issuance**: Add and customize new cards (Debit, Credit, Virtual) with multiple themes (Emerald Forest, Obsidian Carbon, Sunset Copper, Royal Gold).
- **One-Click Card Copy**: Safe clipboard copying of formatted card numbers with status feedback.

### 3. 💸 Payments, Transfers & Settlement
- **Instant Peer-to-Peer Transfers**: Transfer funds with recipient selector, preset chips ($25, $50, $100, $250, $500), source account picking, balance validation, and animated confirmation.
- **Celebratory Confetti**: Interactive particle bursts (`canvas-confetti`) upon sending money, paying bills, and saving.
- **Automated Bill Settlements**: One-click settlement for power, fiber internet, water, and insurance with instant balance deduction and electronic receipting.
- **Personal Scan-to-Pay QR Code**: Generated QR pattern and custom shareable payment URLs for requesting money.

### 4. 📜 Ledger & Transaction Explorer
- **Search & Multi-Filters**: Instant text search by merchant, category, reference ID, or custom memo with category pills and Income/Expense segregation.
- **Official Digital Receipts**: Modal receipt view with reference IDs, timestamps, payment instruments, and "Download Receipt" `.txt` file export.
- **One-Click CSV Export**: Direct browser generation and download of complete ledger statement (`.csv`).

### 5. 🎯 Spending Insights & Wealth Intelligence
- **Interactive Category Donut Chart**: Hover-responsive SVG donut chart visualizing percentage allocations for Groceries, Dining, Shopping, Transport, Utilities, and Entertainment.
- **Goal Contribution Vaults**: Rainy Day emergency funds, travel targets, and tech goals with one-tap fund contribution and progress bars.
- **AI Financial Insights**: Automated tips for surplus liquidity yield optimization and subscription audits.

### 6. ⚙️ Universal Settings & System Preferences
- **Multi-Currency Engine**: Dynamically recalculates all figures across the entire app with live exchange rates for **USD ($)**, **EUR (€)**, **GBP (£)**, **JPY (¥)**, **INR (₹)**, and **CAD (CA$)**.
- **Dark & Light Mode**: Seamless toggle between forest emerald dark luxury and clean ivory daylight palettes.
- **Global Command Palette (`Ctrl+K` / `⌘K`)**: Quick launcher for navigating pages, finding transactions, issuing cards, and executing banking actions.
- **Notification Drawer**: Filterable notifications center with "Mark all as read" and "Clear" controls.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Custom CSS Glassmorphism
- **Icons**: [Lucide React](https://lucide.dev/)
- **Micro-Interactions**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment Configs**: Ready for [Netlify](https://www.netlify.com/) (`netlify.toml`) & [Vercel](https://vercel.com/) (`vercel.json`)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation
```bash
# Clone or navigate to the repository
cd banking-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production
```bash
npm run build
```
The optimized production bundle will be output to the `dist/` directory.

### Code Quality & Linting
```bash
npm run lint
```

---

## 📦 How to Upload to GitHub

Follow these steps in your terminal to create and push this project to your GitHub account:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage all project files
git add .

# 3. Create your initial commit
git commit -m "feat: complete modern banking dashboard UI with advanced animations"

# 4. Set the main branch name
git branch -M main

# 5. Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🌐 Deploy to Vercel or Netlify

This project includes pre-configured `vercel.json` and `netlify.toml` files for zero-configuration, 100% single-page routing support.

### Option A: Deploy to Vercel
#### Method 1: Using Vercel Dashboard (Recommended)
1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" > "Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **"Deploy"**.

#### Method 2: Using Vercel CLI
```bash
npx vercel
```

---

### Option B: Deploy to Netlify
#### Method 1: Using Netlify Dashboard (Recommended)
1. Push your repository to GitHub.
2. Go to [Netlify Dashboard](https://app.netlify.com/) and click **"Add new site" > "Import an existing project"**.
3. Connect your GitHub repository.
4. Build command: `npm run build`.
5. Publish directory: `dist`.
6. Click **"Deploy site"**.

#### Method 2: Manual Drag & Drop
1. Run `npm run build` locally.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder directly into your browser.

#### Method 3: Using Netlify CLI
```bash
npx netlify deploy --prod
```

---

## 📂 Project Architecture

```
banking-dashboard/
├── index.html                   # HTML template with preconnected fonts & meta
├── netlify.toml                 # Netlify SPA routing & build specification
├── vercel.json                  # Vercel SPA routing & build specification
├── package.json                 # Scripts and dependencies
├── vite.config.js               # Vite + Tailwind + React plugins
├── public/                      # Static assets
└── src/
    ├── main.jsx                 # React DOM root entry
    ├── App.jsx                  # Master application orchestrator & state manager
    ├── index.css                # Base Tailwind imports & CSS custom properties
    ├── dashboard.css            # 3D transforms, glassmorphism, & animation rules
    ├── data/
    │   └── initialData.js       # Currencies, mock cards, transactions, goals, bills
    ├── utils/
    │   └── formatters.js        # Currency formatter, CSV exporter, confetti, clipboard
    └── components/
        ├── Sidebar.jsx          # Collapsible responsive sidebar with navigation
        ├── TopNavbar.jsx        # Breadcrumbs, currency switcher, notifications, actions
        ├── OverviewTab.jsx      # Executive dashboard, 3D card widget, bezier charts
        ├── TransactionsTab.jsx  # Searchable, filterable ledger with CSV export
        ├── CardsTab.jsx         # 3D interactive flip cards with CVV reveal & limit controls
        ├── PaymentsTab.jsx      # Peer transfers, bill settlements & QR generator
        ├── InsightsTab.jsx      # SVG donut chart, categorical budgets & savings goals
        ├── SettingsTab.jsx      # Profile editor, biometrics, currencies & demo reset
        ├── SendMoneyModal.jsx   # Animated peer transfer modal with instant receipts
        ├── AddCardModal.jsx     # Digital card creation modal with live preview
        ├── AddTransactionModal.jsx # Manual income/expense ledger entry modal
        ├── TransactionDetailModal.jsx # Verified digital receipt modal with export
        ├── NotificationsDrawer.jsx # Slide-over notifications drawer
        ├── CommandPalette.jsx   # Global Ctrl+K fast action search modal
        └── Toast.jsx            # Toast alerts with auto-dismiss
```

---

## 🔒 Security & Privacy Notice
All banking data is rendered client-side with mock financial encryption standards for demonstration and UI testing purposes.
