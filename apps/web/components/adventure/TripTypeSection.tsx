'use client';

import { SimpleGrid, Container, Heading } from '@chakra-ui/react';
import { TripTypeCard } from '../ui/card/TripTypeCard';
import { TripType, TripTypeLabels } from '@zagotours/types';
import { useAdventures } from '@/hooks';

// 1. Updated keys to match your Enum exactly
const tripTypeImageMap: Record<TripType, string> = {
  [TripType.HIKING]: '/images/adventures/tripType/hiking.webp',
  [TripType.KAYAKING]: '/images/adventures/tripType/kayaking.webp',
  [TripType.CANOEING]: '/images/adventures/tripType/canoeing.webp',
  [TripType.SNOWBOARDING]: '/images/adventures/tripType/snowboarding.webp',
  [TripType.TREKKING]: '/images/adventures/tripType/trekking.webp',
  [TripType.SKIING]: '/images/adventures/tripType/skiing.webp',
  [TripType.SKYDIVING]: '/images/adventures/tripType/skydiving.webp',
  [TripType.SAFARIS]: '/images/adventures/tripType/safari.webp',
  [TripType.CLIMBING]: '/images/adventures/tripType/mountain climbing.webp',
  [TripType.JUMPING]: '/images/adventures/tripType/base jumping.webp',
};

export default function TripTypeSection() {
  const { data: response } = useAdventures();
  const adventures = response?.data || [];

  // Count adventures per type
  const tripTypeCounts = adventures.reduce(
    (acc, adventure) => {
      const type = adventure.tripType;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<TripType, number>,
  );

  // Map types for rendering
  const tripTypes = Object.entries(TripTypeLabels).map(([key, label]) => {
    const typeKey = key as TripType;
    return {
      key: typeKey,
      name: label,
      count: tripTypeCounts[typeKey] || 0,
      image: tripTypeImageMap[typeKey] || '/images/events/pricing-plan.webp',
    };
  });

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
