import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { adventureKeys } from './query-keys';
import {
  AdventureDetailResponseDto,
  AdventureListQueryDto,
  CreateAdventureDto,
  CreateItineraryDto,
  PaginatedResponse,
  ReorderGalleryDto,
} from '@zagotours/types';

// ============================================
// ADVENTURE QUERIES
// ============================================

export function useAdventures(filters?: AdventureListQueryDto) {
  return useQuery<PaginatedResponse<AdventureDetailResponseDto>>({
    queryKey: adventureKeys.list(filters),
    queryFn: () => {
      let url = API_ENDPOINTS.ADVENTURES.LIST;

      if (filters) {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });

        const queryString = params.toString();

        if (queryString) {
          url = `${url}?${queryString}`;
        }
      }

      return apiRequest(url);
    },
  });
}

export function useAdventure(id: string) {
  return useQuery<{ data: AdventureDetailResponseDto }>({
    queryKey: adventureKeys.detail(id),
    queryFn: () => apiRequest(API_ENDPOINTS.ADVENTURES.BY_ID(id)),
    enabled: !!id,
  });
}

export function useItineraries(adventureId: string) {
  return useQuery({
    queryKey: adventureKeys.itineraries(adventureId),
    queryFn: () =>
      apiRequest(API_ENDPOINTS.ADVENTURES.ITINERARIES.LIST(adventureId)),
    enabled: !!adventureId,
  });
}

export function useGallery(adventureId: string) {
  return useQuery({
    queryKey: adventureKeys.gallery(adventureId),
    queryFn: () =>
      apiRequest(API_ENDPOINTS.ADVENTURES.GALLERY.LIST(adventureId)),
    enabled: !!adventureId,
  });
}

// ============================================
// ADVENTURE MUTATIONS
// ============================================

export function useCreateAdventure() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.CREATE, {
        method: 'POST',
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.lists() });
    },
    onError: () => {
      toaster.create({
        title: 'Creation Failed',
        description: 'Failed to create adventure',
        type: 'error',
      });
    },
  });
}

export function useBulkCreateAdventures() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAdventureDto[]) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.BULK_CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.lists() });
    },
    onError: () => {
      toaster.create({
        title: 'Creation Failed',
        description: 'Failed to create adventures',
        type: 'error',
      });
    },
  });
}

export function useUpdateAdventure() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.UPDATE(id), {
        method: 'PATCH',
        body: data,
      }),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: adventureKeys.detail(id) });
      const previousData = queryClient.getQueryData(adventureKeys.detail(id));

      queryClient.setQueryData(adventureKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousData, id };
    },
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adventureKeys.lists() });
    },
    onError: (_error, { id }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          adventureKeys.detail(id),
          context.previousData,
        );
      }
      toaster.create({
        title: 'Update Failed',
        description: 'Failed to update adventure',
        type: 'error',
      });
    },
  });
}

export function useDeleteAdventure() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.DELETE(id), {
        method: 'DELETE',
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: adventureKeys.lists() });
      const previousData = queryClient.getQueryData(adventureKeys.lists());

      queryClient.setQueryData(adventureKeys.lists(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((adventure: any) => adventure.id !== id),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.lists() });
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(adventureKeys.lists(), context.previousData);
      }
      toaster.create({
        title: 'Delete Failed',
        description: 'Failed to delete adventure',
        type: 'error',
      });
    },
  });
}

export function useToggleLikeAdventure() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.TOGGLE_LIKE(id), {
        method: 'POST',
      }),
    onMutate: async (id) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: adventureKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: adventureKeys.lists() });

      // Snapshot previous values
      const previousDetail = queryClient.getQueryData(adventureKeys.detail(id));
      const previousLists = queryClient.getQueriesData({
        queryKey: adventureKeys.lists(),
      });

      // Optimistically update detail query
      queryClient.setQueryData(adventureKeys.detail(id), (old: any) => {
        if (!old?.data) return old;

        const currentLikesCount = old.data._count?.likes || 0;
        const isCurrentlyLiked = old.data.isLiked || false;

        return {
          ...old,
          data: {
            ...old.data,
            isLiked: !isCurrentlyLiked,
            _count: {
              ...old.data._count,
              likes: isCurrentlyLiked
                ? currentLikesCount - 1
                : currentLikesCount + 1,
            },
          },
        };
      });

      // Optimistically update all list queries
      queryClient.setQueriesData(
        { queryKey: adventureKeys.lists() },
        (old: any) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.map((adventure: any) => {
              if (adventure.id !== id) return adventure;

              const currentLikesCount = adventure._count?.likes || 0;
              const isCurrentlyLiked = adventure.isLiked || false;

              return {
                ...adventure,
                isLiked: !isCurrentlyLiked,
                _count: {
                  ...adventure._count,
                  likes: isCurrentlyLiked
                    ? currentLikesCount - 1
                    : currentLikesCount + 1,
                },
              };
            }),
          };
        },
      );

      return { previousDetail, previousLists, id };
    },
    onError: (_error, id, context) => {
      // Rollback detail query
      if (context?.previousDetail) {
        queryClient.setQueryData(
          adventureKeys.detail(id),
          context.previousDetail,
        );
      }

      // Rollback all list queries
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      toaster.create({
        title: 'Error',
        description: 'Failed to update like status',
        type: 'error',
      });
    },
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adventureKeys.lists() });
    },
  });
}

// ============================================
// ITINERARY MUTATIONS
// ============================================

export function useCreateItinerary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adventureId, data }: { adventureId: string; data: any }) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.ITINERARIES.CREATE(adventureId), {
        method: 'POST',
        body: data,
      }),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.itineraries(adventureId),
      });
    },
    onError: () => {
      toaster.create({
        title: 'Creation Failed',
        description: 'Failed to add itinerary',
        type: 'error',
      });
    },
  });
}

export function useBulkCreateItineraries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      adventureId,
      itineraries,
    }: {
      adventureId: string;
      itineraries: FormData;
    }) =>
      apiRequest(
        API_ENDPOINTS.ADVENTURES.ITINERARIES.BULK_CREATE(adventureId),
        {
          method: 'POST',
          body: itineraries,
        },
      ),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.itineraries(adventureId),
      });
    },
    onError: () => {
      toaster.create({
        title: 'Creation Failed',
        description: 'Failed to add itineraries',
        type: 'error',
      });
    },
  });
}

export function useUpdateItinerary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itineraryId,
      data,
      adventureId,
    }: {
      itineraryId: string;
      data: any;
      adventureId: string;
    }) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.ITINERARIES.UPDATE(itineraryId), {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.itineraries(adventureId),
      });
    },
    onError: () => {
      toaster.create({
        title: 'Update Failed',
        description: 'Failed to update itinerary',
        type: 'error',
      });
    },
  });
}

export function useDeleteItinerary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itineraryId,
      adventureId,
    }: {
      itineraryId: string;
      adventureId: string;
    }) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.ITINERARIES.DELETE(itineraryId), {
        method: 'DELETE',
      }),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.itineraries(adventureId),
      });
    },
    onError: () => {
      toaster.create({
        title: 'Delete Failed',
        description: 'Failed to remove itinerary',
        type: 'error',
      });
    },
  });
}

// ============================================
// GALLERY MUTATIONS
// ============================================

export function useCreateGalleryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adventureId, data }: { adventureId: string; data: any }) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.GALLERY.CREATE(adventureId), {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.gallery(adventureId),
      });
    },
    onError: () => {
      toaster.create({
        title: 'Upload Failed',
        description: 'Failed to add gallery image',
        type: 'error',
      });
    },
  });
}

export function useBulkUploadGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      adventureId,
      files,
      altTexts,
    }: {
      adventureId: string;
      files: File[];
      altTexts?: string[];
    }) => {
      const formData = new FormData();

      files.forEach((file, index) => {
        formData.append('media', file);

        formData.append(`mediaTypes[${index}]`, 'IMAGE');
        if (altTexts?.[index]) {
          formData.append(`altTexts[${index}]`, altTexts[index]);
        }
      });

      return apiRequest(
        API_ENDPOINTS.ADVENTURES.GALLERY.BULK_UPLOAD(adventureId),
        {
          method: 'POST',
          body: formData,
        },
      );
    },
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.gallery(adventureId),
      });
    },
    onError: () => {
      toaster.create({
        title: 'Upload Failed',
        description: 'Failed to upload gallery images',
        type: 'error',
      });
    },
  });
}

export function useUpdateGalleryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      galleryId,
      data,
      adventureId,
    }: {
      galleryId: string;
      data: any;
      adventureId: string;
    }) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.GALLERY.UPDATE(galleryId), {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.gallery(adventureId),
      });
    },
    onError: () => {
      toaster.create({
        title: 'Update Failed',
        description: 'Failed to update gallery image',
        type: 'error',
      });
    },
  });
}

export function useReorderGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReorderGalleryDto) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.GALLERY.REORDER, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.all });
    },
    onError: () => {
      toaster.create({
        title: 'Reorder Failed',
        description: 'Failed to save gallery sequence',
        type: 'error',
      });
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      galleryId,
      adventureId,
    }: {
      galleryId: string;
      adventureId: string;
    }) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.GALLERY.DELETE(galleryId), {
        method: 'DELETE',
      }),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.gallery(adventureId),
      });
    },
    onError: () => {
      toaster.create({
        title: 'Delete Failed',
        description: 'Failed to remove gallery image',
        type: 'error',
      });
    },
  });
}
