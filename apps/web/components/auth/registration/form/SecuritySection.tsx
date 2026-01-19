import { Role } from '@zagotours/types';
import { FormField } from './FormField';

export function SecuritySection({ finalRole, errors }: any) {
  return (
    <>
      <FormField
        name='password'
        label='Password'
        type='password'
        error={errors.password}
      />
      <FormField
        name='confirmPassword'
        label='Confirm Password'
        type='password'
        error={errors.confirmPassword}
      />

      {finalRole === Role.ADVENTURER && (
        <FormField
          name='subscribe'
          label='Become a safety ambassador'
          type='checkbox'
        />
      )}
    </>
  );
}
