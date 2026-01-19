import { Box } from '@chakra-ui/react';
import React from 'react';
import { PostCard } from '../ui/card/PostCard';
import { PostResponseDto } from '@zagotours/types';

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
export default function PostSection() {
  if (DUMMY_POST.length == 0) {
    <Box>NO post yet!</Box>;
  }

  return (
    <Box>
      {DUMMY_POST.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </Box>
  );
}
