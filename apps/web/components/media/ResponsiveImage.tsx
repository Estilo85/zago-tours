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
  priority = true,
  sizes = '100vw',
  containerProps,
  boxShadow,
}: ResponsiveImageProps) => {
  // Calculate sizes based on width if not provided
  const defaultSizes =
    !sizes && typeof width === 'string' && width.includes('%')
      ? `${width}`
      : sizes || '100vw';

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
        sizes={defaultSizes}
        style={{
          objectFit,
        }}
      />
    </Box>
  );
};
