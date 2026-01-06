import React, { useState } from 'react';
import { Mail, BellRing, UserCheck, Megaphone } from 'lucide-react';

function NotificationsPanel() {
  const [toggles, setToggles] = useState({
    email: true,
    browser: false,
    session: true,
    updates: false,
  });

  const toggle = (id: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const notificationTypes = [
    { id: 'email', label: 'Email Notifications', desc: 'Summary of student progress and hub activity.', icon: Mail },
    { id: 'browser', label: 'Real-time Alerts', desc: 'Push notifications for immediate task actions.', icon: BellRing },
    { id: 'session', label: 'Session Reminders', desc: 'Reminders 30 minutes before hub sessions start.', icon: UserCheck },
    { id: 'updates', label: 'Platform Updates', desc: 'News about new features and scheduled maintenance.', icon: Megaphone },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        <h3 className="text-lg font-bold text-slate-900">
          Notification Preferences
        </h3>
        <p className="text-sm text-slate-500">
          Choose how and when you want to stay updated.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {notificationTypes.map((type) => (
          <div
            key={type.id}
            className="group flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-sky-200 hover:bg-sky-50/10 transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-5">
              <div
                className={`p-3 rounded-xl transition-colors
                  ${
                    toggles[type.id]
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}
              >
                <type.icon size={22} />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 leading-none">
                  {type.label}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {type.desc}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggle(type.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all
                focus:outline-none focus:ring-2 focus:ring-sky-500 ring-offset-2 ring-offset-white
                ${toggles[type.id] ? 'bg-sky-600' : 'bg-slate-200'}
              `}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform
                  ${toggles[type.id] ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPanel;
