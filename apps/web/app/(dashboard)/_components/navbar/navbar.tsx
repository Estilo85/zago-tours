'use client';

import { useState } from 'react';
import { AvatarImage } from '@/components/media/AvatarImage';
import Button from '@/components/ui/button/Button';
import { Box, Flex, HStack, IconButton } from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';
import { SearchBar } from '@/components/ui/search/Search';
import { TripRequestDialog } from '../dialogs/trip-request-dialog';
import { TripRequestCallbackDialog } from '../dialogs/trip-request-callback-dialog';

interface NavbarProps {
  onOpen: () => void;
}

export const Navbar = ({ onOpen }: NavbarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCallBackDialogOpen, setIsCallbackDialogOpen] = useState(false);

  return (
    <>
      <Flex
        h='70px'
        align='center'
        justify='space-between'
        px={{ base: 4, md: 8 }}
        bg='white'
        borderBottom='1px solid'
        borderColor='gray.200'
      >
        <HStack gap={4}>
          <IconButton
            aria-label='Open Menu'
            display={{ base: 'flex', md: 'none' }}
            variant='ghost'
            onClick={onOpen}
          >
            <LuMenu />
          </IconButton>
          <Box display={{ base: 'none', md: 'flex' }}>
            <SearchBar />
          </Box>
        </HStack>

        <HStack gap={4}>
          <Button bg='primary' onClick={() => setIsDialogOpen(true)}>
            Request a trip
          </Button>
          <Button bg='primary' onClick={() => setIsCallbackDialogOpen(true)}>
            Request callback
          </Button>
          <AvatarImage
            src='/images/home/home-why-choose-sect-3.webp'
            name='profile image'
          />
        </HStack>
      </Flex>

      <TripRequestDialog
        open={isDialogOpen}
        onOpenChange={(e) => setIsDialogOpen(e.open)}
      />

      <TripRequestCallbackDialog
        open={isCallBackDialogOpen}
        onOpenChange={(e) => setIsCallbackDialogOpen(e.open)}
      />
    </>
  );
};
