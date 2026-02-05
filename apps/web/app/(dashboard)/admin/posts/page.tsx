'use client';

import React, { useState } from 'react';
import { HStack, Text, Badge } from '@chakra-ui/react';
import { LoadingState } from '@/components/ui/LoadingState';
import AdminTableWrapper from '../../_components/table/AdminTableWrapper';
import { Column, DataTable } from '../../_components/table/DataTable';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';
import { PostResponseDto } from '@zagotours/types';
import { usePosts } from '@/hooks';
import { AvatarImage } from '@/components/media/AvatarImage';

export default function DashboardPosts() {
  const [page, setPage] = useState(1);
  const { data: res, isLoading } = usePosts({ page });

  const columns: Column<PostResponseDto>[] = [
    {
      label: 'Author',
      key: 'user',
      render: (u) => (
        <HStack gap={2}>
          <AvatarImage src={u.image} name={u.name} size='xs' />
          <Text fontSize='sm'>{u.name}</Text>
        </HStack>
      ),
    },
    { label: 'Title', key: 'title' },
    {
      label: 'Type',
      key: 'mediaType',
      render: (v) => <Badge variant='outline'>{v}</Badge>,
    },
    {
      label: 'Stats',
      key: '_count',
      render: (c) => (
        <Text fontSize='xs'>
          👍 {c.likes} | 💬 {c.comments}
        </Text>
      ),
    },
    {
      label: 'Created',
      key: 'createdAt',
      render: (v) => new Date(v).toLocaleDateString(),
    },
  ];

  if (isLoading) return <LoadingState />;
  return (
    <AdminTableWrapper title='Posts' hasData={!!res?.data?.length}>
      <DataTable columns={columns} data={res?.data ?? []} />
      <PaginationControl pagination={res?.pagination} onPageChange={setPage} />
    </AdminTableWrapper>
  );
}
