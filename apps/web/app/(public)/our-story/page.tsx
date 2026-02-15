'use client';

import { StoryHero } from '@/components/our-story/StoryHero';
import TransformationSection from '@/components/our-story/TransformationSection';
import PurposeSection from '@/components/our-story/PurposeSection';
import { ScrollProgressSteps } from '@/components/ui/stepper/scroll-progress-step';

import { Box, Heading, Text, Stack, Center, Icon } from '@chakra-ui/react';
import React from 'react';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import Button from '@/components/ui/button/Button';
import { AppLink } from '@/components/ui/link/AppLink';
import { ArrowRight } from 'lucide-react';
import { useAuthSession } from '@/hooks';
import Image from 'next/image';

export const mySteps = [
  {
    content: (
      <Box>
        <Stack
          gap={4}
          border='1px solid'
          borderColor='gray.200'
          borderRadius='2xl'
          p={{ base: 6, md: 10 }}
          bg='white'
          shadow='sm'
          mb={10}
        >
          <Heading
            size={{ base: 'xl', md: '2xl' }}
            color='primary'
            textAlign='left'
            letterSpacing='tight'
          >
            Hi, I'm Esther 👋
          </Heading>
          <Text fontSize='lg' lineHeight='1.6' letterSpacing='wide'>
            Good to have you here. <br />
            Welcome to the Zago side. <br />
            Before Zago Tours, I ran Zippa Marketing, connecting thousands of
            travel professionals across 70+ countries. <br />I was the person
            people called when things went wrong: a traveler in trouble, an
            operator panicking, a trip that suddenly felt unsafe.
          </Text>
        </Stack>
        <ResponsiveImage
          src='/images/events/esther-picture.webp'
          alt='Esther'
          borderRadius='xl'
          height='200px'
          maxW='100%'
          objectFit='cover'
          objectPosition='right top'
        />
      </Box>
    ),
  },
  {
    content: (
      <Box
        border='1px solid'
        borderColor='gray.200'
        borderRadius='2xl'
        p={{ base: 6, md: 10 }}
        bg='white'
        shadow='sm'
      >
        <Text fontSize='lg' lineHeight='1.6' letterSpacing='wide'>
          I would help fix the situation quietly… <br />
          but deep down, I knew these incidents weren't random. <br /> Then came
          the moment that changed me. <br /> Someone shared a story in our
          community an adventure traveler whose adventure ended in a tragedy
          that should never have happened. <br /> They asked for my thoughts,
          and I couldn't look away. I needed to understand "why." <br /> My
          research uncovered a truth the industry doesn't talk about enough:
          Adventure travel is growing fast, <br /> but safety hasn't grown with
          it.
        </Text>
      </Box>
    ),
  },
  {
    content: (
      <Box
        border='1px solid'
        borderColor='gray.200'
        borderRadius='2xl'
        p={{ base: 6, md: 10 }}
        bg='white'
        shadow='sm'
      >
        <Text fontSize='lg' lineHeight='1.6' letterSpacing='wide'>
          Young explorers are stepping into the world <br /> with courage and
          curiosity, but too often, <br /> without protection or trust. <br />{' '}
          That didn't sit right with me. And I could no longer pretend it wasn't
          happening. <br /> So I started Zago Tours. A place where freedom and
          safety can finally coexist. Where every adventure is verified. Where
          travelers feel excited, not anxious. <br /> Because the world deserves
          better adventures. And young travelers deserve to come home safely,
          every single time.
        </Text>
      </Box>
    ),
  },
];

export default function OurStory() {
  const { isAuthenticated } = useAuthSession();
  return (
    <Box my={10} mx={{ base: '4', md: '10' }}>
      <Stack gap={20}>
        {' '}
        <StoryHero />
        {/* Story Section */}
        <Stack textAlign='center' gap={8}>
          <Center>
            <Text
              border='1px solid'
              borderColor='primary'
              px={4}
              py={1}
              borderRadius='full'
            >
              Our story
            </Text>
          </Center>
          <Text
            fontSize={{ base: 'xl', md: '3xl' }}
            color='primary'
            fontWeight='bolder'
          >
            The moment everything <br /> changed
          </Text>
          <Box maxW='800px' mx='auto' w='full'>
            <ScrollProgressSteps items={mySteps} />
          </Box>
        </Stack>
        <TransformationSection />
        <PurposeSection />
        {!isAuthenticated && (
          <Box textAlign='center'>
            <AppLink href='/register'>
              <Button
                aria-label='join-us'
                alignItems='center'
                gap={3}
                fontWeight='bold'
                p={5}
                cursor='pointer'
                bg='secondary'
                color='dark'
              >
                Join us <Icon as={ArrowRight} size='sm' />
              </Button>
            </AppLink>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
