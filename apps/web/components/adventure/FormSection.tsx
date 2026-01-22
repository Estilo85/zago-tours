'use client';
import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import GeneralEnquiryForm from '../ui/form/GeneralEnquiryForm';

export default function FormSection() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending Enquiry:', formData);
  };
  return (
    <Box textAlign='center'>
      <Text color='primary' fontSize='md'>
        CONTACT INFORMATION
      </Text>
      <Heading
        size={{ base: '2xl', md: '4xl' }}
        lineHeight='1.2'
        color='primary'
        mb={6}
      >
        Cant Find what <br /> you looking for?
      </Heading>

      <GeneralEnquiryForm
        values={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
