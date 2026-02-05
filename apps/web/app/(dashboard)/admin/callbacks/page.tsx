'use client';

import React from 'react';
import { Text, HStack, IconButton, Badge, VStack } from '@chakra-ui/react';
import { PhoneCall, Trash2, CheckCircle } from 'lucide-react';
import { useCallbackRequests } from '@/hooks';
import { Column, DataTable } from '../../_components/table/DataTable';
import { AvatarImage } from '@/components/media/AvatarImage';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';
import { LoadingState } from '@/components/ui/LoadingState';
import { CallbackRequestResponseDto } from '@zagotours/types';
import AdminTableWrapper from '../../_components/table/AdminTableWrapper';

export default function DashboardCallbacks() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: response, isLoading } = useCallbackRequests({
    page: currentPage,
  });

  const columns: Column<CallbackRequestResponseDto>[] = [
    {
      label: 'Requester',
      key: 'name',
      render: (_, row) => (
        <HStack gap={3}>
          <AvatarImage src={row.image} name={row.name} size='sm' />
          <VStack align='start' gap={0}>
            <Text fontWeight='medium' fontSize='sm'>
              {row.name}
            </Text>
            <Text fontSize='xs' color='fg.muted'>
              {row.email}
            </Text>
          </VStack>
        </HStack>
      ),
    },
    {
      label: 'Phone',
      key: 'phone',
      render: (v) => <Text fontSize='sm'>{v}</Text>,
    },
    {
      label: 'Preferred Time',
      key: 'bestTime',
      render: (v) => (
        <Badge colorPalette='cyan' variant='subtle'>
          {v}
        </Badge>
      ),
    },
    {
      label: 'Actions',
      key: 'id',
      render: () => (
        <HStack gap={2} justify='end'>
          <IconButton
            aria-label='Done'
            variant='ghost'
            size='sm'
            colorPalette='green'
          >
            <CheckCircle size={16} />
          </IconButton>
          <IconButton
            aria-label='Delete'
            variant='ghost'
            size='sm'
            colorPalette='red'
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
      title='Callback Requests'
      hasData={!!response?.data?.length}
      emptyIcon={<PhoneCall size={40} />}
      emptyText='No pending callback requests at the moment.'
    >
      <DataTable columns={columns} data={response?.data ?? []} />
      {response?.pagination && (
        <PaginationControl
          pagination={response.pagination}
          onPageChange={setCurrentPage}
        />
      )}
    </AdminTableWrapper>
  );
}
