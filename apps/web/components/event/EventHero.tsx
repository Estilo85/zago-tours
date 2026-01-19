'use client';
import { Box, Text, Stack, Heading, Icon } from '@chakra-ui/react';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';
import Button from '../ui/button/Button';

export const EventHero = () => {
  return (
    <Box
      bg='primary'
      color='textPrimary'
      borderRadius={{ base: 'none', md: '3xl' }}
      p={{ base: 5, md: 10 }}
      mb={{ base: 0, md: '200px' }}
      position='relative'
    >
      <Stack
        textAlign='center'
        gap={5}
        align='center'
        pb={{ base: 0, md: '250px' }}
      >
        <Heading size={{ base: '2xl', md: '4xl' }} lineHeight='1.2'>
          Show Up Excited, Return <br /> Home Your Best Self.
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
          You take adventure seriously. <br /> We take your safety even more
          seriously.
        </Text>

        <Button asChild bg='secondary' color='dark' fontWeight='bold'>
          <NextLink href='/register'>
            Join Us
            <Icon as={ArrowRight} ml={2} />
          </NextLink>
        </Button>
      </Stack>
    </Box>
  );
};
