'use client'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { meApi, RetentionData } from '@/lib/meApi';

const employmentData = [
  { month: 'Jan', jobs: 12, internships: 8 },
  { month: 'Feb', jobs: 15, internships: 12 },
  { month: 'Mar', jobs: 22, internships: 10 },
  { month: 'Apr', jobs: 18, internships: 15 },
  { month: 'May', jobs: 28, internships: 20 },
  { month: 'Jun', jobs: 35, internships: 18 },
];

export const EmploymentChart = () => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-[320px] flex flex-col">
    <div className="mb-4">
      <h3 className="text-sm font-bold text-slate-800">Employment Success</h3>
      <p className="text-xs text-slate-500">Monthly job vs internship placements</p>
    </div>
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={employmentData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
          <YAxis fontSize={10} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
          <Bar dataKey="jobs" fill="#0284c7" radius={[4, 4, 0, 0]} barSize={20} name="Full-time Jobs" />
          <Bar dataKey="internships" fill="#bae6fd" radius={[4, 4, 0, 0]} barSize={20} name="Internships" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const RetentionChart = () => {
  const [data, setData] = useState<RetentionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retentionData = await meApi.getRetentionTrend();
        setData(retentionData);
      } catch (error) {
        console.error('Failed to fetch retention data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-[320px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800">Enrollment vs. Active</h3>
        <p className="text-xs text-slate-500">Participant retention since cohort start</p>
      </div>
      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-full text-slate-400">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="week" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} domain={[0, 'auto']} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="enrolled" stroke="#cbd5e1" strokeWidth={2} dot={false} name="Initial Enrollment" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="active" stroke="#0284c7" strokeWidth={3} dot={{ r: 4, fill: '#0284c7' }} activeDot={{ r: 6 }} name="Currently Active" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
