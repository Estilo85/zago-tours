'use client';
import { useState } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import Button from '@/components/ui/button';
import { useRegistrationLogic } from '@/hooks/use-registration-logic';
import { mapFormDataToDTO, FormErrors } from '@/lib/registration-utils';

// Sub-components
import { AgentTypeSelector } from './agent-type-selector';
import { RegistrationHeader } from './registration-header';
import { FormField } from './form-field';
import { validateRegistration } from '@/lib/validate-registration';
import { Role } from '@zagotours/types';

export default function RegistrationForm({
  onSubmit,
  error: serverError,
}: any) {
  const {
    selectedCategory,
    selectedAgentType,
    finalRole,
    handleAgentTypeSelect,
  } = useRegistrationLogic();

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  //  Dynamic Labels
  const labels = {
    fullName: finalRole === Role.COOPERATE_AGENT ? 'Company Name' : 'Full Name',
    email:
      finalRole === Role.COOPERATE_AGENT ? 'Contact Email' : 'Email address',
    description:
      finalRole === Role.AFFILIATE
        ? 'Marketing Experience'
        : 'Business Description',
    placeholder:
      finalRole === Role.COOPERATE_AGENT
        ? 'Enter registered company name'
        : 'Enter your full name',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const errors = validateRegistration(formData, finalRole);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!finalRole) return;
    const payload = mapFormDataToDTO(formData, finalRole);

    if (onSubmit) await onSubmit(payload);
  };

  return (
    <Box
      bg='white'
      p={7}
      borderRadius='lg'
      boxShadow='sm'
      width={{ base: '100%', md: 'md' }}
      minH={{ base: 'fit-content', md: '570px' }}
      maxH={{ base: 'fit-content', md: '570px' }}
      overflowY='auto'
      scrollbar='hidden'
    >
      <VStack align='stretch' gap={4}>
        <RegistrationHeader />

        {/* Global Error Display */}
        {(serverError || fieldErrors.general) && (
          <Box
            p={3}
            bg='red.50'
            color='red.600'
            borderRadius='md'
            border='1px solid'
          >
            <Text fontSize='sm'>{serverError || fieldErrors.general}</Text>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <VStack gap={3} align='stretch'>
            {/*  AGENT SWITCHER (Nested between fields) */}
            {selectedCategory === 'AGENT' && (
              <Box my={2}>
                <Text fontSize='xs' fontWeight='bold' mb={2} color='gray.500'>
                  AGENT TYPE
                </Text>
                <AgentTypeSelector
                  selectedAgentType={selectedAgentType}
                  onAgentTypeChange={handleAgentTypeSelect}
                />
              </Box>
            )}

            {/*  TOP COMMON FIELDS */}
            <FormField
              name='fullName'
              label={labels.fullName}
              placeholder={labels.placeholder}
              error={fieldErrors.fullName}
            />

            <FormField
              name='email'
              label={labels.email}
              type='email'
              placeholder='Enter your email'
              error={fieldErrors.email}
            />
            {finalRole === 'ADVENTURER' && (
              <FormField
                name='country'
                label='Country of Residence'
                type='select'
                error={fieldErrors.country}
              />
            )}

            {/* 3. DYNAMIC ROLE-SPECIFIC FIELDS */}
            {finalRole != 'COOPERATE_AGENT' && (
              <FormField
                name='phone'
                label='Phone'
                type='tel'
                error={fieldErrors.phone}
              />
            )}
            {/* 3. DYNAMIC ROLE-SPECIFIC FIELDS */}
            {finalRole === 'COOPERATE_AGENT' && (
              <FormField
                name='business_description'
                label='Tell us a bit about your travel business'
                type='textarea'
                error={fieldErrors.business_description}
              />
            )}

            {finalRole === 'INDEPENDENT_AGENT' && (
              <FormField
                name='certifications'
                label='Certifications'
                type='combo'
                placeholder='e.g. IATA, Local License'
                error={fieldErrors.certifications}
              />
            )}

            {finalRole === 'AFFILIATE' && (
              <>
                <FormField
                  name='find_us'
                  label='How did you hear about us?'
                  error={fieldErrors.find_us}
                />
                <FormField
                  name='community'
                  label='Community/Brand/Host agency name'
                  error={fieldErrors.find_us}
                />
                <FormField
                  name='website_link'
                  label='Website/Social Link'
                  error={fieldErrors.find_us}
                />
              </>
            )}

            {/*  BOTTOM COMMON FIELDS */}
            <FormField
              name='password'
              label='Password'
              type='password'
              error={fieldErrors.password}
            />

            <FormField
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              error={fieldErrors.confirmPassword}
            />
            {finalRole === 'ADVENTURER' && (
              <FormField
                name='subscribe'
                label='Become a safety ambassador'
                type='checkbox'
              />
            )}
            <Button
              type='submit'
              colorPalette='primary'
              size='lg'
              mt={2}
              bg='primary'
              width='100%'
            >
              Create Account
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}
