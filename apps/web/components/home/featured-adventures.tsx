'use client';

import { SimpleGrid, Container, Box, Center, Icon } from '@chakra-ui/react';
import AdventureCard from '../adventure/adventure-card';
import {
  Adventure,
  AdventureLevel,
  AdventureStatus,
  AccessType,
} from '@zagotours/types';
import Button from '../ui/button';
import { Grip } from 'lucide-react';

export const DUMMY_ADVENTURES: Adventure[] = [
  {
    id: '1',
    title: 'Mountain Hiking in the Alps',
    isVerified: true,
    price: 250.0,
    location: 'Switzerland',
    level: AdventureLevel.MEDIUM,
    tripType: 'Hiking',
    safetyScore: 95,
    rating: 4.8,
    mediaUrl: '/images/home/banner.webp',
    date: new Date('2026-06-15'),
    description: 'Experience the breathtaking views of the Swiss Alps.',
    days: 5,
    status: AdventureStatus.ACTIVE,
    access: AccessType.UNLOCKED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Safari Adventure in Serengeti',
    isVerified: true,
    price: 1200.5,
    location: 'Tanzania',
    level: AdventureLevel.CHALLENGING,
    tripType: 'Wildlife',
    safetyScore: 98,
    rating: 5.0,
    mediaUrl: '/images/home/banner.webp',
    date: new Date('2026-08-10'),
    description: 'See the Big Five in their natural habitat.',
    days: 7,
    status: AdventureStatus.ACTIVE,
    access: AccessType.UNLOCKED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Deep Sea Diving',
    isVerified: false,
    price: 450.0,
    location: 'Maldives',
    level: AdventureLevel.HARD,
    tripType: 'Water Sports',
    safetyScore: 88,
    rating: 4.2,
    mediaUrl: '/images/home/banner.webp',
    date: new Date('2026-09-05'),
    description: 'Explore the hidden coral reefs of the Indian Ocean.',
    days: 3,
    status: AdventureStatus.ACTIVE,
    access: AccessType.UNLOCKED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const FeaturedAdventures = () => {
  return (
    <Container maxW='container.xl' justifyItems='center' mt={5}>
      {DUMMY_ADVENTURES.length === 0 && (
        <Box>No adventures found in dummy data.</Box>
      )}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        gap={{ base: 6, md: 3 }}
        width={{ base: 'full', lg: '900px' }}
        justifyItems='center'
      >
        {DUMMY_ADVENTURES.map((adventure) => (
          <AdventureCard key={adventure.id} adventure={adventure} />
        ))}
      </SimpleGrid>
      <Center mt={6}>
        <Button bg='dark' color='white' py='1'>
          <Icon as={Grip} mr='4' boxSize='3' />
          Load More Tours
        </Button>
      </Center>
    </Container>
  );
};
