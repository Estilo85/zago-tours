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
  Icon,
  Flex,
  Input,
  IconButton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import { Send } from 'lucide-react';

const pages = [
  { label: 'Home', href: '/' },
  { label: 'Story', href: '#' },
  { label: 'Adventure', href: '#' },
  { label: 'Event', href: '#' },
  { label: 'Community', href: '#' },
];

const support = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Condition', href: '#' },
  { label: 'Safety Release Form', href: '#' },
];

export const Footer = () => {
  return (
    <Box bg='primary' color='white' mt='auto'>
      <Container maxW='1200px' p={10}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 5 }}
          // gap={{ base: 8, md: 10 }}
        >
          {/* Brand Section */}
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Flex alignItems='center' gap={2}>
              <Icon as={FaFacebook} boxSize={24} />
              <Heading>Zago</Heading>
            </Flex>
            <Text>
              321-323 High Road, <br /> Chadwell Health, Essex
            </Text>
            <Flex align='center' gap={8}>
              <Icon as={FaInstagram} boxSize={24} cursor='pointer' />
              <Icon as={FaLinkedin} boxSize={24} cursor='pointer' />
              <Icon as={FaTiktok} boxSize={24} cursor='pointer' />
              <Icon as={FaYoutube} boxSize={24} cursor='pointer' />
            </Flex>
          </Stack>

          {/* Email Section */}
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight='bold'>Join Movement</Text>
            <Box position='relative' maxW='fit-content'>
              <Input
                placeholder='Enter your email...'
                size='lg'
                h='40px'
                pr='56px'
                borderRadius='20px'
                bg='dark'
                color='white'
                _focus={{
                  boxShadow: 'none',
                }}
              />

              <IconButton
                aria-label='Send-Mail'
                // rounded='full'
                position='absolute'
                right='4px'
                top='50%'
                transform='translateY(-50%)'
                h='40px'
                w='40px'
                borderRadius='50%'
                colorPalette='red'
                // bg='secondary'
                cursor='pointer'
              >
                <Send size={12} />
              </IconButton>
            </Box>
          </Stack>

          {/* Destination Links */}
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight='bold' mb={2}>
              Pages
            </Text>
            {pages.map((link, index) => (
              <ChakraLink
                key={index}
                as={NextLink}
                href={link.href}
                textDecoration='none'
              >
                {link.label}
              </ChakraLink>
            ))}
          </Stack>

          {/* Support Links */}
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight='bold' mb={2}>
              Support
            </Text>
            {support.map((link, index) => (
              <ChakraLink
                key={index}
                as={NextLink}
                href={link.href}
                textDecoration='none'
              >
                {link.label}
              </ChakraLink>
            ))}
          </Stack>

          {/* Social/Contact */}
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight='bold' mb={2}>
              Contact Us
            </Text>
            <Text>Email: info@zagotours.com</Text>
            <Text>Phone: +1 (555) 000-0000</Text>
          </Stack>
        </SimpleGrid>

        <Separator my={8} borderColor='gray.200' />

        <Stack align={{ base: 'center', md: 'flex-start' }}>
          <Text>
            Safety as a Sysytem <sup>TM</sup>{' '}
          </Text>
          <Text>
            © {new Date().getFullYear()} ZagoTours. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};
