import React, { useState, useEffect } from 'react';
import { Save, Monitor, Smartphone, Globe } from 'lucide-react';

function SecurityPanel() {
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [storedPassword, setStoredPassword] = useState('password123'); // default password

  const [sessions, setSessions] = useState([
    { device: 'MacBook Pro 16"', location: 'Accra, GH', time: 'Active Now', icon: Monitor, status: 'current' },
    { device: 'iPhone 15 Pro', location: 'Tema, GH', time: '2 hours ago', icon: Smartphone, status: 'recent' },
    { device: 'Chrome on Windows', location: 'London, UK', time: 'Dec 02, 2025', icon: Globe, status: 'suspicious' },
  ]);

  useEffect(() => {
    const savedPassword = localStorage.getItem('userPassword');
    if (savedPassword) {
      setStoredPassword(savedPassword);
    } else {
      localStorage.setItem('userPassword', storedPassword);
    }
  }, []);

  const handleSave = () => {
    if (currentPasswordInput !== storedPassword) {
      alert('Current password is incorrect.');
      return;
    }
    if (newPasswordInput.length < 8) {
      alert('New password must be at least 8 characters.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      alert('New password and confirm password do not match.');
      return;
    }

    localStorage.setItem('userPassword', newPasswordInput);
    setStoredPassword(newPasswordInput);

    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');

    alert('Password updated successfully!');
  };

  const handleRevoke = (index: number) => {
    const session = sessions[index];
    if (session.status === 'current') {
      alert("You can't revoke the current session!");
      return;
    }
    const newSessions = sessions.filter((_, i) => i !== index);
    setSessions(newSessions);
    alert(`Revoked access for ${session.device}`);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-6">
        <header>
          <h3 className="text-lg font-bold text-slate-900">Account Password</h3>
          <p className="text-sm text-slate-500">Update your password to keep your account secure.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Password</label>
            <input 
              type="password"
              value={currentPasswordInput}
              onChange={(e) => setCurrentPasswordInput(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
            />
          </div>
          <div className="hidden md:block"></div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password</label>
            <input 
              type="password"
              value={newPasswordInput}
              onChange={(e) => setNewPasswordInput(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
            <input 
              type="password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-md"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
      <div className="pt-10 border-t border-slate-100 space-y-6">
        <header>
          <h3 className="text-lg font-bold text-slate-900">Recent Login Activity</h3>
          <p className="text-sm text-slate-500">Devices that have accessed your account recently.</p>
        </header>

        <div className="space-y-4">
          {sessions.map((session, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${session.status === 'current' ? 'bg-sky-100 text-sky-600' : 'bg-white text-slate-400'}`}>
                  <session.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{session.device}</p>
                  <p className="text-xs text-slate-500 font-medium">{session.location} • {session.time}</p>
                </div>
              </div>
              {session.status === 'current' ? (
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full ring-1 ring-green-500/20">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  ONLINE
                </span>
              ) : (
                <button
                  onClick={() => handleRevoke(i)}
                  className="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default SecurityPanel;
