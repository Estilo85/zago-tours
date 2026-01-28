import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import { adventureKeys } from './query-keys';
import {
  AdventureDetailResponseDto,
  AdventureListQueryDto,
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
  return useQuery<AdventureDetailResponseDto>({
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
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.lists() });
      toaster.create({
        title: 'Adventure Created',
        description: 'Your adventure has been created successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Creation Failed',
        description: error.message || 'Failed to create adventure',
        type: 'error',
      });
    },
  });
}

export function useBulkCreateAdventures() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any[]) =>
      apiRequest(API_ENDPOINTS.ADVENTURES.BULK_CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.lists() });
      toaster.create({
        title: 'Adventures Created',
        description: 'Adventures created successfully',
        type: 'success',
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
        body: JSON.stringify(data),
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
      toaster.create({
        title: 'Adventure Updated',
        description: 'Adventure updated successfully',
        type: 'success',
      });
    },
    onError: (error: any, { id }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          adventureKeys.detail(id),
          context.previousData,
        );
      }
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to update adventure',
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
      toaster.create({
        title: 'Adventure Deleted',
        description: 'Adventure deleted successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(adventureKeys.lists(), context.previousData);
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete adventure',
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
      await queryClient.cancelQueries({ queryKey: adventureKeys.detail(id) });
      const previousData = queryClient.getQueryData(adventureKeys.detail(id));

      queryClient.setQueryData(adventureKeys.detail(id), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: !old.isLiked,
          likesCount: old.isLiked ? old.likesCount - 1 : old.likesCount + 1,
        };
      });

      return { previousData, id };
    },
    onError: (error: any, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          adventureKeys.detail(id),
          context.previousData,
        );
      }
    },
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({ queryKey: adventureKeys.detail(id) });
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
        body: JSON.stringify(data),
      }),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.itineraries(adventureId),
      });
      toaster.create({
        title: 'Itinerary Created',
        description: 'Itinerary added successfully',
        type: 'success',
      });
    },
  });
}

export function useBulkCreateItineraries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adventureId, data }: { adventureId: string; data: any[] }) =>
      apiRequest(
        API_ENDPOINTS.ADVENTURES.ITINERARIES.BULK_CREATE(adventureId),
        {
          method: 'POST',
          body: JSON.stringify(data),
        },
      ),
    onSuccess: (_result, { adventureId }) => {
      queryClient.invalidateQueries({
        queryKey: adventureKeys.itineraries(adventureId),
      });
      toaster.create({
        title: 'Itineraries Created',
        description: 'Itineraries added successfully',
        type: 'success',
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
      toaster.create({
        title: 'Itinerary Updated',
        description: 'Itinerary updated successfully',
        type: 'success',
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
      toaster.create({
        title: 'Itinerary Deleted',
        description: 'Itinerary removed successfully',
        type: 'success',
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
      toaster.create({
        title: 'Image Added',
        description: 'Gallery image added successfully',
        type: 'success',
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
      toaster.create({
        title: 'Images Uploaded',
        description: 'Gallery images uploaded successfully',
        type: 'success',
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Upload Failed',
        description: error.message || 'Something went wrong',
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
      toaster.create({
        title: 'Image Updated',
        description: 'Gallery image updated successfully',
        type: 'success',
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

      toaster.create({
        title: 'Order Updated',
        description: 'Gallery sequence saved successfully',
        type: 'success',
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Reorder Failed',
        description: error.message,
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
      toaster.create({
        title: 'Image Deleted',
        description: 'Gallery image removed successfully',
        type: 'success',
      });
    },
  });
}
