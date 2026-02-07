'use client';

import { Box, Flex, Field, Text } from '@chakra-ui/react';
import { MapPin, Tag, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PostResponseDto } from '@zagotours/types';
import { SearchBar } from '../ui/search/Search';
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
          <Field.Root>
            <Field.Label fontSize='xs' fontWeight='bold' mb={0}>
              Username
            </Field.Label>
            <Text
              display='flex'
              alignItems='center'
              gap={1}
              fontSize='xs'
              fontWeight='medium'
              py={1}
            >
              <User size={14} />
              {userName}
            </Text>
          </Field.Root>
        </Box>

        {/* Location */}
        <Box flex={1}>
          <Field.Root>
            <Field.Label
              fontSize='xs'
              fontWeight='bold'
              display='flex'
              alignItems='center'
              gap={1}
              mb={0}
            >
              <MapPin size={14} /> Location
            </Field.Label>
            <SelectInput
              value={location}
              onChange={setLocation}
              placeholder='All Locations'
              options={[
                { label: 'London', value: 'london' },
                { label: 'New York', value: 'ny' },
              ]}
            />
          </Field.Root>
        </Box>

        {/* Interest */}
        <Box flex={1}>
          <Field.Root>
            <Field.Label
              fontSize='xs'
              fontWeight='bold'
              display='flex'
              alignItems='center'
              gap={1}
              mb={0}
            >
              <Tag size={14} /> Interest
            </Field.Label>
            <SelectInput
              value={selectedTitle}
              onChange={setSelectedTitle}
              placeholder='All Titles'
              options={[...new Set(posts.map((p) => p.title))].map((title) => ({
                label: title,
                value: title,
              }))}
            />
          </Field.Root>
        </Box>

        {/* Search */}
        <Box flex={2}>
          <SearchBar
            placeholder='Search stories...'
            // value={searchQuery}
            onSearch={(val) => setSearchQuery(val)}
          />
        </Box>
      </Flex>
    </Box>
  );
}
