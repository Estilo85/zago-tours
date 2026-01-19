'use client';
import {
  Box,
  Text,
  Stack,
  Heading,
  Flex,
  Icon,
  Separator,
  HStack,
  createListCollection,
  Select,
  Portal,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

import Button from '../ui/button/Button';
import { CustomSearchBar } from '../ui/searchbar/Search';

// 1. Create your data collections
const destinations = createListCollection({
  items: [
    { label: 'Lagos', value: 'lagos' },
    { label: 'Abuja', value: 'abuja' },
    { label: 'Port Harcourt', value: 'ph' },
  ],
});

const dates = createListCollection({
  items: [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Next Month', value: 'next-month' },
  ],
});

export const CommunityHero = () => {
  return (
    <Box
      bg='primary'
      color='textPrimary'
      p={{ base: 5, md: 10 }}
      mb={9}
      position='relative'
    >
      <Stack textAlign='center' gap={5} align='center' py='50px'>
        <Heading size={{ base: '2xl', md: '4xl' }} lineHeight='1.2'>
          The Community for <br /> those who travel boldly
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
          Where people who take adventure seriously come to <br /> learn,
          connect, and travel smarter.
        </Text>

        <Button asChild bg='secondary' color='dark' fontWeight='bold'>
          <NextLink href='/register'>
            Join the community
            <Icon as={ArrowRight} ml={2} />
          </NextLink>
        </Button>
      </Stack>
    </Box>
  );
};
