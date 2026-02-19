import { Student, DailyAttendance } from '@/types/attendance';
import { Mail, AlertTriangle, Check, X, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';
import { sendWarningEmail, sendBulkWarningEmails } from '@/utils/emailUtils';

interface MonthlyAttendanceTableProps {
  students: Student[];
  selectedDate: string;
  attendanceRecords: {[date: string]: DailyAttendance};
}

export default function MonthlyAttendanceTable({
  students,
  selectedDate,
  attendanceRecords
}: MonthlyAttendanceTableProps) {
  const [sendingEmails, setSendingEmails] = useState(false);

  const getMonthlyStats = (studentId: string) => {
    const d = new Date(selectedDate);
    const year = d.getFullYear();
    const month = d.getMonth();
    const monthDates = [];
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= lastDay; day++) {
      monthDates.push(new Date(year, month, day).toISOString().split('T')[0]);
    }
    const records = monthDates.map(date => attendanceRecords[date]?.[studentId]).filter(Boolean);
    const present = records.filter(r => r.status === 'Present').length;
    const late = records.filter(r => r.status === 'Late' || r.status === 'Late with Communication').length;
    const absent = records.filter(r => r.status === 'Absent' || r.status === 'Absent with Communication').length;
    const total = records.length;
    return { present, late, absent, total, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
  };

  const getWeekStats = (weekStart: Date) => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      weekDates.push(date.toISOString().split('T')[0]);
    }
    
    let totalPresent = 0, totalLate = 0, totalAbsent = 0, totalRecords = 0;
    
    weekDates.forEach(date => {
      const dayRecords = attendanceRecords[date] || {};
      const records = Object.values(dayRecords);
      totalPresent += records.filter(r => r.status === 'Present').length;
      totalLate += records.filter(r => r.status === 'Late' || r.status === 'Late with Communication').length;
      totalAbsent += records.filter(r => r.status === 'Absent' || r.status === 'Absent with Communication').length;
      totalRecords += records.length;
    });
    
    return { present: totalPresent, late: totalLate, absent: totalAbsent, total: totalRecords };
  };

  const getMonthWeeks = () => {
    const d = new Date(selectedDate);
    const year = d.getFullYear();
    const month = d.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const weeks = [];
    const currentWeekStart = new Date(firstDay);
    currentWeekStart.setDate(firstDay.getDate() - firstDay.getDay() + 1); // Start from Monday
    
    while (currentWeekStart <= lastDay) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);
      
      weeks.push({
        start: new Date(currentWeekStart),
        end: weekEnd > lastDay ? lastDay : weekEnd,
        stats: getWeekStats(currentWeekStart)
      });
      
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }
    
    return weeks;
  };

  const monthName = new Date(selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const monthWeeks = getMonthWeeks();
  
  const studentsWithLowAttendance = students
    .map(student => ({ student, stats: getMonthlyStats(student.id) }))
    .filter(({ stats }) => stats.present < 6);

  const handleSendWarningEmails = async () => {
    if (studentsWithLowAttendance.length === 0) {
      alert('No students with low attendance found.');
      return;
    }

    setSendingEmails(true);
    try {
      const emailData = studentsWithLowAttendance.map(({ student }) => ({
        student
      }));
      
      await sendBulkWarningEmails(emailData);
      
      alert(`Warning emails sent successfully to students with low attendance.`);
    } finally {
      setSendingEmails(false);
    }
  };

  const handleSingleWarningEmail = async (student: { id: string; name: string; studentId: string; email: string }) => {
    try {
      await sendWarningEmail(student);
      alert(`Warning email sent to ${student.name}`);
    } catch (error) {
      alert('Failed to send email');
    }
  };

  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Monthly Attendance Summary - {monthName}</h2>
          {studentsWithLowAttendance.length > 0 && (
            <p className="text-sm text-red-600 mt-1">
              <AlertTriangle size={16} className="inline mr-1" />
              {studentsWithLowAttendance.length} student(s) with attendance below 6 days
            </p>
          )}
        </div>
        {studentsWithLowAttendance.length > 0 && (
          <button
            onClick={handleSendWarningEmails}
            disabled={sendingEmails}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
          >
            <Mail size={16} />
            {sendingEmails ? 'Sending...' : `Send Warning Emails (${studentsWithLowAttendance.length})`}
          </button>
        )}
      </div>
      
     
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {monthWeeks.map((week, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-gray-600" />
                <h4 className="text-sm font-semibold text-gray-900">Week {i + 1}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                {week.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {week.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Check size={12} className="text-green-600" />
                    <span className="text-xs text-gray-600">Present</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{week.stats.present}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-yellow-600" />
                    <span className="text-xs text-gray-600">Late</span>
                  </div>
                  <span className="text-sm font-semibold text-yellow-600">{week.stats.late}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <X size={12} className="text-red-600" />
                    <span className="text-xs text-gray-600">Absent</span>
                  </div>
                  <span className="text-sm font-semibold text-red-600">{week.stats.absent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Present</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Late</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Absent</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total Days</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Attendance Rate</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const stats = getMonthlyStats(student.id);
              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.studentId} • {student.email}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {stats.present}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {stats.late}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      {stats.absent}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-900">
                    {stats.total}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className={`w-16 h-2 rounded-full mr-2 ${
                        stats.rate >= 90 ? 'bg-green-200' :
                        stats.rate >= 75 ? 'bg-yellow-200' :
                        'bg-red-200'
                      }`}>
                        <div 
                          className={`h-2 rounded-full ${
                            stats.rate >= 90 ? 'bg-green-500' :
                            stats.rate >= 75 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${stats.rate}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-semibold ${
                        stats.rate >= 90 ? 'text-green-600' :
                        stats.rate >= 75 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {stats.rate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {stats.present < 6 ? (
                      <button
                        onClick={() => handleSingleWarningEmail(student)}
                        className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                        title="Send warning email"
                      >
                        <Mail size={12} />
                        <AlertTriangle size={12} />
                      </button>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">Good</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}