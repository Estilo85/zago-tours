'use client';
import { PostCreator } from '@/components/post/PostCreator';
import { PostFilterBar } from '@/components/post/PostFilterBar';
import PostHero from '@/components/post/PostHero';
import PostSection, { DUMMY_POST } from '@/components/post/PostSection';
import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function Post() {
  const [displayPosts, setDisplayPosts] = useState(DUMMY_POST);

  return (
    <Box>
      <PostHero />
      <Flex direction='column' align='center' width='100%'>
        <Box width='100%' maxW='900px' px={4}>
          <PostFilterBar
            posts={DUMMY_POST}
            userName='ola'
            onFilterResults={(filtered) => setDisplayPosts(filtered)}
          />

          <PostCreator userName='ola' />

          {/* Pass the filtered posts down to the section */}
          <PostSection posts={displayPosts} />
        </Box>
      </Flex>
    </Box>
  );
}
