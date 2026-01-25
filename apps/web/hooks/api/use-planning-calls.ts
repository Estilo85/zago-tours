import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { planningCallKeys } from './query-keys';

// ============================================
// PLANNING CALL QUERIES
// ============================================

export function usePlanningCalls(filters?: any) {
  return useQuery({
    queryKey: planningCallKeys.list(filters),
    queryFn: () => apiRequest(API_ENDPOINTS.PLANNING_CALLS.LIST),
  });
}

export function usePlanningCall(id: string) {
  return useQuery({
    queryKey: planningCallKeys.detail(id),
    queryFn: () => apiRequest(API_ENDPOINTS.PLANNING_CALLS.BY_ID(id)),
    enabled: !!id,
  });
}

export function useUpcomingPlanningCalls() {
  return useQuery({
    queryKey: planningCallKeys.upcoming(),
    queryFn: () => apiRequest(API_ENDPOINTS.PLANNING_CALLS.UPCOMING),
  });
}

export function useMyPlanningCalls() {
  return useQuery({
    queryKey: planningCallKeys.myCalls(),
    queryFn: () => apiRequest(API_ENDPOINTS.PLANNING_CALLS.MY_CALLS),
  });
}

// ============================================
// PLANNING CALL MUTATIONS
// ============================================

export function useSchedulePlanningCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      apiRequest(API_ENDPOINTS.PLANNING_CALLS.SCHEDULE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planningCallKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.upcoming() });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.myCalls() });
      toaster.create({
        title: 'Call Scheduled',
        description: 'Your planning call has been scheduled successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Scheduling Failed',
        description: error.message || 'Failed to schedule planning call',
        type: 'error',
      });
    },
  });
}

export function useReschedulePlanningCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest(API_ENDPOINTS.PLANNING_CALLS.RESCHEDULE(id), {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: planningCallKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.upcoming() });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.myCalls() });
      toaster.create({
        title: 'Call Rescheduled',
        description: 'Planning call rescheduled successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Rescheduling Failed',
        description: error.message || 'Failed to reschedule planning call',
        type: 'error',
      });
    },
  });
}

export function useCancelPlanningCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.PLANNING_CALLS.CANCEL(id), {
        method: 'PATCH',
      }),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: planningCallKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.upcoming() });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.myCalls() });
      toaster.create({
        title: 'Call Cancelled',
        description: 'Planning call cancelled successfully',
        type: 'info',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Cancellation Failed',
        description: error.message || 'Failed to cancel planning call',
        type: 'error',
      });
    },
  });
}

export function useCompletePlanningCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.PLANNING_CALLS.COMPLETE(id), {
        method: 'PATCH',
      }),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: planningCallKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.lists() });
      toaster.create({
        title: 'Call Completed',
        description: 'Planning call marked as completed',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to mark call as completed',
        type: 'error',
      });
    },
  });
}

export function useDeletePlanningCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.PLANNING_CALLS.DELETE(id), {
        method: 'DELETE',
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: planningCallKeys.lists() });
      const previousData = queryClient.getQueryData(planningCallKeys.lists());

      queryClient.setQueryData(planningCallKeys.lists(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((call: any) => call.id !== id),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planningCallKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planningCallKeys.myCalls() });
      toaster.create({
        title: 'Call Deleted',
        description: 'Planning call deleted successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          planningCallKeys.lists(),
          context.previousData,
        );
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete planning call',
        type: 'error',
      });
    },
  });
}
