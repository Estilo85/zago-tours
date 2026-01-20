import Image from 'next/image';
import { Box, BoxProps } from '@chakra-ui/react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: BoxProps['width'];
  height?: BoxProps['height'];
  maxH?: BoxProps['height'];
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  borderRadius?: BoxProps['borderRadius'];
  boxShadow?: BoxProps['boxShadow'];
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  containerProps?: BoxProps;
}

export const ResponsiveImage = ({
  src,
  alt,
  width = '100%',
  height = '100%',
  maxH,
  objectFit = 'cover',
  borderRadius = '2xl',
  priority = false,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
  containerProps,
  boxShadow,
}: ResponsiveImageProps) => {
  return (
    <Box
      position='relative'
      width={width}
      height={height}
      maxH={maxH}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
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
      />
    </Box>
  );
};
