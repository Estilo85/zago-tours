'use client';

import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react';

export const OurStoryBanner = () => {
  return (
    <Box
      bg='primary'
      color='textPrimary'
      borderRadius={{ base: 'none', md: '3xl' }}
      p={10}
    >
      <Stack textAlign='center' gap={5} align='center'>
        <Center>
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            px={4}
            py={1}
            border='1px solid white'
            borderRadius='full'
            letterSpacing='widest'
          >
            SAFE | SPONTANEOUS | SUSTAINABLE
          </Text>
        </Center>

        <Heading size={{ base: '2xl', md: '4xl' }} lineHeight='1.2'>
          Extreme adrenaline <br /> without the “what-ifs”
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
          Adventure travel is meant to feel exciting, not uncertain <br /> We’re
          building a network where every trip is trusted,
          <br /> transparent, and truly transformative
        </Text>
      </Stack>
    </Box>
  );
};
