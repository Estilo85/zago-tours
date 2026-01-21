'use client';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { Text, Stack, Card, Box } from '@chakra-ui/react';
import { EventResponseDto } from '@zagotours/types';

export const SignatureEventCard = ({ event }: { event: EventResponseDto }) => {
  return (
    <Card.Root
      overflow='hidden'
      variant='subtle'
      borderStart='4px solid'
      borderStartColor='yellow.400'
      flexDirection={{ base: 'column', sm: 'row' }}
      width='full'
      height={{ sm: '200px' }}
    >
      {/* Media on the Left */}
      <Box
        minW={{ base: 'full', sm: '200px' }}
        maxW={{ base: 'full', sm: '250px' }}
        height={{ base: '200px', sm: 'full' }}
      >
        <ResponsiveImage
          src={event.mediaUrl as string}
          alt={event.title}
          height='100%'
          width='100%'
          objectFit='cover'
          borderRadius='none'
        />
      </Box>

      {/* Title and Description on the Right */}
      <Stack flex='1' justify='center'>
        <Card.Body p={4}>
          <Card.Title mb='2' fontSize='xl' color='primary'>
            {event.title}
          </Card.Title>
          <Text color='gray.600' lineClamp={3} fontSize='sm'>
            {event.description}
          </Text>
        </Card.Body>
      </Stack>
    </Card.Root>
  );
};
