'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, VStack } from '@chakra-ui/react';
import Button from '@/components/ui/button/Button';
import { useRegistrationLogic } from '@/hooks/use-registration-logic';
import {
  RegistrationFormData,
  registrationSchema,
} from '@/app/validations/auth-validation';
import { useEffect } from 'react';
import { RegistrationHeader } from '../RegistrationHeader';
import { AgentTypeSelector } from '../AgentTypeSelector';
import { IdentitySection } from './IdentitySection';
import { DynamicRoleSection } from './DynamicRoleSection';
import { SecuritySection } from './SecuritySection';
import { RegisterDto, RegistrableRole, Role } from '@zagotours/types';
import { useAuth } from '@/hooks/queries/auth';

export default function RegistrationForm() {
  const { register, isRegistering } = useAuth();

  const {
    selectedCategory,
    selectedAgentType,
    finalRole,
    handleAgentTypeSelect,
  } = useRegistrationLogic();

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      country: '',
      role: finalRole || undefined,
      referralCode: '',
      business_description: '',
      certifications: [],
      howDidYouHear: '',
      community: '',
      website_link: '',
      safetyAmbassador: false,
    },
  });
  useEffect(() => {
    if (finalRole) {
      methods.setValue('role', finalRole, { shouldValidate: true });
    }
  }, [finalRole, methods]);

  const onFormSubmit = (data: RegistrationFormData) => {
    const payload: RegisterDto = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      country: data.country,
      role: data.role as RegistrableRole,
      referralCode: data.referralCode,
    };

    // Add nested details based on role
    if (data.role === Role.INDEPENDENT_AGENT) {
      payload.agentDetails = {
        certifications: data.certifications,
        howDidYouHear: data.howDidYouHear,
      };
    }

    if (data.role === Role.COOPERATE_AGENT) {
      payload.cooperateDetails = {
        companyName: data.name,
        travelBusinessDescription: data.business_description!,
        howDidYouHear: data.howDidYouHear,
      };
    }

    if (data.role === Role.AFFILIATE) {
      payload.affiliateDetails = {
        communityBrand: data.community!,
        socialLinks: data.website_link ? [data.website_link] : [],
        howDidYouHear: data.howDidYouHear,
      };
    }

    register(payload); // Call the register function from useAuth
  };

  return (
    <Box
      bg='white'
      p={7}
      borderRadius='lg'
      boxShadow='sm'
      width='md'
      maxH='570px'
      overflowY='auto'
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onFormSubmit)}>
          <VStack align='stretch' gap={4}>
            <RegistrationHeader />

            {selectedCategory === 'AGENT' && (
              <AgentTypeSelector
                selectedAgentType={selectedAgentType}
                onAgentTypeChange={handleAgentTypeSelect}
              />
            )}

            <IdentitySection finalRole={finalRole} />
            <DynamicRoleSection finalRole={finalRole} />
            <SecuritySection finalRole={finalRole} />

            <Button
              type='submit'
              bg='primary'
              width='100%'
              loading={isRegistering} // Use isRegistering instead
            >
              Create Account
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
}
