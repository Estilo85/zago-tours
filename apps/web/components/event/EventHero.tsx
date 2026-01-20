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
          Adventure Starts <br /> With Knowledge
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
          Join live sessions designed to make every future trip <br />
          smarter, safer, and more connected.
        </Text>

        <Button asChild bg='secondary' color='dark' fontWeight='bold'>
          <NextLink href='/register'>
            Join event
            <Icon as={ArrowRight} ml={2} />
          </NextLink>
        </Button>
      </Stack>
    </Box>
  );
};
