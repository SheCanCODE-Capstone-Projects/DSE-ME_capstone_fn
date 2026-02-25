'use client'
import React, { useState } from 'react';
import ProfilePanel from '../../../components/settings/ProfilePanel';
import SecurityPanel from '../../../components/settings/SecurityPanel';
import PreferencesPanel from '../../../components/settings/PreferencesPnael';
import NotificationsPanel from '../../../components/settings/NotificationsPanel';
import SettingsHeader from '../../../components/settings/SettingsHeader';
import { TabType } from '../../facilitator';
import { User, Bell, Shield, Palette } from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notification', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ] as const;

  return (
    <div className="flex  min-h-screen  bg-[#f0f4f8] font-sans selection:bg-sky-100 selection:text-sky-700">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-2 md:p-6 lg:p-8 ">
          <SettingsHeader />

          <div className="flex flex-col lg:flex-row gap-5 flex-1 overflow-hidden">
            {/* Sidebar Navigation - Compact widths and paddings */}
            <nav className="lg:w-56 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 shrink-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap
                      ${isActive
                        ? 'bg-white text-sky-600 shadow-sm border border-slate-200'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                  >
                    <Icon size={16} className={isActive ? 'text-sky-600' : 'text-slate-400'} />
                    <span className="font-semibold text-xs">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Content Area - Scroll restricted to this container */}
            <div className="flex-1 flex flex-col min-h-0">
              <section className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-y-auto">
                <div className="p-5">
                  {activeTab === 'profile' && <ProfilePanel />}
                  {activeTab === 'notification' && <NotificationsPanel />}
                  {activeTab === 'security' && <SecurityPanel />}
                  {activeTab === 'preferences' && (
                    <PreferencesPanel 
                      theme="light" 
                      onThemeChange={(newTheme) => {
                        console.log('Selected theme:', newTheme);
                        localStorage.setItem('userTheme', newTheme); 
                      }}
                    />
                  )}
                </div>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
