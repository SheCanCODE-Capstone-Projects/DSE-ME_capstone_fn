
"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 65 },
  { name: 'Mar', value: 55 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 75 },
  { name: 'Jun', value: 95 },
];

const ImpactTrendChart: React.FC = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col h-full min-h-[400px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-[#1e3a8a] flex items-center gap-2">
          <TrendingUp className="text-[#0B609D]" size={22} /> Impact Growth Trend
        </h3>
        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest bg-slate-50 px-4 py-1.5 rounded-full">
          6 Month View
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc', radius: 12 }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px 16px',
                backgroundColor: '#ffffff'
              }}
              itemStyle={{ color: '#1e3a8a', fontWeight: 900, fontSize: '14px' }}
              labelStyle={{ color: '#94a3b8', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
            />
            <Bar dataKey="value" radius={[8, 8, 8, 8]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#0B609D" fillOpacity={index === data.length - 1 ? 1 : 0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ImpactTrendChart;