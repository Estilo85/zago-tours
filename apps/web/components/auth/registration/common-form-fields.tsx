'use client';
import { Input, Field } from '@chakra-ui/react';
import { FormErrors } from '@/lib/registration-utils';
import { PasswordInput } from '@/components/ui/password-input';

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
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true,
  },
];

interface CommonFormFieldsProps {
  errors?: FormErrors;
}

export function CommonFormFields({ errors }: CommonFormFieldsProps) {
  return (
    <>
      {commonFields.map((field) => {
        const errorMessage = errors?.[field.name as keyof FormErrors];
        const isPassword = field.type === 'password';

        return (
          <Field.Root
            key={field.name}
            required={field.required}
            invalid={!!errorMessage}
          >
            <Field.Label>{field.label}</Field.Label>

            {/* Conditional Rendering logic */}
            {isPassword ? (
              <PasswordInput
                name={field.name}
                placeholder={field.placeholder}
              />
            ) : (
              <Input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
              />
            )}

            {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
          </Field.Root>
        );
      })}
    </>
  );
}
