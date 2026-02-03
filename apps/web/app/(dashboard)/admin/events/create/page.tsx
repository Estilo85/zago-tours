'use client';

import {
  Container,
  Heading,
  VStack,
  Input,
  Button,
  Textarea,
  SimpleGrid,
  Field,
  Box,
  Text,
  Image,
  IconButton,
  Checkbox,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import { useCreateEvent } from '@/hooks';

export default function CreateEventPage() {
  const router = useRouter();
  const { mutate: createEvent, isPending } = useCreateEvent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    joinTill: '',
    spotLeft: 20,
    isSignature: false,
    cancellationTerms: '',
  });

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !form.title ||
      !form.description ||
      !form.location ||
      !form.date ||
      !form.joinTill
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('location', form.location);
    formData.append('spotLeft', form.spotLeft.toString());
    formData.append('isSignature', form.isSignature.toString());

    if (form.date) {
      formData.append('date', new Date(form.date).toISOString());
    }
    if (form.joinTill) {
      formData.append('joinTill', new Date(form.joinTill).toISOString());
    }
    if (form.cancellationTerms) {
      formData.append('cancellationTerms', form.cancellationTerms);
    }
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    createEvent(formData, {
      onSuccess: () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        router.push('/admin/events');
      },
    });
  };

  return (
    <Container maxW='container.md' py={8}>
      <Heading mb={6}>Create New Event</Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap={6} align='stretch'>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* Image Upload Section */}
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
              placeholder='Enter event title'
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Description</Field.Label>
            <Textarea
              rows={4}
              placeholder='Describe your event'
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Location</Field.Label>
            <Input
              placeholder='e.g., Victoria Island, Lagos'
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field.Root>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <Field.Root required>
              <Field.Label>Event Date & Time</Field.Label>
              <Input
                type='datetime-local'
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Registration Deadline</Field.Label>
              <Input
                type='datetime-local'
                value={form.joinTill}
                onChange={(e) => setForm({ ...form, joinTill: e.target.value })}
              />
            </Field.Root>
          </SimpleGrid>

          <Field.Root required>
            <Field.Label>Available Spots</Field.Label>
            <Input
              type='number'
              min='1'
              value={form.spotLeft}
              onChange={(e) =>
                setForm({ ...form, spotLeft: Number(e.target.value) })
              }
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Cancellation Terms</Field.Label>
            <Textarea
              rows={3}
              placeholder='e.g., Full refund if cancelled 48 hours before event'
              value={form.cancellationTerms}
              onChange={(e) =>
                setForm({ ...form, cancellationTerms: e.target.value })
              }
            />
          </Field.Root>

          <Checkbox.Root
            checked={form.isSignature}
            onCheckedChange={(e) =>
              setForm({ ...form, isSignature: e.checked === true })
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Mark as Signature Event</Checkbox.Label>
          </Checkbox.Root>

          <Button
            type='submit'
            colorPalette='cyan'
            size='lg'
            loading={isPending}
          >
            Publish Event
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
