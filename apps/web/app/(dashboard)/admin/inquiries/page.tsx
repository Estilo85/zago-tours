'use client';

import React from 'react';
import { Text, HStack, IconButton } from '@chakra-ui/react';
import { Eye, Trash2, Mail } from 'lucide-react';
import { useInquiries } from '@/hooks';
import { Column, DataTable } from '../../_components/table/DataTable';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';
import { LoadingState } from '@/components/ui/LoadingState';
import { GeneralInquiryResponseDto } from '@zagotours/types';
import AdminTableWrapper from '../../_components/table/AdminTableWrapper';

export default function DashboardEnquiriesPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: response, isLoading } = useInquiries({ page: currentPage });

  const columns: Column<GeneralInquiryResponseDto>[] = [
    {
      label: 'Email Address',
      key: 'email',
      render: (email) => (
        <Text fontWeight='medium' fontSize='sm'>
          {email}
        </Text>
      ),
    },
    {
      label: 'Message',
      key: 'message',
      render: (v) => (
        <Text truncate maxW='400px' fontSize='sm' color='fg.muted'>
          {v}
        </Text>
      ),
    },
    {
      label: 'Date',
      key: 'createdAt',
      render: (v) => new Date(v).toLocaleDateString(),
    },
    {
      label: 'Actions',
      key: 'id',
      render: () => (
        <HStack gap={2} justify='end'>
          <IconButton aria-label='View' variant='ghost' size='sm'>
            <Eye size={16} />
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
      title='General Inquiries'
      hasData={!!response?.data?.length}
      emptyIcon={<Mail size={40} />}
      emptyText='No inquiries from the contact form yet.'
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
