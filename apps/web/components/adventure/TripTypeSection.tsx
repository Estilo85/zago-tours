'use client';

import { useState } from 'react';
import { SimpleGrid, Container, Heading, Center, Text } from '@chakra-ui/react';
import { TripTypeCard } from '../ui/card/TripTypeCard';
import { TripType, TripTypeLabels } from '@zagotours/types';
import Button from '../ui/button/Button';

export default function TripTypeSection() {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY = 8;

  const tripTypes = Object.entries(TripTypeLabels).map(([key, label]) => ({
    key: key as TripType,
    name: label,
    count: 0,
    image: '/images/events/pricing-plan.webp',
  }));

  const displayedTypes = showAll
    ? tripTypes
    : tripTypes.slice(0, INITIAL_DISPLAY);
  const hasMore = tripTypes.length > INITIAL_DISPLAY;

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
        {displayedTypes.map((t) => (
          <TripTypeCard
            key={t.key}
            type={t.key}
            label={t.name}
            count={t.count}
            imageUrl={t.image}
          />
        ))}
      </SimpleGrid>

      {hasMore && (
        <Center mt={6}>
          <Button
            onClick={() => setShowAll(!showAll)}
            variant='outline'
            size='lg'
          >
            {showAll
              ? 'Show Less'
              : `See More (${tripTypes.length - INITIAL_DISPLAY} more)`}
          </Button>
        </Center>
      )}
    </Container>
  );
}
