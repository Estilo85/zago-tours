'use client';
import { Box, Text, Stack, Heading, Icon, Flex } from '@chakra-ui/react';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';
import Button from '../ui/button/Button';

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
          <Button asChild bg='secondary' color='dark' fontWeight='bold'>
            <NextLink href='#'>
              Join an event
              <Icon as={ArrowRight} ml={2} />
            </NextLink>
          </Button>
          <Button
            asChild
            bg='primary'
            color='white'
            fontWeight='bold'
            border='2px solid white'
          >
            <NextLink href='#'>
              Host an event
              <Icon as={ArrowRight} ml={2} />
            </NextLink>
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};
