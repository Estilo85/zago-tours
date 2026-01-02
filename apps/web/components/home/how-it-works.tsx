'use client';
import {
  Box,
  Center,
  Text,
  Stack,
  Heading,
  AvatarGroup,
  Avatar,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import { AvatarImage } from '../media/avatar-image';
import { BookAIcon, FileExclamationPointIcon, Rocket } from 'lucide-react';
import { HowItWorkCard } from '../ui/how-it-work-card';
import { ResponsiveImage } from '../media/ResponsiveImage';

const advisors = [
  { src: '/images/home/home-hero-advisor-1.webp', name: 'Belly' },
  { src: '/images/home/home-hero-advisor-2.webp', name: 'Brand' },
  { src: '/images/home/home-hero-advisor-3.webp', name: 'Brook' },
];

const cardInfo = [
  {
    heading: 'Select Your Adventure',
    icon: BookAIcon,
    description:
      'Every trip on Zago is approved through our Quality and Safety Standard.',
  },
  {
    heading: 'Know What to Expect',
    icon: FileExclamationPointIcon,
    description: 'From the guides to the routes to the conditions on ground.',
  },
  {
    heading: 'Go',
    icon: Rocket,
    description:
      'You bring the courage. We bring protection. It is that simple.',
  },
];

export const HowItWorks = () => {
  return (
    <Box
      bg='surface'
      borderRadius={{ base: 'none', md: '4xl' }}
      p={{ base: 3, md: 10 }}
      mb={{ base: 0, md: '200px' }}
    >
      <Stack
        position='relative'
        textAlign='center'
        gap={10}
        align='center'
        maxW='container.xl'
        mx='auto'
        px={4}
        pb={{ base: 10, md: '150px' }}
      >
        <Center>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            px={4}
            py={1}
            border='1px solid white'
            borderRadius='full'
            letterSpacing='widest'
          >
            Just breaks, no plans
          </Text>
        </Center>

        <Heading
          size={{ base: '2xl', md: '4xl' }}
          lineHeight='1.2'
          color='primary'
          fontWeight='bolder'
        >
          How It Works
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
          Wherever you are in the world, <br /> pick your adventure, it’s that
          SIMPLE
        </Text>

        {/*  Flex container for Images and Cards */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={10}
          align='center'
          justify='center'
          width='full'
        >
          {/* columns and 2 rows on desktop */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {[1, 2, 3, 4].map((i) => (
              <ResponsiveImage
                key={i}
                src='/images/home/home-how-it-work-hero-1.webp'
                alt='how it work image'
                height='250px'
                width='250px'
              />
            ))}
          </SimpleGrid>

          {/* Card Container: Always a Stack */}
          <Stack gap={6} flex='1' textAlign='left' maxW={{ lg: '500px' }}>
            {cardInfo.map((card, idx) => (
              <HowItWorkCard
                key={idx}
                icon={card.icon}
                heading={card.heading}
                description={card.description}
              />
            ))}
          </Stack>
        </Flex>

        {/*  Absolute Box: Half in, Half out */}
        <Box
          width={{ base: '90%', md: '70%', lg: '60%' }}
          position={{ base: 'relative', md: 'absolute' }}
          bottom={{ base: '0', md: '-160px' }}
          left='50%'
          transform='translateX(-50%)'
          zIndex={10}
          mt={{ base: 10, md: 0 }}
          bg='primary'
          p={8}
          borderRadius='xl'
          boxShadow='xl'
          color='white'
        >
          <Stack align='center' gap={6}>
            <AvatarGroup spaceX='-3'>
              {advisors.map((adv, idx) => (
                <Box
                  as='span'
                  key={idx}
                  borderWidth='2px'
                  borderColor='primary'
                  borderRadius='full'
                >
                  <AvatarImage src={adv.src} name={adv.name} />
                </Box>
              ))}
              <Avatar.Root bg='white' color='primary'>
                <Avatar.Fallback fontSize='xs'>+</Avatar.Fallback>
              </Avatar.Root>
            </AvatarGroup>
            <Text fontSize={{ base: 'md', md: '2xl' }}>
              Our team and partners aren’t new to this, we’ve spent decades
              leading travelers up mountains, across oceans, and into the kind
              of stories you never forget. Together, that’s over 100 years of
              experience fueling your nextadventure.
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
