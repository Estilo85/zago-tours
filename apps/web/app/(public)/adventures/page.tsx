import { AdventureHero } from '@/components/adventure/AdventureHero';
import TripTypeSection from '@/components/adventure/TripTypeSection';
import VerifiedAdventureSection from '@/components/adventure/VerifiedAdventureSection';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { Box } from '@chakra-ui/react';
import React from 'react';

export default function Adventures() {
  return (
    <Box>
      <AdventureHero />
      <TripTypeSection />
      <Box>
        <ResponsiveImage
          src='/images/adventures/adventure-section.webp'
          alt='adventure image'
        />
      </Box>
      <VerifiedAdventureSection />
    </Box>
  );
}
