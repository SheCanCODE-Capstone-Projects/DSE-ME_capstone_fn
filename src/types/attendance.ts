export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Absent with Communication' | 'Late with Communication';
  timeIn?: string;
  notes?: string;
  markedBy: string;
  markedAt: string;
}

export interface DailyAttendance {
  [studentId: string]: AttendanceRecord;
}

export type ViewType = 'daily' | 'weekly' | 'monthly';