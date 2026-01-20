'use client';

import { Box, NativeSelect, Flex, Field, VStack, Text } from '@chakra-ui/react';
import { MapPin, Search, Tag, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PostResponseDto } from '@zagotours/types';
import { SearchBar } from '../ui/searchbar/Search';
import { AvatarImage } from '../media/AvatarImage';

interface FilterProps {
  posts: PostResponseDto[];
  userName?: string;
  userImage?: string;
  onFilterResults: (filtered: PostResponseDto[]) => void;
}

export function PostFilterBar({
  posts,
  userImage,
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
      mb={4}
    >
      <Flex gap={6} align='flex-end' wrap={{ base: 'wrap', md: 'nowrap' }}>
        {/* 1. User Info */}
        <VStack align='center' minW='100px' gap={1}>
          <Text
            fontSize='xs'
            fontWeight='bold'
            color='gray.700'
            textAlign='center'
          >
            Username
          </Text>
          <Flex align='center'>
            <User size={14} />
            <Text
              fontSize='xs'
              fontWeight='bold'
              color='gray.700'
              textAlign='center'
            >
              {userName}
            </Text>
          </Flex>
        </VStack>

        {/* 2. Location Select */}
        <Field.Root flex={1}>
          <Field.Label
            fontSize='xs'
            fontWeight='bold'
            display='flex'
            alignItems='center'
            gap={1}
          >
            <MapPin size={14} /> Location
          </Field.Label>
          <NativeSelect.Root size='sm'>
            <NativeSelect.Field
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value=''>All Locations</option>
              <option value='london'>London</option>
              <option value='ny'>New York</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Field.Root>

        {/* 3. Title Select */}
        <Field.Root flex={1}>
          <Field.Label
            fontSize='xs'
            fontWeight='bold'
            display='flex'
            alignItems='center'
            gap={1}
          >
            <Tag size={14} /> Interest
          </Field.Label>
          <NativeSelect.Root size='sm'>
            <NativeSelect.Field
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
            >
              <option value=''>All Titles</option>
              {/* Unique titles from your post data */}
              {[...new Set(posts.map((p) => p.title))].map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Field.Root>
        <Field.Root flex={2}>
          <Field.Label
            fontSize='xs'
            fontWeight='bold'
            mb={2}
            display='flex'
            alignItems='center'
            gap={1}
          >
            <Search size={14} /> Search
          </Field.Label>
          <SearchBar
            placeholder='Search stories...'
            value={searchQuery}
            onSearch={(val) => setSearchQuery(val)}
          />
        </Field.Root>
      </Flex>
    </Box>
  );
}
