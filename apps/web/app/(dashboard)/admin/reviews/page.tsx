'use client';
import { useState } from 'react';
import { useReviews } from '@/hooks';
import { ReviewResponseDto } from '@zagotours/types';
import { Column, DataTable } from '../../_components/table/DataTable';
import { Badge, Text } from '@chakra-ui/react';
import { LoadingState } from '@/components/ui/LoadingState';
import AdminTableWrapper from '../../_components/table/AdminTableWrapper';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';

export default function DashboardReviews() {
  const [page, setPage] = useState(1);
  const { data: res, isLoading } = useReviews({ page });

  const columns: Column<ReviewResponseDto>[] = [
    {
      label: 'User',
      key: 'user',
      render: (u) => <Text fontSize='sm'>{u.name}</Text>,
    },
    {
      label: 'Rating',
      key: 'rating',
      render: (v) => <Text color='yellow.500'>{'★'.repeat(v)}</Text>,
    },
    {
      label: 'Content',
      key: 'content',
      render: (v) => (
        <Text truncate maxW='200px' fontSize='sm'>
          {v}
        </Text>
      ),
    },
    {
      label: 'Featured',
      key: 'isFeatured',
      render: (v) => (
        <Badge colorPalette={v ? 'purple' : 'gray'}>{v ? 'Yes' : 'No'}</Badge>
      ),
    },
  ];

  if (isLoading) return <LoadingState />;
  return (
    <AdminTableWrapper title='User Reviews' hasData={!!res?.data?.length}>
      <DataTable columns={columns} data={res?.data ?? []} />
      <PaginationControl pagination={res?.pagination} onPageChange={setPage} />
    </AdminTableWrapper>
  );
}
