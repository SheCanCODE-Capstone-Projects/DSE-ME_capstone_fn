"use client";

import { Check, X, Download, ClipboardList, Save, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import StatCard from '@/components/ui/statuscard';
import AttendanceControls from '@/components/AttendanceComponents/AttendanceControls';
import DailyAttendanceTable from '@/components/AttendanceComponents/DailyAttendanceTable';
import WeeklyAttendanceTable from '@/components/AttendanceComponents/WeeklyAttendanceTable';
import MonthlyAttendanceTable from '@/components/AttendanceComponents/MonthlyAttendanceTable';
import { AttendanceRecord, ViewType } from '@/types/attendance';
import { useAttendanceParticipants, useMarkAttendance } from '@/hooks/useAttendance';
import { useFacilitatorCohorts } from '@/hooks/useFacilitator';
import { useSearchParams } from 'next/navigation';

export default function AttendancePage() {
  const searchParams = useSearchParams();
  const cohortParam = searchParams.get('cohort');
  
  const [view, setView] = useState<ViewType>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceChanges, setAttendanceChanges] = useState<{[participantId: string]: AttendanceRecord}>({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // Calculate date range based on view
  const dateRange = useMemo(() => {
    const date = new Date(selectedDate);
    if (view === 'weekly') {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return {
        start: startOfWeek.toISOString().split('T')[0],
        end: endOfWeek.toISOString().split('T')[0]
      };
    } else if (view === 'monthly') {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return {
        start: startOfMonth.toISOString().split('T')[0],
        end: endOfMonth.toISOString().split('T')[0]
      };
    }
    return { start: selectedDate, end: selectedDate };
  }, [selectedDate, view]);
  
  const { data: cohortsData } = useFacilitatorCohorts();
  const { data: attendanceData, isLoading } = useAttendanceParticipants(
    cohortParam || undefined, 
    view === 'daily' ? selectedDate : undefined,
    view !== 'daily' ? dateRange.start : undefined,
    view !== 'daily' ? dateRange.end : undefined
  );
  const markAttendanceMutation = useMarkAttendance();

  // Fetch attendance for date range (weekly/monthly)
  const [attendanceRecords, setAttendanceRecords] = useState<{[date: string]: {[studentId: string]: AttendanceRecord}}>({});
  
  // Build attendance records from real data
  useMemo(() => {
    if (view !== 'daily' && attendanceData) {
      const records: {[date: string]: {[studentId: string]: AttendanceRecord}} = {};
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      
      // Initialize empty records for all dates in range
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        records[dateStr] = {};
      }
      
      setAttendanceRecords(records);
    }
  }, [view, dateRange, attendanceData]);

  const students = useMemo(() => {
    if (!attendanceData) return [];
    return attendanceData.participants.map(p => ({
      id: p.participantId,
      name: `${p.firstName} ${p.lastName}`,
      email: p.email,
      studentId: p.participantId.substring(0, 8).toUpperCase(),
    }));
  }, [attendanceData]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentDayAttendance = useMemo(() => {
    if (!attendanceData) return {};
    const attendance: {[studentId: string]: AttendanceRecord} = {};
    
    attendanceData.participants.forEach(p => {
      const change = attendanceChanges[p.participantId];
      if (change) {
        attendance[p.participantId] = change;
      } else if (p.status) {
        attendance[p.participantId] = {
          studentId: p.participantId,
          date: selectedDate,
          status: p.status === 'PRESENT' ? 'Present' : 
                  p.status === 'ABSENT' ? 'Absent' : 
                  p.status === 'LATE' ? 'Late' : 
                  p.status === 'EXCUSED' ? 'Absent with Communication' : 'Present',
          remarks: p.remarks || '',
          markedBy: 'Current User',
          markedAt: new Date().toISOString()
        };
      }
    });
    
    return attendance;
  }, [attendanceData, attendanceChanges, selectedDate]);

  const stats = useMemo(() => {
    const records = Object.values(currentDayAttendance);
    const presentCount = records.filter(r => r.status === 'Present').length;
    const absentCount = records.filter(r => r.status === 'Absent').length;
    const lateCount = records.filter(r => r.status === 'Late').length;
    const absentWithCommCount = records.filter(r => r.status === 'Absent with Communication').length;
    const lateWithCommCount = records.filter(r => r.status === 'Late with Communication').length;
    const totalMarked = records.length;
    const attendanceRate = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0;

    return {
      presentCount,
      absentCount,
      lateCount,
      absentWithCommCount,
      lateWithCommCount,
      totalMarked,
      attendanceRate
    };
  }, [currentDayAttendance]);

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

    setAttendanceChanges(prev => ({
      ...prev,
      [studentId]: record
    }));
  };

  const saveAttendance = async () => {
    if (!attendanceData || Object.keys(attendanceChanges).length === 0) return;
    
    const records = Object.entries(attendanceChanges).map(([participantId, record]) => ({
      participantId,
      status: record.status === 'Present' ? 'PRESENT' as const :
              record.status === 'Absent' ? 'ABSENT' as const :
              record.status === 'Late' ? 'LATE' as const :
              record.status === 'Absent with Communication' ? 'EXCUSED' as const :
              record.status === 'Late with Communication' ? 'LATE' as const : 'PRESENT' as const,
      remarks: record.notes
    }));

    try {
      const requestBody: any = {
        sessionDate: selectedDate,
        records
      };
      
      if (attendanceData.cohortId) {
        requestBody.cohortId = attendanceData.cohortId;
      }
      
      await markAttendanceMutation.mutateAsync(requestBody);
      setAttendanceChanges({});
      alert(`Attendance saved for ${selectedDate}`);
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save attendance');
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

  if (isLoading) {
    return <div className="pr-6 pb-6 min-h-screen">Loading...</div>;
  }

  if (!attendanceData) {
    return <div className="pr-6 pb-6 min-h-screen">No data available</div>;
  }

  console.log('Attendance Data:', attendanceData);
  console.log('Students:', students);

  return (
    <div className="pr-6 pb-6 min-h-screen">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-sky-700">Attendance Tracking</h1>
          <p className="text-xs text-gray-600">
            {attendanceData?.cohortName || 'Record and monitor daily attendance for your cohort'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {Object.keys(attendanceChanges).length > 0 && (
            <button 
              onClick={saveAttendance} 
              disabled={markAttendanceMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 text-xs text-white rounded-lg bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
            >
              <Save size={16} /> {markAttendanceMutation.isPending ? 'Saving...' : 'Save Changes'}
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
        {students.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No participants found. Please ensure you have participants assigned to your cohorts.</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}