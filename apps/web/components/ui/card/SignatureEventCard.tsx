import { Image, Text, Stack, Card, Box } from '@chakra-ui/react';
import { EventResponseDto } from '@zagotours/types';

export const SignatureEventCard = ({ event }: { event: EventResponseDto }) => {
  return (
    <Card.Root
      overflow='hidden'
      variant='subtle'
      borderStart='4px solid'
      borderStartColor='yellow.400'
    >
      {/* Media on the Left */}
      <Box minW='200px' maxW='300px'>
        <Image
          src={event.mediaUrl || ''}
          alt={event.title}
          height='100%'
          objectFit='cover'
        />
      </Box>

      {/* Title and Description on the Right */}
      <Stack flex='1'>
        <Card.Body>
          <Card.Title mb='2' fontSize='xl'>
            {event.title}
          </Card.Title>
          <Text color='fg.muted' lineClamp={4}>
            {event.description}
          </Text>
        </Card.Body>
      </Stack>
    </Card.Root>
  );
};
