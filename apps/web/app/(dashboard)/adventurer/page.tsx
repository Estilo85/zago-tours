'use client';
import { Stack, Text } from '@chakra-ui/react';
import { getAdventurerStatsConfig } from '../_components/stats/stat-configs';
import { StatsGrid } from '../_components/stats/stat-card';
import { useMyStats } from '@/hooks/api/use-dashboard';

export default function AdventurerDashboard() {
  const { data, isLoading } = useMyStats();

  return (
    <Stack gap={8}>
      <Text fontSize='2xl' fontWeight='bold'>
        Adventurer Dashboard
      </Text>
      <StatsGrid
        stats={data ? getAdventurerStatsConfig(data.stats) : []}
        isLoading={isLoading}
      />
    </Stack>
  );
}
