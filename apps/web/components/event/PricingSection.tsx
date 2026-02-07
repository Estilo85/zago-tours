import {
  SimpleGrid,
  Container,
  Stack,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react';
import { PricingCard } from '../ui/card/PricingCard';

export const PricingSection = () => {
  return (
    <Container maxW='6xl' my='16'>
      <Stack textAlign='center' my={10}>
        <Heading
          size={{ base: '2xl', md: '4xl' }}
          fontWeight='bold'
          color='primary'
        >
          Join the Safety Network
        </Heading>
        <Text textWrap='wrap'>
          Get 24/7 peace of mind wherever you travel. <br /> Our safety
          ambassadors are one call away, whether you need <br /> guidance,
          reassurance, or mediation.
        </Text>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
        <PricingCard
          title='Explorer'
          buttonText='Get started'
          price='$0'
          features={['1 Project', 'Basic Analytics', 'Community Support']}
        />
        <PricingCard
          title='Adventurer Plus'
          buttonText='Sign up now'
          price='$29'
          isActive={true}
          features={['Unlimited Projects', 'Advanced AI', 'Priority Support']}
        />
        <PricingCard
          title='Global Guardians'
          buttonText='Sign up now'
          price='$99'
          features={['Custom Solutions', 'Dedicated Manager', 'SLA Guarantee']}
        />
      </SimpleGrid>
    </Container>
  );
};
