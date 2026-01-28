import { apiRequest } from '@/lib/api';
import { dashboardKeys } from './query-keys';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/api.config';

export function useMyStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => apiRequest(API_ENDPOINTS.DASHBOARD.STATS),
  });
}

export function useLeaderboard() {
  return useQuery({
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
