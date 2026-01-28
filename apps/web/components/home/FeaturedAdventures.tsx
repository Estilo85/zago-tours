'use client';

import { SimpleGrid, Container, Box, Center, Icon } from '@chakra-ui/react';
import AdventureCard from '../ui/card/AdventureCard';
import Button from '../ui/button/Button';
import { Grip } from 'lucide-react';
import { useAdventures } from '@/hooks';
import { AppLink } from '../ui/link/AppLink';

export const FeaturedAdventures = () => {
  const { data: response, isLoading } = useAdventures({ limit: 6 });

  const adventures = response?.data || [];
  const pagination = response?.pagination;

  console.log('Adventures:', adventures);

  return (
    <Container maxW='container.xl' justifyItems='center' mt={5}>
      {isLoading && <Box>Loading adventures...</Box>}

      {!isLoading && adventures.length === 0 && (
        <Box>No adventures found yet!.</Box>
      )}

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

      {/* Show if total adventures > 6 */}
      {pagination && pagination.total > 6 && (
        <Center mt={6}>
          <AppLink href='/adventures'>
            <Button bg='dark' color='white' py='1'>
              <Icon as={Grip} mr='4' boxSize='3' />
              View All {pagination.total} Tours
            </Button>
          </AppLink>
        </Center>
      )}
    </Container>
  );
};
