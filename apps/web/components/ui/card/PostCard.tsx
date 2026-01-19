'use client';

import { useState } from 'react';
import {
  chakra,
  Box,
  Card,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  HStack,
} from '@chakra-ui/react';
import { LuHeart, LuMessageCircle, LuShare2 } from 'react-icons/lu';
import { Post } from '@zagotours/types';
import { AvatarImage } from '@/components/media/AvatarImage';
import { MoreVertical } from 'lucide-react';
import { SocialButton } from '@/components/ui/SocialButton';

interface PostCardProps {
  post: Post;
  userName: string; // From relation
  userImage: string; // From relation
  userCountry?: string;
}

export const PostCard = ({
  post,
  userName,
  userImage,
  userCountry,
}: PostCardProps) => {
  const [showFull, setShowFull] = useState(false);
  const maxLength = 150;

  // Determine if content needs truncation
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
      {/* 1. HEADER: User details & Title */}
      <Box p={4}>
        <Flex justify='space-between' align='start'>
          <Flex align='center' gap={3}>
            <AvatarImage src={userImage} name={userName} />
            <Box>
              <Heading size='sm' fontWeight='bold'>
                {userName}
              </Heading>
              <Text fontSize='xs' color='gray.500'>
                {userCountry ? `${userCountry} • ` : ''}
                {new Date(post.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          </Flex>
          <Button variant='ghost' aria-label='Menu' size='sm' p={2} minW='auto'>
            <MoreVertical />
          </Button>
        </Flex>

        {/* Post Title */}
        <Heading size='md' mt={3} mb={1} color='gray.800'>
          {post.title}
        </Heading>
      </Box>

      {/* 2. MEDIA: Cloudinary Image or Video */}
      {post.mediaUrl && (
        <Box bg='gray.50'>
          {post.mediaType === 'VIDEO' ? (
            <chakra.video
              src={post.mediaUrl}
              controls
              width='100%'
              maxH='450px'
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Image
              src={post.mediaUrl}
              alt={post.title}
              width='100%'
              maxH='500px'
              objectFit='cover'
              loading='lazy'
            />
          )}
        </Box>
      )}

      {/* 3. BODY: Description with Read More */}
      <Box px={4} py={3}>
        <Text fontSize='sm' color='gray.700' whiteSpace='pre-wrap'>
          {displayDescription}
          {isLong && (
            <Button
              size='sm'
              color='primary.600'
              ml={2}
              onClick={() => setShowFull(!showFull)}
              _hover={{ textDecoration: 'none', color: 'primary.700' }}
            >
              {showFull ? 'Show Less' : 'Read More'}
            </Button>
          )}
        </Text>
      </Box>

      {/* 4. FOOTER: Social Actions */}
      <Box px={2} py={2} borderTop='1px solid' borderColor='gray.50'>
        <HStack gap={1} width='100%'>
          <SocialButton icon={LuHeart} label='Like' />
          <SocialButton icon={LuMessageCircle} label='Comment' />
          <SocialButton icon={LuShare2} label='Share' />
        </HStack>
      </Box>
    </Card.Root>
  );
};
