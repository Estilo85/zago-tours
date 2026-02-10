'use client';
import { Box, Text, Stack, Heading, Icon, Flex } from '@chakra-ui/react';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';
import Button from '../ui/button/Button';
import { AppLink } from '../ui/link/AppLink';

export const EventHero = () => {
  return (
    <Box bg='primary' color='textPrimary' p={{ base: 5, md: 10 }}>
      <Stack textAlign='center' gap={5} align='center'>
        <Heading size={{ base: '2xl', md: '4xl' }} lineHeight='1.2'>
          Adventure Starts <br /> With Knowledge
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
          Join live sessions designed to make every future trip <br />
          smarter, safer, and more connected.
        </Text>

        <Flex direction={{ base: 'column', md: 'row' }} align='center' gap={3}>
          <AppLink href='#'>
            <Button bg='secondary' color='dark' fontWeight='bold'>
              Join an event
              <Icon as={ArrowRight} ml={2} />
            </Button>
          </AppLink>

          <AppLink href='https://forms.gle/bpFRxCweT8ygcCW8A'>
            <Button
              bg='primary'
              color='white'
              fontWeight='bold'
              border='2px solid white'
            >
              Host an event
              <Icon as={ArrowRight} ml={2} />
            </Button>
          </AppLink>
        </Flex>
      </Stack>
    </Box>
  );
};
