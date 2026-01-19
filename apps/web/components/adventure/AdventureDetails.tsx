'use client';

import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Stack,
  Icon,
  Button,
  Container,
  Image,
  Separator,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { AdventureWithRelations, Itinerary } from '@zagotours/types';
import {
  LuShare2,
  LuStar,
  LuClock,
  LuMapPin,
  LuTrendingUp,
  LuHeart,
} from 'react-icons/lu';
import { ScrollProgressSteps } from '../ui/scroll-progress-step';

interface AdventureDetailProps {
  adventure: AdventureWithRelations;
}

export default function AdventureDetail({ adventure }: AdventureDetailProps) {
  const hasDiscount = false;
  const discountPrice = adventure.price * 0.9;

  const itineraryItems = (adventure.itineraries || [])
    .sort((a, b) => a.dayNumber - b.dayNumber)
    .map((step: Itinerary) => ({
      content: (
        <Box key={step.id} pb={10}>
          <Heading size='md' mb={2} color='primary.600'>
            Day {step.dayNumber}: {step.title}
          </Heading>
          {step.imageUrl && (
            <Image
              src={step.imageUrl}
              alt={step.title}
              borderRadius='md'
              mb={4}
              maxH='300px'
              width='100%'
              objectFit='cover'
            />
          )}
          <Text color='gray.600' lineHeight='tall'>
            {step.activityDetails}
          </Text>
        </Box>
      ),
    }));

  return (
    <Container maxW='container.md' py={10}>
      {/* 1. TOP STATS CARD */}
      <Box
        borderRadius='xl'
        boxShadow='sm'
        p={6}
        bg='gray.50'
        borderWidth='1px'
        mb={8}
      >
        <Stack gap={3}>
          <Heading size='sm' color='gray.500' textTransform='uppercase'>
            Adventure Overview
          </Heading>
          <HStack gap={2}>
            <Icon as={LuStar} color='orange.400' fill='orange.400' />
            <Text fontWeight='bold' fontSize='lg'>
              {adventure.rating}
            </Text>
          </HStack>
          <HStack gap={3}>
            <Badge colorScheme='blue'>{adventure.tripType}</Badge>
            <Badge colorScheme='green'>{adventure.level}</Badge>
            <Badge colorScheme='purple'>Verified</Badge>
          </HStack>
        </Stack>
      </Box>

      {/* 2. TITLE & SHARE SECTION */}
      <Flex justify='space-between' align='flex-start' mb={8} gap={4}>
        <Box>
          <Heading size='2xl' mb={2}>
            {adventure.title}
          </Heading>
          <HStack color='gray.600' fontSize='lg'>
            <Icon as={LuClock} />
            <Text>{adventure.days} Days</Text>
          </HStack>
        </Box>
        <Button
          variant='ghost'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='full'
        >
          <Icon as={LuShare2} mr={2} /> Share
        </Button>
      </Flex>

      {/* 3. BOOKING CARD (NEW) */}
      <Box
        p={6}
        borderRadius='2xl'
        borderWidth='1px'
        borderColor='primary.100'
        bg='white'
        boxShadow='xl'
        mb={10}
        position='relative'
        overflow='hidden'
      >
        <Flex justify='space-between' align='center' wrap='wrap' gap={6}>
          <Stack gap={1}>
            <Heading size='md'>{adventure.title}</Heading>
            <HStack align='baseline'>
              <Text fontSize='3xl' fontWeight='bold' color='primary.600'>
                ${hasDiscount ? discountPrice : adventure.price}
              </Text>
              {hasDiscount && (
                <Text
                  textDecoration='line-through'
                  color='gray.400'
                  fontSize='lg'
                >
                  ${adventure.price}
                </Text>
              )}
              <Text color='gray.500'>/ person</Text>
            </HStack>
          </Stack>

          <Flex
            gap={3}
            align='center'
            flex='1'
            justify={{ base: 'flex-start', md: 'flex-end' }}
          >
            <IconButton
              aria-label='Like adventure'
              variant='outline'
              size='lg'
              borderRadius='full'
              _hover={{ bg: 'red.50', color: 'red.500' }}
            >
              <Icon as={LuHeart} />
            </IconButton>
            <Button
              colorScheme='primary'
              size='lg'
              px={10}
              borderRadius='full'
              flex={{ base: '1', md: 'initial' }}
            >
              Book Now
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* 4. DESCRIPTION & DETAILS */}
      <Box mb={12}>
        <Heading size='md' mb={4}>
          About this adventure
        </Heading>
        <Text fontSize='lg' color='gray.700' mb={8}>
          {adventure.description}
        </Text>

        <Separator mb={8} />

        <Flex wrap='wrap' gap={10}>
          <DetailItem
            icon={LuMapPin}
            label='Location'
            value={adventure.location}
          />
          <DetailItem
            icon={LuTrendingUp}
            label='Safety Score'
            value={`${adventure.safetyScore}/10`}
          />
          <DetailItem icon={LuClock} label='Access' value={adventure.access} />
        </Flex>
      </Box>

      {/* 5. ITINERARY */}
      <Box>
        <Heading size='lg' mb={8}>
          Full Itinerary
        </Heading>
        <ScrollProgressSteps items={itineraryItems} />
      </Box>
    </Container>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <Flex align='center' gap={4}>
      <Icon as={icon} boxSize={6} color='primary.500' />
      <Box>
        <Text
          fontSize='sm'
          color='gray.500'
          fontWeight='bold'
          textTransform='uppercase'
        >
          {label}
        </Text>
        <Text fontSize='md' fontWeight='medium'>
          {value}
        </Text>
      </Box>
    </Flex>
  );
}
