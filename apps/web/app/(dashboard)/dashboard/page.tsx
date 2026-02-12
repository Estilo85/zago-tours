'use client';
import { useDashboardStats, usePermissions } from '@/hooks';
import { useLeaderboard } from '@/hooks/api/use-dashboard';
import { Box, Stack, Text, Heading, Flex, Center } from '@chakra-ui/react';
import {
  getAdminStatsConfig,
  getAdventurerStatsConfig,
  getAffiliateStatsConfig,
  getCorporateAgentStatsConfig,
  getIndependentAgentStatsConfig,
} from '../_components/stats/stat-configs';
import { StatsGrid } from '../_components/stats/stat-card';
import { Leaderboard } from '../_components/leaderboard/Leaderboard';
import { ReferralCard } from '@/components/ui/card/ReferralCard';
import { CommunityCard } from '@/components/ui/card/CommunityCard';
import { TripRequestsTable } from '../_components/dataDisplay/TripRequestTable';
import UpcomingAdventuresAndEventsPage from '../_components/dataDisplay/UpcomingAdventuresAndEvents';
import { WelcomeBanner } from '../_components/banner/WelcomeBanner';
import { TripPlanningCalls } from '../_components/trip-planning-calls/TripPlanningCalls';
import SafetyAmbassadorTable from '../_components/table/SafetyAmbassadorTable';
import {
  AffiliateContractTable,
  CorporateContractTable,
} from '../_components/table/ContractTable';

export default function DashboardPage() {
  const { data: response, isLoading: statsLoading } = useDashboardStats();
  const { isAnyAdmin, isCooperateAgent, isAdventurer, isAffiliate } =
    usePermissions();

  const mockData = [
    {
      id: 'A1',
      name: 'Partner Terms',
      date: '2024-05-10',
      status: 'NOT_SIGNED',
    },
  ];

  const { data: leaderResponse, isLoading: leaderboardLoading } =
    useLeaderboard(isAnyAdmin);

  const statsData = response?.data;
  const leaderboardData = leaderResponse;

  const getStatsConfig = () => {
    if (!statsData?.stats) return [];

    switch (statsData.role) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return getAdminStatsConfig(statsData.stats);
      case 'COOPERATE_AGENT':
        return getCorporateAgentStatsConfig(statsData.stats);
      case 'INDEPENDENT_AGENT':
        return getIndependentAgentStatsConfig(statsData.stats);
      case 'AFFILIATE':
        return getAffiliateStatsConfig(statsData.stats);
      case 'ADVENTURER':
        return getAdventurerStatsConfig(statsData.stats);
      default:
        return [];
    }
  };

  return (
    <Box px={{ base: 0, md: 6 }}>
      <WelcomeBanner />
      <Stack gap={8}>
        {/* Stats Grid */}

        {!statsLoading && !statsData && (
          <Center p={6}>
            <Text color='gray.500'>No dashboard data available</Text>
          </Center>
        )}
        <StatsGrid stats={getStatsConfig()} isLoading={statsLoading} />

        {isCooperateAgent && (
          <>
            <TripRequestsTable />
          </>
        )}

        {isAnyAdmin && (
          <Box>
            <Heading size='lg' mb={4}>
              Top Performers
            </Heading>
            <Leaderboard
              topAgents={leaderboardData?.topAgents || []}
              topAffiliates={leaderboardData?.topAffiliates || []}
              isLoading={leaderboardLoading}
            />
          </Box>
        )}

        {statsData?.role === 'ADVENTURER' && statsData?.stats && (
          <>
            <UpcomingAdventuresAndEventsPage />
          </>
        )}

        {!isAnyAdmin && <TripPlanningCalls />}

        {isAdventurer && <SafetyAmbassadorTable />}

        {isCooperateAgent && (
          <Box my={6}>
            <Heading>Corporate Contract</Heading>
            <CorporateContractTable />
          </Box>
        )}

        {isAffiliate && (
          <Box my={6}>
            <Heading>Affiliate Management</Heading>
            <AffiliateContractTable />
          </Box>
        )}
        {!isAnyAdmin && (
          <Flex
            my={6}
            direction={{ base: 'column', md: 'row' }}
            justify='space-between'
            alignItems='stretch'
          >
            <CommunityCard />
            <ReferralCard />
          </Flex>
        )}
      </Stack>
    </Box>
  );
}
