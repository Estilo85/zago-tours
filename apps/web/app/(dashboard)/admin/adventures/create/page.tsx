'use client';

import { useBulkCreateAdventures } from '@/hooks';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Textarea,
  VStack,
  HStack,
  IconButton,
  Text,
  SimpleGrid,
  Field,
  createListCollection,
} from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@chakra-ui/react/select';
import {
  AdventureLevel,
  AdventureLevelLabels,
  CreateAdventureDto,
  TripType,
  TripTypeLabels,
} from '@zagotours/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiPlus, FiTrash2, FiChevronLeft } from 'react-icons/fi';

const INITIAL_ADVENTURE = {
  title: '',
  description: '',
  location: '',
  price: 100,
  level: AdventureLevel.MEDIUM,
  tripType: TripType.HIKING,
  days: 7,
  safetyScore: 85,
  certification: '',
  gear: '',
  date: '',
};

export default function CreateAdventurePage() {
  const router = useRouter();
  // Use a type that has date as string for form handling
  type AdventureFormData = Omit<CreateAdventureDto, 'date'> & { date: string };

  const [adventures, setAdventures] = useState<AdventureFormData[]>([
    { ...INITIAL_ADVENTURE },
  ]);

  const { mutate: bulkCreate, isPending } = useBulkCreateAdventures();

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

  const addAdventureForm = () => {
    setAdventures((prev) => [...prev, { ...INITIAL_ADVENTURE }]);
  };

  const removeAdventureForm = (index: number) => {
    if (adventures.length <= 1) return;
    setAdventures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = <K extends keyof AdventureFormData>(
    index: number,
    field: K,
    value: AdventureFormData[K],
  ) => {
    setAdventures((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      } as AdventureFormData;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adventuresToCreate: CreateAdventureDto[] = adventures.map((adv) => ({
      ...adv,
    }));

    bulkCreate(adventuresToCreate, {
      onSuccess: () => {
        router.push('/admin/adventures');
      },
    });
  };

  return (
    <Container maxW='container.lg' py={8}>
      <HStack justify='space-between' mb={8}>
        <VStack align='start' gap={1}>
          <Button variant='ghost' size='sm' onClick={() => router.back()}>
            <FiChevronLeft style={{ marginRight: '8px' }} /> Back
          </Button>
          <Heading size='xl'>Bulk Create Adventures</Heading>
        </VStack>
        <Button
          colorPalette='cyan'
          variant='surface'
          onClick={addAdventureForm}
        >
          <FiPlus style={{ marginRight: '8px' }} /> Add Another Trip
        </Button>
      </HStack>

      <form onSubmit={handleSubmit}>
        <VStack gap={10} align='stretch'>
          {adventures.map((adventure, index) => (
            <Box
              key={index}
              p={6}
              bg='bg.panel'
              shadow='md'
              rounded='lg'
              borderWidth='1px'
              position='relative'
            >
              <HStack justify='space-between' mb={4}>
                <Heading size='md' color='cyan.600'>
                  Adventure #{index + 1}
                </Heading>
                {adventures.length > 1 && (
                  <IconButton
                    aria-label='Remove adventure'
                    variant='ghost'
                    colorPalette='red'
                    onClick={() => removeAdventureForm(index)}
                  >
                    <FiTrash2 />
                  </IconButton>
                )}
              </HStack>

              <VStack gap={4} align='stretch'>
                <Field.Root required>
                  <Field.Label>Title</Field.Label>
                  <Input
                    value={adventure.title}
                    onChange={(e) =>
                      handleChange(index, 'title', e.target.value)
                    }
                    placeholder='E.g. Everest Base Camp'
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    value={adventure.description}
                    onChange={(e) =>
                      handleChange(index, 'description', e.target.value)
                    }
                    placeholder='Describe the adventure details...'
                  />
                </Field.Root>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Field.Root required>
                    <Field.Label>Location</Field.Label>
                    <Input
                      value={adventure.location}
                      onChange={(e) =>
                        handleChange(index, 'location', e.target.value)
                      }
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Price ($)</Field.Label>
                    <Input
                      type='number'
                      value={adventure.price}
                      onChange={(e) =>
                        handleChange(index, 'price', Number(e.target.value))
                      }
                    />
                  </Field.Root>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                  <Field.Root required>
                    <Field.Label>Level</Field.Label>
                    <SelectRoot
                      collection={levelCollection}
                      value={[adventure.level]}
                      onValueChange={(e) =>
                        handleChange(
                          index,
                          'level',
                          e.value[0] as AdventureLevel,
                        )
                      }
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
                      value={[adventure.tripType]}
                      onValueChange={(e) =>
                        handleChange(index, 'tripType', e.value[0] as TripType)
                      }
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
                    <Field.Label>Start Date</Field.Label>
                    <Input
                      type='date'
                      value={
                        typeof adventure.date === 'string' ? adventure.date : ''
                      }
                      onChange={(e) =>
                        handleChange(index, 'date', e.target.value)
                      }
                    />
                  </Field.Root>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Field.Root required>
                    <Field.Label>Days</Field.Label>
                    <Input
                      type='number'
                      value={adventure.days}
                      onChange={(e) =>
                        handleChange(index, 'days', Number(e.target.value))
                      }
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Certification Required</Field.Label>
                    <Input
                      value={adventure.certification}
                      onChange={(e) =>
                        handleChange(index, 'certification', e.target.value)
                      }
                    />
                  </Field.Root>
                </SimpleGrid>
              </VStack>
            </Box>
          ))}

          <Box pt={6} borderTopWidth='1px'>
            <HStack gap={4} justify='flex-end'>
              <Text color='fg.muted' fontSize='sm'>
                Total Adventures: {adventures.length}
              </Text>
              <Button
                type='submit'
                bg='primary'
                color='white'
                size='lg'
                loading={isPending}
                minW='200px'
              >
                Create All Adventures
              </Button>
            </HStack>
          </Box>
        </VStack>
      </form>
    </Container>
  );
}
