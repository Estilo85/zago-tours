'use client';

import { useState } from 'react';
import {
  Box,
  Field,
  Input,
  Stack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LoginDto } from '@zagotours/types';
import Button from '@/components/ui/button/Button';
import { AppLink } from '@/components/ui/link/AppLink';
import { PasswordInput } from '@/components/ui/input/password-input';
import { useAuth } from '@/hooks/queries/auth';

export function LoginForm() {
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });

  const { login, isLoggingIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

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
      <VStack gap={6} align='stretch'>
        <Stack gap={1} textAlign='center'>
          <Heading
            size={{ base: 'lg', md: '2xl' }}
            color='primary'
            fontWeight='bold'
          >
            Welcome Back
          </Heading>
          <Text fontSize='sm' color='fg.muted'>
            Enter your details to sign in
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleChange}
                placeholder='email@example.com'
                disabled={isLoggingIn}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                name='password'
                required
                value={formData.password}
                onChange={handleChange}
                placeholder='********'
                disabled={isLoggingIn}
              />
            </Field.Root>

            <Button
              type='submit'
              bg='primary'
              width='full'
              loading={isLoggingIn}
              disabled={isLoggingIn}
            >
              Sign In
            </Button>

            <Text textAlign='center'>
              <AppLink href='/forgot-password' color='primary'>
                Forgot password ?
              </AppLink>
            </Text>
          </Stack>
        </form>
      </VStack>
    </Box>
  );
}
