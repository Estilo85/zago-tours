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
  Text,
  IconButton,
  Spinner,
  Center,
  Field,
  Portal,
  Drawer,
  CloseButton,
} from '@chakra-ui/react';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiChevronLeft } from 'react-icons/fi';
import {
  useAdventure,
  useItineraries,
  useCreateItinerary,
  useUpdateItinerary,
  useDeleteItinerary,
} from '@/hooks';

export default function ItineraryPage() {
  const router = useRouter();
  const params = useParams();
  const adventureId = params.id as string;

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dayNumber: 1,
    title: '',
    activityDetails: '',
  });

  const { data: adventureRes, isLoading: loadingAdventure } =
    useAdventure(adventureId);
  const { data: itineraryRes, isLoading: loadingItineraries } =
    useItineraries(adventureId);

  const createMutation = useCreateItinerary();
  const updateMutation = useUpdateItinerary();
  const deleteMutation = useDeleteItinerary();

  const itineraries = (itineraryRes?.data || []).sort(
    (a: any, b: any) => a.dayNumber - b.dayNumber,
  );

  const handleOpenDrawer = (itinerary?: any) => {
    if (itinerary) {
      setEditingId(itinerary.id);
      setFormData({
        dayNumber: itinerary.dayNumber,
        title: itinerary.title,
        activityDetails: itinerary.activityDetails,
      });
    } else {
      setEditingId(null);
      setFormData({
        dayNumber: itineraries.length + 1,
        title: '',
        activityDetails: '',
      });
    }
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = editingId
      ? updateMutation.mutate(
          { adventureId, itineraryId: editingId, data: formData },
          { onSuccess: () => setIsOpen(false) },
        )
      : createMutation.mutate(
          { adventureId, data: formData },
          { onSuccess: () => setIsOpen(false) },
        );
  };

  if (loadingAdventure || loadingItineraries)
    return (
      <Center h='60vh'>
        <Spinner size='xl' />
      </Center>
    );

  return (
    <Container maxW='container.lg' py={8}>
      <HStack justify='space-between' mb={6}>
        <VStack align='start' gap={1}>
          <Button variant='ghost' size='sm' onClick={() => router.back()}>
            <FiChevronLeft /> Back
          </Button>
          <Heading size='lg'>Itineraries</Heading>
          <Text color='fg.muted'>{adventureRes?.data?.title}</Text>
        </VStack>
        <Button bg='primary' color='white' onClick={() => handleOpenDrawer()}>
          <FiPlus /> Add Day
        </Button>
      </HStack>

      <VStack gap={4} align='stretch'>
        {itineraries.map((item: any) => (
          <Box
            key={item.id}
            p={5}
            shadow='sm'
            rounded='md'
            borderWidth='1px'
            bg='bg.panel'
          >
            <HStack justify='space-between'>
              <Heading size='md'>
                Day {item.dayNumber}: {item.title}
              </Heading>
              <HStack>
                <IconButton
                  aria-label='Edit'
                  variant='outline'
                  size='sm'
                  onClick={() => handleOpenDrawer(item)}
                >
                  <FiEdit />
                </IconButton>
                <IconButton
                  aria-label='Delete'
                  size='sm'
                  colorPalette='red'
                  variant='ghost'
                  onClick={() =>
                    deleteMutation.mutate({ itineraryId: item.id, adventureId })
                  }
                >
                  <FiTrash2 />
                </IconButton>
              </HStack>
            </HStack>
            <Text mt={2} color='fg.subtle' whiteSpace='pre-wrap'>
              {item.activityDetails}
            </Text>
          </Box>
        ))}
      </VStack>

      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        size='lg'
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <form onSubmit={handleSubmit}>
                <Drawer.Header>
                  <Drawer.Title>
                    {editingId ? 'Edit' : 'Add'} Itinerary Day
                  </Drawer.Title>
                </Drawer.Header>

                <Drawer.Body>
                  <VStack gap={5} py={4}>
                    <Field.Root required>
                      <Field.Label>Day Number</Field.Label>
                      <Input
                        type='number'
                        value={formData.dayNumber}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            dayNumber: Number(e.target.value),
                          }))
                        }
                      />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label>Title</Field.Label>
                      <Input
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, title: e.target.value }))
                        }
                        placeholder='Arrival'
                      />
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label>Activities</Field.Label>
                      <Textarea
                        rows={10}
                        value={formData.activityDetails}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            activityDetails: e.target.value,
                          }))
                        }
                      />
                    </Field.Root>
                  </VStack>
                </Drawer.Body>

                <Drawer.Footer>
                  <Button variant='outline' onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    colorPalette='blue'
                    loading={
                      createMutation.isPending || updateMutation.isPending
                    }
                  >
                    {editingId ? 'Update' : 'Create'}
                  </Button>
                </Drawer.Footer>

                <Drawer.CloseTrigger asChild>
                  <CloseButton size='sm' />
                </Drawer.CloseTrigger>
              </form>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Container>
  );
}
