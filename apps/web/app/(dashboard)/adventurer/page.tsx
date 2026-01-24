// app/(dashboard)/adventurer/page.tsx
import { Stack, Text } from '@chakra-ui/react';
import { DashboardStats } from '../_components/stats/stat-card';

export default function AdventurerDashboard() {
  return (
    <Stack gap={8}>
      <Text fontSize='2xl' fontWeight='bold'>
        Welcome Adventurer!
      </Text>
      <DashboardStats />
      {/* Add adventurer specific content */}
    </Stack>
  );
}
