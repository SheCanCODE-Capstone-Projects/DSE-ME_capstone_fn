import React from 'react';
import { Sun, Moon, Laptop, ChevronDown, CheckCircle2 } from 'lucide-react';

interface PreferencesPanelProps {
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

const PreferencesPanel: React.FC<PreferencesPanelProps> = ({ theme, onThemeChange }) => {
  return (
    <div className="space-y-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-8">
        <header>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Appearance</h3>
          <p className="text-base text-slate-500 font-medium mt-1">
            Select the visual interface that best suits your environment.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { id: 'light', label: 'Daylight', icon: Sun, desc: 'Optimized for focus' },
            { id: 'dark', label: 'Deep Dark', icon: Moon, desc: 'Eye-strain reduction' },
            { id: 'system', label: 'Adaptive', icon: Laptop, desc: 'Sync with device' },
          ].map((item) => {
            const isActive = theme === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onThemeChange(item.id as any)}
                className={`
                  relative flex flex-col items-center p-8 rounded-[2.5rem] border-[3px] transition-all duration-500 text-center group
                  ${isActive 
                    ? 'border-blue-600 bg-blue-50/50 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.2)]' 
                    : 'border-slate-100 bg-white/40 hover:border-blue-200'}
                `}
              >
                <div className={`
                  mb-6 p-5 rounded-2xl transition-all duration-500
                  ${isActive ? 'bg-blue-600 text-white shadow-2xl scale-110' : 'bg-white text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500'}
                `}>
                  <item.icon size={32} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <p className={`font-black text-lg tracking-tight ${isActive ? 'text-blue-900' : 'text-slate-900'}`}>
                  {item.label}
                </p>
                <p className="text-[11px] font-black text-slate-400 mt-1 uppercase tracking-widest">{item.desc}</p>
                
                {isActive && (
                  <div className="absolute top-4 right-4 text-blue-600 animate-in zoom-in duration-300">
                    <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-14 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">
            Display Language
          </label>
          <div className="relative group">
            <select className="w-full appearance-none bg-white/50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all cursor-pointer">
              <option>English (International)</option>
              <option>Français (Afrique)</option>
              <option>Swahili (Regional)</option>
              <option>Twi (Ghana)</option>
            </select>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
              <ChevronDown size={20} />
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">
            Primary Timezone
          </label>
          <div className="relative group">
            <select className="w-full appearance-none bg-white/50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all cursor-pointer">
              <option>GMT (UTC+00:00) Accra</option>
              <option>CAT (UTC+02:00) Johannesburg</option>
              <option>WAT (UTC+01:00) Lagos</option>
            </select>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
              <ChevronDown size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPanel;
