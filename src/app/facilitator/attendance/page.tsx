"use client";

import { Check, X, Download, ClipboardList, Save, Clock } from "lucide-react";
import { useState } from "react";
import StatCard from '@/components/ui/statuscard';
import AttendanceControls from '@/components/AttendanceComponents/AttendanceControls';
import DailyAttendanceTable from '@/components/AttendanceComponents/DailyAttendanceTable';
import WeeklyAttendanceTable from '@/components/AttendanceComponents/WeeklyAttendanceTable';
import MonthlyAttendanceTable from '@/components/AttendanceComponents/MonthlyAttendanceTable';
import { AttendanceRecord, DailyAttendance, ViewType } from '@/types/attendance';
import { mockStudents, exportAttendance, calculateStats } from '@/utils/attendanceUtils';

export default function AttendancePage() {
  const [view, setView] = useState<ViewType>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<{[date: string]: DailyAttendance}>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const students = mockStudents;
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentDayAttendance = attendanceRecords[selectedDate] || {};
  const stats = calculateStats(currentDayAttendance);

  const updateAttendance = (studentId: string, status: AttendanceRecord['status'], timeIn?: string, notes?: string) => {
    const now = new Date();
    const record: AttendanceRecord = {
      studentId,
      date: selectedDate,
      status,
      timeIn: timeIn || (status === 'Present' || status === 'Late' || status === 'Late with Communication' ? now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : undefined),
      notes: notes || '',
      markedBy: 'Current User',
      markedAt: now.toISOString()
    };

    setAttendanceRecords(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [studentId]: record
      }
    }));
    setHasUnsavedChanges(true);
  };

  const saveAttendance = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUnsavedChanges(false);
      alert(`Attendance saved for ${selectedDate}`);
    } finally {
      // Cleanup if needed
    }
  };

  const markAllPresent = () => {
    const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    students.forEach(student => {
      if (!currentDayAttendance[student.id]) {
        updateAttendance(student.id, 'Present', now);
      }
    });
  };

  const statsData = [
    { icon: <Check size={32} />, title: "Present", value: stats.presentCount, subtext: `of ${students.length} students` },
    { icon: <X size={32} />, title: "Absent", value: stats.absentCount, subtext: `${stats.absentWithCommCount} with communication` },
    { icon: <Clock size={32} />, title: "Late Arrivals", value: stats.lateCount + stats.lateWithCommCount, subtext: `${stats.lateWithCommCount} with communication` },
    { icon: <ClipboardList size={32} />, title: "Attendance Rate", value: `${stats.attendanceRate}%`, subtext: `${stats.totalMarked}/${students.length} marked` },
  ];

  return (
    <div className="pr-6 pb-6 min-h-screen">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-sky-700">Attendance Tracking</h1>
          <p className="text-xs text-gray-600">Record and monitor daily attendance for your cohort</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportAttendance(attendanceRecords, students)} className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Download size={16} /> Export
          </button>
          {hasUnsavedChanges && (
            <button onClick={saveAttendance} className="flex items-center gap-2 px-4 py-2 text-xs text-white rounded-lg bg-green-600 hover:bg-green-700 transition">
              <Save size={16} /> Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsData.map((s) => (
          <StatCard key={s.title} icon={s.icon} title={s.title} value={s.value} subtext={s.subtext} />
        ))}
      </div>

      <AttendanceControls
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        view={view}
        setView={setView}
        onMarkAllPresent={markAllPresent}
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {view === 'daily' && (
          <DailyAttendanceTable
            students={filteredStudents}
            selectedDate={selectedDate}
            currentDayAttendance={currentDayAttendance}
            totalMarked={stats.totalMarked}
            onUpdateAttendance={updateAttendance}
          />
        )}
        {view === 'weekly' && (
          <WeeklyAttendanceTable
            students={filteredStudents}
            selectedDate={selectedDate}
            attendanceRecords={attendanceRecords}
          />
        )}
        {view === 'monthly' && (
          <MonthlyAttendanceTable
            students={filteredStudents}
            selectedDate={selectedDate}
            attendanceRecords={attendanceRecords}
          />
        )}
      </div>
    </div>
  );
}