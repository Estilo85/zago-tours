'use client';

import { Box, Flex, Field, Text } from '@chakra-ui/react';
import { MapPin, Tag, User, LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PostResponseDto } from '@zagotours/types';
import { SearchBar } from '../ui/searchbar/Search';
import { SelectInput } from '../ui/input/SelectInput';

interface FilterProps {
  posts: PostResponseDto[];
  userName?: string;
  onFilterResults: (filtered: PostResponseDto[]) => void;
}

export function PostFilterBar({
  posts,
  userName,
  onFilterResults,
}: FilterProps) {
  const [location, setLocation] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTitle = selectedTitle === '' || post.title === selectedTitle;
      return matchesSearch && matchesTitle;
    });
    onFilterResults(filtered);
  }, [searchQuery, selectedTitle, location, posts]);

  // Helper component to keep the UI clean
  const FilterField = ({
    label,
    icon: Icon,
    children,
  }: {
    label: string;
    icon: LucideIcon;
    children: React.ReactNode;
  }) => (
    <Field.Root>
      <Field.Label
        fontSize='xs'
        fontWeight='bold'
        display='flex'
        alignItems='center'
        gap={1}
        mb={0}
      >
        <Icon size={14} /> {label}
      </Field.Label>
      {children}
    </Field.Root>
  );

  return (
    <Box
      w='full'
      p={4}
      bg='white'
      borderRadius='xl'
      borderWidth='1px'
      borderColor='gray.100'
      my={6}
    >
      <Flex gap={6} align='flex-end' wrap={{ base: 'wrap', md: 'nowrap' }}>
        {/* Username */}
        <Box flex={1}>
          <FilterField label='Username' icon={User}>
            <Text fontSize='xs' fontWeight='medium' py={1}>
              {userName || 'Guest'}
            </Text>
          </FilterField>
        </Box>

        {/* Location */}
        <Box flex={1}>
          <FilterField label='Location' icon={MapPin}>
            <SelectInput
              value={location}
              onChange={setLocation}
              placeholder='All Locations'
              options={[
                { label: 'London', value: 'london' },
                { label: 'New York', value: 'ny' },
              ]}
            />
          </FilterField>
        </Box>

        {/* Interest */}
        <Box flex={1}>
          <FilterField label='Interest' icon={Tag}>
            <SelectInput
              value={selectedTitle}
              onChange={setSelectedTitle}
              placeholder='All Titles'
              options={[...new Set(posts.map((p) => p.title))].map((title) => ({
                label: title,
                value: title,
              }))}
            />
          </FilterField>
        </Box>

        {/* Search */}
        <Box flex={2}>
          <SearchBar
            placeholder='Search stories...'
            value={searchQuery}
            onSearch={(val) => setSearchQuery(val)}
          />
        </Box>
      </Flex>
    </Box>
  );
}
