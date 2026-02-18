import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { contractKeys } from './query-keys';

// ============================================
// CONTRACT QUERIES
// ============================================

export function useContracts(filters?: any) {
  return useQuery({
    queryKey: contractKeys.list(filters),
    queryFn: () => apiRequest(API_ENDPOINTS.CONTRACTS.LIST),
  });
}

export function useContract(id: string) {
  return useQuery({
    queryKey: contractKeys.detail(id),
    queryFn: () => apiRequest(API_ENDPOINTS.CONTRACTS.BY_ID(id)),
    enabled: !!id,
  });
}

export function useMyContracts() {
  return useQuery({
    queryKey: contractKeys.myContracts(),
    queryFn: () => apiRequest(API_ENDPOINTS.CONTRACTS.MY_CONTRACTS),
  });
}

export function usePendingContracts() {
  return useQuery({
    queryKey: contractKeys.pending(),
    queryFn: () => apiRequest(API_ENDPOINTS.CONTRACTS.PENDING),
  });
}

// ============================================
// CONTRACT MUTATIONS
// ============================================

export function useCreateContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      apiRequest(API_ENDPOINTS.CONTRACTS.CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contractKeys.lists() });
      queryClient.invalidateQueries({ queryKey: contractKeys.pending() });
      toaster.create({
        title: 'Contract Created',
        description: 'Contract has been created successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Creation Failed',
        description: error.message || 'Failed to create contract',
        type: 'error',
      });
    },
  });
}

export function useSignContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, signature }: { id: string; signature: any }) =>
      apiRequest(API_ENDPOINTS.CONTRACTS.SIGN(id), {
        method: 'POST',
        body: JSON.stringify({ signature }),
      }),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: contractKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: contractKeys.myContracts() });
      queryClient.invalidateQueries({ queryKey: contractKeys.pending() });
      toaster.create({
        title: 'Contract Signed',
        description: 'Contract has been signed successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Signing Failed',
        description: error.message || 'Failed to sign contract',
        type: 'error',
      });
    },
  });
}

export function useDeleteContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.CONTRACTS.DELETE(id), {
        method: 'DELETE',
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: contractKeys.lists() });
      const previousData = queryClient.getQueryData(contractKeys.lists());

      queryClient.setQueryData(contractKeys.lists(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((contract: any) => contract.id !== id),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contractKeys.lists() });
      queryClient.invalidateQueries({ queryKey: contractKeys.myContracts() });
      toaster.create({
        title: 'Contract Deleted',
        description: 'Contract deleted successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(contractKeys.lists(), context.previousData);
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete contract',
        type: 'error',
      });
    },
  });
}
