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
  Badge,
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
            objectFit='cover'
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
          <HStack
            justify='space-between'
            fontSize='xs'
            fontWeight='bold'
            mb='2'
          >
            <Flex align='center' gap={1}>
              <Calendar size={12} />
              <Text>{formatDate(event.date)}</Text>
            </Flex>
            <Flex align='center' gap={1}>
              <Timer size={12} />
              <Text>{formatTime(event.date)}</Text>
            </Flex>
          </HStack>

          <Card.Title
            fontWeight='bold'
            fontSize='md'
            lineHeight='tight'
            minH='45px'
            lineClamp={2}
          >
            {event.title}
          </Card.Title>

          <Stack gap='2' pt='2'>
            <Flex align='center' gap={2} width='full'>
              <MapPin size={14} style={{ flexShrink: 0 }} />
              <Text fontSize='xs' truncate flex={1}>
                {event.location}
              </Text>
            </Flex>

            {/* TAGS SECTION: Fixed with Wrap */}
            <Flex align='center' gap={1.5} wrap='wrap'>
              {['Free Entry', 'Food Wine & Drinks'].map((tag, idx) => (
                <Badge
                  key={idx}
                  bg='gray.100'
                  px={2}
                  py={0.5}
                  borderRadius='md'
                  whiteSpace='nowrap'
                  fontSize='9px'
                  fontWeight='bold'
                >
                  {tag}
                </Badge>
              ))}
            </Flex>
          </Stack>
        </Card.Body>
      </AppLink>

      {/* FOOTER SECTION */}
      <Card.Footer pt='0'>
        <Flex
          w='full'
          borderTop='1px solid'
          borderColor='gray.100'
          pt='3'
          justify='space-between'
          align='center'
        >
          <AvatarGroup size='xs'>
            {attendees.slice(0, 3).map((person, i) => (
              <AvatarImage key={i} name={person.name} src={person.src || ''} />
            ))}
            {attendees.length > 3 && (
              <Avatar.Root size='xs'>
                <Avatar.Fallback fontSize='9px'>
                  +{attendees.length - 3}
                </Avatar.Fallback>
              </Avatar.Root>
            )}
          </AvatarGroup>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};
