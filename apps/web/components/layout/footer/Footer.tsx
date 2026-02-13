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
import { navlinks } from '@/components/ui/navigation/navbar/nav.config';
import { AppLink } from '@/components/ui/link/AppLink';
import { ResponsiveImage } from '@/components/media/ResponsiveImage';

const support = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Condition', href: '/terms-and-condition' },
  { label: 'Safety Release Form', href: '#' },
];

export default function Footer() {
  return (
    <Box bg='primary' mt='auto' shadow='0 -10px 20px rgba(0,0,0,0.05)'>
      <Container maxW='1440px' p={{ base: 6, md: 10 }}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 6 }}
          gap={{ base: 8, md: 4 }}
        >
          {/* Brand Section */}
          <Stack>
            <Flex as='span' mt='-10px' alignItems='center' gap={3}>
              <ResponsiveImage
                src='/images/logo/zago logo png-03.webp'
                alt='ZagoTours Logo'
                width={{ base: '35px', md: '45px' }}
                height={{ base: '35px', md: '45px' }}
                objectFit='contain'
                borderRadius='none'
              />

              <Heading
                size={{ base: 'md', md: 'lg' }}
                fontWeight='bold'
                color='gray.200'
                letterSpacing='tight'
              >
                Zago
              </Heading>
            </Flex>
            <Text color='textPrimary'>
              73 Shelton Street <br />
              Covent Garden <br /> United Kingdom
            </Text>
            <Flex align='center' gap={2} color='textPrimary'>
              <AppLink href='https://www.instagram.com/zago.tours/'>
                <Icon
                  as={FaInstagram}
                  size={{ base: 'md', md: 'xl' }}
                  cursor='pointer'
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition='all 0.2s'
                  fill='gray.200'
                />
              </AppLink>
              <AppLink href='https://www.linkedin.com/company/zago-tours/'>
                <Icon
                  as={FaLinkedin}
                  size={{ base: 'md', md: 'xl' }}
                  cursor='pointer'
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition='all 0.2s'
                  fill='gray.200'
                />
              </AppLink>

              <AppLink href='https://www.tiktok.com/@zagotours?_r=1&_t=ZS-93g7ciMliOj'>
                <Icon
                  as={FaTiktok}
                  size={{ base: 'md', md: 'xl' }}
                  cursor='pointer'
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition='all 0.2s'
                  fill='gray.200'
                />
              </AppLink>

              <AppLink href='https://youtube.com/@zagotours?si=BKyylHr3Xffm9TDI'>
                <Icon
                  as={FaYoutube}
                  size={{ base: 'md', md: 'xl' }}
                  cursor='pointer'
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition='all 0.2s'
                  fill='gray.200'
                />
              </AppLink>
            </Flex>
          </Stack>

          {/* Email Section */}
          <Stack
            gridColumn={{ md: 'span 2' }}
            order={{ base: 0, md: 5 }}
            zIndex={1}
          >
            <Text fontWeight='bold' color='textInverse'>
              Join Movement
            </Text>
            <Box position='relative'>
              <Input
                placeholder='Enter  email...'
                size={{ base: 'sm', md: 'lg' }}
                w='full'
                pr='56px'
                borderRadius='20px'
                bg='dark'
                color='white'
                _focus={{
                  boxShadow: 'none',
                  borderColor: 'secondary',
                }}
              />

              <IconButton
                aria-label='Send-Mail'
                position='absolute'
                right='2px'
                top='50%'
                transform='translateY(-50%)'
                size='sm'
                borderRadius='50%'
                colorPalette='red'
                bg='secondary'
                cursor='pointer'
              >
                <Icon as={Send} color='dark' />
              </IconButton>
            </Box>
          </Stack>

          {/* Destination Links */}
          <Stack>
            <Text fontWeight='bold' mb={2} color='textInverse'>
              Pages
            </Text>
            {navlinks.map((link, index) => (
              <ChakraLink
                key={index}
                as={NextLink}
                href={link.href}
                textDecoration='none'
                color='textPrimary'
                _hover={{ color: 'secondary', transition: 'all 0.2s' }}
                fontSize='sm'
              >
                {link.label}
              </ChakraLink>
            ))}
          </Stack>

          {/* Support Links */}
          <Stack>
            <Text fontWeight='bold' mb={2} color='textInverse'>
              Support
            </Text>
            {support.map((link, index) => (
              <ChakraLink
                key={index}
                as={NextLink}
                href={link.href}
                textDecoration='none'
                color='textPrimary'
                _hover={{ color: 'secondary', transition: 'all 0.2s' }}
                fontSize='sm'
              >
                {link.label}
              </ChakraLink>
            ))}
          </Stack>

          {/* Social/Contact */}
          <Stack color='textPrimary'>
            <Text fontWeight='bold' mb={2} color='textInverse'>
              Contact Us
            </Text>
            <Text>Email: partnerships@zagotours.com</Text>
            <Text>Phone: +44-7418-627-748</Text>
          </Stack>
        </SimpleGrid>

        <Separator my={8} borderColor='gray.200' opacity={0.2} />

        <Stack color='textPrimary' textAlign={{ md: 'center' }}>
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
}
