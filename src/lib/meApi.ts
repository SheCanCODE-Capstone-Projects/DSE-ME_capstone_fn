import { apiFetch } from './api';

export interface CourseSummary {
  id: string;
  name: string;
  code?: string;
  level?: string;
}

export interface FacilitatorSummary {
  id: string;
  firstName?: string;
  lastName?: string;
}

export interface CohortBatchResponse {
  id: string;
  name: string;
  centerId: string | null;
  centerName: string | null;
  startDate: string;
  endDate: string | null;
  status: string;
}

export interface CreateCohortBatchRequest {
  name: string;
  centerId?: string | null;
  startDate: string;
  endDate?: string | null;
}

export interface MeCohortResponse {
  id: string;
  name: string;
  course: CourseSummary;
  facilitator: FacilitatorSummary | null;
  startDate: string;
  endDate: string | null;
  maxParticipants: number;
  currentParticipants: number;
  status: string;
}

export interface CreateMeCohortRequest {
  name: string;
  courseId: string;
  facilitatorId?: string | null;
  startDate: string;
  endDate?: string | null;
  maxParticipants?: number;
}

export interface CreateCourseRequest {
  name: string;
  code: string;
  description?: string | null;
  level: string;
  durationWeeks?: number;
  maxParticipants?: number;
}

export interface CourseResponse {
  id: string;
  name: string;
  code?: string;
  description?: string;
  level?: string;
  durationWeeks?: number;
  maxParticipants?: number;
  status?: string;
  facilitatorsCount?: number;
  participantsCount?: number;
}

export const meApi = {
  // Cohort batches/intakes (the "one cohort" concept)
  getCohortBatchesList: async (): Promise<CohortBatchResponse[]> => {
    return apiFetch<CohortBatchResponse[]>('/me/cohort-batches/list', { method: 'GET' });
  },

  createCohortBatch: async (data: CreateCohortBatchRequest): Promise<CohortBatchResponse> => {
    return apiFetch<CohortBatchResponse>('/me/cohort-batches', {
      method: 'POST',
      data: {
        name: data.name,
        centerId: data.centerId || undefined,
        startDate: data.startDate,
        endDate: data.endDate || undefined,
      },
    });
  },

  // Course tracks (legacy name: cohorts) - this will be nested under batch later
  getCohortsList: async (): Promise<MeCohortResponse[]> => {
    return apiFetch<MeCohortResponse[]>('/me/cohorts/list', { method: 'GET' });
  },

  getCohorts: async (page = 0, size = 20): Promise<{
    content: MeCohortResponse[];
    totalPages: number;
    totalElements: number;
    number: number;
  }> => {
    return apiFetch(`/me/cohorts?page=${page}&size=${size}`, { method: 'GET' });
  },

  createCohort: async (data: CreateMeCohortRequest): Promise<MeCohortResponse> => {
    return apiFetch<MeCohortResponse>('/me/cohorts', {
      method: 'POST',
      data: {
        name: data.name,
        courseId: data.courseId,
        facilitatorId: data.facilitatorId || undefined,
        startDate: data.startDate,
        endDate: data.endDate || undefined,
        maxParticipants: data.maxParticipants ?? 30,
      },
    });
  },

  updateCohort: async (id: string, data: CreateMeCohortRequest): Promise<MeCohortResponse> => {
    return apiFetch<MeCohortResponse>(`/me/cohorts/${id}`, {
      method: 'PUT',
      data: {
        name: data.name,
        courseId: data.courseId,
        facilitatorId: data.facilitatorId || undefined,
        startDate: data.startDate,
        endDate: data.endDate || undefined,
        maxParticipants: data.maxParticipants ?? 30,
      },
    });
  },

  deleteCohort: async (id: string): Promise<void> => {
    return apiFetch(`/me/cohorts/${id}`, { method: 'DELETE' });
  },

  getCourses: async (page = 0, size = 100): Promise<{ content: { id: string; name: string; code?: string }[] }> => {
    return apiFetch(`/me/courses?page=${page}&size=${size}`, { method: 'GET' });
  },

  createCourse: async (data: CreateCourseRequest): Promise<CourseResponse> => {
    return apiFetch<CourseResponse>('/me/courses', {
      method: 'POST',
      data: {
        name: data.name,
        code: data.code,
        description: data.description || undefined,
        level: data.level,
        durationWeeks: data.durationWeeks ?? 12,
        maxParticipants: data.maxParticipants ?? 30,
      },
    });
  },

  updateCourse: async (id: string, data: CreateCourseRequest): Promise<CourseResponse> => {
    return apiFetch<CourseResponse>(`/me/courses/${id}`, {
      method: 'PUT',
      data: {
        name: data.name,
        code: data.code,
        description: data.description || undefined,
        level: data.level,
        durationWeeks: data.durationWeeks ?? 12,
        maxParticipants: data.maxParticipants ?? 30,
      },
    });
  },

  deleteCourse: async (id: string): Promise<void> => {
    return apiFetch(`/me/courses/${id}`, {
      method: 'DELETE',
    });
  },

  toggleCourseStatus: async (id: string): Promise<CourseResponse> => {
    return apiFetch<CourseResponse>(`/me/courses/${id}/toggle-status`, {
      method: 'PATCH',
    });
  },

  getParticipants: async (page = 0, size = 20, filters?: { cohortId?: string; batchId?: string; status?: string }): Promise<{
    content: any[];
    totalPages: number;
    totalElements: number;
    number: number;
  }> => {
    const params = new URLSearchParams({ page: String(page), size: String(size) });
    if (filters?.cohortId) params.append('cohortId', filters.cohortId);
    if (filters?.batchId) params.append('batchId', filters.batchId);
    if (filters?.status) params.append('status', filters.status);
    return apiFetch(`/me/participants?${params.toString()}`, { method: 'GET' });
  },

  getParticipantStats: async (): Promise<{
    totalParticipants: number;
    enrolledCount: number;
    activeCount: number;
    completedCount: number;
    droppedCount: number;
  }> => {
    return apiFetch('/me/participants/stats', { method: 'GET' });
  },

  getFacilitators: async (page = 0, size = 100): Promise<{
    content: { id: string; firstName?: string; lastName?: string; email?: string; department?: string; status?: string; assignedCourses?: { id: string; name: string; code?: string; level?: string }[]; assignedCohortBatches?: { id: string; name: string }[] }[];
  }> => {
    return apiFetch(`/me/facilitators?page=${page}&size=${size}`, { method: 'GET' });
  },

  setFacilitatorCohortBatches: async (facilitatorId: string, cohortBatchIds: string[]): Promise<void> => {
    return apiFetch(`/me/facilitators/${facilitatorId}/cohort-batches`, {
      method: 'PUT',
      data: { cohortBatchIds },
    });
  },

  assignCourseToFacilitator: async (facilitatorId: string, courseId: string): Promise<void> => {
    return apiFetch(`/me/facilitators/${facilitatorId}/assign-course`, {
      method: 'POST',
      data: { courseId },
    });
  },

  removeCourseFromFacilitator: async (facilitatorId: string, courseId: string): Promise<void> => {
    return apiFetch(`/me/facilitators/${facilitatorId}/courses/${courseId}`, { method: 'DELETE' });
  },
};
