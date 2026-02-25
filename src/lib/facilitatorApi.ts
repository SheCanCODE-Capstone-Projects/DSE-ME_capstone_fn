import { apiFetch } from './api';

export interface FacilitatorCohort {
  cohortId: string;
  cohortName: string;
  courseName: string;
  courseCode: string;
  batchName: string;
  startDate: string;
  endDate: string;
  status: string;
  totalParticipants: number;
  activeParticipants: number;
}

export interface FacilitatorProfile {
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
  centerName: string;
}

export interface AttendanceParticipant {
  participantId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | null;
  remarks: string | null;
  attendanceId: string | null;
}

export interface AttendanceParticipantsResponse {
  sessionDate: string;
  cohortId: string;
  cohortName: string;
  participants: AttendanceParticipant[];
}

export interface MarkAttendanceRequest {
  sessionDate: string;
  cohortId: string;
  records: {
    participantId: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
    remarks?: string;
  }[];
}

export interface MarkAttendanceResponse {
  message: string;
  recordedCount: number;
  updatedCount: number;
}

export const facilitatorApi = {
  getCohorts: async (): Promise<FacilitatorCohort[]> => {
    return apiFetch('/facilitator/my-cohorts', { method: 'GET' });
  },
  
  getProfile: async (): Promise<FacilitatorProfile> => {
    return apiFetch('/facilitator/profile', { method: 'GET' });
  },
  
  getAttendanceParticipants: async (cohortId?: string, date?: string, startDate?: string, endDate?: string): Promise<AttendanceParticipantsResponse> => {
    const params = new URLSearchParams();
    if (cohortId) params.append('cohortId', cohortId);
    if (date) params.append('date', date);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    return apiFetch(`/facilitator/attendance/participants?${params.toString()}`, { method: 'GET' });
  },
  
  markAttendance: async (request: MarkAttendanceRequest): Promise<MarkAttendanceResponse> => {
    return apiFetch('/facilitator/attendance/mark', {
      method: 'POST',
      data: request,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
