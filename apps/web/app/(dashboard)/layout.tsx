'use client';
import { Box, Flex, Drawer, Portal, CloseButton } from '@chakra-ui/react';
import { useState } from 'react';
import { Sidebar } from './_components/sidebar';
import { Navbar } from './_components/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const userRole = 'super-admin';

  return (
    <Flex h='100vh' bg='gray.50' overflow='hidden'>
      {/* DESKTOP SIDEBAR */}
      <Box
        w='280px'
        h='full'
        bg='primary'
        color='white'
        borderRight='1px solid'
        borderColor='gray.200'
        display={{ base: 'none', md: 'block' }}
        p={6}
      >
        <Sidebar role={userRole} />
      </Box>

      {/* MOBILE DRAWER (Chakra v3 Pattern) */}
      <Drawer.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement='start'
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content p={6} bg='white'>
              <Drawer.CloseTrigger
                asChild
                position='absolute'
                top={2}
                right={2}
              >
                <CloseButton size='sm' />
              </Drawer.CloseTrigger>
              <Drawer.Body>
                <Sidebar role={userRole} onClose={() => setOpen(false)} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      {/* MAIN CONTENT */}
      <Flex direction='column' flex='1' overflow='hidden'>
        <Navbar onOpen={() => setOpen(true)} />

        <Box p={{ base: 4, md: 8 }} overflowY='auto' flex='1'>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
