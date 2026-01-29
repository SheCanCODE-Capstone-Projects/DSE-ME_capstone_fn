
"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  finance: { budget: string; spent: string; status: string; auditDate: string };
}

interface FinancialAuditsTabProps {
  partnerData: Partner[];
}

const FinancialAuditsTab: React.FC<FinancialAuditsTabProps> = ({ partnerData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
    {partnerData.map((p) => (
      <div key={p.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-lg font-black text-[#1e3a8a]">{p.name}</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Audit Cycle Q1 2025</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
            p.finance.status === 'Verified' ? 'bg-green-100 text-green-700' : 
            p.finance.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
          }`}>
            {p.finance.status}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Total Budget</p>
            <p className="text-lg font-black text-[#1e3a8a]">{p.finance.budget}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Actual Spent</p>
            <p className="text-lg font-black text-[#0B609D]">{p.finance.spent}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
          <span className="flex items-center gap-1.5"><ShieldCheck size={14}/> Verified: {p.finance.auditDate}</span>
          <button className="text-[#0B609D] hover:underline">View Vouchers</button>
        </div>
      </div>
    ))}
  </div>
);

export default FinancialAuditsTab;
