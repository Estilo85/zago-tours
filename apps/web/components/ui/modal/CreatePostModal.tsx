'use client';

import {
  Dialog,
  Portal,
  Button,
  Textarea,
  CloseButton,
  HStack,
  IconButton,
  Box,
  Text,
  Image,
} from '@chakra-ui/react';
import { Image as ImageIcon, Video, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface CreatePostModalProps {
  children: React.ReactNode;
  userName: string;
}

export function CreatePostModal({ children, userName }: CreatePostModalProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click(); // Open the file picker
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog.Root lazyMount size='lg'>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius='xl'>
            <Dialog.Header textAlign='center' borderBottomWidth='1px'>
              Create Post
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton pos='absolute' top='2' right='2' />
            </Dialog.CloseTrigger>

            <Dialog.Body py={4}>
              <Textarea
                placeholder={`What's on your mind, ${userName.split(' ')[0]}?`}
                minH='100px'
                variant='flushed'
                fontSize='lg'
                autoFocus
              />

              {/* Hidden File Input */}
              <input
                type='file'
                accept='image/*,video/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* Preview Area */}
              {selectedFile && (
                <Box
                  position='relative'
                  mt={2}
                  borderRadius='md'
                  overflow='hidden'
                >
                  <IconButton
                    size='xs'
                    colorScheme='blackAlpha'
                    position='absolute'
                    top={2}
                    right={2}
                    onClick={() => setSelectedFile(null)}
                    aria-label='Remove media'
                  >
                    <X size={14} />
                  </IconButton>
                  <Image
                    src={selectedFile}
                    alt='Preview'
                    maxH='300px'
                    w='full'
                    objectFit='cover'
                  />
                </Box>
              )}

              <Box
                mt={4}
                p={3}
                border='1px solid'
                borderColor='gray.100'
                borderRadius='lg'
              >
                <HStack justify='space-between'>
                  <Text fontSize='sm' fontWeight='semibold' color='gray.600'>
                    Add to your post
                  </Text>
                  <HStack gap={1}>
                    <IconButton
                      variant='ghost'
                      aria-label='Add Image'
                      size='sm'
                      onClick={handleIconClick}
                    >
                      <ImageIcon size={20} color='#3b82f6' />
                    </IconButton>
                    <IconButton
                      variant='ghost'
                      aria-label='Add Video'
                      size='sm'
                      onClick={handleIconClick}
                    >
                      <Video size={20} color='#10b981' />
                    </IconButton>
                  </HStack>
                </HStack>
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                colorScheme='blue'
                w='full'
                size='md'
                disabled={!selectedFile}
              >
                Post
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
