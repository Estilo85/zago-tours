'use client';
import { AvatarImage } from '@/components/media/avatar-image';
import { CustomSearchBar } from '@/components/searchbar/custom-search';
import Button from '@/components/ui/button';
import { Flex, HStack, IconButton } from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';

interface NavbarProps {
  onOpen: () => void;
}

export const Navbar = ({ onOpen }: NavbarProps) => {
  return (
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

        <CustomSearchBar />
      </HStack>

      <HStack gap={4}>
        <Button bg='primary'>Request a trip</Button>
        <AvatarImage
          src='/images/home/home-why-choose-sect-3.webp'
          name='profile image'
        />
      </HStack>
    </Flex>
  );
};
