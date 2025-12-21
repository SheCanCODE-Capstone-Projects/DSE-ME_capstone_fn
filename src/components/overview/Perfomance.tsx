'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const performanceData = [
  { week: 'Week 1', score: 75 },
  { week: 'Week 2', score: 82 },
  { week: 'Week 3', score: 78 },
  { week: 'Week 4', score: 87 },
];

function PerformanceChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-80">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-700">Student Performance Trends</h3>
        <select className="bg-gray-50 border-none text-xs font-semibold text-gray-500 rounded-lg py-1 px-3 outline-none cursor-pointer hover:bg-gray-100">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="week" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#0e4da4" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#0e4da4", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#0e4da4" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;