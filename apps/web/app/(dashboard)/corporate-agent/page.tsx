'use client';
import { Stack, Text } from '@chakra-ui/react';
import { getCorporateAgentStatsConfig } from '../_components/stats/stat-configs';
import { useMyStats } from '@/hooks/api/use-dashboard';
import { StatsGrid } from '../_components/stats/stat-card';

export default function CorperateAgentDashboard() {
  const { data, isLoading } = useMyStats();

  return (
    <Stack gap={8}>
      <Text fontSize='2xl' fontWeight='bold'>
        Corperate Agent Dashboard
      </Text>
      <StatsGrid
        stats={data ? getCorporateAgentStatsConfig(data.stats) : []}
        isLoading={isLoading}
      />
    </Stack>
  );
}
