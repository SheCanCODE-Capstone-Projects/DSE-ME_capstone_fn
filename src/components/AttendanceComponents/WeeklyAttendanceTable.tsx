import { Student, DailyAttendance } from '@/types/attendance';
import { Check, X, Clock } from 'lucide-react';

interface WeeklyAttendanceTableProps {
  students: Student[];
  selectedDate: string;
  attendanceRecords: {[date: string]: DailyAttendance};
}

export default function WeeklyAttendanceTable({
  students,
  selectedDate,
  attendanceRecords
}: WeeklyAttendanceTableProps) {
  const getWeekDates = (date: string) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const weekDay = new Date(monday);
      weekDay.setDate(monday.getDate() + i);
      dates.push(weekDay.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getWeeklyAttendance = (studentId: string, weekDates: string[]) => {
    return weekDates.map(date => {
      const record = attendanceRecords[date]?.[studentId];
      return record?.status || 'Not Marked';
    });
  };

  const getDayStats = (date: string) => {
    const dayRecords = attendanceRecords[date] || {};
    const records = Object.values(dayRecords);
    const present = records.filter(r => r.status === 'Present').length;
    const late = records.filter(r => r.status === 'Late' || r.status === 'Late with Communication').length;
    const absent = records.filter(r => r.status === 'Absent' || r.status === 'Absent with Communication').length;
    return { present, late, absent, total: records.length };
  };

  const weekDates = getWeekDates(selectedDate);
  const weekStart = new Date(weekDates[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const weekEnd = new Date(weekDates[4]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Weekly Attendance ({weekStart} - {weekEnd})</h2>
      </div>
      
      
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Daily Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {weekDates.map((date, i) => {
            const dayStats = getDayStats(date);
            return (
              <div key={date} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">{dayNames[i]}</h4>
                <p className="text-xs text-gray-500 mb-3">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Check size={12} className="text-green-600" />
                      <span className="text-xs text-gray-600">Present</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{dayStats.present}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-yellow-600" />
                      <span className="text-xs text-gray-600">Late</span>
                    </div>
                    <span className="text-sm font-semibold text-yellow-600">{dayStats.late}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <X size={12} className="text-red-600" />
                      <span className="text-xs text-gray-600">Absent</span>
                    </div>
                    <span className="text-sm font-semibold text-red-600">{dayStats.absent}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              {weekDates.map((date, i) => (
                <th key={date} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}<br/>
                  <span className="text-xs text-gray-400">{new Date(date).getDate()}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const weekAttendance = getWeeklyAttendance(student.id, weekDates);
              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-500">{student.studentId}</div>
                  </td>
                  {weekAttendance.map((status, i) => (
                    <td key={i} className="px-3 py-3 text-center">
                      <span className={`inline-flex w-8 h-8 items-center justify-center text-xs font-bold rounded-full ${
                        status === 'Present' ? 'bg-green-100 text-green-800' :
                        status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                        status === 'Late with Communication' ? 'bg-orange-100 text-orange-800' :
                        status === 'Absent with Communication' ? 'bg-blue-100 text-blue-800' :
                        status === 'Absent' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {status === 'Present' ? 'P' :
                         status === 'Late' ? 'L' :
                         status === 'Late with Communication' ? 'LC' :
                         status === 'Absent with Communication' ? 'AC' :
                         status === 'Absent' ? 'A' : '—'}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}