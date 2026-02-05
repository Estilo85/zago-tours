'use client';

import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Text,
  Badge,
  VStack,
  IconButton,
  Center,
  Stack,
} from '@chakra-ui/react';
import { useUsers } from '@/hooks';
import { Column, DataTable } from '../../_components/table/DataTable';
import { AvatarImage } from '@/components/media/AvatarImage';
import { PaginationControl } from '@/components/ui/pagination/PaginationControl';
import { Eye, Pencil, Trash2, Users } from 'lucide-react';
import { LoadingState } from '@/components/ui/LoadingState';
import { User } from '@zagotours/types';

export default function UsersAdminPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    data: response,
    isLoading,
    isError,
  } = useUsers({ page: currentPage });

  const handleAction = (type: 'view' | 'edit' | 'delete', user: User) => {
    console.log(`${type} action on:`, user.id);
  };

  const columns: Column<User>[] = [
    {
      label: 'User',
      key: 'name',
      render: (_, user) => (
        <HStack gap={3}>
          <AvatarImage src={user.image} name={user.name} size='sm' />
          <VStack align='start' gap={0}>
            <Text fontWeight='medium' fontSize='sm'>
              {user.name}
            </Text>
            <Text fontSize='xs' color='fg.muted'>
              {user.email}
            </Text>
          </VStack>
        </HStack>
      ),
    },
    {
      label: 'Role',
      key: 'role',
      render: (role) => (
        <Badge variant='subtle' colorPalette='blue'>
          {role?.replace('_', ' ') ?? 'N/A'}
        </Badge>
      ),
    },
    {
      label: 'Status',
      key: 'status',
      render: (status) => (
        <Badge
          variant='solid'
          colorPalette={status === 'ACTIVE' ? 'green' : 'red'}
        >
          {status}
        </Badge>
      ),
    },
    {
      label: 'Actions',
      key: 'id',
      render: (_, user) => (
        <HStack gap={2} justify='end'>
          <IconButton
            aria-label='View User'
            variant='ghost'
            size='sm'
            onClick={() => handleAction('view', user)}
          >
            <Eye size={16} />
          </IconButton>

          <IconButton
            aria-label='Edit User'
            variant='ghost'
            size='sm'
            colorPalette='blue'
            onClick={() => handleAction('edit', user)}
          >
            <Pencil size={16} />
          </IconButton>

          <IconButton
            aria-label='Delete User'
            variant='ghost'
            size='sm'
            colorPalette='red'
            onClick={() => handleAction('delete', user)}
          >
            <Trash2 size={16} />
          </IconButton>
        </HStack>
      ),
    },
  ];

  if (isLoading) return <LoadingState />;

  if (isError) return (
    <Center h="400px">
      <Text color="red.500">Failed to load users. Please check your connection.</Text>
    </Center>
  );

  const hasData = response?.data && response.data.length > 0;

  return (
    <Box p={8} bg='bg.canvas' minH="100vh">
      <Heading size='lg' mb={6}>
        User Management
      </Heading>

      <Box
        border='1px solid'
        borderColor='border.subtle'
        borderRadius='md'
        bg='bg.panel'
        overflow="hidden"
      >
        {hasData ? (
          <>
            <DataTable columns={columns} data={response.data} />
            {response?.pagination && (
              <Box borderTopWidth="1px" py={4}>
                <PaginationControl
                  pagination={response.pagination}
                  onPageChange={setCurrentPage}
                />
              </Box>
            )}
          </>
        ) : (
          /* Empty State Case */
          <Center py={20}>
            <VStack gap={4} textAlign="center">
              <Box 
                p={4} 
                bg="gray.50" 
                borderRadius="full" 
                color="gray.400"
              >
                <Users size={40} />
              </Box>
              <Stack gap={1}>
                <Text fontWeight="semibold" fontSize="lg">No users found</Text>
                <Text color="fg.muted" maxW="sm">
                  There are currently no users in the system. When users join Zago Tours, they will appear here.
                </Text>
              </Stack>
            </VStack>
          </Center>
        )}
      </Box>
    </Box>
  );
}