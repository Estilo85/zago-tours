'use client';
import { Box, Flex, HStack, IconButton } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../logo';
import { navlinks } from '../nav.config';
import { ActionButtons } from '../action-buttons';

export const DesktopNav = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Box
      as='nav'
      bg='textInverse'
      px={8}
      py={4}
      borderBottom='1px solid'
      borderColor='dark'
      position='sticky'
      top={0}
      zIndex='header'
      display={{ base: 'none', md: 'block' }}
      width='full'
    >
      <Flex justify='space-between' align='center' maxW='1400px' mx='auto'>
        <Logo />

        <HStack gap={10}>
          {navlinks.map((link, index) => (
            <ChakraLink
              key={index}
              asChild
              fontSize='sm'
              textTransform='uppercase'
              fontWeight={isActive(link.href) ? 'medium' : 'sm'}
              color={isActive(link.href) ? 'orange.500' : 'primary'}
              textDecor='none'
            >
              <NextLink href={link.href}>{link.label}</NextLink>
            </ChakraLink>
          ))}
        </HStack>

        <ActionButtons />
      </Flex>
    </Box>
  );
};
