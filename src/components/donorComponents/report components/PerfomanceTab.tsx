
"use client";

import React from 'react';
import { Target, Activity } from 'lucide-react';
import StatusCard from '../../../components/ui/statuscard';

interface Partner {
  id: string;
  name: string;
  performance: { reach: number; employment: number; graduation: number };
}

interface PerformanceTabProps {
  partnerData: Partner[];
}

const PerformanceTab: React.FC<PerformanceTabProps> = ({ partnerData }) => (
  <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
       <StatusCard title="Avg. Reach" value="88.2%" icon={<Target size={18}/>} subtext="across all hubs" />
       <StatusCard title="Top Performer" value="Klab" icon={<Activity size={18}/>} subtext="highest growth" />
    </div>
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <tr>
            <th className="px-8 py-5 text-left">Partner Name</th>
            <th className="px-8 py-5 text-center">Reach Rate</th>
            <th className="px-8 py-5 text-center">Employment Rate</th>
            <th className="px-8 py-5 text-center">Graduation Rate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {partnerData.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-8 py-6 font-bold text-[#1e3a8a]">{p.name}</td>
              <td className="px-8 py-6 text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-black text-[#0B609D]">{p.performance.reach}%</span>
                  <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div style={{ width: `${p.performance.reach}%` }} className="h-full bg-[#0B609D]" />
                  </div>
                </div>
              </td>
              <td className="px-8 py-6 text-center font-black text-green-600">{p.performance.employment}%</td>
              <td className="px-8 py-6 text-center font-black text-slate-700">{p.performance.graduation}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PerformanceTab;
