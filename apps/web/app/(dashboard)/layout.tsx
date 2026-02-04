'use client';
import { Box, Flex, Drawer, Portal, CloseButton } from '@chakra-ui/react';
import { useState } from 'react';
import { Navbar } from './_components/navbar/navbar';
import { Sidebar } from './_components/sidebar/sidebar';
import { UserRole } from './_config/menu-config';
import { useAuthSession } from '@/hooks';
import { LoadingState } from '@/components/ui/LoadingState';
import { WelcomeBanner } from './_components/banner/WelcomeBanner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuthSession();

  if (isLoading) {
    return (
      <LoadingState
        message='Verifying your session...'
        minHeight='100vh'
        containerProps={{
          maxW: 'full',
          py: 0,
          px: 0,
        }}
      />
    );
  }

  if (!isAuthenticated || !user) return null;

  const userRole = user.role as UserRole;

  return (
    <Flex h='100vh' bg='gray.50' overflow='hidden'>
      {/* DESKTOP SIDEBAR */}
      <Box
        w='280px'
        bg='primary'
        color='white'
        borderRight='1px solid'
        borderColor='gray.200'
        display={{ base: 'none', md: 'block' }}
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
            <Drawer.Content bg='primary'>
              <Drawer.CloseTrigger asChild>
                <CloseButton m={4} />
              </Drawer.CloseTrigger>

              {/* Drawer handles scroll */}
              <Drawer.Body p={0}>
                <Sidebar role={userRole} onClose={() => setOpen(false)} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      {/* MAIN CONTENT */}
      <Flex direction='column' flex='1' overflow='hidden'>
        <Navbar onOpen={() => setOpen(true)} />

        {/* SINGLE SCROLL AREA */}
        <Box
          flex='1'
          overflowY='auto'
          minH={{ base: '70vh', md: '75vh' }}
          h='full'
          p={{ base: 4, md: 8 }}
        >
          <WelcomeBanner />
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
