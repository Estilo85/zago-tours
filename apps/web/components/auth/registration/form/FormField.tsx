'use client';
import { Input, Textarea, Field, Checkbox } from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/form/password-input';
import Select from 'react-select';

export function FormField({
  label,
  name,
  type = 'text',
  error,
  placeholder,
  options,
  required,
}: any) {
  return (
    <Field.Root invalid={!!error} required={required}>
      {type !== 'checkbox' && (
        <Field.Label fontSize='sm' fontWeight='bold'>
          {label}
        </Field.Label>
      )}

      {(() => {
        switch (type) {
          case 'password':
            return <PasswordInput name={name} placeholder={placeholder} />;

          case 'textarea':
            return <Textarea name={name} placeholder={placeholder} />;

          case 'combo':
            return (
              <Select
                name={name}
                options={options}
                placeholder={placeholder}
                instanceId={name}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: error ? '#E53E3E' : '#E2E8F0',
                    borderRadius: '0.375rem',
                    width: '100%',
                  }),
                }}
              />
            );

          case 'checkbox':
            return (
              <Checkbox.Root name={name} defaultChecked={false}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label fontSize='sm' fontWeight='medium'>
                  {label}
                </Checkbox.Label>
              </Checkbox.Root>
            );

          default:
            return <Input name={name} type={type} placeholder={placeholder} />;
        }
      })()}

      {error && <Field.ErrorText fontSize='xs'>{error}</Field.ErrorText>}
    </Field.Root>
  );
}
