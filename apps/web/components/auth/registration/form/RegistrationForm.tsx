'use client';
import { useState } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import Button from '@/components/ui/button';
import { useRegistrationLogic } from '@/hooks/use-registration-logic';
import { mapFormDataToDTO, FormErrors } from '@/lib/registration-utils';

// Sub-components
import { AgentTypeSelector } from '../AgentTypeSelector';
import { RegistrationHeader } from '../RegistrationHeader';
import { FormField } from './FormField';
import { validateRegistration } from '@/lib/validate-registration';
import { Role } from '@zagotours/types';
import { DynamicRoleSection } from './DynamicRoleSection';
import { SecuritySection } from './SecuritySection';
import { IdentitySection } from './IdentitySection';

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

            <IdentitySection
              finalRole={finalRole}
              labels={labels}
              errors={fieldErrors}
            />

            <DynamicRoleSection finalRole={finalRole} errors={fieldErrors} />

            <SecuritySection finalRole={finalRole} errors={fieldErrors} />
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
