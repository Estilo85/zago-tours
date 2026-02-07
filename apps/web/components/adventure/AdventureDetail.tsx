'use client';

import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Stack,
  Icon,
  Button,
  Container,
  Image,
  Separator,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { Itinerary } from '@zagotours/types';
import {
  LuShare2,
  LuStar,
  LuClock,
  LuMapPin,
  LuTrendingUp,
  LuHeart,
} from 'react-icons/lu';
import { ScrollProgressSteps } from '../ui/stepper/scroll-progress-step';
import AdventureSkeleton from './AdevntureSkeleton';
import { useAdventure } from '@/hooks';
import { ErrorState } from '../ui/ErrorState';
import { Verified, Dot, CheckIcon } from 'lucide-react';

interface AdventureDetailProps {
  adventureId: string;
}

export default function AdventureDetailPage({
  adventureId,
}: AdventureDetailProps) {
  const { data: response, isLoading, error } = useAdventure(adventureId);

  const adventure = response?.data;

  if (isLoading) {
    return <AdventureSkeleton />;
  }

  if (error || !adventure) {
    return <ErrorState />;
  }
  const hasDiscount = false;
  const discountPrice = adventure.price * 0.9;

  const itineraryItems = (adventure.itineraries || [])
    .sort((a, b) => a.dayNumber - b.dayNumber)
    .map((step: Itinerary) => ({
      content: (
        <Box key={step.id} pb={10}>
          <Heading size='md' mb={2} color='primary.600'>
            Day {step.dayNumber}: {step.title}
          </Heading>
          {step.imageUrl && (
            <Image
              src={step.imageUrl}
              alt={step.title}
              borderRadius='md'
              mb={4}
              maxH='300px'
              width='100%'
              objectFit='cover'
            />
          )}
          <Text color='gray.600' lineHeight='tall'>
            {step.activityDetails}
          </Text>
        </Box>
      ),
    }));

  return (
    <Container maxW='container.md' py={10}>
      {/* 1. TOP STATS CARD */}
      <Flex align='center'>
        <Text>Adventure </Text> | <Text> Details</Text>
      </Flex>

      <Box
        borderRadius='xl'
        boxShadow='sm'
        p={6}
        bg='gray.50'
        borderWidth='1px'
        mb={8}
      >
        <Stack gap={3}>
          <Heading size='sm' color='gray.500' textTransform='uppercase'>
            {adventure.title}
          </Heading>
          <HStack gap={2}>
            <Icon as={LuStar} color='orange.400' fill='orange.400' />
            <Text>
              {adventure.rating} {adventure.rating > 3.5 ? 'High' : 'Low'}
            </Text>
          </HStack>
          <Flex align='center' gap={5}>
            <HStack
              bg='textPrimary'
              p={1}
              borderRadius='md'
              whiteSpace='nowrap'
              gap={3}
            >
              <Icon as={LuStar} color='orange.400' fill='orange.400' />
              <Text>Certified Guides</Text>
            </HStack>
            <HStack
              bg='textPrimary'
              p={1}
              borderRadius='md'
              whiteSpace='nowrap'
              gap={3}
            >
              <Icon as={LuStar} color='orange.400' fill='orange.400' />
              <Text>Emergency Support</Text>
            </HStack>
            <HStack
              bg='textPrimary'
              p={1}
              borderRadius='md'
              whiteSpace='nowrap'
              gap={3}
            >
              <Icon as={LuStar} color='orange.400' fill='orange.400' />
              <Text>Safety Briefing</Text>
            </HStack>
          </Flex>
          {/* <HStack gap={3}>
            <Badge colorScheme='blue'>{adventure.tripType}</Badge>
            <Badge colorScheme='green'>{adventure.level}</Badge>
            <Badge colorScheme='purple'>Verified</Badge>
          </HStack> */}
        </Stack>
      </Box>

      {/* 2. TITLE & SHARE SECTION */}
      <Flex justify='space-between' align='flex-start' mb={8} gap={4}>
        <Box>
          <HStack gap={5} mb={2}>
            <Heading size='2xl'>{adventure.title}</Heading>
            <Flex align='center'>
              <Icon as={Verified} />
              <Text>Verified by Zago</Text>
            </Flex>
          </HStack>
          <HStack color='gray.600'>
            <Icon as={LuClock} />
            <Text>
              {adventure.days} Days . {adventure.days - 1} night{' '}
            </Text>
          </HStack>
        </Box>
        <Button
          variant='ghost'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='full'
        >
          <Icon as={LuShare2} mr={2} /> Share
        </Button>
      </Flex>

      {/* 4. DESCRIPTION & DETAILS */}
      <Flex align='center' justify='space-between'>
        <Box mb={12}>
          <Stack>
            <Heading size='md' mb={4}>
              See adventure
            </Heading>
            <Text fontSize='lg' color='gray.700' mb={8}>
              {adventure.description}
            </Text>
          </Stack>

          <Stack>
            <DetailItem
              icon={LuMapPin}
              label='Difficulty level'
              value={adventure.level}
            />
            <DetailItem
              icon={LuClock}
              label='TripType'
              value={adventure.tripType}
            />
            <DetailItem
              icon={LuTrendingUp}
              label='Safety Score'
              value={`${adventure.safetyScore}/10`}
            />
            <DetailItem
              icon={LuMapPin}
              label='Certification'
              value={
                adventure?.certification ? (
                  adventure.certification
                ) : (
                  <Icon as={CheckIcon} />
                )
              }
            />
            <DetailItem
              icon={LuTrendingUp}
              label='Gear'
              value={adventure?.gear ? adventure.gear : <Icon as={CheckIcon} />}
            />
            <DetailItem
              icon={LuTrendingUp}
              label='Emergency plan'
              value={<Icon as={CheckIcon} />}
            />
            <DetailItem
              icon={LuClock}
              label='Last safety certification date'
              value={new Date(
                adventure?.lastSafetyCertDate || new Date(),
              ).toLocaleDateString()}
            />

            <Box>
              <DetailItem
                icon={LuClock}
                label='Safety Tips'
                value={adventure.access}
              />
              <Text>Lorem ipsum</Text>
            </Box>
          </Stack>
        </Box>
        <Box
          p={6}
          borderRadius='2xl'
          borderWidth='1px'
          borderColor='primary.100'
          bg='white'
          boxShadow='xl'
          mb={10}
          position='relative'
          overflow='hidden'
        >
          <Flex justify='space-between' align='center' wrap='wrap' gap={6}>
            <Stack gap={1}>
              <Heading size='md'>{adventure.title}</Heading>
              <HStack color='gray.600'>
                <Icon as={LuClock} />
                <Text>
                  {adventure.days} Days . {adventure.days - 1} night{' '}
                </Text>
              </HStack>
              <HStack align='baseline' justify='space-between'>
                <Text>FROM</Text>
                <Text color='primary'>
                  ${hasDiscount ? discountPrice : adventure.price}
                </Text>
                {hasDiscount && (
                  <Text
                    textDecoration='line-through'
                    color='gray.400'
                    fontSize='lg'
                  >
                    ${adventure.price}
                  </Text>
                )}
              </HStack>
            </Stack>
          </Flex>
          <Flex gap={3} align='center' flex='1' justify='space-between'>
            <IconButton
              aria-label='Like adventure'
              variant='outline'
              size='lg'
              borderRadius='full'
              _hover={{ bg: 'red.50', color: 'red.500' }}
            >
              <Icon as={LuHeart} />
            </IconButton>
            <Button
              bg='primary'
              color='white'
              size='lg'
              px={10}
              borderRadius='full'
              flex={{ base: '1', md: 'initial' }}
            >
              Book Now
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* 5. ITINERARY */}
      <Box>
        <Heading size='lg' mb={8}>
          Full Itinerary
        </Heading>
        <ScrollProgressSteps items={itineraryItems} />
      </Box>
    </Container>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <Flex
      align='center'
      justify='space-between'
      maxW={{ base: 'full', md: '600px' }}
    >
      <HStack gap={3}>
        <Icon as={icon} boxSize={6} color='primary.500' />
        <Text fontSize='sm' color='gray.500'>
          {label}
        </Text>
      </HStack>
      <Box>{value}</Box>
    </Flex>
  );
}
