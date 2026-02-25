import { apiFetch } from './api';

export interface AnalyticsOverview {
  totalParticipants: number;
  completedParticipants: number;
  averageScore: number;
  activeCohorts: number;
  totalCourses: number;
  activeFacilitators: number;
  pendingAccessRequests: number;
  cohortsByStatus: {
    ACTIVE: number;
    UPCOMING: number;
    COMPLETED: number;
  };
}

export interface RetentionData {
  week: string;
  enrolled: number;
  active: number;
}

export interface AttendanceSummary {
  rate: number;
  present: number;
  absent: number;
}

export interface TopPerformer {
  name: string;
  score: string;
  trend: string;
}

export interface CreateCohortBatchRequest {
  name: string;
  startDate: string;
  endDate?: string;
}

export interface CreateMeCohortRequest {
  name: string;
  startDate: string;
  endDate?: string;
}

export interface CreateCourseRequest {
  name: string;
  code?: string;
  level?: string;
}

export interface CohortBatchResponse {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  status?: string;
  centerName?: string;
}

export const meApi = {
  getOverviewAnalytics: () => 
    apiFetch<AnalyticsOverview>('/me/analytics/overview'),
  
  getRetentionTrend: () => 
    apiFetch<RetentionData[]>('/me/analytics/retention-trend'),
  
  getAttendanceSummary: () => 
    apiFetch<AttendanceSummary>('/me/analytics/attendance-summary'),
  
  getTopPerformers: () => 
    apiFetch<TopPerformer[]>('/me/analytics/top-performers'),

  getCohortBatchesList: () =>
    apiFetch<CohortBatchResponse[]>('/me/cohort-batches/list'),

  createCohortBatch: (data: CreateCohortBatchRequest) =>
    apiFetch<CohortBatchResponse>('/me/cohort-batches', {
      method: 'POST',
      data,
    }),

  updateCohortBatchStatus: (id: string, status: string) =>
    apiFetch<CohortBatchResponse>(`/me/cohort-batches/${id}/status`, {
      method: 'PATCH',
      data: { status },
    }),

  getCohortsList: () =>
    apiFetch<CohortBatchResponse[]>('/me/cohorts/list'),

  createCohort: (data: CreateMeCohortRequest) =>
    apiFetch<CohortBatchResponse>('/me/cohorts', {
      method: 'POST',
      data,
    }),

  updateCohortStatus: (id: string, status: string) =>
    apiFetch<CohortBatchResponse>(`/me/cohorts/${id}/status`, {
      method: 'PATCH',
      data: { status },
    }),

  getCourses: (page = 0, size = 100) =>
    apiFetch<{ content: any[] }>(`/me/courses?page=${page}&size=${size}`),

  createCourse: (data: CreateCourseRequest) =>
    apiFetch<any>('/me/courses', {
      method: 'POST',
      data,
    }),

  getFacilitators: (page = 0, size = 100) =>
    apiFetch<{ content: any[] }>(`/me/facilitators?page=${page}&size=${size}`),

  setFacilitatorCohortBatches: (facilitatorId: string, batchIds: string[]) =>
    apiFetch<any>(`/me/facilitators/${facilitatorId}/cohort-batches`, {
      method: 'PUT',
      data: { cohortBatchIds: batchIds },
    }),

  assignCourseToFacilitator: (facilitatorId: string, courseId: string) =>
    apiFetch<any>(`/me/facilitators/${facilitatorId}/assign-course`, {
      method: 'POST',
      data: { courseId },
    }),

  removeCourseFromFacilitator: (facilitatorId: string, courseId: string) =>
    apiFetch<any>(`/me/facilitators/${facilitatorId}/courses/${courseId}`, {
      method: 'DELETE',
    }),

  toggleCourseStatus: (courseId: string) =>
    apiFetch<any>(`/me/courses/${courseId}/toggle-status`, {
      method: 'PATCH',
    }),

  updateCourse: (courseId: string, data: { name: string; code?: string; description?: string; durationWeeks?: number; level?: string }) =>
    apiFetch<any>(`/me/courses/${courseId}`, {
      method: 'PUT',
      data,
    }),

  deleteCourse: (courseId: string) =>
    apiFetch<any>(`/me/courses/${courseId}`, {
      method: 'DELETE',
    }),

  getParticipants: (page = 0, size = 20, filters?: { cohortId?: string; batchId?: string; status?: string }) => {
    const params = new URLSearchParams({ page: String(page), size: String(size) });
    if (filters?.cohortId) params.append('cohortId', filters.cohortId);
    if (filters?.batchId) params.append('batchId', filters.batchId);
    if (filters?.status) params.append('status', filters.status);
    return apiFetch<{ content: any[]; totalPages: number; totalElements: number }>(`/me/participants?${params.toString()}`);
  },

  getParticipantStats: () =>
    apiFetch<any>('/me/participants/stats'),

  createParticipant: (data: { firstName: string; lastName: string; email: string; studentId: string; cohortId: string; gender?: string }) =>
    apiFetch<any>('/me/participants', {
      method: 'POST',
      data,
    }),
};
