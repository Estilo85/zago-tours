'use client';
import {
  Box,
  Flex,
  Drawer,
  Portal,
  CloseButton,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Navbar } from './_components/navbar/navbar';
import { Sidebar } from './_components/sidebar/sidebar';
import { UserRole } from './_config/menu-config';
import { useAuthSession } from '@/hooks';
import DashboardHeader from './_components/header/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuthSession();

  if (!isAuthenticated || !user) return null;

  const userRole = user.role as UserRole;

  return (
    <Flex direction='column' h='100vh' bg='gray.50' overflow='hidden'>
      {/* DESKTOP SIDEBAR */}
      <DashboardHeader />

      <Flex flex='1' overflow='hidden'>
        {/* DESKTOP SIDEBAR */}
        <Box
          w='280px'
          bg='primary'
          color='white'
          borderRight='1px solid'
          borderColor='gray.200'
          display={{ base: 'none', md: 'block' }}
          overflowY='scroll'
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
                <Drawer.CloseTrigger>
                  <CloseButton m={4} />
                </Drawer.CloseTrigger>
                <Drawer.Header borderBottomWidth='1px'>
                  <Heading size='sm' color='white'>
                    Menu
                  </Heading>
                </Drawer.Header>
                {/* Drawer handles scroll */}
                <Drawer.Body>
                  <VStack align='stretch' gap={6} mt={4}>
                    <Sidebar role={userRole} onClose={() => setOpen(false)} />
                  </VStack>
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
            px={{ base: 2, md: 8 }}
            pb='64'
            pt='16'
            w='full'
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
