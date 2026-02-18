'use client';
import Image from 'next/image';
import { Flex } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Logo = () => {
  return (
    <ChakraLink asChild textDecor='none' _hover={{ textDecor: 'none' }}>
      <NextLink href='/'>
        <Flex as='span' alignItems='center' gap={3}>
          <Image
            src='/images/logo/zago logo png-03.webp'
            alt='ZagoTours Logo'
            width={90}
            height={90}
            quality={80}
            priority
            style={{
              width: 'clamp(35px, 4vw, 45px)',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Flex>
      </NextLink>
    </ChakraLink>
  );
};
