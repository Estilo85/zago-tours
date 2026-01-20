import Benefits from '@/components/event/Benefits';
import { EventHero } from '@/components/event/EventHero';
import EventSection from '@/components/event/EventSection';
import PlanSection from '@/components/event/PlanSection';
import SignatureEvents from '@/components/event/SignatureEvents';
import { Box } from '@chakra-ui/react';
import React from 'react';

export default function Events() {
  return (
    <Box>
      <EventHero />
      <SignatureEvents />
      <EventSection />
      <Benefits />
      <PlanSection />
    </Box>
  );
}
