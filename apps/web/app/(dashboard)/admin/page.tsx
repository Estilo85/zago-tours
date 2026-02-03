'use client';
import { Stack, Text } from '@chakra-ui/react';
import { getAdminStatsConfig } from '../_components/stats/stat-configs';
import { useLeaderboard, useMyStats } from '@/hooks/api/use-dashboard';
import { StatsGrid } from '../_components/stats/stat-card';
import { Leaderboard } from '../_components/leaderboard/Leaderboard';

export default function SuperAdminDashboard() {
  const { data: statsData, isLoading: statsLoading } = useMyStats();
  const { data: leaderboardData, isLoading: leaderboardLoading } =
    useLeaderboard();

  return (
    <Stack gap={8}>
      {/* Stats Cards */}
      <StatsGrid
        stats={statsData ? getAdminStatsConfig(statsData.stats) : []}
        isLoading={statsLoading}
      />

      {/* Leaderboard - Only for admins */}
      <Leaderboard
        topAgents={leaderboardData?.data?.topAgents || []}
        topAffiliates={leaderboardData?.data?.topAffiliates || []}
        isLoading={leaderboardLoading}
      />
    </Stack>
  );
}
