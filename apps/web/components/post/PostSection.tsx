'use client';

import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { PostCard } from '../ui/card/PostCard';
import { PostResponseDto } from '@zagotours/types';
import Button from '../ui/button/Button';
import { Users } from 'lucide-react';

export const DUMMY_POST: PostResponseDto[] = [
  {
    id: 'post_001',
    userId: 'user_99',
    title: 'My Journey through the Atlas Mountains',
    description:
      'This trek was physically demanding but rewarding beyond words. If you are planning a trip to Morocco, do not miss the chance to visit the local Berber villages. The hospitality is unmatched! Here is a glimpse of the sunset from the base camp.',
    mediaUrl: '/images/community/community-getting-started-1.webp',
    publicId: 'mountains_001',
    mediaType: 'IMAGE' as any,
    createdAt: new Date(),
    user: {
      id: 'user_99',
      name: 'Julian Casablancas',
      country: 'Morocco',
      image: '/images/community/community-getting-started-1.webp',
    },
    stats: {
      totalComments: 12,
      totalLikes: 45,
      totalShares: 3,
    },
    isLikedByUser: true,
    isSharedByUser: false,
  },
  {
    id: 'post_001',
    userId: 'user_99',
    title: 'My Journey through the Atlas Mountains',
    description:
      'This trek was physically demanding but rewarding beyond words. If you are planning a trip to Morocco, do not miss the chance to visit the local Berber villages. The hospitality is unmatched! Here is a glimpse of the sunset from the base camp.',
    mediaUrl: '/images/community/community-getting-started-1.webp',
    publicId: 'mountains_001',
    mediaType: 'IMAGE' as any,
    createdAt: new Date(),
    user: {
      id: 'user_99',
      name: 'Julian Casablancas',
      country: 'Morocco',
      image: '/images/community/community-getting-started-1.webp',
    },
    stats: {
      totalComments: 12,
      totalLikes: 45,
      totalShares: 3,
    },
    isLikedByUser: true,
    isSharedByUser: false,
  },
];
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
