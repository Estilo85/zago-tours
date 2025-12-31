'use client';
import { Flex, Heading, Icon } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaFacebook } from 'react-icons/fa';

export const Logo = () => {
  return (
    <Flex as='span' alignItems='center' gap={3}>
      <Icon as={FaFacebook} size={{ base: 'md', md: 'xl' }} />
      <ChakraLink asChild textDecor='none'>
        <NextLink href='/'>
          <Heading size={{ base: 'md', md: 'xl' }} color='primary'>
            ZagoTours
          </Heading>
        </NextLink>
      </ChakraLink>
    </Flex>
  );
};
