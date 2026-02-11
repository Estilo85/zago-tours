'use client';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { Flex, Heading, Box } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Logo = () => {
  return (
    <ChakraLink asChild textDecor='none' _hover={{ textDecor: 'none' }}>
      <NextLink href='/'>
        <Flex as='span' alignItems='center' gap={3}>
          <ResponsiveImage
            src='/images/logo/zago logo png-03.webp'
            alt='ZagoTours Logo'
            width={{ base: '35px', md: '45px' }}
            height={{ base: '35px', md: '45px' }}
            objectFit='contain'
            borderRadius='none'
            priority
          />

          <Heading
            size={{ base: 'md', md: 'lg' }}
            fontWeight='bold'
            color='primary'
            letterSpacing='tight'
          >
            ZagoTours
          </Heading>
        </Flex>
      </NextLink>
    </ChakraLink>
  );
};
