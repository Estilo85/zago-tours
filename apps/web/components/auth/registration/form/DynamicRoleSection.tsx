import { Role } from '@zagotours/types';
import { FormField } from './FormField';

export function DynamicRoleSection({ finalRole, errors }: any) {
  switch (finalRole) {
    case Role.COOPERATE_AGENT:
      return (
        <FormField
          name='business_description'
          label='Tell us about your travel business'
          type='textarea'
          error={errors.business_description}
        />
      );
    case Role.INDEPENDENT_AGENT:
      return (
        <FormField
          name='certifications'
          label='Certifications'
          type='combo'
          placeholder='e.g. IATA, Local License'
          error={errors.certifications}
        />
      );
    case Role.AFFILIATE:
      return (
        <>
          <FormField
            name='find_us'
            label='How did you hear about us?'
            error={errors.find_us}
          />
          <FormField
            name='community'
            label='Community/Brand/Host agency name'
            error={errors.community}
          />
          <FormField
            name='website_link'
            label='Website/Social Link'
            error={errors.website_link}
          />
        </>
      );
    default:
      return null;
  }
}
