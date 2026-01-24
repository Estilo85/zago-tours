import { Stack, Text } from '@chakra-ui/react';
import { DashboardStats } from '../_components/stats/stat-card';

export default function SuperAdminDashboard() {
  return (
    <Stack gap={8}>
      <Text fontSize='2xl' fontWeight='bold'>
        Super Admin Dashboard
      </Text>
      <DashboardStats />
      {/* Add super-admin specific content */}
    </Stack>
  );
}
