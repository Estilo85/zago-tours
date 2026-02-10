import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import { apiRequest } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api.config';
import {
  agentKeys,
  dashboardKeys,
  countryKeys,
  settingsKeys,
} from './query-keys';
import {
  UpdatePlatformSettingsDto,
  CreateDestinationCountryDto,
  UpdateDestinationCountryDto,
  BulkCreateDestinationCountriesDto,
  DestinationCountryListQueryDto,
} from '@zagotours/types';

// ============================================
// AGENT QUERIES
// ============================================

export function useAvailableAgents() {
  return useQuery({
    queryKey: agentKeys.available(),
    queryFn: () => apiRequest(API_ENDPOINTS.AGENTS.AVAILABLE),
  });
}

export function useAgentAssignmentStats() {
  return useQuery({
    queryKey: agentKeys.assignmentStats(),
    queryFn: () => apiRequest(API_ENDPOINTS.AGENTS.ASSIGNMENT_STATS),
  });
}

// ============================================
// AGENT MUTATIONS
// ============================================

export function useValidateAgent() {
  return useMutation({
    mutationFn: (id: string) => apiRequest(API_ENDPOINTS.AGENTS.VALIDATE(id)),
    onError: (error: any) => {
      toaster.create({
        title: 'Validation Failed',
        description: error.message || 'Failed to validate agent',
        type: 'error',
      });
    },
  });
}

export function useTestAutoAssign() {
  return useMutation({
    mutationFn: () =>
      apiRequest(API_ENDPOINTS.AGENTS.TEST_AUTO_ASSIGN, {
        method: 'POST',
      }),
    onSuccess: () => {
      toaster.create({
        title: 'Test Successful',
        description: 'Auto-assignment test completed',
        type: 'success',
      });
    },
  });
}

// ============================================
// DASHBOARD QUERIES
// ============================================

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => apiRequest(API_ENDPOINTS.DASHBOARD.STATS),
  });
}

// ============================================
// PLATFORM SETTINGS QUERIES
// ============================================

export function usePublicSettings() {
  return useQuery({
    queryKey: settingsKeys.public(),
    queryFn: () => apiRequest(API_ENDPOINTS.SETTINGS.PUBLIC),
  });
}

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: () => apiRequest(API_ENDPOINTS.SETTINGS.GET),
  });
}

export function useMaintenanceCheck() {
  return useQuery({
    queryKey: [...settingsKeys.all, 'maintenance-check'],
    queryFn: () => apiRequest(API_ENDPOINTS.SETTINGS.MAINTENANCE_CHECK),
  });
}

// ============================================
// PLATFORM SETTINGS MUTATIONS
// ============================================

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePlatformSettingsDto) =>
      apiRequest(API_ENDPOINTS.SETTINGS.UPDATE, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: settingsKeys.detail() });
      const previousData = queryClient.getQueryData(settingsKeys.detail());

      queryClient.setQueryData(settingsKeys.detail(), (old: any) => ({
        ...old,
        ...newData,
      }));

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.detail() });
      queryClient.invalidateQueries({ queryKey: settingsKeys.public() });
      toaster.create({
        title: 'Settings Updated',
        description: 'Settings updated successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(settingsKeys.detail(), context.previousData);
      }
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to update settings',
        type: 'error',
      });
    },
  });
}

export function useUpdateSiteName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (siteName: string) =>
      apiRequest(API_ENDPOINTS.SETTINGS.UPDATE_SITE_NAME, {
        method: 'PATCH',
        body: JSON.stringify({ siteName }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.detail() });
      queryClient.invalidateQueries({ queryKey: settingsKeys.public() });
      toaster.create({
        title: 'Site Name Updated',
        description: 'Site name updated successfully',
        type: 'success',
      });
    },
  });
}

export function useUpdateContactEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactEmail: string) =>
      apiRequest(API_ENDPOINTS.SETTINGS.UPDATE_CONTACT_EMAIL, {
        method: 'PATCH',
        body: JSON.stringify({ contactEmail }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.detail() });
      queryClient.invalidateQueries({ queryKey: settingsKeys.public() });
      toaster.create({
        title: 'Contact Email Updated',
        description: 'Contact email updated successfully',
        type: 'success',
      });
    },
  });
}

export function useEnableMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiRequest(API_ENDPOINTS.SETTINGS.ENABLE_MAINTENANCE, {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.detail() });
      toaster.create({
        title: 'Maintenance Mode Enabled',
        description: 'Site is now in maintenance mode',
        type: 'info',
      });
    },
  });
}

export function useDisableMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiRequest(API_ENDPOINTS.SETTINGS.DISABLE_MAINTENANCE, {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.detail() });
      toaster.create({
        title: 'Maintenance Mode Disabled',
        description: 'Site is now live',
        type: 'success',
      });
    },
  });
}

export function useClearCache() {
  return useMutation({
    mutationFn: () =>
      apiRequest(API_ENDPOINTS.SETTINGS.CLEAR_CACHE, {
        method: 'POST',
      }),
    onSuccess: () => {
      toaster.create({
        title: 'Cache Cleared',
        description: 'System cache cleared successfully',
        type: 'success',
      });
    },
  });
}

// ============================================
// DESTINATION COUNTRIES QUERIES
// ============================================

export function useCountries(filters?: DestinationCountryListQueryDto) {
  return useQuery({
    queryKey: countryKeys.list(filters),
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.isActive !== undefined)
        params.append('isActive', filters.isActive.toString());
      if (filters?.search) params.append('search', filters.search);
      if (filters?.sortBy) params.append('sortBy', filters.sortBy);
      if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

      const queryString = params.toString();
      const url = queryString
        ? `${API_ENDPOINTS.COUNTRIES.LIST}?${queryString}`
        : API_ENDPOINTS.COUNTRIES.LIST;

      return apiRequest(url);
    },
  });
}

export function useCountry(id: string) {
  return useQuery({
    queryKey: countryKeys.detail(id),
    queryFn: () => apiRequest(API_ENDPOINTS.COUNTRIES.BY_ID(id)),
    enabled: !!id,
  });
}

// ============================================
// DESTINATION COUNTRIES MUTATIONS
// ============================================

export function useCreateCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDestinationCountryDto) =>
      apiRequest(API_ENDPOINTS.COUNTRIES.CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: countryKeys.lists() });
      toaster.create({
        title: 'Country Added',
        description: 'Country has been added successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Creation Failed',
        description: error.message || 'Failed to add country',
        type: 'error',
      });
    },
  });
}

export function useBulkCreateCountries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkCreateDestinationCountriesDto) =>
      apiRequest(API_ENDPOINTS.COUNTRIES.CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: countryKeys.lists() });
      toaster.create({
        title: 'Countries Added',
        description: 'Countries have been added successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Bulk Creation Failed',
        description: error.message || 'Failed to add countries',
        type: 'error',
      });
    },
  });
}

export function useUpdateCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDestinationCountryDto;
    }) =>
      apiRequest(API_ENDPOINTS.COUNTRIES.UPDATE(id), {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: countryKeys.detail(id) });
      const previousData = queryClient.getQueryData(countryKeys.detail(id));

      queryClient.setQueryData(countryKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousData, id };
    },
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: countryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: countryKeys.lists() });
      toaster.create({
        title: 'Country Updated',
        description: 'Country updated successfully',
        type: 'success',
      });
    },
    onError: (error: any, { id }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(countryKeys.detail(id), context.previousData);
      }
      toaster.create({
        title: 'Update Failed',
        description: error.message || 'Failed to update country',
        type: 'error',
      });
    },
  });
}

export function useToggleCountryActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.COUNTRIES.TOGGLE_ACTIVE(id), {
        method: 'PATCH',
      }),
    onSuccess: (_result, id) => {
      queryClient.invalidateQueries({ queryKey: countryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: countryKeys.lists() });
      toaster.create({
        title: 'Status Updated',
        description: 'Country status toggled successfully',
        type: 'success',
      });
    },
  });
}

export function useDeleteCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(API_ENDPOINTS.COUNTRIES.DELETE(id), {
        method: 'DELETE',
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: countryKeys.lists() });
      const previousData = queryClient.getQueryData(countryKeys.lists());

      queryClient.setQueryData(countryKeys.lists(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((country: any) => country.id !== id),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: countryKeys.lists() });
      toaster.create({
        title: 'Country Deleted',
        description: 'Country deleted successfully',
        type: 'success',
      });
    },
    onError: (error: any, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(countryKeys.lists(), context.previousData);
      }
      toaster.create({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete country',
        type: 'error',
      });
    },
  });
}
