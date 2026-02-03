'use client';
import { Flex, Stack, Text, Box } from '@chakra-ui/react';
import { getCorporateAgentStatsConfig } from '../_components/stats/stat-configs';
import { useMyStats } from '@/hooks/api/use-dashboard';
import { StatsGrid } from '../_components/stats/stat-card';
import { ReferralCard } from '@/components/ui/card/ReferralCard';
import { TripRequestsTable } from '../_components/table/TripRequestTable';

export default function CorperateAgentDashboard() {
  const { data, isLoading } = useMyStats();

  return (
    <Stack gap={8}>
      <StatsGrid
        stats={data ? getCorporateAgentStatsConfig(data.stats) : []}
        isLoading={isLoading}
      />

      <TripRequestsTable />

      <Flex justify='space-around'>
        <ReferralCard />
        <ReferralCard />
      </Flex>
    </Stack>
  );
}
