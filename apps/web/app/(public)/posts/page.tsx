import CreatePost from '@/components/post/CreatePost';
import PostHero from '@/components/post/PostHero';
import PostSection from '@/components/post/PostSection';
import { Stack } from '@chakra-ui/react';
import React from 'react';

export default function Post() {
  return (
    <Stack>
      <PostHero />
      <CreatePost />
      <PostSection />
    </Stack>
  );
}
