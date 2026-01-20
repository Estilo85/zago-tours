'use client';

import {
  Box,
  Flex,
  Text,
  VStack,
  Avatar,
  HStack,
  chakra,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AvatarImage } from '../media/AvatarImage';

// Individual Comment Item
const CommentItem = ({
  name,
  content,
  time,
  image,
}: {
  name: string;
  content: string;
  time: string;
  image?: string;
}) => (
  <Flex gap={3} w='full'>
    <AvatarImage size='xs' name={name} src={image || ''} />
    <VStack align='flex-start' spaceX={0.5} flex={1}>
      <Box bg='gray.100' p={3} borderRadius='2xl' borderTopLeftRadius='none'>
        <Text fontSize='xs' fontWeight='bold' color='gray.800'>
          {name}
        </Text>
        <Text fontSize='sm' color='gray.700'>
          {content}
        </Text>
      </Box>
      <HStack
        fontSize='xs'
        fontWeight='bold'
        color='gray.500'
        spaceX={4}
        pl={2}
      >
        <Text cursor='pointer' _hover={{ color: 'primary.600' }}>
          Like
        </Text>
        <Text cursor='pointer' _hover={{ color: 'primary.600' }}>
          Reply
        </Text>
        <Text fontWeight='normal'>{time}</Text>
      </HStack>
    </VStack>
  </Flex>
);

// Main Comment Section
export const CommentSection = ({ postId }: { postId: string }) => {
  return (
    <VStack spaceY={4} align='flex-start' mt={2}>
      {/* 1. Comment Input */}
      <Flex gap={3} w='full' align='center'>
        <AvatarImage src='' size='xs' name='Current User' />
        <Box flex={1} position='relative'>
          <chakra.input
            placeholder='Write a public comment...'
            w='full'
            bg='gray.50'
            px={4}
            py={2}
            borderRadius='full'
            fontSize='sm'
            borderWidth='1px'
            borderColor='gray.200'
            _focus={{
              outline: 'none',
              borderColor: 'primary.500',
              bg: 'white',
            }}
          />
        </Box>
      </Flex>

      {/* 2. Existing Comments List */}
      <VStack spaceY={4} w='full' align='flex-start' pt={2}>
        <CommentItem
          name='Sarah Jenkins'
          content='This looks like an incredible trip! Which guide did you use?'
          time='2h'
          image='/images/home/home-hero-advisor-2.webp'
        />
        <CommentItem
          name='Mark Thompson'
          content='The lighting in that second photo is peak 🏔️'
          time='45m'
          image='/images/home/home-hero-advisor-2.webp'
        />
      </VStack>

      <Text
        fontSize='xs'
        color='primary.600'
        fontWeight='bold'
        cursor='pointer'
        pl={12}
      >
        View 5 more comments
      </Text>
    </VStack>
  );
};
