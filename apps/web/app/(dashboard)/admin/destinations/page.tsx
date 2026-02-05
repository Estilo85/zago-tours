'use client';
import { useState } from 'react';
import { Badge, Text, IconButton } from '@chakra-ui/react';
import { Column, DataTable } from '../../_components/table/DataTable';
import { DestinationCountryResponseDto } from '@zagotours/types';
import { useCountries } from '@/hooks';
import { Pencil } from 'lucide-react';
import { LoadingState } from '@/components/ui/LoadingState';
import AdminTableWrapper from '../../_components/table/AdminTableWrapper';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';

export default function DashboardDestinationCountriesPage() {
  const [page, setPage] = useState(1);
  const { data: res, isLoading } = useCountries({ page });

  const columns: Column<DestinationCountryResponseDto>[] = [
    {
      label: 'Country Name',
      key: 'name',
      render: (v) => <Text fontWeight='bold'>{v}</Text>,
    },
    { label: 'Code', key: 'code', render: (v) => v || 'N/A' },
    {
      label: 'Status',
      key: 'isActive',
      render: (v) => (
        <Badge colorPalette={v ? 'green' : 'red'}>
          {v ? 'Active' : 'Hidden'}
        </Badge>
      ),
    },
    {
      label: 'Actions',
      key: 'id',
      render: () => (
        <IconButton aria-label='Edit' variant='ghost' size='sm'>
          <Pencil size={14} />
        </IconButton>
      ),
    },
  ];

  if (isLoading) return <LoadingState />;
  return (
    <AdminTableWrapper title='Destinations' hasData={!!res?.data?.length}>
      <DataTable columns={columns} data={res?.data ?? []} />
      <PaginationControl pagination={res?.pagination} onPageChange={setPage} />
    </AdminTableWrapper>
  );
}
