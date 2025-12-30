'use client';

import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  HStack,
  Link as ChakraLink,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

const navlinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '#' },
  { label: 'Adventure', href: '#' },
  { label: 'Event', href: '#' },
  { label: 'Community', href: '#' },
];

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
      <Flex justify='space-between' align='center' mx='auto'>
        <Flex as='span' alignItems='center' gap={5}>
          <Icon as={FaFacebook} boxSize={24} />
          <ChakraLink as={NextLink} href='/' textDecor='none'>
            <Heading size='md' color='primary'>
              ZagoTours
            </Heading>
          </ChakraLink>
        </Flex>

        <HStack gap={20}>
          {navlinks.map((link, index) => (
            <ChakraLink
              key={index}
              as={NextLink}
              href={link.href}
              textDecor='none'
              textTransform='uppercase'
              fontSize='sm'
              fontWeight={isActive(link.href) ? 'bold' : 'normal'}
              color={isActive(link.href) ? 'orange' : 'primary'}
            >
              {link.label}
            </ChakraLink>
          ))}
        </HStack>

        <HStack>
          <ChakraLink as={NextLink} href='#'>
            <IconButton
              aria-label='login'
              variant='ghost'
              borderRadius='20px'
              fontWeight='bold'
              py={7}
              px={20}
              cursor='pointer'
              bg='white'
            >
              Login
            </IconButton>
          </ChakraLink>

          <ChakraLink as={NextLink} href='#'>
            <IconButton
              aria-label='join-us'
              alignItems='baseline'
              gap={5}
              fontWeight='bold'
              borderRadius='20px'
              py={10}
              px={20}
              cursor='pointer'
              bg='secondary'
              border='none'
            >
              Join us <ArrowRight size={12} />{' '}
            </IconButton>
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
};
