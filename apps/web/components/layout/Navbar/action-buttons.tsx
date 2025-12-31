'use client';
import { HStack, Icon, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';

export const ActionButtons = () => {
  return (
    <HStack gap={4}>
      <IconButton
        asChild
        aria-label='login'
        variant='outline'
        borderRadius='20px'
        fontWeight='bold'
        p={5}
        cursor='pointer'
        bg='textInverse'
        textDecor='none'
        color='dark'
      >
        <NextLink href='/login'>Login</NextLink>
      </IconButton>

      <IconButton
        asChild
        aria-label='join-us'
        alignItems='center'
        gap={3}
        fontWeight='bold'
        borderRadius='20px'
        p={5}
        cursor='pointer'
        bg='secondary'
        border='none'
        textDecor='none'
        color='dark'
      >
        <NextLink href='/login'>
          Join us <Icon as={ArrowRight} size={{ base: 'xs', md: 'sm' }} />
        </NextLink>
      </IconButton>
    </HStack>
  );
};
