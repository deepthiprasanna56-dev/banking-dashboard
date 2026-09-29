import { useState } from 'react';
import { X, Bell, Check, Trash2, CheckCircle2, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

export default function NotificationsDrawer({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick
}) {
  const [filter, setFilter] = useState('all');

  if (!isOpen) return null;

  const filtered = filter === 'unread' 
    ? notifications.filter(n => !n.isRead) 
    : notifications;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'alert':
        return <ShieldAlert size={16} className="text-rose-500" />;
      default:
        return <Info size={16} className="text-sky-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-modal-pop">
      <div 
        className="w-full max-w-sm h-full bg-white dark:bg-[#11241f] border-l border-zinc-200 dark:border-emerald-900/40 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-emerald-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-emerald-600 dark:text-[#b4ea6c]" />
            <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">
              Notifications
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-[#b4ea6c]">
              {notifications.filter(n => !n.isRead).length} new
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
            <X size={18} />
          </button>
        </div>

        {/* Filter & Actions Bar */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-[#0c1a16] border-b border-zinc-100 dark:border-emerald-900/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-emerald-900/60 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 dark:text-emerald-400/70 hover:text-zinc-800'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-white dark:bg-emerald-900/60 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 dark:text-emerald-400/70 hover:text-zinc-800'
              }`}
            >
              Unread
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] font-semibold text-emerald-600 dark:text-[#b4ea6c] hover:underline flex items-center gap-1"
              title="Mark all as read"
            >
              <Check size={12} />
              <span>Mark all</span>
            </button>
            <button
              onClick={onClearAll}
              className="text-[11px] font-semibold text-zinc-400 hover:text-rose-500 flex items-center gap-1"
              title="Clear all"
            >
              <Trash2 size={12} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-emerald-900/20">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 dark:text-emerald-400/50 space-y-2">
              <Bell size={32} className="mx-auto opacity-30" />
              <p className="text-xs">No notifications right now.</p>
              <p className="text-[10px]">You are completely caught up!</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onNotificationClick(item)}
                className={`p-4 transition-colors cursor-pointer hover:bg-zinc-50 dark:hover:bg-white/5 relative ${
                  !item.isRead ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                }`}
              >
                {!item.isRead && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#11241f]" />
                )}
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-xl bg-zinc-100 dark:bg-[#18362d] shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="space-y-1 pr-3">
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-emerald-200/70 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-zinc-400 dark:text-emerald-400/50 block pt-0.5">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
