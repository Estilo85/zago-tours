'use client';
import {
  Box,
  Stack,
  Text,
  HStack,
  Badge,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { LuTrophy, LuStar, LuUsers, LuAward } from 'react-icons/lu';
import { Role } from '@zagotours/types';

interface LeaderboardUser {
  id: string;
  name: string;
  email: string;
  role?: Role;
  pointsEarned: number;
  referralCount?: number;
}

interface LeaderboardCardProps {
  title: string;
  users: LeaderboardUser[];
  isLoading?: boolean;
  icon: React.ElementType;
}

const getRoleBadgeColor = (role?: Role) => {
  switch (role) {
    case Role.COOPERATE_AGENT:
      return 'purple';
    case Role.INDEPENDENT_AGENT:
      return 'blue';
    default:
      return 'gray';
  }
};

const getRoleLabel = (role?: Role) => {
  switch (role) {
    case Role.COOPERATE_AGENT:
      return 'Corporate';
    case Role.INDEPENDENT_AGENT:
      return 'Independent';
    default:
      return role;
  }
};

const LeaderboardCard = ({
  title,
  users,
  isLoading,
  icon,
}: LeaderboardCardProps) => {
  if (isLoading) {
    return (
      <Box
        bg='white'
        p={6}
        borderRadius='2xl'
        border='1px solid'
        borderColor='gray.100'
        boxShadow='sm'
      >
        <HStack mb={4}>
          <Icon as={icon} boxSize={5} color='blue.600' />
          <Text fontSize='lg' fontWeight='bold'>
            {title}
          </Text>
        </HStack>
        <Stack gap={3}>
          {[1, 2, 3].map((i) => (
            <Box key={i} h='60px' bg='gray.100' borderRadius='lg' />
          ))}
        </Stack>
      </Box>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Box
        bg='white'
        p={6}
        borderRadius='2xl'
        border='1px solid'
        borderColor='gray.100'
        boxShadow='sm'
      >
        <HStack mb={4}>
          <Icon as={icon} boxSize={5} color='blue.600' />
          <Text fontSize='lg' fontWeight='bold'>
            {title}
          </Text>
        </HStack>
        <Box
          py={8}
          textAlign='center'
          color='gray.400'
          borderRadius='lg'
          bg='gray.50'
        >
          <Text fontSize='sm'>No data available</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      bg='white'
      p={6}
      borderRadius='2xl'
      border='1px solid'
      borderColor='gray.100'
      boxShadow='sm'
    >
      <HStack mb={4}>
        <Icon as={icon} boxSize={5} color='blue.600' />
        <Text fontSize='lg' fontWeight='bold'>
          {title}
        </Text>
      </HStack>

      <Stack gap={3}>
        {users.map((user, index) => (
          <Box
            key={user.id}
            p={4}
            borderRadius='lg'
            border='1px solid'
            borderColor={index === 0 ? 'yellow.300' : 'gray.100'}
            bg={index === 0 ? 'yellow.50' : 'gray.50'}
            transition='all 0.2s'
            _hover={{
              borderColor: index === 0 ? 'yellow.400' : 'gray.200',
              transform: 'translateX(4px)',
            }}
          >
            <HStack justify='space-between'>
              <HStack gap={3}>
                {/* Rank Badge */}
                <Box
                  w={8}
                  h={8}
                  borderRadius='full'
                  bg={
                    index === 0
                      ? 'yellow.400'
                      : index === 1
                        ? 'gray.300'
                        : index === 2
                          ? 'orange.300'
                          : 'gray.200'
                  }
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  fontWeight='bold'
                  fontSize='sm'
                  color={index === 0 ? 'yellow.900' : 'gray.700'}
                >
                  {index === 0 ? <Icon as={LuTrophy} boxSize={4} /> : index + 1}
                </Box>

                {/* User Info */}
                <Stack gap={0}>
                  <Text fontWeight='semibold' fontSize='sm'>
                    {user.name}
                  </Text>
                  <HStack gap={2}>
                    <Text fontSize='xs' color='gray.500'>
                      {user.email}
                    </Text>
                    {user.role && (
                      <Badge
                        colorPalette={getRoleBadgeColor(user.role)}
                        variant='subtle'
                        size='xs'
                      >
                        {getRoleLabel(user.role)}
                      </Badge>
                    )}
                  </HStack>
                </Stack>
              </HStack>

              {/* Points */}
              <Stack gap={0} align='flex-end'>
                <HStack gap={1}>
                  <Icon as={LuStar} boxSize={4} color='yellow.500' />
                  <Text fontWeight='bold' fontSize='lg'>
                    {user.pointsEarned.toLocaleString()}
                  </Text>
                </HStack>
                {user.referralCount !== undefined && (
                  <Text fontSize='xs' color='gray.500'>
                    {user.referralCount} referrals
                  </Text>
                )}
              </Stack>
            </HStack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

interface LeaderboardProps {
  topAgents: LeaderboardUser[];
  topAffiliates: LeaderboardUser[];
  isLoading?: boolean;
}

export const Leaderboard = ({
  topAgents,
  topAffiliates,
  isLoading,
}: LeaderboardProps) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
      <LeaderboardCard
        title='Top Agents'
        users={topAgents}
        isLoading={isLoading}
        icon={LuAward}
      />
      <LeaderboardCard
        title='Top Affiliates'
        users={topAffiliates}
        isLoading={isLoading}
        icon={LuUsers}
      />
    </SimpleGrid>
  );
};
