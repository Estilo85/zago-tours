import { Banner, HowItWorks, StatsBanner } from '@/components/home';
import { Stack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Stack gap={5} py={5}>
      <Banner />
      <StatsBanner />
      <HowItWorks />
    </Stack>
  );
}
