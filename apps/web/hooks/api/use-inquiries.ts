import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { inquiryKeys } from './query-keys';

// ============================================
// INQUIRY QUERIES
// ============================================

export function useInquiries(filters?: any) {
  return useQuery({
    queryKey: inquiryKeys.list(filters),
    queryFn: () => apiRequest(API_ENDPOINTS.INQUIRIES.LIST),
  });
}

export function useInquiry(id: string) {
  return useQuery({
    queryKey: inquiryKeys.detail(id),
    queryFn: () => apiRequest(API_ENDPOINTS.INQUIRIES.BY_ID(id)),
    enabled: !!id,
  });
}

export function useRecentInquiries() {
  return useQuery({
    queryKey: inquiryKeys.recent(),
    queryFn: () => apiRequest(API_ENDPOINTS.INQUIRIES.RECENT),
  });
}

// ============================================
// INQUIRY MUTATIONS
// ============================================

export function useCreateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      apiRequest(API_ENDPOINTS.INQUIRIES.CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: inquiryKeys.recent() });
      toaster.create({
        title: 'Inquiry Submitted',
        description: 'Your inquiry has been submitted successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Submission Failed',
        description: error.message || 'Failed to submit inquiry',
        type: 'error',
      });
    },
  });
}

export function useDeleteInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.INQUIRIES.DELETE(id), {
        method: 'DELETE',
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: inquiryKeys.lists() });
      const previousData = queryClient.getQueryData(inquiryKeys.lists());

      queryClient.setQueryData(inquiryKeys.lists(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((inquiry: any) => inquiry.id !== id),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
      toaster.create({
        title: 'Inquiry Deleted',
        description: 'Inquiry deleted successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(inquiryKeys.lists(), context.previousData);
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete inquiry',
        type: 'error',
      });
    },
  });
}
