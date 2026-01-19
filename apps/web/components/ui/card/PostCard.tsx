'use client';

import { useState } from 'react';
import {
  chakra,
  Box,
  Card,
  Flex,
  Text,
  Heading,
  Image,
  HStack,
} from '@chakra-ui/react';
import { LuHeart, LuMessageCircle, LuShare2 } from 'react-icons/lu';
import { PostResponseDto } from '@zagotours/types';
import { AvatarImage } from '@/components/media/AvatarImage';
import { MoreVertical } from 'lucide-react';
import Button from '../button/Button';

interface PostCardProps {
  post: PostResponseDto;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [showFull, setShowFull] = useState(false);
  const maxLength = 150;

  const isLong = post.description.length > maxLength;
  const displayDescription =
    showFull || !isLong
      ? post.description
      : `${post.description.substring(0, maxLength)}...`;

  return (
    <Card.Root
      maxW={{ base: '100%', md: '550px' }}
      variant='elevated'
      mx='auto'
      mb={6}
      bg='white'
      overflow='hidden'
      borderWidth='1px'
      borderColor='gray.100'
    >
      <Box p={4}>
        <Flex justify='space-between' align='start'>
          <Flex align='center' gap={3}>
            <AvatarImage src={post.user.image} name={post.user.name} />
            <Box>
              <Heading size='sm' fontWeight='bold' color='gray.800'>
                {post.user.name}
              </Heading>
              <Text fontSize='xs' color='gray.500'>
                {post.user.country} •{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          </Flex>
          <Button variant='ghost' size='sm' p={2} minW='auto'>
            <MoreVertical size={20} />
          </Button>
        </Flex>

        <Heading size='md' mt={4} mb={1} color='gray.800'>
          {post.title}
        </Heading>
      </Box>

      {/* 2. MEDIA: Image or Video */}
      {post.mediaUrl && (
        <Box bg='black'>
          {post.mediaType === 'VIDEO' ? (
            <chakra.video
              src={post.mediaUrl}
              controls
              width='100%'
              maxH='450px'
            />
          ) : (
            <Image
              src={post.mediaUrl}
              alt={post.title}
              width='100%'
              maxH='500px'
              objectFit='cover'
            />
          )}
        </Box>
      )}

      {/* 3. BODY: Description */}
      <Box px={4} py={3}>
        <Text fontSize='sm' color='gray.700' whiteSpace='pre-wrap'>
          {displayDescription}
          {isLong && (
            <chakra.span
              cursor='pointer'
              color='blue.600'
              fontWeight='bold'
              ml={2}
              onClick={() => setShowFull(!showFull)}
            >
              {showFull ? 'Show Less' : 'Read More'}
            </chakra.span>
          )}
        </Text>
      </Box>

      <Box px={2} py={2} borderTop='1px solid' borderColor='gray.50'>
        <HStack gap={1} width='100%'>
          <Button
            variant='ghost'
            size='sm'
            flex={1}
            gap={2}
            color={post.isLikedByUser ? 'red.500' : 'gray.600'}
          >
            <LuHeart
              fill={post.isLikedByUser ? 'currentColor' : 'none'}
              size={18}
            />
            <Text fontSize='sm'>{post.stats.totalLikes}</Text>
          </Button>

          <Button variant='ghost' size='sm' flex={1} gap={2} color='gray.600'>
            <LuMessageCircle size={18} />
            <Text fontSize='sm'>{post.stats.totalComments}</Text>
          </Button>

          <Button
            variant='ghost'
            size='sm'
            flex={1}
            gap={2}
            color={post.isSharedByUser ? 'blue.500' : 'gray.600'}
          >
            <LuShare2 size={18} />
            <Text fontSize='sm'>{post.stats.totalShares}</Text>
          </Button>
        </HStack>
      </Box>
    </Card.Root>
  );
};
