import { Student, AttendanceRecord, DailyAttendance } from '@/types/attendance';

interface DailyAttendanceTableProps {
  students: Student[];
  selectedDate: string;
  currentDayAttendance: DailyAttendance;
  totalMarked: number;
  onUpdateAttendance: (studentId: string, status: AttendanceRecord['status'], timeIn?: string, notes?: string) => void;
}

export default function DailyAttendanceTable({
  students,
  selectedDate,
  currentDayAttendance,
  totalMarked,
  onUpdateAttendance
}: DailyAttendanceTableProps) {
  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Attendance for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h2>
        <div className="text-sm text-gray-500">
          {totalMarked} of {students.length} students marked
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const record = currentDayAttendance[student.id];
              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.studentId} • {student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {record ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === 'Present' ? 'bg-green-100 text-green-800' :
                        record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                        record.status === 'Late with Communication' ? 'bg-orange-100 text-orange-800' :
                        record.status === 'Absent with Communication' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Not marked</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {record?.timeIn || '—'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="text"
                      value={record?.notes || ''}
                      onChange={(e) => {
                        if (record) {
                          onUpdateAttendance(student.id, record.status, record.timeIn, e.target.value);
                        }
                      }}
                      placeholder="Add notes..."
                      className="w-32 px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-sky-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-1">
                      {[
                        { status: 'Present', label: 'P', color: 'green' },
                        { status: 'Late', label: 'L', color: 'yellow' },
                        { status: 'Late with Communication', label: 'LC', color: 'orange' },
                        { status: 'Absent', label: 'A', color: 'red' },
                        { status: 'Absent with Communication', label: 'AC', color: 'blue' }
                      ].map(({ status, label, color }) => (
                        <button
                          key={status}
                          onClick={() => onUpdateAttendance(student.id, status as AttendanceRecord['status'])}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            record?.status === status 
                              ? `bg-${color}-600 text-white` 
                              : `bg-${color}-100 text-${color}-700 hover:bg-${color}-200`
                          }`}
                          title={status}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
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