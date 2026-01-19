import { SimpleGrid, Container, Heading } from '@chakra-ui/react';
import { TripTypeCard } from '../ui/card/TripTypeCard';

export default function TripTypeSection() {
  const tripTypes = [
    { name: 'Hiking', count: 12, image: '/hiking.jpg' },
    { name: 'Safari', count: 5, image: '/safari.jpg' },
    { name: 'Beach', count: 8, image: '/beach.jpg' },
    { name: 'Hiking', count: 12, image: '/hiking.jpg' },
    { name: 'Safari', count: 5, image: '/safari.jpg' },
    { name: 'Beach', count: 8, image: '/beach.jpg' },
    { name: 'Hiking', count: 12, image: '/hiking.jpg' },
    { name: 'Safari', count: 5, image: '/safari.jpg' },
    { name: 'Beach', count: 8, image: '/beach.jpg' },
  ];

  return (
    <Container maxW='container.lg' py={10}>
      <Heading
        mb={6}
        size={{ base: '2xl', md: '4xl' }}
        lineHeight='1.2'
        textAlign='center'
      >
        Adventure
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 5 }}
        gap={{ base: 4 }}
        maxW={{ lg: '1000px', xl: '1200px' }}
        mx='auto'
        px={4}
      >
        {tripTypes.map((t, idx) => (
          <TripTypeCard
            key={idx}
            type={t.name}
            count={t.count}
            imageUrl={t.image}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
