'use client';

import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  HStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <Box
      as='nav'
      bg='white'
      px={8}
      py={4}
      borderBottom='1px solid'
      borderColor='gray.100'
      position='sticky'
      top={0}
      zIndex={10}
    >
      <Flex align='center' maxW='1200px' mx='auto'>
        <ChakraLink as={NextLink} href='/' _hover={{ textDecoration: 'none' }}>
          <Heading size='md' color='blue.600'>
            ZagoTours
          </Heading>
        </ChakraLink>

        <Spacer />

        <HStack gap={8}>
          <ChakraLink
            as={NextLink}
            href='/posts'
            fontWeight={isActive('/posts') ? 'bold' : 'medium'}
            color={isActive('/posts') ? 'blue.500' : 'gray.600'}
          >
            Destinations
          </ChakraLink>

          <ChakraLink
            as={NextLink}
            href='/about'
            fontWeight={isActive('/about') ? 'bold' : 'medium'}
            color={isActive('/about') ? 'blue.500' : 'gray.600'}
          >
            About
          </ChakraLink>

          <ChakraLink as={NextLink} href='/login'>
            <Button variant='ghost'>Login</Button>
          </ChakraLink>

          <ChakraLink as={NextLink} href='/register'>
            <Button colorScheme='blue'>Sign Up</Button>
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
};
