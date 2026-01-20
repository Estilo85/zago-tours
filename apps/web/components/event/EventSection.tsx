'use client';
import { Box } from '@chakra-ui/react';
import { EventResponseDto } from '@zagotours/types';
import React from 'react';
import { EventCard } from '../ui/card/EventCard';

const mockEvents: EventResponseDto[] = [
  {
    id: '1',
    title: 'Global Tech Summit 2026',
    date: new Date('2026-06-10T09:00:00'), // 9:00 AM
    description:
      'Join industry leaders for a deep dive into the future of AI and digital transformation.',
    location: 'San Francisco, CA',
    createdBy: 'Admin',
    spotLeft: 15,
    joinTill: new Date('2026-06-01T23:59:59'),
    cancellationTerms: 'Full refund 48h before event.',
    isSignature: true,
    mediaUrl: '/images/community/community-getting-started-2.webp',
    publicId: 'tech_summit_01',
    createdAt: new Date(),
    isFull: false,
    hasJoined: true,
  },
  {
    id: '2',
    title: 'Rooftop Jazz Night',
    date: new Date('2026-05-20T20:00:00'), // 8:00 PM
    description:
      'An evening of smooth jazz under the stars with local artists and cocktails.',
    location: 'New York, NY',
    createdBy: 'Events Team',
    spotLeft: 0,
    isSignature: true,
    joinTill: new Date('2026-05-18T12:00:00'),
    cancellationTerms: 'Non-refundable.',
    mediaUrl: '/images/community/community-getting-started-2.webp',
    publicId: 'jazz_night_02',
    createdAt: new Date(),
    isFull: true,
    hasJoined: false,
  },
  {
    id: '3',
    title: 'Morning Yoga in the Park',
    date: new Date('2025-01-10T07:30:00'), // Past Date
    description:
      'Rejuvenate your body and mind with a guided yoga session at sunrise.',
    location: 'Austin, TX',
    createdBy: 'Wellness Club',
    spotLeft: 5,
    isSignature: true,
    joinTill: new Date('2025-01-09T18:00:00'),
    cancellationTerms: 'Free cancellation.',
    mediaUrl: '/images/community/community-getting-started-2.webp',
    publicId: 'yoga_03',
    createdAt: new Date(),
    isExpired: true,
    hasJoined: false,
  },
];
export default function EventSection() {
  return (
    <Box>
      {mockEvents.map((event, idx) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Box>
  );
}
