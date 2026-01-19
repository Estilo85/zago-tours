'use client';

import { Box, Center, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ResponsiveImage } from '../media/ResponsiveImage';
import Button from '../ui/button/Button';
import { ArrowRight } from 'lucide-react';

export const HomeHero = () => {
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

        <Box
          width={{ base: '100%', md: '70%', lg: '60%' }}
          position={{ base: 'relative', md: 'absolute' }}
          bottom={{ base: '0', md: '-200px' }}
          left='50%'
          transform='translateX(-50%)'
          zIndex={10}
          mt={{ base: 6, md: 0 }}
        >
          <ResponsiveImage
            src='/images/home/banner.webp'
            alt='home page banner image'
            width='100%'
            height={{ base: '250px', md: '400px' }}
            borderRadius='2xl'
            boxShadow='2xl'
          />
        </Box>
      </Stack>
    </Box>
  );
};
