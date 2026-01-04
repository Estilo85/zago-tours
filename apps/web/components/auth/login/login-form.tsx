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
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { PasswordInput } from '@/components/ui/password-input';
import { LoginDTO } from '@zagotours/types';
import Button from '@/components/ui/button';
import { AppLink } from '@/components/ui/AppLink';

interface LoginFormProps {
  onSubmit: (data: LoginDTO) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginDTO>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <Stack gap={4}>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='email@example.com'
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='********'
              />
            </Field.Root>

            <Button type='submit' loading={isLoading} bg='primary' width='full'>
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
