'use client';

import React from 'react';
import { Stack, Button, Box, Heading, VStack, Text } from '@chakra-ui/react';
import { LuSend } from 'react-icons/lu';
import { FormInput } from '../input/FormInput';

interface EnquiryFormValues {
  email: string;
  phone: string;
  message: string;
}

interface GeneralEnquiryFormProps {
  values: EnquiryFormValues;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function GeneralEnquiryForm({
  values,
  onChange,
  onSubmit,
  isLoading = false,
}: GeneralEnquiryFormProps) {
  return (
    <Box
      as='form'
      onSubmit={onSubmit}
      w='full'
      maxW={{ base: '100%', md: '500px' }}
      mx='auto'
      p={{ base: 6, md: 10 }}
      bg='textPrimary'
      borderRadius='3xl'
      borderWidth='1px'
      shadow='xl'
    >
      <VStack spaceY={8} align='stretch'>
        <Box textAlign='center'>
          <Heading size='lg' color='primary' mb={2}>
            Get in Touch
          </Heading>
          <Text fontSize='sm' color='gray.500'>
            Have questions about an adventure? We're here to help.
          </Text>
        </Box>

        <Stack spaceY={5}>
          <FormInput
            label='Email Address'
            name='email'
            type='email'
            placeholder='example@mail.com'
            value={values.email}
            onChange={onChange}
            required
            helperText="We'll respond to this email."
          />

          <FormInput
            label='Phone Number'
            name='phone'
            type='tel'
            placeholder='+234...'
            value={values.phone}
            onChange={onChange}
          />

          <FormInput
            isTextArea
            label='Your Message'
            name='message'
            placeholder='Tell us about your travel plans...'
            value={values.message}
            onChange={onChange}
            required
            rows={5}
          />
        </Stack>

        <Button
          type='submit'
          bg='secondary'
          color='white'
          size='xl'
          width='full'
          loading={isLoading}
          borderRadius='2xl'
          fontSize='md'
          _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
          transition='all 0.2s'
        >
          <LuSend style={{ marginRight: '10px' }} />
          Send Message
        </Button>
      </VStack>
    </Box>
  );
}
