
"use client";

import React from 'react';

interface Partner {
  id: string;
  name: string;
  gender: { female: number; male: number };
}

interface GenderBalanceTabProps {
  partnerData: Partner[];
}

const GenderBalanceTab: React.FC<GenderBalanceTabProps> = ({ partnerData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
    {partnerData.map((p) => (
      <div key={p.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-lg font-black text-[#1e3a8a]">{p.name}</h4>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Female</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Male</span>
            </div>
          </div>
        </div>

        <div className="relative pt-2">
          <div className="flex justify-between mb-2 px-1">
             <span className="text-xs font-black text-pink-500">{p.gender.female}%</span>
             <span className="text-xs font-black text-blue-500">{p.gender.male}%</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden">
            <div style={{ width: `${p.gender.female}%` }} className="h-full bg-pink-400 transition-all duration-1000" />
            <div style={{ width: `${p.gender.male}%` }} className="h-full bg-blue-400 transition-all duration-1000" />
          </div>
          <p className="text-center mt-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            {p.gender.female >= 50 ? 'GENDER PARITY ACHIEVED' : 'PARITY GAP IDENTIFIED'}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default GenderBalanceTab;
