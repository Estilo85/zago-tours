'use client';
import {
  Input,
  Fieldset,
  Field,
  Textarea,
  createListCollection,
  Combobox,
  Select,
  Portal,
} from '@chakra-ui/react';
import { CustomerRole } from '@zagotours/types';
import { FormErrors } from '@/lib/registration-utils';
import { useMemo } from 'react';

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
  role: CustomerRole | null;
  errors?: FormErrors;
}

const roleFieldsMap: Record<CustomerRole, FieldConfig[]> = {
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
      type: 'combo',
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

  const collections = useMemo(() => {
    const collectionsMap = new Map();

    fields.forEach((field) => {
      if (field.options) {
        collectionsMap.set(
          field.name,
          createListCollection({ items: field.options })
        );
      }
    });

    return collectionsMap;
  }, [fields]);

  return (
    <Fieldset.Root>
      <Fieldset.Content gap={4}>
        {fields.map((field) => {
          const errorMessage = errors?.[field.name];
          const collection = collections.get(field.name);

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
                        {collection.items.map((opt: any) => (
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
