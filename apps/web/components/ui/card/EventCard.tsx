'use client';
import { AvatarImage } from '@/components/media/AvatarImage';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import {
  Text,
  Stack,
  HStack,
  Badge,
  Card,
  Box,
  Flex,
  AvatarGroup,
  Avatar,
} from '@chakra-ui/react';
import { EventResponseDto } from '@zagotours/types';
import { Calendar, Timer } from 'lucide-react';
import { AppLink } from '../link/AppLink';
import { formatDate } from '@/utils/DateFormat';

interface EventCardProps {
  event: EventResponseDto;
}

export const EventCard = ({ event }: EventCardProps) => {
  const attendees =
    event.registrations?.map((reg) => ({
      name: reg.user.name,
      src: reg.user.image || undefined,
    })) || [];
  return (
    <AppLink href={`/events/${event.id}`}>
      <Card.Root
        maxW={{ base: '100%', md: '650px' }}
        variant='elevated'
        px={3}
        pt={3}
        bg='white'
        overflow='hidden'
        borderWidth='1px'
        borderColor='gray.100'
        borderRadius='xl'
        boxShadow='0 2px 12px rgba(0, 0, 0, 0.05)'
        transition='transform 0.2s ease'
        _hover={{ transform: { md: 'translateY(-2px)' } }}
      >
        <ResponsiveImage
          src={event.mediaUrl as string}
          alt={event.title}
          height='200px'
          objectFit='cover'
          borderRadius='none'
        />

        <Card.Body gap='3'>
          <HStack
            justify='space-between'
            fontSize='xs'
            fontWeight='bold'
            color='blue.600'
          >
            <Flex align='center' gap={2}>
              <Calendar size={12} /> <Text>{formatDate(event.date)}</Text>
            </Flex>
            <Flex align='center' gap={2}>
              <Timer size={12} />
              <Text>{formatDate(event.date)}</Text>
            </Flex>
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
          {/* Avatar Group for Attendees */}
          <Box>
            {attendees.length > 0 && (
              <AvatarGroup size='xs'>
                {attendees.slice(0, 3).map((person, i) => (
                  <AvatarImage
                    key={i}
                    name={person.name}
                    src={person.src || ''}
                  />
                ))}
              </AvatarGroup>
            )}
            <Avatar.Root>
              <Avatar.Fallback>+3</Avatar.Fallback>
            </Avatar.Root>
          </Box>
        </Card.Footer>
      </Card.Root>
    </AppLink>
  );
};
