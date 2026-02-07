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
import {
  Verified,
  Dot,
  CheckIcon,
  BadgeCheck,
  Headset,
  ShieldCheck,
  AlarmClockOff,
  CircleGauge,
  Settings,
  ShieldPlus,
  CalendarDays,
  ShieldQuestionMark,
  CircleCheckBig,
} from 'lucide-react';

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
    <Container
      maxW='container.md'
      py={{ base: 4, md: 10 }}
      px={{ base: 4, md: 6 }}
    >
      {/* 1. TOP STATS CARD */}
      <Flex align='center' mb={{ base: 4, md: 0 }}>
        <Text>Adventure </Text> | <Text> Details</Text>
      </Flex>

      <Box
        borderRadius='xl'
        boxShadow='sm'
        p={{ base: 4, md: 6 }}
        bg='gray.50'
        borderWidth='1px'
        mb={8}
      >
        <Stack gap={3}>
          <Heading
            size={{ base: 'xs', md: 'sm' }}
            color='gray.500'
            textTransform='uppercase'
          >
            {adventure.title}
          </Heading>
          <HStack gap={2}>
            <Icon as={LuStar} color='orange.400' fill='orange.400' />
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              {adventure.rating} {adventure.rating > 3.5 ? 'High' : 'Low'}
            </Text>
          </HStack>
          <Flex
            align='center'
            gap={{ base: 2, md: 5 }}
            direction={{ base: 'column', md: 'row' }}
            w='full'
          >
            <HStack
              bg='textPrimary'
              p={2}
              borderRadius='2xl'
              whiteSpace='nowrap'
              gap={{ base: 2, md: 3 }}
              w={{ base: 'full', md: 'auto' }}
              justify={{ base: 'center', md: 'flex-start' }}
            >
              <Icon
                as={BadgeCheck}
                color='orange.400'
                fill='orange.400'
                boxSize={{ base: 4, md: 5 }}
              />
              <Text fontSize={{ base: 'xs', md: 'sm' }}>Certified Guides</Text>
            </HStack>
            <HStack
              bg='textPrimary'
              p={2}
              borderRadius='2xl'
              whiteSpace='nowrap'
              gap={{ base: 2, md: 3 }}
              w={{ base: 'full', md: 'auto' }}
              justify={{ base: 'center', md: 'flex-start' }}
            >
              <Icon
                as={Headset}
                color='orange.400'
                fill='orange.400'
                boxSize={{ base: 4, md: 5 }}
              />
              <Text fontSize={{ base: 'xs', md: 'sm' }}>Emergency Support</Text>
            </HStack>
            <HStack
              bg='textPrimary'
              p={2}
              borderRadius='2xl'
              whiteSpace='nowrap'
              gap={{ base: 2, md: 3 }}
              w={{ base: 'full', md: 'auto' }}
              justify={{ base: 'center', md: 'flex-start' }}
            >
              <Icon
                as={ShieldCheck}
                color='orange.400'
                fill='orange.400'
                boxSize={{ base: 4, md: 5 }}
              />
              <Text fontSize={{ base: 'xs', md: 'sm' }}>Safety Briefing</Text>
            </HStack>
          </Flex>
        </Stack>
      </Box>

      {/* 2. TITLE & SHARE SECTION */}
      <Flex
        justify='space-between'
        align='flex-start'
        mb={8}
        gap={4}
        direction={{ base: 'column', md: 'row' }}
      >
        <Box w='full'>
          <HStack gap={{ base: 2, md: 5 }} mb={2} flexWrap='wrap'>
            <Heading size={{ base: 'lg', md: '2xl' }}>
              {adventure.title}
            </Heading>
            <Flex align='center' gap={{ base: 2, md: 3 }}>
              <Icon
                as={Verified}
                fill='green.200'
                color='white'
                boxSize={{ base: 4, md: 6 }}
              />
              <Text fontSize={{ base: 'xs', md: 'sm' }}>Verified by Zago</Text>
            </Flex>
          </HStack>
          <HStack color='gray.600'>
            <Icon as={AlarmClockOff} boxSize={{ base: 4, md: 5 }} />
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              {adventure.days} Days . {adventure.days - 1} night{' '}
            </Text>
          </HStack>
        </Box>
        <Button
          variant='ghost'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='full'
          size={{ base: 'sm', md: 'md' }}
          w={{ base: 'full', md: 'auto' }}
        >
          <Icon as={LuShare2} mr={2} /> Share
        </Button>
      </Flex>

      {/* 4. DESCRIPTION & DETAILS */}
      <Flex
        align='flex-start'
        justify='space-between'
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 6, md: 8 }}
      >
        <Box mb={{ base: 6, md: 12 }} w='full'>
          <Stack>
            <Heading size={{ base: 'sm', md: 'md' }} mb={4}>
              See adventure
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700' mb={8}>
              {adventure.description}
            </Text>
          </Stack>

          <Stack gap={{ base: 3, md: 4 }}>
            <DetailItem
              icon={CircleGauge}
              label='Difficulty level'
              value={adventure.level.toLocaleLowerCase()}
            />
            <DetailItem
              icon={LuClock}
              label='TripType'
              value={adventure.tripType}
            />
            <DetailItem
              icon={ShieldPlus}
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
                  <Icon as={CircleCheckBig} />
                )
              }
            />
            <DetailItem
              icon={Settings}
              label='Gear'
              value={
                adventure?.gear ? adventure.gear : <Icon as={CircleCheckBig} />
              }
            />
            <DetailItem
              icon={ShieldQuestionMark}
              label='Emergency plan'
              value={<Icon as={CircleCheckBig} />}
            />
            <DetailItem
              icon={CalendarDays}
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
              <Text fontSize={{ base: 'sm', md: 'md' }}>Lorem ipsum</Text>
            </Box>
          </Stack>
        </Box>

        {/* BOOKING CARD - Sticky on mobile */}
        <Box
          p={{ base: 4, md: 6 }}
          borderRadius='2xl'
          borderWidth='1px'
          borderColor='primary.100'
          bg='white'
          boxShadow='xl'
          mb={10}
          position={{ base: 'sticky', md: 'relative' }}
          bottom={{ base: 0, md: 'auto' }}
          left={{ base: 0, md: 'auto' }}
          right={{ base: 0, md: 'auto' }}
          zIndex={{ base: 10, md: 'auto' }}
          overflow='hidden'
          w='full'
          maxW={{ base: 'full', md: '400px' }}
        >
          <Flex
            justify='space-between'
            align='center'
            wrap='wrap'
            gap={{ base: 3, md: 6 }}
          >
            <Stack gap={3} w='full'>
              <Heading size={{ base: 'sm', md: 'md' }}>
                {adventure.title}
              </Heading>
              <HStack color='gray.600'>
                <Icon as={AlarmClockOff} boxSize={{ base: 4, md: 5 }} />
                <Text fontSize={{ base: 'sm', md: 'md' }}>
                  {adventure.days} Days . {adventure.days - 1} night{' '}
                </Text>
              </HStack>
              <HStack align='baseline' justify='space-between'>
                <Text fontSize={{ base: 'xs', md: 'sm' }}>FROM</Text>
                <Text
                  color='primary'
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight='bold'
                >
                  ${hasDiscount ? discountPrice : adventure.price}
                </Text>
                {hasDiscount && (
                  <Text
                    textDecoration='line-through'
                    color='gray.400'
                    fontSize={{ base: 'md', md: 'lg' }}
                  >
                    ${adventure.price}
                  </Text>
                )}
              </HStack>
            </Stack>
          </Flex>
          <Flex
            gap={3}
            mt={3}
            align='center'
            flex='1'
            justify='space-between'
            direction={{ base: 'row', md: 'row' }}
          >
            <IconButton
              aria-label='Like adventure'
              variant='outline'
              size={{ base: 'md', md: 'lg' }}
              borderRadius='full'
              _hover={{ bg: 'red.50', color: 'red.500' }}
            >
              <Icon as={LuHeart} boxSize={{ base: 5, md: 6 }} />
            </IconButton>
            <Button
              bg='primary'
              color='white'
              size={{ base: 'md', md: 'lg' }}
              px={{ base: 6, md: 10 }}
              borderRadius='full'
              flex='1'
            >
              Book Now
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* 5. ITINERARY */}
      <Box>
        <Heading size={{ base: 'md', md: 'lg' }} mb={8}>
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
      gap={{ base: 2, md: 4 }}
    >
      <HStack gap={{ base: 2, md: 3 }} flex='1'>
        <Icon as={icon} boxSize={{ base: 5, md: 6 }} color='primary.500' />
        <Text fontSize={{ base: 'xs', md: 'sm' }} color='gray.500'>
          {label}
        </Text>
      </HStack>
      <Box fontSize={{ base: 'sm', md: 'md' }} textAlign='right'>
        {value}
      </Box>
    </Flex>
  );
}
