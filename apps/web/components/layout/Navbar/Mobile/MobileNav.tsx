'use client';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Portal,
  IconButton,
  CloseButton,
} from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Drawer } from '@chakra-ui/react';
import { Logo } from '../../../ui/logo/Logo';
import { AppLink } from '@/components/ui/link/AppLink';
import { navlinks } from '../nav.config';
import { AuthActions } from '../AuthActions';

export const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (path: string) => pathname === path;

  return (
    <Box
      as='nav'
      bg='textInverse'
      p={4}
      borderBottom='1px solid'
      borderColor='dark'
      position='sticky'
      top={0}
      zIndex='sticky'
      display={{ base: 'block', md: 'none' }}
    >
      <Flex justify='space-between' align='center'>
        <Logo />

        <Drawer.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          placement='end'
          size='xs'
        >
          <Drawer.Trigger asChild>
            <IconButton aria-label='Open menu' variant='ghost'>
              <Menu />
            </IconButton>
          </Drawer.Trigger>

          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.CloseTrigger />
                <Drawer.Header borderBottomWidth='1px'>
                  <Heading size='sm' color='primary'>
                    Menu
                  </Heading>
                </Drawer.Header>

                <Drawer.Body>
                  <VStack align='stretch' gap={6} mt={4}>
                    {navlinks.map((link, index) => (
                      <AppLink
                        key={index}
                        href={link.href}
                        variant='plain'
                        fontWeight={isActive(link.href) ? 'bold' : 'normal'}
                        color={isActive(link.href) ? 'orange.500' : 'primary'}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </AppLink>
                    ))}

                    <AuthActions />
                  </VStack>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size='sm' />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
};
