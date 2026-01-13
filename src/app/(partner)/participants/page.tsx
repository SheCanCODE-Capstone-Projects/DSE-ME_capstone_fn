'use client';

import { useState } from 'react';
import { Download, Award, ArrowUpRight } from 'lucide-react';

// Dummy participant data
const participants = [
  { name: "Sarah Johnson", cohort: "A-001", gender: "Female", employment: "Employed", score: 92, income: "$55,000", status: "Completed" },
  { name: "Michael Brown", cohort: "A-001", gender: "Male", employment: "Employed", score: 78, income: "$48,000", status: "In Progress" },
  { name: "Emma Davis", cohort: "A-002", gender: "Female", employment: "Self-Employed", score: 88, income: "$62,000", status: "Completed" },
  { name: "James Wilson", cohort: "A-002", gender: "Male", employment: "Unemployed", score: null, income: "$0", status: "Not Started" },
];

const stats = [
  { label: "Total Participants", value: participants.length, icon: Award, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Top Performers", value: participants.filter(p => p.score && p.score >= 85).length, icon: Award, color: "text-yellow-600", bgColor: "bg-yellow-50" },
  { label: "Avg Score", value: Math.round(participants.filter(p => p.score).reduce((a,b)=>a+b.score!,0) / participants.filter(p=>p.score).length) + '%', icon: ArrowUpRight, color: "text-green-600", bgColor: "bg-green-50" },
  { label: "Active Cohorts", value: new Set(participants.map(p => p.cohort)).size, icon: Award, color: "text-purple-600", bgColor: "bg-purple-50" },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4 px-8 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-[20px] border border-slate-100 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className={`${stat.bgColor} p-3 rounded-xl`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#0057B8] leading-none">{stat.value}</span>
            <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ParticipantsTable() {
  return (
    <div className="px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#34597E]">Participants Management</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-white bg-[#0B609D] rounded-lg hover:bg-[#095083]">+ Add Participant</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"><Download className="w-4 h-4" /> CSV</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"><Download className="w-4 h-4" /> PDF</button>
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#EEF4FB] text-[#0057B8] text-[13px] font-bold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Cohort</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4">Employment</th>
              <th className="px-6 py-4 text-center">Score</th>
              <th className="px-6 py-4 text-center">Annual Income</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {participants.map((p, i) => (
              <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-6 font-semibold text-slate-800">{p.name}</td>
                <td className="px-6 py-6">{p.cohort}</td>
                <td className="px-6 py-6">{p.gender}</td>
                <td className="px-6 py-6">{p.employment}</td>
                <td className="px-6 py-6 text-center font-bold text-[#0057B8]">{p.score ?? '-'}</td>
                <td className="px-6 py-6 text-center">{p.income}</td>
                <td className="px-6 py-6 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.status === "Completed" ? "bg-green-100 text-green-700" :
                    p.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-center text-gray-500 cursor-pointer">⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ParticipantsPage() {
  return (
    <main className="flex-1 pb-10 bg-slate-50 min-h-screen">
      <div className="px-8 mb-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-1">Participants Management</h2>
        <p className="text-slate-500 mb-6">Track, filter, and manage all program participants</p>
      </div>

      <StatsCards />
      <ParticipantsTable />
    </main>
  );
}