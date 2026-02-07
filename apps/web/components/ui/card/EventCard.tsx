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
import { Calendar, MapPin, Timer } from 'lucide-react';
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
        variant='elevated'
        px={3}
        pt={3}
        bg='white'
        w={{ base: 'full', md: '280px' }}
        h='350px'
        overflow='hidden'
        _hover={{ boxShadow: 'md' }}
        transition='all 0.2s'
        borderRadius='3xl'
        display='flex'
        flexDirection='column'
      >
        <Box height='40%' flexShrink={0} overflow='hidden' borderRadius='3xl'>
          <ResponsiveImage
            src={event.mediaUrl as string}
            alt={event.title}
            width='100%'
            height='100%'
            objectFit='cover'
          />
        </Box>

        <Card.Body gap={2} flex={1} overflow='hidden'>
          <HStack justify='space-between' fontSize='xs' fontWeight='bold'>
            <Flex align='center' gap={2}>
              <Calendar size={12} /> <Text>{formatDate(event.date)}</Text>
            </Flex>
            <Flex align='center' gap={2}>
              <Timer size={12} />
              <Text>{formatDate(event.date)}</Text>
            </Flex>
          </HStack>

          {/* 3. Title */}
          <Card.Title mt='1' lineHeight='shorter' fontSize='small'>
            {event.title}
          </Card.Title>

          <Stack gap='1' pt='2'>
            <Flex align='center' gap={2} width='full'>
              <MapPin size={14} style={{ flexShrink: 0 }} />
              <Text fontSize='xs' truncate minW={0} flex={1}>
                Coming soon... | {event.location}
              </Text>
            </Flex>
            <Flex align='center' gap={2}>
              <Text
                bg='textPrimary'
                p={1}
                borderRadius='md'
                whiteSpace='nowrap'
                fontSize='xx-small'
              >
                Free Entry
              </Text>
              <Text
                bg='textPrimary'
                p={1}
                borderRadius='md'
                whiteSpace='nowrap'
                fontSize='xx-small'
              >
                Food Wine & Drinks
              </Text>
              <Text
                bg='textPrimary'
                p={1}
                borderRadius='md'
                whiteSpace='nowrap'
                fontSize='xx-small'
              >
                Free Entry
              </Text>
            </Flex>
          </Stack>
        </Card.Body>

        <Card.Footer gap='2' flexShrink={0}>
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
