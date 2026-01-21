'use client';

import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { mockEvents } from './EventSection';
import { SignatureEventCard } from '../ui/card/SignatureEventCard';

export default function SignatureEventsSection() {
  const signatureData = mockEvents?.filter((event) => event.isSignature);

  return (
    <Container maxW='container.xl' justifyItems='center' mt={5}>
      <Heading
        size={{ base: '2xl', md: '4xl' }}
        lineHeight='1.2'
        color='primary'
        my={10}
      >
        Our Signature Events
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: 6, md: 3 }}
        width={{ base: 'full', md: '900px' }}
        justifyItems='center'
      >
        {signatureData.map((event) => (
          <SignatureEventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
