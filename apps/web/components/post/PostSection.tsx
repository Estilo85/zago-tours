'use client';

import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { PostCard } from '../ui/card/PostCard';
import { PostResponseDto } from '@zagotours/types';
import Button from '../ui/button/Button';
import { Users } from 'lucide-react';

interface PostSectionProps {
  posts: PostResponseDto[];
}

export default function PostSection({ posts }: PostSectionProps) {
  // Handle empty state
  if (!posts || posts.length === 0) {
    return (
      <Box
        p={10}
        textAlign='center'
        bg='gray.50'
        borderRadius='xl'
        border='1px dashed'
        borderColor='gray.200'
      >
        <Text color='gray.500'>No posts found matching your filters!</Text>
      </Box>
    );
  }

  return (
    <Box display={{ base: 'block', md: 'flex' }} gap='50px'>
      {/* Sidebar: About the community */}
      <Stack
        bg='white'
        maxW={{ base: '100%', md: '500px' }}
        height='fit-content'
        p={5}
        overflow='hidden'
        borderWidth='1px'
        borderColor='gray.100'
        borderRadius='xl'
        boxShadow='0 2px 12px rgba(0, 0, 0, 0.05)'
        transition='transform 0.2s ease'
        _hover={{ transform: { md: 'translateY(-2px)' } }}
        spaceY={5}
        textAlign='center'
      >
        <Flex align='center' gap={5}>
          <Users />
          <Text> About the community</Text>
        </Flex>
        <Button bg='primary' color='white' width='100%'>
          Post
        </Button>
      </Stack>

      <Stack flex={1}>
        {posts.map((post, idx) => (
          <PostCard key={post.id || idx} post={post} />
        ))}
      </Stack>
    </Box>
  );
}
