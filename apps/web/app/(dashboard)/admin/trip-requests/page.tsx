'use client';

import React from 'react';
import { Text, Badge, VStack, IconButton, HStack, Box } from '@chakra-ui/react';
import { useTripRequests } from '@/hooks';
import { Column, DataTable } from '../../_components/table/DataTable';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';
import { Eye, Trash2, Plane } from 'lucide-react';
import { LoadingState } from '@/components/ui/LoadingState';
import { TripRequestResponseDto } from '@zagotours/types';
import AdminTableWrapper from '../../_components/table/AdminTableWrapper';

export default function DashboardTripRequest() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    data: response,
    isLoading,
    isError,
  } = useTripRequests({ page: currentPage });

  const handleAction = (
    type: 'view' | 'delete',
    request: TripRequestResponseDto,
  ) => {
    console.log(`${type} action on request:`, request.id);
  };

  const columns: Column<TripRequestResponseDto>[] = [
    {
      label: 'Destination',
      key: 'destination',
      render: (val) => (
        <Text fontWeight='semibold' color='blue.600'>
          {val}
        </Text>
      ),
    },
    {
      label: 'Trip Type',
      key: 'tripType',
      render: (val) => (
        <Badge variant='subtle' colorPalette='purple'>
          {val.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      label: 'Travel Date',
      key: 'date',
      render: (date) => (
        <VStack align='start' gap={0}>
          <Text fontSize='sm'>{new Date(date).toLocaleDateString()}</Text>
          <Text fontSize='xs' color='fg.muted'>
            Planned Date
          </Text>
        </VStack>
      ),
    },
    {
      label: 'Preferences',
      key: 'preferences',
      render: (val) => (
        <Text fontSize='sm' color='fg.muted' truncate maxW='200px'>
          {val || 'No special preferences'}
        </Text>
      ),
    },
    {
      label: 'Actions',
      key: 'id',
      render: (_, request) => (
        <HStack gap={2} justify='end'>
          <IconButton
            aria-label='View Details'
            variant='ghost'
            size='sm'
            onClick={() => handleAction('view', request)}
          >
            <Eye size={16} />
          </IconButton>
          <IconButton
            aria-label='Delete Request'
            variant='ghost'
            size='sm'
            colorPalette='red'
            onClick={() => handleAction('delete', request)}
          >
            <Trash2 size={16} />
          </IconButton>
        </HStack>
      ),
    },
  ];

  if (isLoading) return <LoadingState />;

  return (
    <AdminTableWrapper
      title='Trip Planning Requests'
      hasData={!!(response?.data && response.data.length > 0)}
      emptyIcon={<Plane size={40} />}
      emptyText='No trip requests have been submitted yet.'
    >
      <DataTable columns={columns} data={response?.data ?? []} />
      {response?.pagination && (
        <Box borderTopWidth='1px' py={4}>
          <PaginationControl
            pagination={response.pagination}
            onPageChange={setCurrentPage}
          />
        </Box>
      )}
    </AdminTableWrapper>
  );
}
