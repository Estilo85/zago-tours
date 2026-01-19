'use client';
import { Box, Flex, HStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { Logo } from '../Logo';
import { navlinks } from '../nav.config';
import { ActionButtons } from '../ActionButtons';
import { AppLink } from '@/components/ui/AppLink';

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
      zIndex='sticky'
      display={{ base: 'none', md: 'block' }}
      width='full'
    >
      <Flex justify='space-between' align='center' maxW='1400px' mx='auto'>
        <Logo />

        <HStack gap={10}>
          {navlinks.map((link, index) => (
            <AppLink
              key={index}
              href={link.href}
              fontSize='sm'
              textTransform='uppercase'
              fontWeight={isActive(link.href) ? 'medium' : 'sm'}
              color={isActive(link.href) ? 'orange.500' : 'primary'}
              textDecor='none'
            >
              {link.label}
            </AppLink>
          ))}
        </HStack>

        <ActionButtons />
      </Flex>
    </Box>
  );
};
