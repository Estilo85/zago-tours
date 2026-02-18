'use client';
import { AvatarImage } from '@/components/media/AvatarImage';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import {
  Card,
  Text,
  Stack,
  HStack,
  Box,
  Flex,
  AvatarGroup,
  Avatar,
  AspectRatio,
} from '@chakra-ui/react';
import { EventResponseDto } from '@zagotours/types';
import { Calendar, MapPin, Timer } from 'lucide-react';
import { AppLink } from '../link/AppLink';
import { formatDate } from '@/utils/DateFormat';
import { formatTime } from '@/utils/TimeFormat';
import { optimizeCloudinaryImage } from '@/utils/CloudinaryImageOptimize';

interface EventCardProps {
  event: EventResponseDto;
}

export const EventCard = ({ event }: EventCardProps) => {
  const attendees =
    event.registrations?.map((reg) => ({
      name: reg.user.name,
      src: reg.user.image ? optimizeCloudinaryImage(reg.user.image) : undefined,
    })) || [];

  return (
    <Card.Root
      w={{ base: 'full', md: '280px' }}
      variant='elevated'
      overflow='hidden'
      borderRadius='3xl'
      role='group'
      transition='all 0.3s ease'
      _hover={{
        md: {
          boxShadow: '2xl',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* IMAGE SECTION */}
      <Box position='relative' overflow='hidden'>
        <AspectRatio ratio={4 / 3}>
          <ResponsiveImage
            src={event.mediaUrl as string}
            alt={event.title}
            width='100%'
            height='100%'
            borderRadius='none'
            objectFit='cover'
            objectPosition='top'
            containerProps={{
              transition: 'transform 0.5s ease',
              _groupHover: { transform: 'scale(1.08)' },
            }}
          />
        </AspectRatio>
      </Box>

      {/* BODY SECTION */}
      <AppLink href={`/events/${event.id}`}>
        <Card.Body p='4' gap='1'>
          {/* Date and Time */}
          <HStack
            justify='space-between'
            fontSize='xs'
            fontWeight='bold'
            mb='2'
          >
            <Flex align='center' gap={2}>
              <Calendar size={12} />
              <Text>{formatDate(event.date)}</Text>
            </Flex>
            <Flex align='center' gap={2}>
              <Timer size={12} />
              <Text>{formatTime(event.time)}</Text>
            </Flex>
          </HStack>

          {/* Title */}
          <Card.Title
            fontWeight='bold'
            fontSize='md'
            lineHeight='tight'
            minH='45px'
          >
            {event.title}
          </Card.Title>

          {/* Location and Tags */}
          <Stack gap='2' pt='2'>
            <Flex align='center' gap={2} width='full'>
              <MapPin size={14} style={{ flexShrink: 0 }} />
              <Text fontSize='xs' truncate minW={0} flex={1}>
                Coming soon... | {event.location}
              </Text>
            </Flex>
            <Flex align='center' gap={4}>
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
      </AppLink>

      {/* FOOTER SECTION */}
      <Card.Footer pt='0'>
        <Box w='full' borderTop='1px solid' borderColor='gray.100' pt='3'>
          {attendees.length > 0 && (
            <AvatarGroup size='xs'>
              {attendees.slice(0, 3).map((person, i) => (
                <AvatarImage
                  key={i}
                  name={person.name}
                  src={person.src || ''}
                  alt={person.name}
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
  );
};
