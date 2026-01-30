'use client';

import {
  Container,
  Heading,
  SimpleGrid,
  Center,
  Spinner,
  VStack,
  Text,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { SignatureEventCard } from '../ui/card/SignatureEventCard';
import { useEvents } from '@/hooks';
import { Event } from '@zagotours/types';
import { LoadingState } from '../ui/LoadingState';
import { ErrorState } from '../ui/ErrorState';

export default function SignatureEventsSection() {
  const { data, isLoading, isError, error } = useEvents();

  // Filter signature events
  const signatureEvents = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((event: Event) => event.isSignature);
  }, [data]);

  if (isLoading) return <LoadingState message='Loading events...' />;
  if (isError) return <ErrorState message={error?.message} />;

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

      {signatureEvents.length === 0 ? (
        <Center minH='300px'>
          <Text color='gray.500' fontSize='lg'>
            No signature events available at the moment
          </Text>
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: 6, md: 3 }}
          width={{ base: 'full', md: '900px' }}
          justifyItems='center'
        >
          {signatureEvents.map((event: Event) => (
            <SignatureEventCard key={event.id} event={event} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
