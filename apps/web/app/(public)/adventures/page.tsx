import { AdventureHero } from '@/components/adventure/AdventureHero';
import FormSection from '@/components/adventure/FormSection';
import TripTypeSection from '@/components/adventure/TripTypeSection';
import VerifiedAdventureSection from '@/components/adventure/VerifiedAdventureSection';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { Stack, Box } from '@chakra-ui/react';
import React from 'react';

export default function Adventures() {
  return (
    <Stack mb={16} spaceY={16}>
      <AdventureHero />
      <TripTypeSection />
      <Box>
        <ResponsiveImage
          src='/images/adventures/adventure-section.webp'
          alt='adventure image'
        />
      </Box>
      <VerifiedAdventureSection />

      <FormSection />
    </Stack>
  );
}
