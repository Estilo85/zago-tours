import {
  Banner,
  DestinationMap,
  FeaturedAdventures,
  HowItWorks,
  StatsBanner,
  Testimonials,
  WhyChooseUs,
} from '@/components/home';
import { Stack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Stack gap={5} py={5}>
      <Banner />
      <StatsBanner />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedAdventures />
      <Testimonials />
      <DestinationMap />
    </Stack>
  );
}
