'use client';
import { Stack, Text } from '@chakra-ui/react';
import { getIndependentAgentStatsConfig } from '../_components/stats/stat-configs';
import { useMyStats } from '@/hooks/api/use-dashboard';
import { StatsGrid } from '../_components/stats/stat-card';

export default function IndependentAgentDashboard() {
  const { data, isLoading } = useMyStats();

  return (
    <Stack gap={8}>
      <Text fontSize='2xl' fontWeight='bold'>
        Independent Agent Dashboard
      </Text>
      <StatsGrid
        stats={data ? getIndependentAgentStatsConfig(data.stats) : []}
        isLoading={isLoading}
      />
    </Stack>
  );
}
