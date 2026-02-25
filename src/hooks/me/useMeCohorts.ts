import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { meApi, CreateMeCohortRequest, CreateCohortBatchRequest, CreateCourseRequest } from '@/lib/meApi';

export function useGetMeCohortsList() {
  return useQuery({
    queryKey: ['me', 'cohorts', 'list'],
    queryFn: () => meApi.getCohortsList(),
  });
}

export function useCreateMeCohort() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMeCohortRequest) => meApi.createCohort(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'cohorts'] });
    },
  });
}

export function useUpdateCohortStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'PLANNED' | 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' }) =>
      meApi.updateCohortStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'cohorts'] });
      queryClient.invalidateQueries({ queryKey: ['me', 'cohort-batches'] });
    },
  });
}

export function useUpdateCohortBatchStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'PLANNED' | 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' }) =>
      meApi.updateCohortBatchStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'cohorts'] });
      queryClient.invalidateQueries({ queryKey: ['me', 'cohort-batches'] });
    },
  });
}

export function useGetMeCohortBatchesList() {
  return useQuery({
    queryKey: ['me', 'cohort-batches', 'list'],
    queryFn: () => meApi.getCohortBatchesList(),
  });
}

export function useCreateMeCohortBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCohortBatchRequest) => meApi.createCohortBatch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'cohort-batches'] });
    },
  });
}

export function useGetMeCourses() {
  return useQuery({
    queryKey: ['me', 'courses'],
    queryFn: async () => {
      const res = await meApi.getCourses(0, 100);
      return res.content;
    },
  });
}

export function useCreateMeCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCourseRequest) => meApi.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'courses'] });
    },
  });
}

export function useGetMeFacilitatorsForCohort() {
  return useQuery({
    queryKey: ['me', 'facilitators', 'list'],
    queryFn: async () => {
      const res = await meApi.getFacilitators(0, 100);
      return res.content;
    },
  });
}

export interface MeFacilitatorRow {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  status?: string;
  assignedCourses?: { id: string; name: string; code?: string; level?: string }[];
  assignedCohortBatches?: { id: string; name: string }[];
}

/** Maps ME API facilitators to Facilitator type for the Facilitators tab (with tracks = assignedCourses). */
export function useGetMeFacilitators() {
  return useQuery({
    queryKey: ['me', 'facilitators'],
    queryFn: async () => {
      const res = await meApi.getFacilitators(0, 100);
      const rows = res.content as MeFacilitatorRow[];
      return rows.map((r) => ({
        id: r.id,
        name: [r.firstName, r.lastName].filter(Boolean).join(' ') || 'Unknown',
        email: r.email ?? '',
        region: r.department ?? '',
        participantsCount: 0,
        isActive: (r.status ?? '').toUpperCase() === 'ACTIVE',
        cohorts: (r.assignedCohortBatches ?? []).map((b) => ({ id: b.id, name: b.name })),
        courses: (r.assignedCourses ?? []).map((c) => ({ id: c.id, name: c.name })),
      }));
    },
  });
}
