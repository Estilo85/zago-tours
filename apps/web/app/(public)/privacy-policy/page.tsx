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

export default function PrivacyPolicy() {
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
              Privacy Policy
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
                  At Zago Tours, we are committed to protecting your privacy and
                  ensuring the security of your personal information. This
                  Privacy Policy explains how we collect, use, and safeguard
                  your data when you use our tour booking services and community
                  platform.
                </Text>
              </Box>

              {/* Information We Collect */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  Information We Collect
                </Heading>
                <Stack gap={3}>
                  <Text color='gray.700' lineHeight='tall'>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, billing address, and payment information when
                    you book tours or create an account.
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    <strong>Travel Preferences:</strong> Destination
                    preferences, travel dates, group size, and special
                    requirements to personalize your experience.
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    <strong>Community Activity:</strong> Posts, comments, likes,
                    shares, and uploaded media on Zago Voice community platform.
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    <strong>Technical Data:</strong> IP address, browser type,
                    device information, and cookies for website functionality
                    and analytics.
                  </Text>
                </Stack>
              </Box>

              {/* How We Use Your Information */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  How We Use Your Information
                </Heading>
                <Stack gap={3}>
                  <Text color='gray.700' lineHeight='tall'>
                    • Process and confirm your tour bookings and payments
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Send booking confirmations, itineraries, and important
                    travel updates
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Provide customer support and respond to your inquiries
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Improve our services and personalize your experience
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Send promotional offers and travel inspiration (with your
                    consent)
                  </Text>
                </Stack>
              </Box>

              {/* Data Security */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  Data Security
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  We implement industry-standard security measures including SSL
                  encryption, secure payment processing, and regular security
                  audits to protect your personal information. However, no
                  method of transmission over the internet is 100% secure, and
                  we cannot guarantee absolute security.
                </Text>
              </Box>

              {/* Sharing Your Information */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  Sharing Your Information
                </Heading>
                <Text color='gray.700' lineHeight='tall' mb={2}>
                  We may share your information with:
                </Text>
                <Stack gap={3}>
                  <Text color='gray.700' lineHeight='tall'>
                    • Tour operators and local guides to facilitate your
                    bookings
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Payment processors to complete transactions securely
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Service providers who assist in operating our platform
                  </Text>
                  <Text color='gray.700' lineHeight='tall'>
                    • Legal authorities when required by law
                  </Text>
                </Stack>
              </Box>

              {/* Your Rights */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  Your Rights
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  You have the right to access, update, or delete your personal
                  information. You may also opt-out of marketing communications
                  at any time. To exercise these rights, please contact us at
                  privacy@zagotours.com.
                </Text>
              </Box>

              {/* Contact Us */}
              <Box>
                <Heading
                  as='h3'
                  fontSize={{ base: 'md', md: 'xl' }}
                  color='gray.800'
                  mb={3}
                >
                  Contact Us
                </Heading>
                <Text color='gray.700' lineHeight='tall'>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                  <br />
                  Email: privacy@zagotours.com
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
