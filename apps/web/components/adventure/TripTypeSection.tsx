'use client';

import { SimpleGrid, Container, Heading } from '@chakra-ui/react';
import { TripTypeCard } from '../ui/card/TripTypeCard';
import { TripType, TripTypeLabels } from '@zagotours/types';
import { useAdventures } from '@/hooks';

export default function TripTypeSection() {
  const { data: response } = useAdventures();

  const adventures = response?.data || [];

  const tripTypeCounts = adventures.reduce(
    (acc, adventure) => {
      const type = adventure.tripType;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<TripType, number>,
  );

  const tripTypeImages = adventures.reduce(
    (acc, adventure) => {
      const type = adventure.tripType;
      if (!acc[type] && adventure.mediaUrl) {
        acc[type] = adventure.mediaUrl;
      }
      return acc;
    },
    {} as Record<TripType, string>,
  );

  const tripTypes = Object.entries(TripTypeLabels).map(([key, label]) => ({
    key: key as TripType,
    name: label,
    count: tripTypeCounts[key as TripType] || 0,
    image:
      tripTypeImages[key as TripType] || '/images/events/pricing-plan.webp',
  }));

  return (
    <Container maxW='container.lg' py={10}>
      <Heading
        mb={6}
        size={{ base: '2xl', md: '4xl' }}
        lineHeight='1.2'
        textAlign='center'
      >
        Adventures
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 5 }}
        gap={{ base: 4 }}
        rowGap={5}
        maxW={{ lg: '1000px', xl: '1200px' }}
        mx='auto'
        px={4}
      >
        {tripTypes.map((t) => (
          <TripTypeCard
            key={t.key}
            type={t.key}
            label={t.name}
            count={t.count}
            imageUrl={t.image}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
