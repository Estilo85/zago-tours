import { Stack, Text, Box } from '@chakra-ui/react';
import { DashboardStats } from '../_components/stats/stat-card';

export default function DashboardPage() {
  return (
    <Stack gap={8}>
      <Text fontSize='2xl' fontWeight='bold'>
        Welcome to Zago Tours
      </Text>
      <DashboardStats />
      <Box h='300px' bg='white' borderRadius='xl' border='1px solid #eee' />
    </Stack>
  );
}
