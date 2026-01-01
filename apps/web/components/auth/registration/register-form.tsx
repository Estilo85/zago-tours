'use client';
import { useState } from 'react';
import { Box, VStack, Text, Flex } from '@chakra-ui/react';
import { RegisterDTO } from '@zagotours/types';
import Button from '@/components/ui/button';
import { useRegistrationLogic } from '@/hooks/use-registration-logic';
import {
  mapFormDataToDTO,
  validateRegistration,
  FormErrors,
} from '@/lib/registration-utils';

// Sub-components
import { RoleSpecificFields } from './role-specific-fields';
import { AgentTypeSelector } from './agent-type-selector';
import { CommonFormFields } from './common-form-fields';
import { RegistrationHeader } from './registration-header';

interface RegistrationFormProps {
  onSubmit?: (data: RegisterDTO) => void | Promise<void>;
  error?: string | null;
}

export default function RegistrationForm({
  onSubmit,
  error: serverError,
}: RegistrationFormProps) {
  //Custom Hook
  const {
    selectedCategory,
    selectedAgentType,
    finalRole,
    handleAgentTypeSelect,
  } = useRegistrationLogic();

  // Local state for validation errors
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  //HandleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);

    // Run Validation
    const errors = validateRegistration(formData, finalRole);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!finalRole) return;
    const payload = mapFormDataToDTO(formData, finalRole);

    if (onSubmit) {
      await onSubmit(payload);
    }
  };

  return (
    <Box
      bg='textInverse'
      p={7}
      borderRadius='lg'
      boxShadow='sm'
      width={{ base: '100%', md: 'md' }}
      minH={{ base: 'fit-content', md: '570px' }}
      maxH={{ base: 'fit-content', md: '570px' }}
      overflow='auto'
      scrollbar='hidden'
    >
      <VStack align='stretch' gap={4}>
        <RegistrationHeader />

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

        <Flex direction='column'>
          <Text
            color='primary'
            fontSize='sm'
            fontWeight='black'
            textAlign='center'
            mb={4}
          >
            {selectedCategory === 'AGENT'
              ? 'Complete your Agent details'
              : `Registering as ${selectedCategory?.toLowerCase()}`}
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack gap={4} align='stretch'>
              {selectedCategory === 'AGENT' && (
                <AgentTypeSelector
                  selectedAgentType={selectedAgentType}
                  onAgentTypeChange={handleAgentTypeSelect}
                />
              )}

              <CommonFormFields errors={fieldErrors} />
              <RoleSpecificFields role={finalRole} errors={fieldErrors} />

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
        </Flex>
      </VStack>
    </Box>
  );
}
