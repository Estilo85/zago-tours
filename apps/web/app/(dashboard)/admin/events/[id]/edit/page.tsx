'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Heading,
  VStack,
  Input,
  Button,
  Spinner,
  Textarea,
  SimpleGrid,
  Field,
  Box,
  Image,
  IconButton,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import { useEvent, useUpdateEvent } from '@/hooks';
import { LoadingState } from '@/components/ui/LoadingState';

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: response, isLoading } = useEvent(id);

  const { mutate: updateEvent, isPending } = useUpdateEvent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (response?.data) {
      const formatDateTimeLocal = (
        dateValue: string | Date | null | undefined,
      ) => {
        if (!dateValue) return '';
        try {
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) return '';
          return date.toISOString().slice(0, 16);
        } catch {
          return '';
        }
      };
      const event = response.data;
      setFormData({
        title: event.title,
        description: event.description,
        location: event.location,
        spotLeft: event.spotLeft,
        isSignature: event.isSignature,
        cancellationTerms: event.cancellationTerms || '',
        date: formatDateTimeLocal(event.date),
        joinTill: formatDateTimeLocal(event.joinTill),
      });

      if (event.mediaUrl) {
        setPreviewUrl(event.mediaUrl);
      }
    }
  }, [response]);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading || !formData) {
    return <LoadingState />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('location', formData.location);
    submitData.append('date', new Date(formData.date).toISOString());
    submitData.append('joinTill', new Date(formData.joinTill).toISOString());
    submitData.append('spotLeft', formData.spotLeft.toString());
    submitData.append('isSignature', formData.isSignature.toString());
    if (formData.cancellationTerms) {
      submitData.append('cancellationTerms', formData.cancellationTerms);
    }
    // Only append file if a new one was selected
    if (selectedFile) {
      submitData.append('file', selectedFile);
    }

    updateEvent(
      { id, data: submitData },
      {
        onSuccess: () => {
          if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
          }
          router.push('/admin/events');
        },
      },
    );
  };

  return (
    <Container maxW='container.md' py={8}>
      <Heading mb={6}>Edit Event: {response?.data?.title}</Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap={6} align='stretch'>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <Box
            border='2px dashed'
            borderColor='border.muted'
            p={6}
            textAlign='center'
            rounded='lg'
            cursor='pointer'
            onClick={handleImageUpload}
            _hover={{ borderColor: 'cyan.500' }}
          >
            {previewUrl ? (
              <Box position='relative'>
                <Image
                  src={previewUrl}
                  alt='Preview'
                  maxH='200px'
                  mx='auto'
                  rounded='md'
                />
                <IconButton
                  size='xs'
                  position='absolute'
                  top={2}
                  right={2}
                  colorPalette='red'
                  onClick={handleRemoveImage}
                >
                  <FiX />
                </IconButton>
              </Box>
            ) : (
              <VStack gap={1}>
                <FiUploadCloud size={24} />
                <Text>Click to upload event banner</Text>
                <Text fontSize='xs' color='fg.muted'>
                  PNG, JPG up to 5MB
                </Text>
              </VStack>
            )}
          </Box>

          <Field.Root required>
            <Field.Label>Event Title</Field.Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Description</Field.Label>
            <Textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Location</Field.Label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </Field.Root>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <Field.Root required>
              <Field.Label>Event Date & Time</Field.Label>
              <Input
                type='datetime-local'
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Registration Deadline</Field.Label>
              <Input
                type='datetime-local'
                value={formData.joinTill}
                onChange={(e) =>
                  setFormData({ ...formData, joinTill: e.target.value })
                }
              />
            </Field.Root>
          </SimpleGrid>

          <Field.Root required>
            <Field.Label>Available Spots</Field.Label>
            <Input
              type='number'
              min='1'
              value={formData.spotLeft}
              onChange={(e) =>
                setFormData({ ...formData, spotLeft: Number(e.target.value) })
              }
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Cancellation Terms</Field.Label>
            <Textarea
              rows={3}
              value={formData.cancellationTerms}
              onChange={(e) =>
                setFormData({ ...formData, cancellationTerms: e.target.value })
              }
            />
          </Field.Root>

          <Checkbox.Root
            checked={formData.isSignature}
            onCheckedChange={(e) =>
              setFormData({ ...formData, isSignature: e.checked === true })
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Mark as Signature Event</Checkbox.Label>
          </Checkbox.Root>
          <Button
            type='submit'
            colorPalette='blue'
            size='lg'
            loading={isPending}
          >
            Save Changes
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
