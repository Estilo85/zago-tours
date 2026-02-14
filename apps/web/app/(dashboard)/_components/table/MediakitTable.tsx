'use client';

import { useState } from 'react';
import { Box, Text, HStack, IconButton, Menu, Portal } from '@chakra-ui/react';
import { MoreVertical, FileText } from 'lucide-react';
import { Column, DataTable } from '../table/DataTable';
import AdminTableWrapper from '../table/AdminTableWrapper';
import { DataTableSkeleton } from '../table/Datatableskeleton';
import { formatDate } from '@/utils/DateFormat';

// Define your MediaKit type based on your API response
interface MediaKit {
  id: string;
  adventureName: string;
  createdAt: string;
}

export function MediaKitTable() {
  // Replace with your actual hook
  // const { data: response, isLoading, error } = useMediaKits();
  // const mediaKits = response?.data || [];

  // Mock data for demonstration
  const isLoading = false;
  const error = null;
  const mediaKits: MediaKit[] = [
    {
      id: '1',
      adventureName: 'Safari Adventure Kenya',
      createdAt: '2026-02-10T10:00:00Z',
    },
    {
      id: '2',
      adventureName: 'Mountain Hiking Nepal',
      createdAt: '2026-02-12T14:30:00Z',
    },
  ];

  const handleView = (mediaKit: MediaKit) => {
    // Handle view logic - maybe open a modal or navigate to detail page
    console.log('View media kit:', mediaKit);
  };

  const handleDownload = (mediaKit: MediaKit) => {
    // Handle download logic - call your API endpoint
    console.log('Download media kit:', mediaKit);
  };

  const columns: Column<MediaKit>[] = [
    {
      label: 'Adventure Name',
      key: 'adventureName',
      render: (adventureName) => (
        <Text fontWeight='medium'>{adventureName || 'N/A'}</Text>
      ),
    },
    {
      label: 'Date',
      key: 'createdAt',
      render: (createdAt) => <Text fontSize='sm'>{formatDate(createdAt)}</Text>,
    },
    {
      label: 'Action',
      key: 'id',
      width: 'fit-content',
      render: (_, row) => (
        <HStack gap={2} justifyContent='flex-end'>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton size='sm' variant='ghost' aria-label='More options'>
                <MoreVertical size={18} />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value='view' onClick={() => handleView(row)}>
                    View
                  </Menu.Item>
                  <Menu.Item
                    value='download'
                    onClick={() => handleDownload(row)}
                  >
                    Download
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box p={8}>
        <DataTableSkeleton columns={3} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Text color='red.500'>
          Failed to load media kits. Please try again.
        </Text>
      </Box>
    );
  }

  return (
    <AdminTableWrapper
      title='Media Kit'
      hasData={mediaKits.length > 0}
      emptyIcon={<FileText size={48} />}
      emptyText='No media kits available. Media kits will appear here once adventures are created.'
    >
      <DataTable columns={columns} data={mediaKits} />
    </AdminTableWrapper>
  );
}
