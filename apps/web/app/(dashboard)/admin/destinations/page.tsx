'use client';

import React from 'react';
import {
  Badge,
  Text,
  IconButton,
  Box,
  HStack,
  VStack,
  Button,
  Input,
  Drawer,
  Portal,
  CloseButton,
  Stack,
  Separator,
  Field,
} from '@chakra-ui/react';
import { Column, DataTable } from '../../_components/table/DataTable';
import { DestinationCountryResponseDto } from '@zagotours/types';
import {
  useCountries,
  useCreateCountry,
  useUpdateCountry,
  useToggleCountryActive,
  useDeleteCountry,
} from '@/hooks';
import { Pencil, Trash2, Plus, MapPin, Eye, EyeOff, Globe } from 'lucide-react';
import { LoadingState } from '@/components/ui/LoadingState';
import AdminTableWrapper from '../../_components/table/AdminTableWrapper';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';

export default function DashboardDestinationCountriesPage() {
  const [page, setPage] = React.useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] =
    React.useState<DestinationCountryResponseDto | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    code: '',
  });

  const { data: res, isLoading } = useCountries({ page });
  const createMutation = useCreateCountry();
  const updateMutation = useUpdateCountry();
  const toggleActiveMutation = useToggleCountryActive();
  const deleteMutation = useDeleteCountry();

  const handleOpenDrawer = (country?: DestinationCountryResponseDto) => {
    if (country) {
      setSelectedCountry(country);
      setFormData({
        name: country.name,
        code: country.code || '',
      });
    } else {
      setSelectedCountry(null);
      setFormData({ name: '', code: '' });
    }
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedCountry(null);
      setFormData({ name: '', code: '' });
    }, 300);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    try {
      if (selectedCountry) {
        // Update
        await updateMutation.mutateAsync({
          id: selectedCountry.id,
          data: {
            name: formData.name,
            code: formData.code || undefined,
          },
        });
      } else {
        // Create
        await createMutation.mutateAsync({
          name: formData.name,
          code: formData.code || undefined,
          isActive: true,
        });
      }
      handleCloseDrawer();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const handleToggleActive = async (country: DestinationCountryResponseDto) => {
    try {
      await toggleActiveMutation.mutateAsync(country.id);
    } catch (error) {
      console.error('Toggle failed:', error);
    }
  };

  const handleDelete = async (country: DestinationCountryResponseDto) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${country.name}"? This action cannot be undone.`,
      )
    ) {
      try {
        await deleteMutation.mutateAsync(country.id);
        if (selectedCountry?.id === country.id) {
          handleCloseDrawer();
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const columns: Column<DestinationCountryResponseDto>[] = [
    {
      label: 'Country Name',
      key: 'name',
      render: (v, row) => (
        <HStack gap={2}>
          <MapPin size={16} color='var(--chakra-colors-blue-500)' />
          <Text fontWeight='semibold'>{v}</Text>
        </HStack>
      ),
    },
    {
      label: 'Code',
      key: 'code',
      render: (v) =>
        v ? (
          <Badge colorPalette='gray' variant='subtle'>
            {v}
          </Badge>
        ) : (
          <Text fontSize='sm' color='fg.muted'>
            N/A
          </Text>
        ),
    },
    {
      label: 'Status',
      key: 'isActive',
      render: (v) => (
        <Badge colorPalette={v ? 'green' : 'red'} variant='subtle'>
          {v ? 'Active' : 'Hidden'}
        </Badge>
      ),
    },
    {
      label: 'Created',
      key: 'createdAt',
      render: (v) => (
        <VStack align='start' gap={0}>
          <Text fontSize='sm' fontWeight='medium'>
            {new Date(v).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </VStack>
      ),
    },
    {
      label: 'Actions',
      key: 'id',
      render: (_, country) => (
        <HStack gap={2} justify='end'>
          <IconButton
            aria-label='Edit Country'
            variant='ghost'
            size='sm'
            colorPalette='blue'
            onClick={() => handleOpenDrawer(country)}
          >
            <Pencil size={16} />
          </IconButton>
          <IconButton
            aria-label={country.isActive ? 'Hide Country' : 'Show Country'}
            variant='ghost'
            size='sm'
            colorPalette={country.isActive ? 'orange' : 'green'}
            onClick={() => handleToggleActive(country)}
            loading={toggleActiveMutation.isPending}
          >
            {country.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
          </IconButton>
          <IconButton
            aria-label='Delete Country'
            variant='ghost'
            size='sm'
            colorPalette='red'
            onClick={() => handleDelete(country)}
            loading={deleteMutation.isPending}
          >
            <Trash2 size={16} />
          </IconButton>
        </HStack>
      ),
    },
  ];

  if (isLoading) return <LoadingState />;

  return (
    <>
      <AdminTableWrapper
        title='Destination Countries'
        hasData={!!res?.data?.length}
        emptyIcon={<Globe size={40} />}
        emptyText='No countries added yet.'
        // action={
        //   <Button colorPalette='blue' onClick={() => handleOpenDrawer()}>
        //     <Plus size={16} />
        //     Add Country
        //   </Button>
        // }
      >
        <DataTable columns={columns} data={res?.data ?? []} />
        {res?.pagination && (
          <Box borderTopWidth='1px' py={4}>
            <PaginationControl
              pagination={res.pagination}
              onPageChange={setPage}
            />
          </Box>
        )}
      </AdminTableWrapper>

      {/* Create/Edit Drawer */}
      <Drawer.Root
        open={isDrawerOpen}
        onOpenChange={(e) => !e.open && handleCloseDrawer()}
        size='md'
        placement='end'
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header borderBottomWidth='1px'>
                <Drawer.Title>
                  <HStack gap={2}>
                    <Globe size={20} />
                    <span>
                      {selectedCountry ? 'Edit Country' : 'Add New Country'}
                    </span>
                  </HStack>
                </Drawer.Title>
              </Drawer.Header>

              <Drawer.Body py={6}>
                <Stack gap={6}>
                  {/* Country Name */}
                  <Field.Root required>
                    <Field.Label>Country Name</Field.Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder='e.g., United States'
                      autoFocus
                    />
                  </Field.Root>

                  {/* Country Code */}
                  <Field.Root>
                    <Field.Label>Country Code</Field.Label>
                    <Input
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          code: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder='e.g., US'
                      maxLength={3}
                    />
                  </Field.Root>

                  {/* Existing Country Info */}
                  {selectedCountry && (
                    <>
                      <Separator />
                      <Box>
                        <Text fontSize='sm' color='fg.muted' mb={3}>
                          Country Information
                        </Text>
                        <VStack
                          align='stretch'
                          gap={2}
                          fontSize='sm'
                          p={4}
                          bg='bg.muted'
                          borderRadius='md'
                          borderWidth='1px'
                        >
                          <HStack justify='space-between'>
                            <Text color='fg.muted'>Status:</Text>
                            <Badge
                              colorPalette={
                                selectedCountry.isActive ? 'green' : 'red'
                              }
                              variant='subtle'
                            >
                              {selectedCountry.isActive ? 'Active' : 'Hidden'}
                            </Badge>
                          </HStack>
                          <HStack justify='space-between'>
                            <Text color='fg.muted'>Created:</Text>
                            <Text fontWeight='medium'>
                              {new Date(
                                selectedCountry.createdAt,
                              ).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </Text>
                          </HStack>
                          <HStack justify='space-between' alignItems='start'>
                            <Text color='fg.muted'>ID:</Text>
                            <Text
                              fontFamily='mono'
                              fontSize='xs'
                              wordBreak='break-all'
                              textAlign='right'
                            >
                              {selectedCountry.id}
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </>
                  )}

                  {/* Help Text */}
                  <Box
                    p={3}
                    bg='blue.50'
                    borderRadius='md'
                    borderWidth='1px'
                    borderColor='blue.200'
                  >
                    <Text fontSize='xs' color='blue.800'>
                      💡 Add countries where your tours are available. Active
                      countries will be displayed to users when browsing
                      destinations.
                    </Text>
                  </Box>
                </Stack>
              </Drawer.Body>

              <Drawer.Footer borderTopWidth='1px' gap={3}>
                <Button variant='outline' onClick={handleCloseDrawer}>
                  Cancel
                </Button>
                {selectedCountry && (
                  <Button
                    colorPalette='red'
                    variant='outline'
                    onClick={() => handleDelete(selectedCountry)}
                    loading={deleteMutation.isPending}
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                )}
                <Button
                  colorPalette='blue'
                  onClick={handleSubmit}
                  loading={createMutation.isPending || updateMutation.isPending}
                  disabled={!formData.name.trim()}
                >
                  {selectedCountry ? 'Update Country' : 'Add Country'}
                </Button>
              </Drawer.Footer>

              <Drawer.CloseTrigger asChild>
                <CloseButton size='sm' />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
