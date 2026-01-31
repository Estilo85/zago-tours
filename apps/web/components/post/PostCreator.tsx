'use client';

import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Image as ImageIcon, Video } from 'lucide-react';
import { AvatarImage } from '../media/AvatarImage';
import Button from '../ui/button/Button';
import { CreatePostModal } from '../ui/modal/CreatePostModal';
import { useCreatePost } from '@/hooks';

export function PostCreator({
  userName,
  userImage,
}: {
  userName: string;
  userImage?: string;
}) {
  const createPost = useCreatePost();

  return (
    <Box
      my={6}
      bg='white'
      borderRadius='lg'
      borderWidth='1px'
      borderColor='gray.100'
      p={4}
      boxShadow='sm'
    >
      <Flex gap={3} align='center'>
        {/* Trigger 1: The Input Box */}
        <CreatePostModal userName={userName}>
          <Box
            flex={1}
            bg='gray.50'
            py={2}
            px={4}
            borderRadius='full'
            cursor='pointer'
            _hover={{ bg: 'gray.100' }}
          >
            <Text color='gray.500' fontSize='sm'>
              Share your experience, {userName.split(' ')[0]}...
            </Text>
          </Box>
        </CreatePostModal>

        <HStack borderTop='1px solid' borderColor='gray.50' align='center'>
          <HStack gap={4}>
            {/* Trigger 2: Photo Icon */}
            <CreatePostModal userName={userName}>
              <Box cursor='pointer'>
                <ActionButton
                  icon={<ImageIcon size={18} color='#3b82f6' />}
                  label='Photo'
                />
              </Box>
            </CreatePostModal>

            {/* Trigger 3: Video Icon */}
            <CreatePostModal userName={userName}>
              <Box cursor='pointer'>
                <ActionButton
                  icon={<Video size={18} color='#10b981' />}
                  label='Video'
                />
              </Box>
            </CreatePostModal>
          </HStack>

          <CreatePostModal userName={userName}>
            <Button size='sm' colorScheme='primary' px={6} borderRadius='full'>
              Post
            </Button>
          </CreatePostModal>
        </HStack>
      </Flex>
    </Box>
  );
}

const ActionButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <HStack
    gap={2}
    p={2}
    borderRadius='md'
    _hover={{ bg: 'gray.50' }}
    transition='0.2s'
  >
    {icon}
    <Text
      fontSize='xs'
      fontWeight='bold'
      color='gray.600'
      display={{ base: 'none', sm: 'block' }}
    >
      {label}
    </Text>
  </HStack>
);
