"use client";

import { Check, X, Calendar, Download, ClipboardList } from "lucide-react";
import { useState } from "react";
import StatCard from '@/components/ui/statuscard';

interface DailyRecord {
  id: string;
  name: string;
  status: string;
}

interface WeeklyRecord {
  id: string;
  name: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
}

interface MonthlyRecord {
  id: string;
  name: string;
  week1: string;
  week2: string;
  week3: string;
  week4: string;
  total: string;
}

interface SummaryData {
  totalPresent?: number;
  totalDays?: number;
  totalAttended?: number;
  totalPossible?: number;
  rate: string;
}

interface SelectedSummary {
  type: string;
  name: string;
  data: SummaryData;
}

export default function AttendancePage() {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");
  const [selectedSummary, setSelectedSummary] = useState<SelectedSummary | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleViewOverallSummary = (type: 'weekly' | 'monthly') => {
    if (type === 'weekly') {
      const totalPresent = weeklyRecords.reduce((acc, r) => {
        return acc + [r.mon, r.tue, r.wed, r.thu, r.fri].filter(day => day === 'Present').length;
      }, 0);
      const totalDays = weeklyRecords.length * 5;
      setSelectedSummary({ 
        type: 'weekly-overall', 
        name: 'All Students', 
        data: { totalPresent, totalDays, rate: `${Math.round((totalPresent/totalDays)*100)}%` }
      });
    } else {
      const totalAttended = monthlyRecords.reduce((acc, r) => {
        const [attended, total] = r.total.split('/').map(Number);
        return acc + attended;
      }, 0);
      const totalPossible = monthlyRecords.reduce((acc, r) => {
        const [, total] = r.total.split('/').map(Number);
        return acc + total;
      }, 0);
      setSelectedSummary({ 
        type: 'monthly-overall', 
        name: 'All Students', 
        data: { totalAttended, totalPossible, rate: `${Math.round((totalAttended/totalPossible)*100)}%` }
      });
    }
    setShowSummary(!showSummary);
  };

  const stats = [
    { icon: <Check size={32} />, title: "Present Today", value: 43, subtext: "+5 from yesterday" },
    { icon: <X size={32} />, title: "Absent Today", value: 2, subtext: "-1 from yesterday" },
    { icon: <Calendar size={32} />, title: "Late arrivals", value: 1, subtext: "Same as yesterday" },
    { icon: <ClipboardList size={32} />, title: "Attendance Rate", value: "80%", subtext: "+2% this week" },
  ];

  const dailyRecords: DailyRecord[] = [
    { id: "001", name: "Nadege Isi", status: "Present" },
    { id: "002", name: "Aline Uwnz", status: "Absent without communication" },
    { id: "003", name: "Diane Ing", status: "Absent with communication" },
  ];

  const weeklyRecords: WeeklyRecord[] = [
    { id: "001", name: "Nadege Isi", mon: "Present", tue: "Present", wed: "Absent", thu: "Present", fri: "Present" },
    { id: "002", name: "Aline Uwnz", mon: "Present", tue: "Absent", wed: "Present", thu: "Present", fri: "Absent" },
    { id: "003", name: "Diane Ing", mon: "Absent", tue: "Present", wed: "Present", thu: "Absent", fri: "Present" },
  ];

  const monthlyRecords: MonthlyRecord[] = [
    { id: "001", name: "Nadege Isi", week1: "4/5", week2: "5/5", week3: "3/5", week4: "4/5", total: "16/20" },
    { id: "002", name: "Aline Uwnz", week1: "3/5", week2: "4/5", week3: "5/5", week4: "3/5", total: "15/20" },
    { id: "003", name: "Diane Ing", week1: "5/5", week2: "3/5", week3: "4/5", week4: "5/5", total: "17/20" },
  ];

  const getTableTitle = () => {
    switch (view) {
      case "weekly": return "Weekly Attendance (Dec 1-5, 2025)";
      case "monthly": return "Monthly Attendance (December 2025)";
      default: return "Attendance for 2025-12-01";
    }
  };

  const handleExportReport = () => {
    const csvContent = [
      ['ID', 'Name', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Total'].join(','),
      ...monthlyRecords.map(record => 
        [record.id, record.name, record.week1, record.week2, record.week3, record.week4, record.total].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Monthly_Attendance_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 md:ml-28">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#34597E' }}>Attendance Tracking</h1>
          <p className="text-lg" style={{ color: '#796666' }}>Record and monitor daily attendance for your cohort</p>
        </div>
        <button 
          onClick={handleExportReport}
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-white shadow" 
          style={{ background: 'linear-gradient(135deg, #0B609D, #666666)' }}
        >
          <Download size={18} /> Export Monthly Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard 
            key={s.title}
            icon={s.icon}
            title={s.title}
            value={s.value}
            subtext={s.subtext}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-lg font-bold">Select Date:</label>
          <div className="rounded-xl border px-3 py-2">
            <input type="date" className="outline-none" defaultValue="2025-12-01" />
          </div>
        </div>

        <div className="flex gap-6 p-1">
          {(["daily", "weekly", "monthly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-3xl px-6 py-3 text-sm font-medium capitalize transition ${
                view === v ? "text-white shadow" : "text-black"
              }`}
              style={view === v ? { background: 'linear-gradient(135deg, #0B609D, #666666)' } : { backgroundColor: '#D9D9D9' }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="font-semibold">{getTableTitle()}</h2>
          {(view === "weekly" || view === "monthly") && (
            <button 
              onClick={() => handleViewOverallSummary(view)}
              className="rounded-3xl px-6 py-3 text-sm font-medium transition text-white shadow"
              style={{ background: 'linear-gradient(135deg, #0B609D, #666666)' }}
            >
              {showSummary ? 'Hide' : 'View'} {view === "weekly" ? "Weekly" : "Monthly"} Summary
            </button>
          )}
        </div>
        
        {showSummary && selectedSummary && (
          <div className="px-6 py-4 bg-blue-50 border-b">
            <h3 className="font-semibold text-blue-800 mb-3">
              {selectedSummary.type.includes('weekly') ? 'Weekly' : 'Monthly'} Summary
            </h3>
            {selectedSummary.type === 'weekly-overall' ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => {
                  const dayKey = ['mon', 'tue', 'wed', 'thu', 'fri'][index] as keyof WeeklyRecord;
                  const present = weeklyRecords.filter(r => r[dayKey] === 'Present').length;
                  const absent = weeklyRecords.filter(r => r[dayKey] === 'Absent').length;
                  const late = weeklyRecords.filter(r => r[dayKey] === 'Late').length;
                  const absentWithComm = weeklyRecords.filter(r => r[dayKey] === 'Absent with communication').length;
                  const lateWithComm = weeklyRecords.filter(r => r[dayKey] === 'Late with communication').length;
                  
                  return (
                    <div key={day} className="bg-white p-3 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">{day}</h4>
                      <div className="flex flex-col space-y-2 text-sm">
                        <div><span className="text-green-600 font-medium">Present:</span> {present}</div>
                        <div><span className="text-red-600 font-medium">Absent:</span> {absent}</div>
                        <div><span className="text-yellow-600 font-medium">Late:</span> {late}</div>
                        <div><span className="text-orange-600 font-medium">Absent w/ Comm:</span> {absentWithComm}</div>
                        <div><span className="text-purple-600 font-medium">Late w/ Comm:</span> {lateWithComm}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => {
                  const weekKey = ['week1', 'week2', 'week3', 'week4'][index] as keyof MonthlyRecord;
                  const attended = monthlyRecords.reduce((acc, r) => acc + parseInt(r[weekKey].split('/')[0]), 0);
                  const total = monthlyRecords.reduce((acc, r) => acc + parseInt(r[weekKey].split('/')[1]), 0);
                  const absent = total - attended;
                  
                  return (
                    <div key={week} className="bg-white p-3 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">{week}</h4>
                      <div className="flex flex-col space-y-2 text-sm">
                        <div><span className="text-green-600 font-medium">Present:</span> {attended}</div>
                        <div><span className="text-red-600 font-medium">Absent:</span> {absent}</div>
                        <div><span className="text-blue-600 font-medium">Total:</span> {total}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              {view === "daily" && (
                <>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Notes</th>
                  <th className="px-6 py-3">Actions</th>
                </>
              )}
              {view === "weekly" && (
                <>
                  <th className="px-6 py-3">Mon</th>
                  <th className="px-6 py-3">Tue</th>
                  <th className="px-6 py-3">Wed</th>
                  <th className="px-6 py-3">Thu</th>
                  <th className="px-6 py-3">Fri</th>
                </>
              )}
              {view === "monthly" && (
                <>
                  <th className="px-6 py-3">Week 1</th>
                  <th className="px-6 py-3">Week 2</th>
                  <th className="px-6 py-3">Week 3</th>
                  <th className="px-6 py-3">Week 4</th>
                  <th className="px-6 py-3">Total</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {view === "daily" && dailyRecords.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-6 py-4">{r.id}</td>
                <td className="px-6 py-4 font-medium">{r.name}</td>
                <td className={`px-6 py-4 font-medium ${r.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                  {r.status}
                </td>
                <td className="px-6 py-4 text-gray-500">—</td>
                <td className="px-6 py-4">
                  <select
                    defaultValue={r.status === "Present" ? "Present" : "Absent"}
                    className="rounded-full border px-3 py-1 text-sm"
                  >
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Absent with communication</option>
                    <option>Late</option>
                    <option>Late with communication</option>
                  </select>
                </td>
              </tr>
            ))}
            {view === "weekly" && weeklyRecords.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-6 py-4">{r.id}</td>
                <td className="px-6 py-4 font-medium">{r.name}</td>
                <td className={`px-6 py-4 font-medium ${r.mon === "Present" ? "text-green-600" : "text-red-600"}`}>{r.mon}</td>
                <td className={`px-6 py-4 font-medium ${r.tue === "Present" ? "text-green-600" : "text-red-600"}`}>{r.tue}</td>
                <td className={`px-6 py-4 font-medium ${r.wed === "Present" ? "text-green-600" : "text-red-600"}`}>{r.wed}</td>
                <td className={`px-6 py-4 font-medium ${r.thu === "Present" ? "text-green-600" : "text-red-600"}`}>{r.thu}</td>
                <td className={`px-6 py-4 font-medium ${r.fri === "Present" ? "text-green-600" : "text-red-600"}`}>{r.fri}</td>
              </tr>
            ))}
            {view === "monthly" && monthlyRecords.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-6 py-4">{r.id}</td>
                <td className="px-6 py-4 font-medium">{r.name}</td>
                <td className="px-6 py-4">{r.week1}</td>
                <td className="px-6 py-4">{r.week2}</td>
                <td className="px-6 py-4">{r.week3}</td>
                <td className="px-6 py-4">{r.week4}</td>
                <td className="px-6 py-4 font-medium">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}