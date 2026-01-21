'use client';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { EventResponseDto } from '@zagotours/types';
import React from 'react';
import { EventCard } from '../ui/card/EventCard';
import { SelectInput } from '../ui/input/SelectInput';

export const mockEvents: EventResponseDto[] = [
  {
    id: '1',
    title: 'Global Tech Summit 2026',
    date: new Date('2026-06-10T09:00:00'),
    description: 'Join industry leaders for a deep dive into the future of AI.',
    location: 'San Francisco, CA',
    createdBy: 'Admin',
    spotLeft: 15,
    joinTill: new Date('2026-06-01T23:59:59'),
    cancellationTerms: 'Full refund 48h before event.',
    isSignature: true,
    mediaUrl: '/images/adventures/adventure-section.webp',
    publicId: 'tech_summit_01',
    createdAt: new Date(),
    isFull: false,
    hasJoined: true,
  },
  {
    id: '2',
    title: 'Rooftop Jazz Night',
    date: new Date('2026-05-20T20:00:00'),
    description: 'An evening of smooth jazz under the stars.',
    location: 'New York, NY',
    createdBy: 'Events Team',
    spotLeft: 0,
    isSignature: true,
    joinTill: new Date('2026-05-18T12:00:00'),
    cancellationTerms: 'Non-refundable.',
    mediaUrl: '/images/adventures/adventure-section.webp',
    publicId: 'jazz_night_02',
    createdAt: new Date(),
    isFull: true,
    hasJoined: false,
  },
  {
    id: '3',
    title: 'Morning Yoga in the Park',
    date: new Date('2025-01-10T07:30:00'),
    description: 'Rejuvenate your body and mind with guided yoga.',
    location: 'Austin, TX',
    createdBy: 'Wellness Club',
    spotLeft: 5,
    isSignature: true,
    joinTill: new Date('2025-01-09T18:00:00'),
    cancellationTerms: 'Free cancellation.',
    mediaUrl: '/images/adventures/adventure-section.webp',
    publicId: 'yoga_03',
    createdAt: new Date(),
    isExpired: true,
    hasJoined: false,
  },
];

export default function EventSection() {
  // Shared width logic to ensure alignment
  const sectionWidth = { base: 'full', lg: '900px' };

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

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={6}
            width={sectionWidth}
            mx='auto'
            justifyItems='center'
          >
            {mockEvents.map((event, idx) => (
              <EventCard key={`upcoming-${idx}`} event={event} />
            ))}
          </SimpleGrid>
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

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={6}
            width={sectionWidth}
            mx='auto'
            justifyItems='center'
          >
            {mockEvents.map((event, idx) => (
              <EventCard key={`past-${idx}`} event={event} />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
}
