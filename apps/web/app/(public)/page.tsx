import {
  DestinationMap,
  FeaturedAdventures,
  HowItWorks,
  StatsBanner,
  Testimonials,
  WhyChooseUs,
} from '@/components/home';
import { HomeBanner } from '@/components/home/banner';
import { Stack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Stack gap={5} py={5}>
      <HomeBanner />
      <StatsBanner />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedAdventures />
      <Testimonials />
      <DestinationMap />
    </Stack>
  );
}
