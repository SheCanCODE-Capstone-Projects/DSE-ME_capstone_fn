import { Student, AttendanceRecord, DailyAttendance } from '@/types/attendance';

export const mockStudents: Student[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice.j@example.com', studentId: 'STU001' },
  { id: '2', name: 'Bob Smith', email: 'bob.s@example.com', studentId: 'STU002' },
  { id: '3', name: 'Carol Davis', email: 'carol.d@example.com', studentId: 'STU003' },
  { id: '4', name: 'David Wilson', email: 'david.w@example.com', studentId: 'STU004' },
  { id: '5', name: 'Emma Brown', email: 'emma.b@example.com', studentId: 'STU005' },
  { id: '6', name: 'Frank Miller', email: 'frank.m@example.com', studentId: 'STU006' },
  { id: '7', name: 'Grace Lee', email: 'grace.l@example.com', studentId: 'STU007' },
  { id: '8', name: 'Henry Taylor', email: 'henry.t@example.com', studentId: 'STU008' },
];

export const exportAttendance = (attendanceRecords: {[date: string]: DailyAttendance}, students: Student[]) => {
  const csvContent = [
    ['Date', 'Student ID', 'Name', 'Status', 'Time In', 'Notes'].join(','),
    ...Object.entries(attendanceRecords).flatMap(([date, dayRecords]) =>
      Object.values(dayRecords).map(record => {
        const student = students.find(s => s.id === record.studentId);
        return [date, student?.studentId, student?.name, record.status, record.timeIn || '', record.notes || ''].join(',');
      })
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Attendance_Report_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const calculateStats = (currentDayAttendance: DailyAttendance, totalStudents: number) => {
  const presentCount = Object.values(currentDayAttendance).filter(r => r.status === 'Present').length;
  const absentCount = Object.values(currentDayAttendance).filter(r => r.status === 'Absent').length;
  const lateCount = Object.values(currentDayAttendance).filter(r => r.status === 'Late').length;
  const absentWithCommCount = Object.values(currentDayAttendance).filter(r => r.status === 'Absent with Communication').length;
  const lateWithCommCount = Object.values(currentDayAttendance).filter(r => r.status === 'Late with Communication').length;
  const totalMarked = Object.keys(currentDayAttendance).length;
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
};