'use client';

import { useState } from 'react';
import { Box, Field, Input, Stack, Heading, Text } from '@chakra-ui/react';
import Button from '@/components/ui/button';
import { AppLink } from '@/components/ui/AppLink';

interface ForgotPasswordProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export function ForgotPasswordForm({
  onSubmit,
  isLoading,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState('');

  return (
    <Box
      w='full'
      maxW='md'
      p={8}
      borderWidth={1}
      borderRadius='lg'
      bg='textInverse'
      my={10}
      mx={{ md: 'auto' }}
    >
      <Stack gap={6}>
        <Stack gap={1} textAlign='center'>
          <Heading
            size={{ base: 'lg', md: '2xl' }}
            color='primary'
            fontWeight='bold'
          >
            Forgot Password?
          </Heading>
          <Text fontSize='sm' color='fg.muted'>
            We'll send a reset link to your email
          </Text>
        </Stack>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(email);
          }}
        >
          <Stack gap={4}>
            <Field.Root>
              <Field.Label>Email Address</Field.Label>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email@example.com'
              />
            </Field.Root>

            <Button type='submit' loading={isLoading} bg='primary' width='full'>
              Send Reset Link
            </Button>
            <Text textAlign='center'>
              <AppLink href='/login' color='primary'>
                Back to login
              </AppLink>
            </Text>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
