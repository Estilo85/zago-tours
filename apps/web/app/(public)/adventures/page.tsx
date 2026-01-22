import { AdventureHero } from '@/components/adventure/AdventureHero';
import FormSection from '@/components/adventure/FormSection';
import TripTypeSection from '@/components/adventure/TripTypeSection';
import VerifiedAdventureSection from '@/components/adventure/VerifiedAdventureSection';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';
import { Box } from '@chakra-ui/react';
import React from 'react';

export default function Adventures() {
  return (
    <Box mb={10}>
      <AdventureHero />
      <TripTypeSection />
      <Box>
        <ResponsiveImage
          src='/images/adventures/adventure-section.webp'
          alt='adventure image'
        />
      </Box>
      <VerifiedAdventureSection />
      <Box width='full' my={10}>
        <ResponsiveImage
          src='/images/adventures/adventure-section.webp'
          alt='price plan image'
          height='500px'
          objectFit='cover'
          borderRadius='none'
        />
      </Box>

      <FormSection />
    </Box>
  );
}
