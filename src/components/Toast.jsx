import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl border text-sm max-w-md animate-modal-pop bg-white/95 dark:bg-[#152721]/95 backdrop-blur-md border-emerald-900/10 dark:border-emerald-500/20 text-[#13241d] dark:text-[#eff7f2]"
      style={{
        boxShadow: '0 20px 40px -15px rgba(17, 45, 38, 0.35)'
      }}
    >
      <div className={`p-1.5 rounded-lg shrink-0 ${
        isSuccess
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
          : isError
          ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
      }`}>
        {isSuccess ? <CheckCircle2 size={18} /> : isError ? <AlertCircle size={18} /> : <Info size={18} />}
      </div>

      <div className="flex-1 text-xs sm:text-sm font-medium pr-2">
        {toast.message}
      </div>

      <button
        onClick={onClose}
        className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md transition-colors"
        aria-label="Dismiss toast"
      >
        <X size={15} />
      </button>
    </div>
  );
}
