'use client';

import { Box, Flex, Field, Text, HStack, Separator } from '@chakra-ui/react';
import { MapPin, SwatchBook, Tag, User, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PostResponseDto } from '@zagotours/types';
import { SearchBar } from '../ui/search/Search';
import { SelectInput } from '../ui/input/SelectInput';

// Your scattered country list for the dropdown
const COUNTRY_OPTIONS = [
  { label: 'Chile', value: 'Chile' },
  { label: 'Peru', value: 'Peru Nepal' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'United States', value: 'United States' },
  { label: 'Ecuador', value: 'Ecuador' },
  { label: 'Puerto Rico', value: 'Puerto Rico' },
  { label: 'Tibet', value: 'Tibet Bhutan' },
  { label: 'India', value: 'India' },
  { label: 'Tanzania', value: 'Tanzania' },
  { label: 'Uganda', value: 'Uganda' },
  { label: 'Mauritius', value: 'Mauritius' },
  { label: 'Kenya', value: 'Kenya South' },
  { label: 'South Africa', value: 'Africa' },
  { label: 'Panama', value: 'Panama' },
  { label: 'Philippines', value: 'Philippines' },
];

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

      const matchesLocation = location === '' || post.user.country === location;

      return matchesSearch && matchesTitle && matchesLocation;
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
      <Flex align={{ base: 'center', md: 'flex-end' }} justify='space-between'>
        <HStack gap={6} display={{ base: 'none', md: 'flex' }}>
          {/* Username Display */}
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
                <User size={14} /> {userName}
              </Text>
            </Field.Root>
          </Box>

          {/* Location Filter with your Country List */}
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
                Location
              </Field.Label>
              <HStack>
                <MapPin size={14} />
                <SelectInput
                  value={location}
                  onChange={setLocation}
                  placeholder='All Locations'
                  width='150px'
                  options={COUNTRY_OPTIONS}
                />
              </HStack>
            </Field.Root>
          </Box>

          <Separator orientation='vertical' h='50px' />

          {/* Interest Filter */}
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
                Interest
              </Field.Label>
              <HStack>
                <Tag size={14} />
                <SelectInput
                  value={selectedTitle}
                  onChange={setSelectedTitle}
                  placeholder='All Titles'
                  width='150px'
                  options={[...new Set(posts.map((p) => p.title))].map(
                    (title) => ({
                      label: title,
                      value: title,
                    }),
                  )}
                />
              </HStack>
            </Field.Root>
          </Box>
        </HStack>

        {/* Mobile Icons */}
        <HStack gap={4} display={{ base: 'flex', md: 'none' }}>
          <Users size={32} />
          <SwatchBook size={32} />
        </HStack>

        {/* Search Input */}
        <Box>
          <SearchBar
            placeholder='Search stories...'
            width={{ base: '130px', md: '200px' }}
            onSearch={(val) => setSearchQuery(val)}
          />
        </Box>
      </Flex>
    </Box>
  );
}
