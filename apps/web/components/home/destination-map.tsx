import { Box } from '@chakra-ui/react';
import React from 'react';
import { ResponsiveImage } from '../media/ResponsiveImage';

export const DestinationMap = () => {
  return (
    <Box>
      <ResponsiveImage
        src='/images/map/map-bg.webp'
        alt='map image'
        width='100%'
        height='500px'
        borderRadius='none'
      />
    </Box>
  );
};
