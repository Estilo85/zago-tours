'use client';
import { useDashboardStats, usePermissions } from '@/hooks';
import {
  isAdminStats,
  isAdventurerStats,
  isAffiliateStats,
  isCorporateAgentStats,
  isIndependentAgentStats,
  useLeaderboard,
} from '@/hooks/api/use-dashboard';
import { Box, Stack, Text, Heading, Spinner, Center } from '@chakra-ui/react';
import {
  getAdminStatsConfig,
  getAdventurerStatsConfig,
  getAffiliateStatsConfig,
  getCorporateAgentStatsConfig,
  getIndependentAgentStatsConfig,
} from '../_components/stats/stat-configs';
import { StatsGrid } from '../_components/stats/stat-card';
import { Leaderboard } from '../_components/leaderboard/Leaderboard';
import { LoadingState } from '@/components/ui/LoadingState';
import { ReferralCard } from '@/components/ui/card/ReferralCard';
import { TripRequestsTable } from '../_components/table/TripRequestTable';

export default function DashboardPage() {
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  const { data: leaderboardData, isLoading: leaderboardLoading } =
    useLeaderboard();
  const {
    isAdmin,
    isAdventurer,
    isAnyAdmin,
    isAnyAgent,
    isAffiliate,
    isSuperAdmin,
    isCooperateAgent,
  } = usePermissions();

  if (statsLoading) {
    return (
      <LoadingState message='Loading your dashboard...' minHeight='50vh' />
    );
  }

  if (!statsData) {
    return (
      <Box p={6}>
        <Text color='gray.500'>No dashboard data available</Text>
      </Box>
    );
  }

  // Get stats configuration based on role using type guards
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

  const getRoleName = () => {
    switch (statsData.role) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return 'Admin Dashboard';
      case 'COOPERATE_AGENT':
        return 'Corporate Agent Dashboard';
      case 'INDEPENDENT_AGENT':
        return 'Independent Agent Dashboard';
      case 'AFFILIATE':
        return 'Affiliate Dashboard';
      case 'ADVENTURER':
        return 'My Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const showLeaderboard =
    statsData.role === 'ADMIN' || statsData.role === 'SUPER_ADMIN';

  return (
    <Box p={6}>
      <Stack gap={8}>
        {/* Header */}
        <Box>
          <Heading size='xl' mb={2}>
            {getRoleName()}
          </Heading>
          <Text color='gray.600'>
            Overview of your activities and performance
          </Text>
        </Box>

        {/* Stats Grid */}
        <StatsGrid stats={getStatsConfig()} isLoading={statsLoading} />

        {isCooperateAgent && (
          <>
            <TripRequestsTable />
          </>
        )}

        {/* Leaderboard (Admin/Super Admin only) */}
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

        {/* Role-specific insights */}
        {isAnyAdmin && statsData?.stats && (
          <Box
            bg='blue.50'
            p={4}
            borderRadius='lg'
            border='1px solid'
            borderColor='blue.200'
          >
            <Heading size='sm' mb={2} color='blue.900'>
              📊 Admin Insights
            </Heading>
            <Stack gap={2}>
              <Text fontSize='sm' color='blue.800'>
                • {statsData.stats.requests.unassignedTripRequests} unassigned
                trip requests
              </Text>
              <Text fontSize='sm' color='blue.800'>
                • {statsData.stats.requests.unassignedCallbacks} unassigned
                callback requests
              </Text>
              <Text fontSize='sm' color='blue.800'>
                • {statsData.stats.requests.pendingCallbacks} pending callbacks
                (last 7 days)
              </Text>
            </Stack>
          </Box>
        )}

        {(statsData?.role === 'COOPERATE_AGENT' ||
          statsData?.role === 'INDEPENDENT_AGENT') && (
          <Box
            bg='purple.50'
            p={4}
            borderRadius='lg'
            border='1px solid'
            borderColor='purple.200'
          >
            <Heading size='sm' mb={2} color='purple.900'>
              💡 Agent Note
            </Heading>
            <Text fontSize='sm' color='purple.800'>
              All your requests are submitted directly to administrators for
              review. Track your referrals to earn more points!
              {statsData?.role === 'INDEPENDENT_AGENT' && (
                <>
                  {' '}
                  You earn 100 points per referral and 50 points per completed
                  call.
                </>
              )}
            </Text>
          </Box>
        )}

        {statsData?.role === 'ADVENTURER' && statsData?.stats && (
          <Box
            bg='green.50'
            p={4}
            borderRadius='lg'
            border='1px solid'
            borderColor='green.200'
          >
            <Heading size='sm' mb={2} color='green.900'>
              🌟 Welcome, Adventurer!
            </Heading>
            <Text fontSize='sm' color='green.800'>
              Start planning your next adventure! You have{' '}
              {statsData.stats.planning.tripRequests} pending trip requests and{' '}
              {statsData.stats.planning.scheduledCalls} upcoming planning calls.
            </Text>
          </Box>
        )}

        {statsData?.role === 'AFFILIATE' && statsData?.stats && (
          <Box
            bg='orange.50'
            p={4}
            borderRadius='lg'
            border='1px solid'
            borderColor='orange.200'
          >
            <Heading size='sm' mb={2} color='orange.900'>
              🎯 Affiliate Performance
            </Heading>
            <Text fontSize='sm' color='orange.800'>
              You've referred {statsData.stats.referrals.total} users (
              {statsData.stats.referrals.active} active). Keep growing your
              network to earn more points!
            </Text>
          </Box>
        )}
      </Stack>
      <ReferralCard />
    </Box>
  );
}
