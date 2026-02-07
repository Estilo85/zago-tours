'use client';

import { AppLink } from '@/components/ui/link/AppLink';
import { Box } from '@chakra-ui/react';
import React from 'react';

export default function MediaKits() {
  return (
    <Box>
      <AppLink
        href='https://docs.google.com/document/d/1DvSEd1Q3dPPV5P_AYgmofgOuOh2bTjG0fvoux6o4cuE/edit?usp=drivesdk'
        target='_blank'
        rel='noopener noreferrer'
      >
        View media kit online
      </AppLink>
    </Box>
  );
}
