import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { newsletterKeys } from './query-keys';

// ============================================
// NEWSLETTER QUERIES (Admin Only)
// ============================================

export function useNewsletterSubscribers() {
  return useQuery({
    queryKey: newsletterKeys.list(),
    queryFn: () => apiRequest(API_ENDPOINTS.NEWSLETTER.LIST),
  });
}

// ============================================
// NEWSLETTER MUTATIONS
// ============================================

export function useSubscribeToNewsletter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) =>
      apiRequest(API_ENDPOINTS.NEWSLETTER.SUBSCRIBE, {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsletterKeys.list() });
      toaster.create({
        title: 'Success!',
        description: 'You have successfully joined the movement.',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Subscription Failed',
        description: error.message || 'Something went wrong. Please try again.',
        type: 'error',
      });
    },
  });
}
