import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { userKeys } from './query-keys';

// ============================================
// USER QUERIES
// ============================================

export function useUserProfile() {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => apiRequest(API_ENDPOINTS.USERS.PROFILE),
  });
}

export function useUserReferrals() {
  return useQuery({
    queryKey: userKeys.referrals(),
    queryFn: () => apiRequest(API_ENDPOINTS.USERS.REFERRALS),
  });
}

export function useUsers(filters?: any) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => apiRequest(API_ENDPOINTS.USERS.LIST),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => apiRequest(API_ENDPOINTS.USERS.BY_ID(id)),
    enabled: !!id,
  });
}

// ============================================
// USER MUTATIONS
// ============================================

export function useUpdateUserById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest(API_ENDPOINTS.USERS.UPDATE_BY_ID(id), {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toaster.create({
        title: 'User Updated',
        description: 'User profile updated successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to update user profile',
        type: 'error',
      });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      apiRequest(API_ENDPOINTS.USERS.UPDATE_PROFILE, {
        method: 'PATCH',
        body: data,
      }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: userKeys.profile() });
      const previousData = queryClient.getQueryData(userKeys.profile());

      queryClient.setQueryData(userKeys.profile(), (old: any) => ({
        ...old,
        ...newData,
      }));

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      toaster.create({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(userKeys.profile(), context.previousData);
      }
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile',
        type: 'error',
      });
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) =>
      apiRequest(API_ENDPOINTS.USERS.UPDATE_STATUS(id), {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toaster.create({
        title: 'Status Updated',
        description: 'User status updated successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to update user status',
        type: 'error',
      });
    },
  });
}

export function usePromoteSafetyAmbassador() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      safetyAmbassador,
    }: {
      id: string;
      safetyAmbassador?: boolean;
    }) =>
      apiRequest(API_ENDPOINTS.USERS.PROMOTE_SAFETY_AMBASSADOR(id), {
        method: 'PATCH',
        body: JSON.stringify({ safetyAmbassador }),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toaster.create({
        title: 'Success',
        description: 'Safety ambassador status updated',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Failed',
        description:
          error.message || 'Failed to update safety ambassador status',
        type: 'error',
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.USERS.DELETE(id), {
        method: 'DELETE',
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });
      const previousData = queryClient.getQueryData(userKeys.lists());

      queryClient.setQueryData(userKeys.lists(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((user: any) => user.id !== id),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toaster.create({
        title: 'User Deleted',
        description: 'User deleted successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(userKeys.lists(), context.previousData);
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete user',
        type: 'error',
      });
    },
  });
}
