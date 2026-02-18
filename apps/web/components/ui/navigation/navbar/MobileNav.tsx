'use client';
import {
  Box,
  Flex,
  VStack,
  Portal,
  IconButton,
  CloseButton,
} from '@chakra-ui/react';
import { Menu } from 'lucide-react'; // This is your "Open" icon
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Drawer } from '@chakra-ui/react';
import { Logo } from '../../logo/Logo';
import { AppLink } from '@/components/ui/link/AppLink';
import { navlinks } from './nav.config';
import { NavbarAuthActions } from '@/components/ui/navigation/navbar/NavbarAuthActions';

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
      zIndex={1000}
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
              <Menu color='black' />
            </IconButton>
          </Drawer.Trigger>

          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content
                position='relative'
                css={{
                  transition:
                    'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                }}
              >
                <Drawer.CloseTrigger
                  asChild
                  position='absolute'
                  top='2'
                  right='2'
                  zIndex='skipLink'
                >
                  <CloseButton size='sm' />
                </Drawer.CloseTrigger>

                <Drawer.Body>
                  <VStack align='stretch' gap={6} mt={12}>
                    {navlinks.map((link, index) => (
                      <AppLink
                        key={index}
                        href={link.href}
                        variant='plain'
                        fontWeight={isActive(link.href) ? 'bold' : 'normal'}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </AppLink>
                    ))}

                    <NavbarAuthActions onClose={() => setOpen(false)} />
                  </VStack>
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
};
