import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { facilitatorApi, AttendanceParticipantsResponse, MarkAttendanceRequest, MarkAttendanceResponse } from '@/lib/facilitatorApi';

export const useAttendanceParticipants = (cohortId?: string, date?: string, startDate?: string, endDate?: string) => {
  return useQuery<AttendanceParticipantsResponse>({
    queryKey: ['attendanceParticipants', cohortId, date, startDate, endDate],
    queryFn: () => facilitatorApi.getAttendanceParticipants(cohortId, date, startDate, endDate),
    refetchInterval: 15000,
  });
};

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();
  
  return useMutation<MarkAttendanceResponse, Error, MarkAttendanceRequest>({
    mutationFn: (request) => facilitatorApi.markAttendance(request),
    onMutate: async (newAttendance) => {
      await queryClient.cancelQueries({ queryKey: ['attendanceParticipants'] });
      const previousData = queryClient.getQueryData(['attendanceParticipants']);
      
      queryClient.setQueryData(['attendanceParticipants'], (old: any) => {
        if (!old?.participants) return old;
        return {
          ...old,
          participants: old.participants.map((p: any) =>
            newAttendance.attendanceRecords.some((r: any) => r.participantId === p.participantId)
              ? { ...p, attendanceStatus: newAttendance.attendanceRecords.find((r: any) => r.participantId === p.participantId)?.status }
              : p
          ),
        };
      });
      
      return { previousData };
    },
    onError: (_err, _newAttendance, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['attendanceParticipants'], context.previousData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendanceParticipants'] });
      queryClient.invalidateQueries({ queryKey: ['facilitator', 'participants', 'statistics'] });
    },
  });
};
