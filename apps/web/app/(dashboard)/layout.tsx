'use client';
import { Box, Flex, Drawer, Portal, CloseButton } from '@chakra-ui/react';
import { useState } from 'react';
import { Navbar } from './_components/navbar/navbar';
import { Sidebar } from './_components/sidebar/sidebar';
import { UserRole } from './_config/menu-config';
import { useAuthSession } from '@/hooks/queries/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuthSession();

  if (isLoading) {
    return (
      <Flex h='100vh' align='center' justify='center'>
        Loading Session...
      </Flex>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const userRole = user.role as UserRole;

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

      {/* MOBILE DRAWER */}
      <Drawer.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement='start'
        size='xs'
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content p={6} bg='primary'>
              <Drawer.CloseTrigger asChild>
                <CloseButton size='md' />
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
