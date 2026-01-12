'use client';
import {
  SimpleGrid,
  Box,
  Text,
  Stack,
  HStack,
  Icon,
  Badge,
} from '@chakra-ui/react';
import {
  LuTrendingUp,
  LuUsers,
  LuPlaneTakeoff,
  LuWallet,
  LuCalendarCheck,
  LuTrendingDown,
} from 'react-icons/lu';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  isUpward?: boolean;
  icon: React.ElementType;
}

const StatCard = ({
  label,
  value,
  trend,
  icon,
  isUpward = true,
}: StatCardProps) => (
  <Box
    bg='white'
    p={6}
    borderRadius='2xl'
    border='1px solid'
    borderColor='gray.100'
    boxShadow='sm'
    transition='transform 0.2s, box-shadow 0.2s'
    _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
  >
    <Stack gap={4}>
      <HStack justify='space-between' align='flex-start'>
        <Box p={2.5} bg='blue.50' borderRadius='xl' color='blue.600'>
          <Icon as={icon} boxSize={6} />
        </Box>
        <Badge
          colorPalette={isUpward ? 'green' : 'red'}
          variant='subtle'
          borderRadius='full'
          px={2}
          py={0.5}
          display='flex'
          alignItems='center'
          gap={1}
        >
          <Icon as={isUpward ? LuTrendingUp : LuTrendingDown} boxSize={3} />
          {trend}
        </Badge>
      </HStack>

      <Stack gap={1}>
        <Text
          fontSize='sm'
          color='gray.500'
          fontWeight='medium'
          letterSpacing='tight'
        >
          {label}
        </Text>
        <Text fontSize='2xl' fontWeight='bold' color='gray.900'>
          {value}
        </Text>
      </Stack>
    </Stack>
  </Box>
);

export const DashboardStats = () => (
  <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6}>
    <StatCard
      label='Total Bookings'
      value='1,284'
      trend='+12%'
      icon={LuCalendarCheck}
    />
    <StatCard label='Active Travelers' value='452' trend='+5%' icon={LuUsers} />
    <StatCard
      label='Total Revenue'
      value='$42,500'
      trend='+18%'
      icon={LuWallet}
    />
    <StatCard
      label='Upcoming Trips'
      value='12'
      trend='-2%'
      isUpward={false}
      icon={LuPlaneTakeoff}
    />
  </SimpleGrid>
);
