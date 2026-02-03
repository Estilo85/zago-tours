'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Textarea,
  VStack,
  HStack,
  SimpleGrid,
  Field,
  Spinner,
  Center,
  createListCollection,
} from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@chakra-ui/react/select';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiSave, FiChevronLeft, FiList, FiImage } from 'react-icons/fi';

// Hooks and Constants
import { useAdventure, useUpdateAdventure } from '@/hooks';
import {
  AdventureLevelLabels,
  TripTypeLabels,
  AdventureStatusLabels,
  UpdateAdventureDto,
} from '@zagotours/types';

export default function EditAdventurePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<UpdateAdventureDto | null>(null);

  // Create collections for Select components
  const levelCollection = createListCollection({
    items: Object.entries(AdventureLevelLabels).map(([value, label]) => ({
      label,
      value,
    })),
  });

  const tripTypeCollection = createListCollection({
    items: Object.entries(TripTypeLabels).map(([value, label]) => ({
      label,
      value,
    })),
  });

  const statusCollection = createListCollection({
    items: Object.entries(AdventureStatusLabels).map(([value, label]) => ({
      label,
      value,
    })),
  });

  // 1. Fetch existing data
  const { data: response, isLoading: isFetching } = useAdventure(id);
  const { mutate: updateAdventure, isPending: isUpdating } =
    useUpdateAdventure();

  // 2. Sync fetched data to local state
  useEffect(() => {
    if (response?.data) {
      const adventure = response.data;
      setFormData({
        title: adventure.title,
        description: adventure.description,
        location: adventure.location,
        price: adventure.price,
        level: adventure.level,
        tripType: adventure.tripType,
        days: adventure.days,
        safetyScore: adventure.safetyScore,
        certification: adventure.certification || '',
        gear: adventure.gear || '',
        date: adventure.date
          ? new Date(adventure.date).toISOString().split('T')[0]
          : '',
        status: adventure.status,
      });
    }
  }, [response]);

  const handleChange = (field: keyof UpdateAdventureDto, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    updateAdventure(
      { id, data: formData },
      {
        onSuccess: () => {
          router.push(`/admin/adventures/${id}`);
        },
      },
    );
  };

  if (isFetching || !formData) {
    return (
      <Center h='60vh'>
        <Spinner size='xl' />
      </Center>
    );
  }

  return (
    <Container maxW='container.md' py={8}>
      <HStack justify='space-between' mb={6}>
        <VStack align='start' gap={1}>
          <Button variant='ghost' size='sm' onClick={() => router.back()}>
            <FiChevronLeft style={{ marginRight: '8px' }} /> Back
          </Button>
          <Heading size='lg'>Edit Adventure</Heading>
        </VStack>
      </HStack>

      <Box bg='bg.panel' p={6} shadow='sm' rounded='md' borderWidth='1px'>
        <form onSubmit={handleSubmit}>
          <VStack gap={4} align='stretch'>
            <Field.Root required>
              <Field.Label>Title</Field.Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Description</Field.Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
              />
            </Field.Root>

            <SimpleGrid columns={2} gap={4}>
              <Field.Root required>
                <Field.Label>Location</Field.Label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Price ($)</Field.Label>
                <Input
                  type='number'
                  value={formData.price}
                  onChange={(e) =>
                    handleChange('price', Number(e.target.value))
                  }
                />
              </Field.Root>
            </SimpleGrid>

            <SimpleGrid columns={3} gap={4}>
              <Field.Root required>
                <Field.Label>Level</Field.Label>
                <SelectRoot
                  collection={levelCollection}
                  value={formData.level ? [formData.level] : []}
                  onValueChange={(e) => handleChange('level', e.value[0])}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder='Select level' />
                  </SelectTrigger>
                  <SelectContent>
                    {levelCollection.items.map((item) => (
                      <SelectItem key={item.value} item={item}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field.Root>

              <Field.Root required>
                <Field.Label>Trip Type</Field.Label>
                <SelectRoot
                  collection={tripTypeCollection}
                  value={formData.tripType ? [formData.tripType] : []}
                  onValueChange={(e) => handleChange('tripType', e.value[0])}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    {tripTypeCollection.items.map((item) => (
                      <SelectItem key={item.value} item={item}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field.Root>

              <Field.Root required>
                <Field.Label>Status</Field.Label>
                <SelectRoot
                  collection={statusCollection}
                  value={formData.status ? [formData.status] : []}
                  onValueChange={(e) => handleChange('status', e.value[0])}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    {statusCollection.items.map((item) => (
                      <SelectItem key={item.value} item={item}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field.Root>
            </SimpleGrid>

            <SimpleGrid columns={3} gap={4}>
              <Field.Root required>
                <Field.Label>Days</Field.Label>
                <Input
                  type='number'
                  value={formData.days}
                  onChange={(e) => handleChange('days', Number(e.target.value))}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Safety Score</Field.Label>
                <Input
                  type='number'
                  value={formData.safetyScore}
                  onChange={(e) =>
                    handleChange('safetyScore', Number(e.target.value))
                  }
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Date</Field.Label>
                <Input
                  type='date'
                  value={typeof formData.date === 'string' ? formData.date : ''}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </Field.Root>
            </SimpleGrid>

            <Field.Root>
              <Field.Label>Certification Required</Field.Label>
              <Input
                value={formData.certification}
                onChange={(e) => handleChange('certification', e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Gear List</Field.Label>
              <Textarea
                value={formData.gear}
                onChange={(e) => handleChange('gear', e.target.value)}
                rows={3}
              />
            </Field.Root>

            <HStack gap={4} pt={4}>
              <Button variant='outline' onClick={() => router.back()} flex={1}>
                Cancel
              </Button>
              <Button
                type='submit'
                colorPalette='blue'
                loading={isUpdating}
                flex={1}
              >
                <FiSave style={{ marginRight: '8px' }} /> Update Adventure
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>

      <SimpleGrid columns={2} gap={4} mt={6}>
        <Button
          variant='surface'
          colorPalette='gray'
          onClick={() => router.push(`/admin/adventures/${id}/itinerary`)}
        >
          <FiList style={{ marginRight: '8px' }} /> Manage Itineraries
        </Button>
        <Button
          variant='surface'
          colorPalette='gray'
          onClick={() => router.push(`/admin/adventures/${id}/gallery`)}
        >
          <FiImage style={{ marginRight: '8px' }} /> Manage Gallery
        </Button>
      </SimpleGrid>
    </Container>
  );
}
