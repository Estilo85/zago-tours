'use client';

import {
  Box,
  Container,
  Stack,
  Text,
  Heading,
  SimpleGrid,
  Link as ChakraLink,
  Separator,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export const Footer = () => {
  return (
    <Box bg='primary' color='gray.700' mt='auto'>
      <Container maxW='1200px' py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spaceX={8}>
          {/* Brand Section */}
          <Stack spaceY={4}>
            <Heading size='md' color='blue.600'>
              ZagoTours
            </Heading>
            <Text fontSize='sm'>
              Making your travel adventures seamless and unforgettable since
              2024.
            </Text>
          </Stack>

          {/* Destination Links */}
          <Stack align='flex-start'>
            <Text fontWeight='bold' mb={2}>
              Destinations
            </Text>
            <ChakraLink as={NextLink} href='/posts/europe'>
              Europe
            </ChakraLink>
            <ChakraLink as={NextLink} href='/posts/africa'>
              Africa
            </ChakraLink>
            <ChakraLink as={NextLink} href='/posts/asia'>
              Asia
            </ChakraLink>
          </Stack>

          {/* Support Links */}
          <Stack align='flex-start'>
            <Text fontWeight='bold' mb={2}>
              Support
            </Text>
            <ChakraLink as={NextLink} href='/help'>
              Help Center
            </ChakraLink>
            <ChakraLink as={NextLink} href='/terms'>
              Terms of Service
            </ChakraLink>
            <ChakraLink as={NextLink} href='/privacy'>
              Privacy Policy
            </ChakraLink>
          </Stack>

          {/* Social/Contact */}
          <Stack align='flex-start'>
            <Text fontWeight='bold' mb={2}>
              Contact Us
            </Text>
            <Text fontSize='sm'>Email: info@zagotours.com</Text>
            <Text fontSize='sm'>Phone: +1 (555) 000-0000</Text>
          </Stack>
        </SimpleGrid>

        <Separator my={8} borderColor='gray.200' />

        <Box textAlign='center'>
          <Text fontSize='sm'>
            © {new Date().getFullYear()} ZagoTours. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
