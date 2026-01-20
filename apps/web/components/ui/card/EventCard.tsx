import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { Text, Stack, HStack, Badge, Card } from '@chakra-ui/react';
import { EventResponseDto } from '@zagotours/types';

interface EventCardProps {
  event: EventResponseDto;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card.Root
      maxW='280px'
      w='full'
      h='350px'
      overflow='hidden'
      _hover={{ boxShadow: 'md' }}
      transition='all 0.2s'
      borderRadius='3xl'
    >
      {/* 1. Image at the top */}
      <ResponsiveImage
        src={event.mediaUrl as string}
        alt={event.title}
        height='200px'
        objectFit='cover'
      />

      <Card.Body gap='3'>
        {/* 2. Full Date and Time (Flexed) */}
        <HStack
          justify='space-between'
          fontSize='xs'
          fontWeight='bold'
          color='blue.600'
        >
          <Text>{event.date.toLocaleDateString()}</Text>
          <Text>
            {event.date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </HStack>

        {/* 3. Title */}
        <Card.Title mt='1'>{event.title}</Card.Title>

        {/* 4. Description */}
        <Text lineClamp={2} color='fg.muted' fontSize='sm'>
          {event.description}
        </Text>

        {/* 5. Metadata (Spots & Location) */}
        <Stack gap='1' pt='2'>
          <Text fontSize='xs'>📍 {event.location}</Text>
          <Text
            fontSize='xs'
            color={event.spotLeft < 5 ? 'red.500' : 'inherit'}
          >
            👥 Spots left: {event.spotLeft}
          </Text>
        </Stack>
      </Card.Body>

      <Card.Footer gap='2'>
        {/* Status Badges */}
        {event.hasJoined && <Badge colorPalette='green'>Joined</Badge>}
        {event.isFull && <Badge colorPalette='orange'>Full</Badge>}
        {event.isExpired && <Badge colorPalette='red'>Expired</Badge>}
      </Card.Footer>
    </Card.Root>
  );
};
