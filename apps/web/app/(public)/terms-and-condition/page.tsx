import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
  Separator,
} from '@chakra-ui/react';

export default function TermsAndConditions() {
  return (
    <Box bg='gray.50' minH='100vh' py={{ base: 8, md: 16 }}>
      <Container maxW='4xl'>
        <VStack gap={8} align='stretch'>
          {/* Header */}
          <Box textAlign='center'>
            <Heading
              as='h1'
              fontSize={{ base: '2xl', md: '4xl' }}
              color='primary'
              mb={2}
            >
              Terms and Conditions
            </Heading>
            <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
              Last updated: February 4, 2026
            </Text>
          </Box>

          <Separator />

          {/* Content */}
          <Box bg='white' p={{ base: 6, md: 10 }} borderRadius='xl' shadow='sm'>
            <VStack gap={6} align='stretch'>
              {/* Introduction */}
              <Box>
                <Heading
                  as='h2'
                  fontSize={{ base: 'lg', md: '2xl' }}
                  color='gray.800'
                  mb={3}
                >
                  Welcome to Zago Tours
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  These Terms and Conditions govern your use of Zago Tours
                  services, including tour bookings, community platform (Zago
                  Voice), and all related features. By using our services, you
                  agree to these terms. Please read them carefully.
                </Text>
              </Box>

              {/* Acceptance of Terms */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  1. Acceptance of Terms
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  By accessing or using Zago Tours, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms
                  and Conditions. If you do not agree, please do not use our
                  services.
                </Text>
              </Box>

              {/* Booking and Payment */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  2. Booking and Payment
                </Heading>
                <Stack gap={3}>
                  <Text color='gray.700' lineHeight='tall'>
                    <strong>Booking Confirmation:</strong> All tour bookings are
                    subject to availability. A booking is confirmed only after
                    you receive a confirmation email from us.
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    <strong>Payment:</strong> Full or partial payment may be
                    required at the time of booking. We accept major credit
                    cards and other payment methods as indicated on our
                    platform.
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    <strong>Pricing:</strong> All prices are listed in the
                    currency shown and are subject to change without notice.
                    Prices include applicable taxes unless stated otherwise.
                  </Text>
                </Stack>
              </Box>

              {/* Cancellation and Refunds */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  3. Cancellation and Refunds
                </Heading>
                <Stack gap={3}>
                  <Text color='gray.700' lineHeight='tall'>
                    • Cancellations made 30+ days before departure: Full refund
                    minus processing fee
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Cancellations made 15-29 days before departure: 50% refund
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Cancellations made less than 15 days before departure: No
                    refund
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Refunds are processed within 14 business days to the
                    original payment method
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Zago Tours reserves the right to cancel tours due to
                    insufficient bookings or unforeseen circumstances, with full
                    refunds issued
                  </Text>
                </Stack>
              </Box>

              {/* Travel Requirements */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  4. Travel Requirements
                </Heading>
                <Stack gap={3}>
                  <Text color='gray.700' lineHeight='tall'>
                    • You are responsible for obtaining valid passports, visas,
                    and travel documents
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • You must comply with all health and vaccination
                    requirements for your destination
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Travel insurance is highly recommended and may be
                    mandatory for certain tours
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • You must be physically fit for the activities included in
                    your tour
                  </Text>
                </Stack>
              </Box>

              {/* Liability and Insurance */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  5. Liability and Insurance
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  Zago Tours acts as an intermediary between you and tour
                  operators. We are not liable for injuries, losses, damages, or
                  delays caused by third-party service providers, natural
                  disasters, or unforeseen events. We strongly recommend
                  purchasing comprehensive travel insurance.
                </Text>
              </Box>

              {/* Community Guidelines (Zago Voice) */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  6. Community Guidelines (Zago Voice)
                </Heading>
                <Stack gap={3}>
                  <Text color='gray.700' lineHeight='tall'>
                    • Be respectful and courteous to all community members
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Do not post offensive, discriminatory, or illegal content
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Respect intellectual property rights when sharing photos
                    and content
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Spam, advertising, and self-promotion are prohibited
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • We reserve the right to remove content and suspend
                    accounts that violate these guidelines
                  </Text>
                </Stack>
              </Box>

              {/* Intellectual Property */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  7. Intellectual Property
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  All content on Zago Tours, including text, images, logos, and
                  software, is owned by Zago Tours or our licensors. You may not
                  copy, reproduce, or distribute our content without written
                  permission.
                </Text>
              </Box>

              {/* Changes to Terms */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  8. Changes to Terms
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  We reserve the right to modify these Terms and Conditions at
                  any time. Changes will be posted on this page with an updated
                  "Last updated" date. Continued use of our services after
                  changes constitutes acceptance of the new terms.
                </Text>
              </Box>

              {/* Governing Law */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  9. Governing Law
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  These Terms and Conditions are governed by the laws of
                  Nigeria. Any disputes shall be resolved in the courts of
                  Nigeria.
                </Text>
              </Box>

              {/* Contact Information */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  10. Contact Information
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  For questions about these Terms and Conditions, please contact
                  us at:
                  <br />
                  Email: support@zagotours.com
                  <br />
                  Address: Zago Tours Headquarters, Ibadan, Nigeria
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
