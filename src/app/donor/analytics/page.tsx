
import React from 'react';
import GenderBalanceChart from '../../../components/donorComponents/graphs/GenderBalanceChart';
import PartnerPerformanceChart from '@/components/donorComponents/graphs/PartnerPerformanceChart';
import ImpactMomentumChart from '@/components/donorComponents/graphs/ImpactMomentumChart';
const Analytics: React.FC = () => {
  const regions = [
    { region: "Kigali City", value: 570, color: "bg-[#0B609D]" },
    { region: "Northern Province", value: 180, color: "bg-blue-400" },
    { region: "Eastern Province", value: 150, color: "bg-blue-300" },
    { region: "Western Province", value: 240, color: "bg-blue-200" },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GenderBalanceChart />
        <PartnerPerformanceChart />
        <ImpactMomentumChart />
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Regional Impact Distribution</h3>
          <div className="space-y-8">
            {regions.map((r, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-600 uppercase tracking-tight">{r.region}</span>
                  <span className="font-black text-[#1e3a8a]">{r.value} Students</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    style={{ width: `${(r.value/600)*100}%` }} 
                    className={`h-full ${r.color} rounded-full transition-all duration-1000`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Analytics;
