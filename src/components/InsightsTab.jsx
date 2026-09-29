import { useState, useMemo } from 'react';
import { 
  Target, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  Plane, 
  Laptop, 
  Lightbulb
} from 'lucide-react';
import { formatCurrency, fireConfetti } from '../utils/formatters';
import { SPENDING_BY_CATEGORY } from '../data/initialData';

export default function InsightsTab({
  goals,
  onContributeGoal,
  onAddGoal,
  currency
}) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('September 2026');

  const totalCategorySpend = useMemo(
    () => SPENDING_BY_CATEGORY.reduce((acc, c) => acc + c.amount, 0),
    []
  );

  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  const donutSlices = useMemo(() => {
    const slices = [];
    let runningAngle = 0;
    for (let i = 0; i < SPENDING_BY_CATEGORY.length; i++) {
      const cat = SPENDING_BY_CATEGORY[i];
      const arcLength = (cat.amount / totalCategorySpend) * circumference;
      slices.push({
        ...cat,
        strokeDasharray: `${arcLength} ${circumference}`,
        strokeDashoffset: -runningAngle
      });
      runningAngle += arcLength;
    }
    return slices;
  }, [totalCategorySpend, circumference]);

  const getGoalIcon = (icon) => {
    switch (icon) {
      case 'plane':
        return <Plane size={18} className="text-sky-500" />;
      case 'laptop':
        return <Laptop size={18} className="text-amber-500" />;
      default:
        return <ShieldCheck size={18} className="text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-900 dark:text-white">
            Spending Insights & Wealth Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-emerald-200/70 mt-1">
            Predictive cash allocation, categorical breakdown, and interactive savings goals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-emerald-800/40 bg-white dark:bg-[#142620] text-zinc-800 dark:text-zinc-100 text-xs font-bold shadow-xs focus:outline-none"
          >
            <option value="September 2026">September 2026</option>
            <option value="August 2026">August 2026</option>
            <option value="July 2026">July 2026</option>
            <option value="Year 2026">Full Year 2026</option>
          </select>
        </div>
      </div>

      {/* Row 1: Donut Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between items-center mb-2">
            <h3 className="font-heading font-bold text-sm text-zinc-900 dark:text-white">
              Category Distribution
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-[#b4ea6c]">
              {SPENDING_BY_CATEGORY.length} Categories
            </span>
          </div>

          {/* Interactive SVG Donut */}
          <div className="relative w-48 h-48 my-4 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90 transform">
              {donutSlices.map((slice) => (
                <circle
                  key={slice.name}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth="20"
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  className="transition-all duration-300 cursor-pointer hover:opacity-80"
                  onMouseEnter={() => setHoveredCategory(slice)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              ))}
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
              <span className="text-[10px] text-zinc-400 dark:text-emerald-400/70 font-semibold uppercase tracking-wider">
                {hoveredCategory ? hoveredCategory.name : 'Total Outflow'}
              </span>
              <span className="font-heading font-extrabold text-base sm:text-lg text-zinc-900 dark:text-white">
                {formatCurrency(hoveredCategory ? hoveredCategory.amount : totalCategorySpend, currency)}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-[#b4ea6c]">
                {hoveredCategory ? `${hoveredCategory.percentage}%` : '100%'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60 text-center">
            Hover over any chart segment to isolate category details.
          </p>
        </div>

        {/* Category List & Progress Bars (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">
              Categorical Budget Utilization
            </h3>
            <span className="text-xs font-mono font-bold text-zinc-500 dark:text-emerald-400/80">
              Total: {formatCurrency(totalCategorySpend, currency)}
            </span>
          </div>

          <div className="space-y-3">
            {SPENDING_BY_CATEGORY.map((cat) => (
              <div 
                key={cat.name}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`p-2.5 rounded-xl transition-all ${
                  hoveredCategory?.name === cat.name
                    ? 'bg-zinc-100 dark:bg-white/5 ring-1 ring-emerald-500/30'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: cat.color }} 
                    />
                    <span className="font-bold text-zinc-800 dark:text-zinc-100">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">{cat.percentage}%</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{formatCurrency(cat.amount, currency)}</span>
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-emerald-950 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage * 2.5}%`,
                      backgroundColor: cat.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Savings Goals Manager */}
      <div className="glass-panel p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
              <Target size={20} className="text-emerald-500" />
              <span>Target Savings Goals</span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-emerald-200/70 mt-0.5">
              Automated smart vault rules helping you achieve milestones faster.
            </p>
          </div>

          <button
            onClick={() => onAddGoal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-emerald-800/40 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5"
          >
            <Plus size={14} />
            <span>Create New Goal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.map((goal) => {
            const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100);
            return (
              <div
                key={goal.id}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50/50 dark:bg-[#0c1a16] flex flex-col justify-between space-y-4 hover:border-emerald-500 dark:hover:border-[#b4ea6c] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#18362d] shadow-sm flex items-center justify-center">
                      {getGoalIcon(goal.icon)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-[#b4ea6c] font-bold">
                      {pct}%
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                    {goal.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 dark:text-emerald-400/60">
                    Target: {goal.targetDate}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline text-xs mb-1.5">
                    <span className="font-heading font-extrabold text-zinc-900 dark:text-white">
                      {formatCurrency(goal.current, currency)}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      of {formatCurrency(goal.target, currency)}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-emerald-950 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 dark:bg-[#b4ea6c] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-200/60 dark:border-emerald-900/30 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onContributeGoal(goal.id, 100);
                      fireConfetti();
                    }}
                    className="flex-1 py-1.5 rounded-lg border border-zinc-200 dark:border-emerald-800/40 text-[11px] font-bold text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-white/5 transition-colors"
                  >
                    +${100}
                  </button>
                  <button
                    onClick={() => {
                      onContributeGoal(goal.id, 250);
                      fireConfetti();
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-[#17483c] hover:bg-[#12392f] dark:bg-[#b4ea6c] dark:hover:bg-[#cbf58b] text-white dark:text-[#112d26] text-[11px] font-bold transition-all shadow-xs"
                  >
                    +${250}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 3: AI Smart Financial Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/10 to-teal-900/10 border border-emerald-500/20 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-[#b4ea6c] shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
              Surplus Liquidity Optimization
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-emerald-200/70 leading-relaxed">
              You maintain $6,200 in zero-yield checking beyond your 30-day liquidity buffer. Moving $4,000 to Aura Vault would generate ~$206 in annual yield.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-900/10 to-orange-900/10 border border-amber-500/20 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
            <Lightbulb size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
              Subscription Efficiency Detected
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-emerald-200/70 leading-relaxed">
              We identified 4 active digital subscriptions totaling $68.97/mo. All renewals are mapped and protected by your Sunset Virtual card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
