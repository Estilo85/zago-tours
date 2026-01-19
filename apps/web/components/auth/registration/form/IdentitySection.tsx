import { Role } from '@zagotours/types';
import { FormField } from './FormField';

export function IdentitySection({ finalRole, labels, errors }: any) {
  return (
    <>
      <FormField
        name='fullName'
        label={labels.fullName}
        placeholder={labels.placeholder}
        error={errors.fullName}
      />
      <FormField
        name='email'
        label={labels.email}
        type='email'
        error={errors.email}
      />

      {finalRole === Role.ADVENTURER && (
        <FormField
          name='country'
          label='Country of Residence'
          type='select'
          error={errors.country}
        />
      )}

      {finalRole !== Role.COOPERATE_AGENT && (
        <FormField name='phone' label='Phone' type='tel' error={errors.phone} />
      )}
    </>
  );
}
