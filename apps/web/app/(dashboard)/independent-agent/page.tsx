import { Stack, Text } from '@chakra-ui/react';
import { DashboardStats } from '../_components/stats/stat-card';

export default function IndependentAgentDashboard() {
  return (
    <Stack gap={8}>
      <Text fontSize='2xl' fontWeight='bold'>
        Welcome Agent!
      </Text>
      <DashboardStats />
      {/* Add adventurer specific content */}
    </Stack>
  );
}
