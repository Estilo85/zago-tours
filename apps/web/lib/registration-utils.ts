import { RegisterDto, RegistrableRole, Role } from '@zagotours/types';

export interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * MAPPING LOGIC
 *
 */
export const mapFormDataToDTO = (
  formData: FormData,
  role: RegistrableRole
): RegisterDto => {
  // Convert FormData to a plain object for easier access
  const raw = Object.fromEntries(formData.entries());

  const payload: RegisterDto = {
    // Standard Fields
    name: raw.fullName as string,
    email: raw.email as string,
    password: raw.password as string,
    role: role,

    // Optional common fields
    phone: (raw.phone as string) || undefined,
    country: (raw.country as string) || undefined,
    referralCode: (raw.referral_code as string) || undefined,
  };

  // Role-specific nested details
  if (role === Role.INDEPENDENT_AGENT) {
    payload.agentDetails = {
      certifications: raw.certifications
        ? (raw.certifications as string).split(',').map((c) => c.trim())
        : [],
      howDidYouHear: (raw.find_us as string) || undefined,
    };
  }

  if (role === Role.COOPERATE_AGENT) {
    payload.cooperateDetails = {
      companyName: (raw.company_name as string) || (raw.company_type as string),
      travelBusinessDescription: raw.business_description as string,
      howDidYouHear: (raw.find_us as string) || undefined,
    };
  }

  if (role === Role.AFFILIATE) {
    payload.affiliateDetails = {
      communityBrand: raw.community_brand as string,
      socialLinks: raw.social_links
        ? (raw.social_links as string).split(',').map((s) => s.trim())
        : [],
      howDidYouHear: (raw.find_us as string) || undefined,
    };
  }

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== undefined && v !== '')
  ) as RegisterDto;

  // Clean nested objects as well
  if (cleanPayload.agentDetails) {
    cleanPayload.agentDetails = Object.fromEntries(
      Object.entries(cleanPayload.agentDetails).filter(
        ([_, v]) => v !== undefined && v !== ''
      )
    ) as typeof cleanPayload.agentDetails;
  }

  if (cleanPayload.cooperateDetails) {
    cleanPayload.cooperateDetails = Object.fromEntries(
      Object.entries(cleanPayload.cooperateDetails).filter(
        ([_, v]) => v !== undefined && v !== ''
      )
    ) as typeof cleanPayload.cooperateDetails;
  }

  if (cleanPayload.affiliateDetails) {
    cleanPayload.affiliateDetails = Object.fromEntries(
      Object.entries(cleanPayload.affiliateDetails).filter(
        ([_, v]) => v !== undefined && v !== ''
      )
    ) as typeof cleanPayload.affiliateDetails;
  }

  return cleanPayload;
};
