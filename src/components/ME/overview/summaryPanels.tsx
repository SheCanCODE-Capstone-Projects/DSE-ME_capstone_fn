
import React from 'react';
import { AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';

export const AttendanceSummary = () => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
    <h3 className="text-sm font-bold text-slate-800 mb-4">Monthly Attendance</h3>
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path className="stroke-slate-100 fill-none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="stroke-sky-600 fill-none" strokeWidth="3" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-slate-800">92%</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 text-center">Average attendance for March</p>
      <div className="grid grid-cols-2 w-full gap-2 pt-2 border-t border-slate-50">
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Present</p>
          <p className="text-sm font-bold text-emerald-600">482</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Absent</p>
          <p className="text-sm font-bold text-rose-500">42</p>
        </div>
      </div>
    </div>
  </div>
);

export const TopPerformers = () => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
      <TrendingUp size={16} className="text-emerald-500" />
      Top Performers
    </h3>
    <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
      {[
        { name: 'Sarah Johnson', score: '98%', trend: '+2%' },
        { name: 'Michael Chen', score: '95%', trend: '+1%' },
        { name: 'Amina Diallo', score: '94%', trend: '+3%' },
        { name: 'Lukas Meyer', score: '92%', trend: '-1%' },
      ].map((p, i) => (
        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700">{p.name[0]}</div>
            <span className="text-xs font-semibold text-slate-700">{p.name}</span>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900">{p.score}</p>
            <p className={`text-[9px] ${p.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-400'}`}>{p.trend}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AlertsPanel = () => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
      <AlertCircle size={16} className="text-rose-500" />
      Real-time Alerts
    </h3>
    <div className="space-y-2">
      <div className="p-2 bg-rose-50 border border-rose-100 rounded-lg flex gap-3">
        <AlertCircle size={14} className="text-rose-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-rose-800">Missing Attendance</p>
          <p className="text-[10px] text-rose-600">3 cohorts have not logged attendance today yet.</p>
        </div>
      </div>
      <div className="p-2 bg-amber-50 border border-amber-100 rounded-lg flex gap-3">
        <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-amber-800">Employment Drop</p>
          <p className="text-[10px] text-amber-600">Rate dropped 4% below target this week.</p>
        </div>
      </div>
      <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg flex gap-3">
        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-emerald-800">Report Ready</p>
          <p className="text-[10px] text-emerald-600">Weekly performance summary is generated.</p>
        </div>
      </div>
    </div>
  </div>
);
