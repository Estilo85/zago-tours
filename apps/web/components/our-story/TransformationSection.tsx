'use client';
import { Box, Center, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { BadgeCheck } from 'lucide-react';
import { FeatureTileCard } from '../ui/card/FeatureTileCard';
import { FaWrench } from 'react-icons/fa';

//Card-data
const cardData = [
  {
    heading: 'Old Way',
    icon: FaWrench,
    description: 'Operator cut corners, travelers bear risk',
  },
  {
    heading: 'Old Way',
    icon: FaWrench,
    description: 'Big promises, small delivery',
  },
  {
    heading: 'Old Way',
    icon: FaWrench,
    description: 'Good insertions No rewards',
  },
  {
    heading: 'Zago Tours ',
    icon: BadgeCheck,
    description: 'Every trip verified through QSS',
    bg: 'primary',
  },
  {
    heading: 'Zago Tours ',
    icon: BadgeCheck,
    description: 'What you book is what you get',
    bg: 'primary',
  },
  {
    heading: 'Zago Tours ',
    icon: BadgeCheck,
    description: 'Travel better, earn rewards for impact',
    bg: 'primary',
  },
];

export default function TransformationSection() {
  return (
    <Box>
      <Stack textAlign='center' spaceY={5}>
        <Center>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            px={4}
            py={1}
            border='1px solid'
            borderColor='primary'
            borderRadius='full'
            letterSpacing='widest'
          >
            the transformation
          </Text>
        </Center>
        <Text
          fontSize={{ base: 'xl', md: '3xl' }}
          lineHeight='1.2'
          color='primary'
          fontWeight='bolder'
        >
          From Outdated to Outstanding
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          justifyItems='center'
          justifyContent='center'
          gap={{ base: 6, md: 8 }}
          maxW='container.lg'
          mx='auto'
        >
          {cardData.map((data, idx) => (
            <FeatureTileCard
              key={idx}
              icon={data.icon}
              heading={data.heading}
              description={data.description}
              bg={data.bg}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
