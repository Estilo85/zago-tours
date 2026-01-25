import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { eventKeys } from './query-keys';

// ============================================
// EVENT QUERIES
// ============================================

export function useEvents(filters?: any) {
  return useQuery({
    queryKey: eventKeys.list(filters),
    queryFn: () => apiRequest(API_ENDPOINTS.EVENTS.LIST),
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => apiRequest(API_ENDPOINTS.EVENTS.BY_ID(id)),
    enabled: !!id,
  });
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: eventKeys.upcoming(),
    queryFn: () => apiRequest(API_ENDPOINTS.EVENTS.UPCOMING),
  });
}

export function useMyEventBookings() {
  return useQuery({
    queryKey: eventKeys.myBookings(),
    queryFn: () => apiRequest(API_ENDPOINTS.EVENTS.MY_BOOKINGS),
  });
}

export function useEventAdminStats() {
  return useQuery({
    queryKey: eventKeys.adminStats(),
    queryFn: () => apiRequest(API_ENDPOINTS.EVENTS.ADMIN_STATS),
  });
}

// ============================================
// EVENT MUTATIONS
// ============================================

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      apiRequest(API_ENDPOINTS.EVENTS.CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.upcoming() });
      toaster.create({
        title: 'Event Created',
        description: 'Event has been created successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Creation Failed',
        description: error.message || 'Failed to create event',
        type: 'error',
      });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest(API_ENDPOINTS.EVENTS.UPDATE(id), {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: eventKeys.detail(id) });
      const previousData = queryClient.getQueryData(eventKeys.detail(id));

      queryClient.setQueryData(eventKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousData, id };
    },
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.upcoming() });
      toaster.create({
        title: 'Event Updated',
        description: 'Event updated successfully',
        type: 'success',
      });
    },
    onError: (error: any, { id }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(eventKeys.detail(id), context.previousData);
      }
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to update event',
        type: 'error',
      });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.EVENTS.DELETE(id), {
        method: 'DELETE',
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: eventKeys.lists() });
      const previousData = queryClient.getQueryData(eventKeys.lists());

      queryClient.setQueryData(eventKeys.lists(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((event: any) => event.id !== id),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.upcoming() });
      toaster.create({
        title: 'Event Deleted',
        description: 'Event deleted successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(eventKeys.lists(), context.previousData);
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete event',
        type: 'error',
      });
    },
  });
}

export function useJoinEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.EVENTS.JOIN(id), {
        method: 'POST',
      }),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: eventKeys.myBookings() });
      toaster.create({
        title: 'Registration Successful',
        description: 'You have successfully registered for this event',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Registration Failed',
        description: error.message || 'Failed to register for event',
        type: 'error',
      });
    },
  });
}

export function useCancelEventRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.EVENTS.CANCEL_REGISTRATION(id), {
        method: 'POST',
      }),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: eventKeys.myBookings() });
      toaster.create({
        title: 'Registration Cancelled',
        description: 'Your event registration has been cancelled',
        type: 'info',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Cancellation Failed',
        description: error.message || 'Failed to cancel registration',
        type: 'error',
      });
    },
  });
}
