'use client';

import Benefits from '@/components/event/Benefits';
import { EventHero } from '@/components/event/EventHero';
import EventSection from '@/components/event/EventSection';
import { PricingSection } from '@/components/event/PricingSection';
import SignatureEventsSection from '@/components/event/SignatureEventsSection';
import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Box>
      <EventHero />
      <SignatureEventsSection />
      <Box bg='surface' py={16} my={9}>
        <Benefits />
        <EventSection
          searchQuery={searchQuery}
          selectedLocation={selectedLocation}
          selectedDate={selectedDate}
        />
      </Box>
      <PricingSection />
    </Box>
  );
}
