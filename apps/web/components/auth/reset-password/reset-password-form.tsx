'use client';

import { useState } from 'react';
import { Box, Field, Stack, Heading, Text } from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { ResetPasswordDTO } from '@zagotours/types';
import Button from '@/components/ui/button';

interface ResetPasswordProps {
  token: string;
  onSubmit: (data: ResetPasswordDTO) => void;
  isLoading?: boolean;
}

export function ResetPasswordForm({
  token,
  onSubmit,
  isLoading,
}: ResetPasswordProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match'); // Replace with a proper toast/error UI
      return;
    }
    onSubmit({ token, newPassword });
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
      <Stack gap={6}>
        <Stack gap={1} textAlign='center'>
          <Heading
            size={{ base: 'lg', md: '2xl' }}
            color='primary'
            fontWeight='bold'
          >
            Set New Password
          </Heading>
          <Text fontSize='sm' color='fg.muted'>
            Ensure your new password is strong
          </Text>
        </Stack>

        <form onSubmit={handleFormSubmit}>
          <Stack gap={4}>
            <Field.Root>
              <Field.Label>New Password</Field.Label>
              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter new password'
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Confirm New Password</Field.Label>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm new password'
              />
            </Field.Root>

            <Button type='submit' loading={isLoading} bg='primary' width='full'>
              Update Password
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
