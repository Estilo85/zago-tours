'use client';
import { AvatarImage } from '@/components/media/AvatarImage';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import {
  Text,
  Stack,
  HStack,
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
      <Box
        bg='white'
        w={{ base: 'full', md: '280px' }}
        h='350px'
        borderRadius='3xl'
        overflow='hidden'
        boxShadow='sm'
        _hover={{ boxShadow: 'md' }}
        transition='all 0.2s'
        p={3}
        display='flex'
        flexDirection='column'
      >
        {/* Image Section - 40% */}
        <Box
          height='40%'
          flexShrink={0}
          overflow='hidden'
          borderRadius='3xl'
          mb={3}
        >
          <ResponsiveImage
            src={event.mediaUrl as string}
            alt={event.title}
            width='100%'
            height='100%'
            objectFit='cover'
          />
        </Box>

        {/* Content Section - Flexible */}
        <Stack gap={2} flex={1} minH={0}>
          {/* Date and Time */}
          <HStack justify='space-between' fontSize='xs' fontWeight='bold'>
            <Flex align='center' gap={2}>
              <Calendar size={12} />
              <Text>{formatDate(event.date)}</Text>
            </Flex>
            <Flex align='center' gap={2}>
              <Timer size={12} />
              <Text>{formatDate(event.date)}</Text>
            </Flex>
          </HStack>

          {/* Title */}
          <Text
            mt='1'
            lineHeight='shorter'
            fontSize='small'
            fontWeight='semibold'
          >
            {event.title}
          </Text>

          {/* Location and Tags */}
          <Stack gap='2' pt='2' mb={0} pb={0} flex={1}>
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
        </Stack>

        {/* Footer Section - Fixed at bottom */}
        <Box pt={1} borderTop='1px solid' borderColor='gray.100'>
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
      </Box>
    </AppLink>
  );
};
