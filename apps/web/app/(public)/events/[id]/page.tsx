'use client';

import { EventDetailPage } from '@/components/event/EventDetail';
import { useEvent } from '@/hooks';
import { notFound, useParams } from 'next/navigation';
import { Center, Spinner, VStack, Text, Container } from '@chakra-ui/react';

export default function EventDetails() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError, error } = useEvent(id);

  // Loading state
  if (isLoading) {
    return (
      <Container maxW='container.xl' py={10}>
        <Center minH='60vh'>
          <VStack spaceY={4}>
            <Spinner size='xl' color='primary' width='4px' />
            <Text color='gray.600'>Loading event details...</Text>
          </VStack>
        </Center>
      </Container>
    );
  }

  // Error state
  if (isError) {
    return (
      <Container maxW='container.xl' py={10}>
        <Center minH='60vh'>
          <VStack spaceY={4}>
            <Text color='red.500' fontSize='lg' fontWeight='semibold'>
              Error loading event
            </Text>
            <Text color='gray.600'>
              {error?.message || 'Something went wrong'}
            </Text>
          </VStack>
        </Center>
      </Container>
    );
  }

  // Not found
  if (!data?.data) {
    notFound();
  }

  return <EventDetailPage event={data.data} />;
}
