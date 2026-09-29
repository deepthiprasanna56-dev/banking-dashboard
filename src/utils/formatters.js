import confetti from 'canvas-confetti';

/**
 * Format a number as currency based on selected currency and conversion rate
 */
export function formatCurrency(amount, currency = { symbol: '$', rate: 1.0, code: 'USD' }) {
  if (amount === undefined || amount === null || isNaN(amount)) return `${currency.symbol}0.00`;
  const converted = Math.abs(amount) * currency.rate;
  const formatted = converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const sign = amount < 0 ? '-' : '';
  return `${sign}${currency.symbol}${formatted}`;
}

/**
 * Format date nicely
 */
export function formatDate(dateString) {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Export transactions to CSV and trigger browser download
 */
export function exportTransactionsToCSV(transactions, filename = 'transactions_export.csv') {
  if (!transactions || !transactions.length) return false;
  const headers = ['Transaction ID', 'Merchant', 'Category', 'Date', 'Amount', 'Type', 'Status', 'Account/Card', 'Reference', 'Notes'];
  const rows = transactions.map(t => [
    `"${t.id}"`,
    `"${t.merchant.replace(/"/g, '""')}"`,
    `"${t.category}"`,
    `"${t.displayDate || t.date}"`,
    t.amount,
    `"${t.type}"`,
    `"${t.status}"`,
    `"${t.card}"`,
    `"${t.ref}"`,
    `"${(t.note || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}

/**
 * Fire festive confetti animation
 */
export function fireConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c1ed80', '#34d399', '#6ee7b7', '#facc15', '#38bdf8']
    });
  } catch (err) {
    console.warn('Confetti error:', err);
  }
}

/**
 * Copy text to clipboard safely
 */
export async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}
