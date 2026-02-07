'use client';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Text,
  Center,
  Grid,
} from '@chakra-ui/react';
import { EventResponseDto } from '@zagotours/types';
import React, { useMemo } from 'react';
import { EventCard } from '../ui/card/EventCard';
import { SelectInput } from '../ui/input/SelectInput';
import { useEvents } from '@/hooks';
import { ErrorState } from '../ui/ErrorState';
import { EventCardSkeleton } from '../ui/card/Eventcardskeleton';

export default function EventSection() {
  // Shared width logic to ensure alignment
  const sectionWidth = { base: 'full', lg: '900px' };
  const { data, isLoading, isError, error } = useEvents();

  // Separate upcoming and past events
  const { upcomingEvents, pastEvents } = useMemo(() => {
    if (!data?.data) {
      return { upcomingEvents: [], pastEvents: [] };
    }

    const now = new Date();
    const events: EventResponseDto[] = data.data;

    const upcoming = events.filter((event) => new Date(event.date) >= now);
    const past = events.filter((event) => new Date(event.date) < now);

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [data]);

  if (isError) return <ErrorState message={error?.message} />;

  return (
    <Container maxW='container.xl' py={10}>
      <VStack spaceY={12} align='stretch'>
        {/* --- UPCOMING EVENTS SECTION --- */}
        <Box>
          <Flex
            justify='space-between'
            align='center'
            width={sectionWidth}
            mx='auto'
            mb={6}
          >
            <Heading
              size={{ base: 'xl', md: '2xl' }}
              lineHeight='1.2'
              color='primary'
              fontWeight='bold'
            >
              Upcoming Events
            </Heading>

            <HStack display={{ base: 'none', md: 'flex' }} spaceX={4}>
              <SelectInput
                value=''
                onChange={() => {}}
                placeholder='Categories'
                options={[
                  { label: 'London', value: 'london' },
                  { label: 'New York', value: 'ny' },
                ]}
              />
              <SelectInput
                value=''
                onChange={() => {}}
                placeholder='Review/rating'
                options={[
                  { label: 'London', value: 'london' },
                  { label: 'New York', value: 'ny' },
                ]}
              />
            </HStack>
          </Flex>

          {/* Loading State for Upcoming Events */}
          {isLoading && (
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={6}
              width={sectionWidth}
              mx='auto'
              justifyItems='center'
            >
              {Array.from({ length: 3 }).map((_, idx) => (
                <EventCardSkeleton key={idx} />
              ))}
            </SimpleGrid>
          )}

          {/* Empty State for Upcoming Events */}
          {!isLoading && upcomingEvents.length === 0 && (
            <Center width={sectionWidth} mx='auto' py={10}>
              <Text color='gray.500' fontSize='lg'>
                No upcoming events at the moment
              </Text>
            </Center>
          )}

          {/* Upcoming Events Grid */}
          {!isLoading && upcomingEvents.length > 0 && (
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={6}
              width={sectionWidth}
              mx='auto'
              justifyItems='center'
            >
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </SimpleGrid>
          )}
        </Box>

        {/* --- PAST EVENTS SECTION --- */}
        <Box>
          <Flex
            justify='space-between'
            align='center'
            width={sectionWidth}
            mx='auto'
            mb={6}
          >
            <Heading
              size={{ base: 'xl', md: '2xl' }}
              lineHeight='1.2'
              color='primary'
              fontWeight='bold'
            >
              Past Events
            </Heading>

            <HStack display={{ base: 'none', md: 'flex' }} spaceX={4}>
              <SelectInput
                value=''
                onChange={() => {}}
                placeholder='Categories'
                options={[
                  { label: 'London', value: 'london' },
                  { label: 'New York', value: 'ny' },
                ]}
              />
              <SelectInput
                value=''
                onChange={() => {}}
                placeholder='Review rating'
                options={[
                  { label: 'London', value: 'london' },
                  { label: 'New York', value: 'ny' },
                ]}
              />
            </HStack>
          </Flex>

          {/* Loading State for Past Events */}
          {isLoading && (
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={6}
              width={sectionWidth}
              mx='auto'
              justifyItems='center'
            >
              {Array.from({ length: 3 }).map((_, idx) => (
                <EventCardSkeleton key={idx} />
              ))}
            </SimpleGrid>
          )}

          {/* Empty State for Past Events */}
          {!isLoading && pastEvents.length === 0 && (
            <Center width={sectionWidth} mx='auto' py={10}>
              <Text color='gray.500' fontSize='lg'>
                No past events to display
              </Text>
            </Center>
          )}

          {/* Past Events Grid */}
          {!isLoading && pastEvents.length > 0 && (
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={6}
              width={sectionWidth}
              mx='auto'
              justifyItems='center'
            >
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
