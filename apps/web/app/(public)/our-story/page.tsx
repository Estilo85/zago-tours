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
          p={{ base: 4, md: 10 }}
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
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            Good to have you here.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            Welcome to the Zago side.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            Before Zago Tours, I ran Zippa Marketing, connecting thousands of
            travel professionals across 70+ countries. I was the person people
            called when things went wrong: a traveler in trouble, an operator
            panicking, a trip that suddenly felt unsafe.
          </Text>
        </Stack>
        <ResponsiveImage
          src='/images/events/esther-picture.webp'
          alt='Esther'
          borderRadius='xl'
          height={{ base: '250px', md: '300px' }}
          maxW='100%'
          objectFit='cover'
          objectPosition='center top'
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
        p={{ base: 4, md: 10 }}
        bg='white'
        shadow='sm'
      >
        <Stack gap={4}>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            I would help fix the situation quietly… but deep down, I knew these
            incidents weren't random.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            Then came the moment that changed me.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            Someone shared a story in our community — an adventure traveler
            whose adventure ended in a tragedy that should never have happened.
            They asked for my thoughts, and I couldn't look away. I needed to
            understand "why."
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            My research uncovered a truth the industry doesn't talk about
            enough: Adventure travel is growing fast, but safety hasn't grown
            with it.
          </Text>
        </Stack>
      </Box>
    ),
  },
  {
    content: (
      <Box
        border='1px solid'
        borderColor='gray.200'
        borderRadius='2xl'
        p={{ base: 4, md: 10 }}
        bg='white'
        shadow='sm'
      >
        <Stack gap={4}>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            Young explorers are stepping into the world with courage and
            curiosity, but too often, without protection or trust.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            That didn't sit right with me. And I could no longer pretend it
            wasn't happening.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            So I started Zago Tours. A place where freedom and safety can
            finally coexist. Where every adventure is verified. Where travelers
            feel excited, not anxious.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight='tall'
            letterSpacing='wide'
          >
            Because the world deserves better adventures. And young travelers
            deserve to come home safely, every single time.
          </Text>
        </Stack>
      </Box>
    ),
  },
];

export default function OurStory() {
  const { isAuthenticated } = useAuthSession();
  return (
    <Box my={10} mx={{ base: '4', md: '10' }}>
      <Stack gap={20}>
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
            The moment everything changed
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
