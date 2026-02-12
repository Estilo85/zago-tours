'use client';
import Image from 'next/image';
import { Box, BoxProps, Text } from '@chakra-ui/react';

interface ResponsiveImageProps {
  src?: string; // Make optional
  alt: string;
  width?: BoxProps['width'];
  maxW?: '100%';
  height?: BoxProps['height'];
  maxH?: BoxProps['height'];
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  borderRadius?: BoxProps['borderRadius'];
  boxShadow?: BoxProps['boxShadow'];
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  containerProps?: BoxProps;
  fallbackBg?: string;
  objectPosition?: string;
}

export const ResponsiveImage = ({
  src,
  alt,
  width = '100%',
  maxW = '100%',
  height = '100%',
  maxH,
  objectFit = 'cover',
  borderRadius = '2xl',
  priority = false,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
  containerProps,
  boxShadow,
  objectPosition = 'center',
  fallbackBg = 'gray.100',
}: ResponsiveImageProps) => {
  if (!src) {
    return (
      <Box
        position='relative'
        width={width}
        height={height}
        maxH={maxH}
        borderRadius={borderRadius}
        boxShadow={boxShadow}
        overflow='hidden'
        bg={fallbackBg}
        display='flex'
        alignItems='center'
        justifyContent='center'
        {...containerProps}
      >
        <Text color='gray.500' fontSize='sm' textAlign='center' px={4}>
          No Image Available
        </Text>
      </Box>
    );
  }

  return (
    <Box
      position='relative'
      width={width}
      height={height}
      maxH={maxH}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      objectPosition={objectPosition}
      overflow='hidden'
      {...containerProps}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        sizes={sizes}
        style={{ objectFit }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </Box>
  );
};
