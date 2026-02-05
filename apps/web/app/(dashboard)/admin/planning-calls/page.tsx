'use client';

import React from 'react';
import { HStack, Text, Badge, VStack, Link } from '@chakra-ui/react';
import { TripPlanningCallResponseDto } from '@zagotours/types';
import { usePlanningCalls } from '@/hooks';
import { Column, DataTable } from '../../_components/table/DataTable';
import { AvatarImage } from '@/components/media/AvatarImage';
import { LoadingState } from '@/components/ui/LoadingState';
import AdminTableWrapper from '../../_components/table/AdminTableWrapper';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';

export default function DashboardPlanningCalls() {
  const [page, setPage] = React.useState(1);
  const { data: res, isLoading } = usePlanningCalls({ page });

  const columns: Column<TripPlanningCallResponseDto>[] = [
    {
      label: 'Adventurer',
      key: 'adventurer',
      render: (_, row) => (
        <HStack gap={3}>
          <VStack align='start' gap={0}>
            <Text fontSize='sm' fontWeight='medium'>
              {row.adventurer?.name}
            </Text>
            <Text fontSize='xs' color='fg.muted'>
              {row.adventurer?.email}
            </Text>
          </VStack>
        </HStack>
      ),
    },
    {
      label: 'Time',
      key: 'startTime',
      render: (v) => new Date(v).toLocaleString(),
    },
    {
      label: 'Status',
      key: 'status',
      render: (v) => (
        <Badge colorPalette={v === 'COMPLETED' ? 'green' : 'orange'}>{v}</Badge>
      ),
    },
    {
      label: 'Link',
      key: 'meetingLink',
      render: (v) =>
        v ? (
          <Link href={v} color='blue.500'>
            Join
          </Link>
        ) : (
          'N/A'
        ),
    },
  ];

  if (isLoading) return <LoadingState />;
  return (
    <AdminTableWrapper title='Planning Calls' hasData={!!res?.data?.length}>
      <DataTable columns={columns} data={res?.data ?? []} />
      <PaginationControl pagination={res?.pagination} onPageChange={setPage} />
    </AdminTableWrapper>
  );
}
