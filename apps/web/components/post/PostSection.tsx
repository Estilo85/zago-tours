'use client';

import { Box, HStack, Stack, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { PostCard } from '../ui/card/PostCard';
import { PostResponseDto } from '@zagotours/types';
import Button from '../ui/button/Button';
import { Users, SwatchBook, Info, Calendar, BadgeCheck } from 'lucide-react';
import { useCommunityStore } from '@/store/use-community-store';

interface PostSectionProps {
  posts: PostResponseDto[];
}

export default function PostSection({ posts }: PostSectionProps) {
  const { activeTab, setActiveTab } = useCommunityStore();

  return (
    <Box display={{ base: 'block', md: 'flex' }} gap='50px'>
      {/* Sidebar: Desktop Only Navigation */}
      <Stack
        bg='white'
        display={{ base: 'none', md: 'block' }}
        w='300px'
        height='fit-content'
        p={5}
        borderWidth='1px'
        borderColor='gray.100'
        borderRadius='xl'
        boxShadow='sm'
        gap={4}
      >
        <Button
          width='100%'
          bg={activeTab === 'about' ? 'primary' : 'gray.50'}
          color={activeTab === 'about' ? 'white' : 'black'}
          onClick={() => setActiveTab('about')}
        >
          <HStack gap={2}>
            <Users size={18} />
            <Text>About Community</Text>
          </HStack>
        </Button>

        <Button
          width='100%'
          bg={activeTab === 'posts' ? 'primary' : 'gray.50'}
          color={activeTab === 'posts' ? 'white' : 'black'}
          onClick={() => setActiveTab('posts')}
        >
          <HStack gap={2}>
            <SwatchBook size={18} />
            <Text>Posts</Text>
          </HStack>
        </Button>
      </Stack>

      {/* Content Area */}
      <Box flex={1}>
        {activeTab === 'posts' ? (
          <Stack gap={4}>
            {posts.length > 0 ? (
              posts.map((post, idx) => (
                <PostCard key={post.id || idx} post={post} />
              ))
            ) : (
              <Box
                p={10}
                textAlign='center'
                bg='gray.50'
                borderRadius='xl'
                border='1px dashed'
                borderColor='gray.200'
              >
                <Text color='gray.500'>
                  No posts found matching your filters!
                </Text>
              </Box>
            )}
          </Stack>
        ) : (
          <Stack
            p={6}
            bg='white'
            borderRadius='xl'
            border='1px solid'
            borderColor='gray.100'
            gap={6}
          >
            <HStack align='flex-start' gap={4}>
              <Icon asChild color='primary.500' boxSize={6} mt={1}>
                <Info />
              </Icon>
              <Stack gap={0}>
                <Text fontWeight='bold'>About The Community</Text>
                <Text fontSize='sm' color='gray.600'>
                  Connecting passionate travelers to share hidden gems and local
                  secrets. Our goal is to make every journey more authentic and
                  community-driven.
                </Text>
              </Stack>
            </HStack>

            <HStack align='flex-start' gap={4}>
              <Icon asChild color='primary.500' boxSize={6} mt={1}>
                <Calendar />
              </Icon>
              <Stack gap={0}>
                <Text fontWeight='bold'>Date Created</Text>
                <Text fontSize='sm' color='gray.600'>
                  Founded in 2024. Part of the global Zagotours network of
                  explorers.
                </Text>
              </Stack>
            </HStack>

            <HStack align='flex-start' gap={4}>
              <Icon asChild color='primary.500' boxSize={6} mt={1}>
                <BadgeCheck />
              </Icon>
              <Stack gap={0}>
                <Text fontWeight='bold'>Verified </Text>
                <Text fontSize='sm' color='gray.600'>
                  This is a moderated community ensuring all travel stories and
                  recommendations meet our quality standards.
                </Text>
              </Stack>
            </HStack>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
