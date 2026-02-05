'use client';

import { useState } from 'react';
import {
  SimpleGrid,
  Container,
  Box,
  Center,
  Icon,
  Heading,
  Flex,
} from '@chakra-ui/react';
import AdventureCard from '../ui/card/AdventureCard';
import Button from '../ui/button/Button';
import { Grip, Verified } from 'lucide-react';
import { useAdventures } from '@/hooks';
import { PaginationControl } from '../ui/pagination/PaginationControl';
import { LoadingState } from '../ui/LoadingState';

export default function VerifiedAdventureSection() {
  const [page, setPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);

  const limit = 6;

  const { data: response, isLoading } = useAdventures({
    page,
    limit,
  });

  const adventures = response?.data || [];
  const pagination = response?.pagination;

  return (
    <Container maxW='container.xl' justifyItems='center' mt={5}>
      {/* Loading */}
      {isLoading && <LoadingState message='Please wait...' />}

      {/* Empty */}
      {!isLoading && adventures.length === 0 && (
        <Box>No adventures found yet!</Box>
      )}

      {/* Header */}
      <Flex align='center' mb={6} gap={5}>
        <Heading
          size={{ base: '2xl', md: '4xl' }}
          lineHeight='1.2'
          fontWeight='bolder'
          textAlign='center'
          color='primary'
        >
          Verified Adventures
        </Heading>
        <Icon as={Verified} />
      </Flex>

      {/* Adventures grid */}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        gap={{ base: 6, md: 3 }}
        width={{ base: 'full', lg: '900px' }}
        justifyItems='center'
      >
        {adventures.map((adventure) => (
          <AdventureCard key={adventure.id} adventure={adventure} />
        ))}
      </SimpleGrid>

      {/* Load more button (reveals pagination) */}
      {!showPagination && pagination && pagination.total > limit && (
        <Center mt={6}>
          <Button
            bg='dark'
            color='white'
            py='1'
            onClick={() => setShowPagination(true)}
          >
            <Icon as={Grip} mr='4' boxSize='3' />
            Load All {pagination.total} Tours
          </Button>
        </Center>
      )}

      {/* Pagination */}
      {showPagination && pagination && (
        <PaginationControl pagination={pagination} onPageChange={setPage} />
      )}
    </Container>
  );
}
