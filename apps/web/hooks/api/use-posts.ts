import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { postKeys } from './query-keys';

// ============================================
// POST QUERIES
// ============================================

export function usePosts(filters?: any) {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: () => apiRequest(API_ENDPOINTS.POSTS.LIST),
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => apiRequest(API_ENDPOINTS.POSTS.BY_ID(id)),
    enabled: !!id,
  });
}

export function useMyPosts() {
  return useQuery({
    queryKey: postKeys.myPosts(),
    queryFn: () => apiRequest(API_ENDPOINTS.POSTS.MY_POSTS),
  });
}

export function useFeed() {
  return useQuery({
    queryKey: postKeys.feed(),
    queryFn: () => apiRequest(API_ENDPOINTS.POSTS.FEED),
  });
}

export function useComments(postId: string) {
  return useQuery({
    queryKey: postKeys.comments(postId),
    queryFn: () => apiRequest(API_ENDPOINTS.POSTS.COMMENTS.LIST(postId)),
    enabled: !!postId,
  });
}

// ============================================
// POST MUTATIONS
// ============================================

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      apiRequest(API_ENDPOINTS.POSTS.CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.myPosts() });
      queryClient.invalidateQueries({ queryKey: postKeys.feed() });
      toaster.create({
        title: 'Post Created',
        description: 'Your post has been created successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Creation Failed',
        description: error.message || 'Failed to create post',
        type: 'error',
      });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest(API_ENDPOINTS.POSTS.UPDATE(id), {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(id) });
      const previousData = queryClient.getQueryData(postKeys.detail(id));

      queryClient.setQueryData(postKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousData, id };
    },
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.myPosts() });
      toaster.create({
        title: 'Post Updated',
        description: 'Post updated successfully',
        type: 'success',
      });
    },
    onError: (error: any, { id }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(postKeys.detail(id), context.previousData);
      }
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to update post',
        type: 'error',
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.POSTS.DELETE(id), {
        method: 'DELETE',
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const previousData = queryClient.getQueryData(postKeys.lists());

      queryClient.setQueryData(postKeys.lists(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((post: any) => post.id !== id),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.myPosts() });
      queryClient.invalidateQueries({ queryKey: postKeys.feed() });
      toaster.create({
        title: 'Post Deleted',
        description: 'Post deleted successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(postKeys.lists(), context.previousData);
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete post',
        type: 'error',
      });
    },
  });
}

export function useToggleLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) =>
      apiRequest(API_ENDPOINTS.POSTS.TOGGLE_LIKE(postId), {
        method: 'POST',
      }),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });
      const previousData = queryClient.getQueryData(postKeys.detail(postId));

      queryClient.setQueryData(postKeys.detail(postId), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: !old.isLiked,
          likesCount: old.isLiked ? old.likesCount - 1 : old.likesCount + 1,
        };
      });

      return { previousData, postId };
    },
    onError: (error: any, postId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(postKeys.detail(postId), context.previousData);
      }
    },
    onSettled: (_data, _error, postId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}

export function useSharePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) =>
      apiRequest(API_ENDPOINTS.POSTS.SHARE(postId), {
        method: 'POST',
      }),
    onSuccess: (_result, postId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      toaster.create({
        title: 'Post Shared',
        description: 'Post shared successfully',
        type: 'success',
      });
    },
  });
}

// ============================================
// COMMENT MUTATIONS
// ============================================

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: any }) =>
      apiRequest(API_ENDPOINTS.POSTS.COMMENTS.CREATE(postId), {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (_result, { postId }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.comments(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      toaster.create({
        title: 'Comment Added',
        description: 'Your comment has been added',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Comment Failed',
        description: error.message || 'Failed to add comment',
        type: 'error',
      });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) =>
      apiRequest(API_ENDPOINTS.POSTS.COMMENTS.DELETE(postId, commentId), {
        method: 'DELETE',
      }),
    onMutate: async ({ postId, commentId }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.comments(postId) });
      const previousData = queryClient.getQueryData(postKeys.comments(postId));

      queryClient.setQueryData(postKeys.comments(postId), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((comment: any) => comment.id !== commentId),
        };
      });

      return { previousData, postId };
    },
    onSuccess: (_result, { postId }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.comments(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      toaster.create({
        title: 'Comment Deleted',
        description: 'Comment removed successfully',
        type: 'success',
      });
    },
    onError: (error: any, { postId }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          postKeys.comments(postId),
          context.previousData,
        );
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete comment',
        type: 'error',
      });
    },
  });
}
