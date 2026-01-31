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
  Input,
} from '@chakra-ui/react';
import { Image as ImageIcon, Video, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface PostFormModalProps {
  children: React.ReactNode;
  userName: string;
  mode: 'create' | 'edit';
  initialData?: {
    title?: string;
    description?: string;
    mediaUrl?: string;
  };
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function PostFormModal({
  children,
  userName,
  mode,
  initialData,
  onSubmit,
  isLoading,
}: PostFormModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.mediaUrl || null,
  );
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(
    initialData?.description || '',
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens with new initial data
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPreviewUrl(initialData.mediaUrl || null);
    }
  }, [initialData]);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!description.trim()) return;

    const formData = new FormData();
    formData.append('title', title || 'Untitled');
    formData.append('description', description);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    onSubmit(formData);

    // Reset form only for create mode
    if (mode === 'create') {
      setTitle('');
      setDescription('');
      setSelectedFile(null);
      setPreviewUrl(null);
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
              {mode === 'create' ? 'Create Post' : 'Edit Post'}
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton pos='absolute' top='2' right='2' />
            </Dialog.CloseTrigger>

            <Dialog.Body py={4}>
              <Input
                placeholder='Title (optional)'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                mb={3}
              />

              <Textarea
                placeholder={`What's on your mind, ${userName.split(' ')[0]}?`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minH='100px'
                variant='flushed'
                fontSize='lg'
                autoFocus
              />

              <input
                type='file'
                accept='image/*,video/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {previewUrl && (
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
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    aria-label='Remove media'
                  >
                    <X size={14} />
                  </IconButton>
                  <Image
                    src={previewUrl}
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
                onClick={handleSubmit}
                loading={isLoading}
                disabled={!description.trim()}
              >
                {mode === 'create' ? 'Post' : 'Update'}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
