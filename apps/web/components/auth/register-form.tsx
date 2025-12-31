'use client';
import { useState } from 'react';
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

// Role types
type RoleCategory = 'AFFILIATE' | 'ADVENTURER' | 'AGENT' | null;
type AgentType = 'INDEPENDENT_AGENT' | 'COOPERATE_AGENT' | null;

// Array-based configurations
const roleCategoryOptions = [
  { label: 'Register as Affiliate', value: 'AFFILIATE' as RoleCategory },
  { label: 'Register as Adventurer', value: 'ADVENTURER' as RoleCategory },
  { label: 'Register as Agent', value: 'AGENT' as RoleCategory },
];

const agentTypeOptions = [
  {
    value: 'INDEPENDENT_AGENT' as AgentType,
    label: 'Independent Agent',
    description: 'For individual travel professionals',
  },
  {
    value: 'COOPERATE_AGENT' as AgentType,
    label: 'Corporate Agent',
    description: 'For travel companies and agencies',
  },
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
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: 'Enter your phone number',
    required: false,
  },
  {
    name: 'country',
    label: 'Country',
    type: 'text',
    placeholder: 'Enter your country',
    required: false,
  },
];

export default function RegistrationForm() {
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory>(null);
  const [selectedAgentType, setSelectedAgentType] = useState<AgentType>(null);
  const [finalRole, setFinalRole] = useState<PublicRole | null>(null);

  const handleCategorySelect = (category: RoleCategory) => {
    setSelectedCategory(category);
    setSelectedAgentType(null);

    if (category === 'AFFILIATE' || category === 'ADVENTURER') {
      setFinalRole(category as PublicRole);
    } else {
      setFinalRole(null);
    }
  };

  const handleAgentTypeSelect = (agentType: AgentType) => {
    setSelectedAgentType(agentType);
    setFinalRole(agentType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering as:', finalRole);
  };

  const getRoleDisplay = () => {
    if (selectedCategory === 'AGENT' && selectedAgentType) {
      return selectedAgentType === 'INDEPENDENT_AGENT'
        ? 'Independent Agent'
        : 'Corporate Agent';
    }
    if (selectedCategory === 'AFFILIATE') return 'Affiliate';
    if (selectedCategory === 'ADVENTURER') return 'Adventurer';
    return '';
  };

  return (
    <Box
      minH='100vh'
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
              Select your role to get started
            </Text>
          </Box>

          {/* Role Category Selection */}
          {!selectedCategory ? (
            <VStack gap={3}>
              {roleCategoryOptions.map((option) => (
                <Button
                  key={option.value}
                  width='100%'
                  size='lg'
                  variant='outline'
                  onClick={() => handleCategorySelect(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </VStack>
          ) : selectedCategory === 'AGENT' && !selectedAgentType ? (
            /* Agent Type Selection */
            <VStack gap={4} align='stretch'>
              <HStack justify='space-between' align='center'>
                <Text fontSize='sm' fontWeight='semibold' color='gray.700'>
                  Select Agent Type
                </Text>
                <Button
                  size='xs'
                  variant='ghost'
                  onClick={() => setSelectedCategory(null)}
                >
                  Back
                </Button>
              </HStack>

              <RadioGroup.Root
                value={selectedAgentType || ''}
                onValueChange={(e) =>
                  handleAgentTypeSelect(e.value as AgentType)
                }
              >
                <VStack gap={3} align='stretch'>
                  {agentTypeOptions.map((option) => (
                    <Box
                      key={option.value}
                      p={4}
                      borderWidth='1px'
                      borderRadius='md'
                      cursor='pointer'
                      _hover={{ bg: 'gray.50' }}
                    >
                      <RadioGroup.Item value={option.value as string}>
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemControl />
                        <RadioGroup.ItemText>
                          <VStack align='start' gap={1}>
                            <Text fontWeight='semibold'>{option.label}</Text>
                            <Text fontSize='xs' color='gray.600'>
                              {option.description}
                            </Text>
                          </VStack>
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </Box>
                  ))}
                </VStack>
              </RadioGroup.Root>
            </VStack>
          ) : (
            /* Registration Form */
            <Box as='form' onSubmit={handleSubmit}>
              <VStack gap={4} align='stretch'>
                {/* Role Badge */}
                <HStack justify='space-between' align='center'>
                  <Text fontSize='sm' fontWeight='semibold' color='gray.700'>
                    Registering as:{' '}
                    <Text as='span' color='blue.600'>
                      {getRoleDisplay()}
                    </Text>
                  </Text>
                  <Button
                    size='xs'
                    variant='ghost'
                    onClick={() => {
                      if (selectedCategory === 'AGENT') {
                        setSelectedAgentType(null);
                        setFinalRole(null);
                      } else {
                        setSelectedCategory(null);
                        setFinalRole(null);
                      }
                    }}
                  >
                    Change
                  </Button>
                </HStack>

                {/* Common Fields - Mapped */}
                {commonFields.map((field) => (
                  <Field.Root key={field.name} required={field.required}>
                    <Field.Label>
                      {field.label}
                      {field.required && <Field.RequiredIndicator />}
                    </Field.Label>
                    <Input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  </Field.Root>
                ))}

                {/* Role-Specific Fields */}
                <RoleSpecificFields role={finalRole} />

                {/* Submit Button */}
                <Button type='submit' colorScheme='blue' size='lg' mt={2}>
                  Create Account
                </Button>

                <Text fontSize='xs' color='gray.500' textAlign='center'>
                  Already have an account?{' '}
                  <Text
                    as='span'
                    color='blue.600'
                    cursor='pointer'
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Sign in
                  </Text>
                </Text>
              </VStack>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
