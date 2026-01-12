'use client';

import { Flex, Input, Box, IconButton } from '@chakra-ui/react';
import { LuSearch, LuX } from 'react-icons/lu';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  width?: string | object;
}

export const CustomSearchBar = ({
  placeholder = 'Search...',
  onSearch,
  width = 'full',
}: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
    if (onSearch) onSearch('');
  };

  return (
    <Box width={width} maxW='600px'>
      <Flex
        align='center'
        bg='gray.50'
        px={4}
        borderRadius='full'
        border='0.5px solid'
        borderColor='primary'
        _focusWithin={{
          borderColor: 'primary',
          bg: 'white',
          ring: '0.5px',
          ringColor: 'primary',
        }}
        transition='all 0.2s'
      >
        {/* Search Icon */}
        <LuSearch color='gray' size='18px' />

        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch?.(e.target.value);
          }}
          placeholder={placeholder}
          px={3}
          fontSize='md'
          border='none'
          outline='none'
          _focus={{
            boxShadow: 'none',
            border: 'none',
          }}
          _placeholder={{ color: 'gray.500' }}
          bg='transparent'
        />

        {value && (
          <IconButton
            aria-label='Clear search'
            variant='ghost'
            size='xs'
            onClick={handleClear}
            color='gray.400'
            _hover={{ color: 'red.500', bg: 'transparent' }}
          >
            <LuX />
          </IconButton>
        )}
      </Flex>
    </Box>
  );
};
