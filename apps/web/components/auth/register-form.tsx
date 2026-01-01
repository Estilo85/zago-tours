'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Field, RadioGroup } from '@chakra-ui/react';
import { RoleSpecificFields } from './role-specific-fields';
import { PublicRole } from '@zagotours/types';
import { useRoleStore } from '@/store/role-selector.store';

type RoleCategory = 'AFFILIATE' | 'ADVENTURER' | 'AGENT';
type AgentType = 'INDEPENDENT_AGENT' | 'COOPERATE_AGENT';

const agentTypeOptions = [
  { value: 'INDEPENDENT_AGENT' as AgentType, label: 'Independent' },
  { value: 'COOPERATE_AGENT' as AgentType, label: 'Corporate' },
];

const commonFields = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
];

export default function RegistrationForm() {
  const storeRole = useRoleStore((state) => state.role);

  const [selectedCategory, setSelectedCategory] =
    useState<RoleCategory>('ADVENTURER');
  const [selectedAgentType, setSelectedAgentType] =
    useState<AgentType>('INDEPENDENT_AGENT');
  const [finalRole, setFinalRole] = useState<PublicRole | null>(null);

  useEffect(() => {
    if (storeRole === 'AGENT') {
      setSelectedCategory('AGENT');
    } else {
      setSelectedCategory(storeRole as RoleCategory);
      setFinalRole(storeRole as PublicRole);
      setSelectedAgentType('INDEPENDENT_AGENT');
    }
  }, [storeRole]);

  const handleAgentTypeSelect = (agentType: AgentType) => {
    setSelectedAgentType(agentType);
    setFinalRole(agentType as PublicRole);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload = { ...data, role: finalRole };
    console.log('Final Payload:', payload);
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      bg='gray.50'
      py={8}
    >
      <Box
        bg='white'
        p={8}
        borderRadius='lg'
        boxShadow='sm'
        width='100%'
        maxW='md'
      >
        <VStack gap={6} align='stretch'>
          <Box textAlign='center'>
            <Heading size='lg' mb={2}>
              Create Account
            </Heading>
            <Text color='gray.600' fontSize='sm'>
              {selectedCategory === 'AGENT'
                ? 'Complete your Agent details'
                : `Registering as ${selectedCategory?.toLowerCase()}`}
            </Text>
          </Box>

          <Box as='form' onSubmit={handleSubmit}>
            <VStack gap={4} align='stretch'>
              {/* STICKY AGENT TYPE SELECTION: Only visible if Navbar role is AGENT */}
              {selectedCategory === 'AGENT' && (
                <Box
                  p={3}
                  bg='blue.50'
                  borderRadius='md'
                  border='1px solid'
                  borderColor='blue.100'
                >
                  <Text fontSize='xs' fontWeight='bold' mb={2} color='blue.700'>
                    AGENT TYPE
                  </Text>
                  <RadioGroup.Root
                    value={selectedAgentType || ''}
                    onValueChange={(e) =>
                      handleAgentTypeSelect(e.value as AgentType)
                    }
                  >
                    <HStack gap={4}>
                      {agentTypeOptions.map((option) => (
                        <RadioGroup.Item
                          key={option.value}
                          value={option.value as string}
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText fontSize='sm'>
                            {option.label}
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      ))}
                    </HStack>
                  </RadioGroup.Root>
                </Box>
              )}

              {/* Common Fields */}
              {commonFields.map((field) => (
                <Field.Root key={field.name} required={field.required}>
                  <Field.Label>{field.label}</Field.Label>
                  <Input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                </Field.Root>
              ))}

              {/* Dynamic Fields from the Map */}
              <RoleSpecificFields role={finalRole} />

              <Button
                type='submit'
                colorPalette='blue'
                size='lg'
                mt={2}
                width='100%'
                disabled={selectedCategory === 'AGENT' && !selectedAgentType}
              >
                {selectedCategory === 'AGENT' && !selectedAgentType
                  ? 'Select Agent Type'
                  : 'Create Account'}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
