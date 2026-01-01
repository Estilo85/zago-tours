'use client';
import {
  Input,
  Fieldset,
  Field,
  Textarea,
  createListCollection,
  NativeSelect, // Cleaner version of the styled select
  Combobox,
  Select,
  Portal,
} from '@chakra-ui/react';
import { PublicRole } from '@zagotours/types';
import { FormErrors } from '@/lib/registration-utils';

// 1. Extend the types
type FieldType = 'text' | 'textarea' | 'select' | 'combo';

type FieldConfig = {
  label: string;
  name: string;
  isRequired: boolean;
  placeholder: string;
  type: FieldType;
  options?: { label: string; value: string }[];
};

interface RoleSpecificFieldsProps {
  role: PublicRole | null;
  errors?: FormErrors;
}

// 2. Updated Map with different types
const roleFieldsMap: Record<PublicRole, FieldConfig[]> = {
  AFFILIATE: [
    {
      label: 'Certifications',
      name: 'certifications',
      isRequired: false,
      placeholder: 'Enter your certifications',
      type: 'text',
    },
    {
      label: 'Country of Operation',
      name: 'country',
      isRequired: true,
      placeholder: 'Search and select country',
      type: 'combo', // Combobox Example
      options: [
        { label: 'Nigeria', value: 'NG' },
        { label: 'United States', value: 'US' },
        { label: 'United Kingdom', value: 'UK' },
      ],
    },
  ],
  ADVENTURER: [
    {
      label: 'Referral Code',
      name: 'referral_code',
      isRequired: false,
      placeholder: 'Enter referral code',
      type: 'text',
    },
  ],
  INDEPENDENT_AGENT: [
    {
      label: 'Business Description',
      name: 'business_description',
      isRequired: true,
      placeholder: 'Tell us about your business...',
      type: 'textarea',
    },
  ],
  COOPERATE_AGENT: [
    {
      label: 'Company Type',
      name: 'company_type',
      isRequired: true,
      placeholder: 'Select type',
      type: 'select',
      options: [
        { label: 'LLC', value: 'llc' },
        { label: 'Corporation', value: 'corp' },
      ],
    },
  ],
};

export const RoleSpecificFields = ({
  role,
  errors,
}: RoleSpecificFieldsProps) => {
  if (!role) return null;

  const fields = roleFieldsMap[role];

  return (
    <Fieldset.Root>
      <Fieldset.Content gap={4}>
        {fields.map((field) => {
          const errorMessage = errors?.[field.name];

          const collection = field.options
            ? createListCollection({ items: field.options })
            : null;

          return (
            <Field.Root
              key={field.name}
              required={field.isRequired}
              invalid={!!errorMessage}
            >
              <Field.Label>{field.label}</Field.Label>

              {/* TEXTAREA */}
              {field.type === 'textarea' && (
                <Textarea name={field.name} placeholder={field.placeholder} />
              )}

              {/* NATIVE SELECT */}
              {field.type === 'select' && collection && (
                <Select.Root name={field.name} collection={collection}>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={field.placeholder} />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {collection.items.map((opt) => (
                          <Select.Item item={opt} key={opt.value}>
                            {opt.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
              {/* COMBOBOX (Searchable) */}
              {field.type === 'combo' && collection && (
                <Combobox.Root
                  name={field.name}
                  collection={collection}
                  allowCustomValue={false}
                >
                  <Combobox.Control>
                    <Combobox.Input placeholder={field.placeholder} />
                    <Combobox.Trigger />
                  </Combobox.Control>
                  <Combobox.Positioner>
                    <Combobox.Content>
                      {field.options?.map((item) => (
                        <Combobox.Item key={item.value} item={item}>
                          <Combobox.ItemText>{item.label}</Combobox.ItemText>
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))}
                    </Combobox.Content>
                  </Combobox.Positioner>
                </Combobox.Root>
              )}

              {/* DEFAULT INPUT */}
              {field.type === 'text' && (
                <Input name={field.name} placeholder={field.placeholder} />
              )}

              {errorMessage && (
                <Field.ErrorText>{errorMessage}</Field.ErrorText>
              )}
            </Field.Root>
          );
        })}
      </Fieldset.Content>
    </Fieldset.Root>
  );
};
