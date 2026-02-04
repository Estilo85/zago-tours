import { apiRequest } from '@/lib/api';
import { dashboardKeys } from './query-keys';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/api.config';
import { DashboardStatsResponse, TopPerformers } from '@zagotours/types';

export function useDashboardStats() {
  return useQuery<DashboardStatsResponse>({
    queryKey: dashboardKeys.stats(),
    queryFn: () => apiRequest(API_ENDPOINTS.DASHBOARD.STATS),
  });
}

export function useLeaderboard() {
  return useQuery<TopPerformers>({
    queryKey: dashboardKeys.leaderboard(),
    queryFn: () => apiRequest(API_ENDPOINTS.DASHBOARD.LEADERBOARD),
  });
}

export function useAgentStats(agentId: string) {
  return useQuery({
    queryKey: dashboardKeys.agentStats(agentId),
    queryFn: () => apiRequest(API_ENDPOINTS.DASHBOARD.AGENT_STATS(agentId)),
    enabled: !!agentId,
  });
}

export function useAffiliateStats(affiliateId: string) {
  return useQuery({
    queryKey: dashboardKeys.affiliateStats(affiliateId),
    queryFn: () =>
      apiRequest(API_ENDPOINTS.DASHBOARD.AFFILIATE_STATS(affiliateId)),
    enabled: !!affiliateId,
  });
}

// Type guards for narrowing stats types
export const isAdminStats = (
  response: DashboardStatsResponse,
): response is Extract<
  DashboardStatsResponse,
  { role: 'ADMIN' | 'SUPER_ADMIN' }
> => {
  return response.role === 'ADMIN' || response.role === 'SUPER_ADMIN';
};

export const isCorporateAgentStats = (
  response: DashboardStatsResponse,
): response is Extract<DashboardStatsResponse, { role: 'COOPERATE_AGENT' }> => {
  return response.role === 'COOPERATE_AGENT';
};

export const isIndependentAgentStats = (
  response: DashboardStatsResponse,
): response is Extract<
  DashboardStatsResponse,
  { role: 'INDEPENDENT_AGENT' }
> => {
  return response.role === 'INDEPENDENT_AGENT';
};

export const isAffiliateStats = (
  response: DashboardStatsResponse,
): response is Extract<DashboardStatsResponse, { role: 'AFFILIATE' }> => {
  return response.role === 'AFFILIATE';
};

export const isAdventurerStats = (
  response: DashboardStatsResponse,
): response is Extract<DashboardStatsResponse, { role: 'ADVENTURER' }> => {
  return response.role === 'ADVENTURER';
};
