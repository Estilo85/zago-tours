'use client';
import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

export function RegistrationHeader() {
  return (
    <Box textAlign='center'>
      <Heading
        mb={2}
        size={{ base: 'lg', md: '2xl' }}
        color='primary'
        fontWeight='bold'
      >
        Zago Tours
      </Heading>
      <Heading>Create account</Heading>
      <Text>
        Already have an account?{' '}
        <ChakraLink as={NextLink} href='/login' textDecor='underline'>
          Log in
        </ChakraLink>{' '}
      </Text>
    </Box>
  );
}
